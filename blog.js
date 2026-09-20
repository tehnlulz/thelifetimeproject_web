/*
 * Shared blog logic for blog.html and post.html.
 *
 * Loaded as a classic script (no build step) and exposed as `window.TLP`.
 * Single source of truth for: the post allowlist (posts/index.json),
 * frontmatter parsing, markdown rendering + sanitising, date handling,
 * escaping, meta/JSON-LD, and the bits of nav behaviour both pages share.
 */
(function (global) {
    'use strict';

    var SITE_ORIGIN = 'https://www.thelifetimeproject.com';
    var INDEX_URL = 'posts/index.json';
    var POSTS_DIR = 'posts/';
    var EXCERPT_LENGTH = 200;

    /* Slugs are lowercase, digit/letter segments joined by single hyphens.
       This alone rules out "../", absolute paths, query strings and markup. */
    var SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    /* ------------------------------------------------------------------ *
     * Errors — callers need to tell "we couldn't reach the server" apart
     * from "that post does not exist", because the copy differs.
     * ------------------------------------------------------------------ */

    function PostNotFoundError(slug) {
        var err = new Error('Post not found: ' + slug);
        err.name = 'PostNotFoundError';
        err.slug = slug;
        err.notFound = true;
        return err;
    }

    function isNotFound(error) {
        return Boolean(error && error.notFound);
    }

    /* ------------------------------------------------------------------ *
     * Frontmatter values
     * ------------------------------------------------------------------ */

    /* Frontmatter values are written as `title: "..."` / `tags: "a, b"`.
       The quotes are YAML syntax, not content — strip one matching pair. */
    function stripQuotes(value) {
        var text = String(value == null ? '' : value).trim();
        if (text.length < 2) {
            return text;
        }
        var first = text.charAt(0);
        var last = text.charAt(text.length - 1);
        if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
            return text.slice(1, -1).trim();
        }
        return text;
    }

    /* ------------------------------------------------------------------ *
     * Dates
     * ------------------------------------------------------------------ */

    /* `new Date('2025-01-05')` is parsed as UTC midnight, which renders as
       4 January in every timezone west of Greenwich. Build a local date
       from the parts instead so the displayed day always matches the slug. */
    function parseDate(value) {
        var text = String(value == null ? '' : value).trim();
        var match = /^(\d{4})-(\d{2})-(\d{2})/.exec(text);
        if (match) {
            var date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
            return isNaN(date.getTime()) ? null : date;
        }
        var fallback = new Date(text);
        return isNaN(fallback.getTime()) ? null : fallback;
    }

    function formatDate(value) {
        var date = parseDate(value);
        if (!date) {
            return '';
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /* `YYYY-MM-DD` for <time datetime> and JSON-LD. */
    function isoDate(value) {
        var date = parseDate(value);
        if (!date) {
            return '';
        }
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return date.getFullYear() + '-' + month + '-' + day;
    }

    /* ------------------------------------------------------------------ *
     * Markdown / frontmatter parsing
     * ------------------------------------------------------------------ */

    function parseFrontmatter(markdown) {
        var text = String(markdown == null ? '' : markdown).replace(/^﻿/, '');
        var match = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)([\s\S]*)$/.exec(text);
        if (!match) {
            return { data: {}, body: text };
        }

        var data = {};
        match[1].split(/\r?\n/).forEach(function (line) {
            if (!line.trim() || line.trim().charAt(0) === '#') {
                return;
            }
            var separator = line.indexOf(':');
            if (separator === -1) {
                return;
            }
            var key = line.slice(0, separator).trim();
            if (key) {
                data[key] = stripQuotes(line.slice(separator + 1));
            }
        });

        /* Drop the blank line(s) that sit between the closing `---` and the
           first block, so callers can reason about "the body starts with…". */
        return { data: data, body: match[2].replace(/^(?:[ \t]*\r?\n)+/, '') };
    }

    function normaliseHeading(value) {
        return String(value == null ? '' : value)
            .replace(/[*_`]/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    }

    /* Every post carries a frontmatter title *and* opens with `# Title`.
       Rendering both gives the page two H1s, so drop the leading heading
       when it just repeats the title we are already showing. */
    function stripDuplicateHeading(body, title) {
        var match = /^\s*#[ \t]+(.+?)[ \t]*(?:\r?\n|$)/.exec(body);
        if (!match || normaliseHeading(match[1]) !== normaliseHeading(title)) {
            return body;
        }
        return body.slice(match[0].length).replace(/^(?:[ \t]*\r?\n)+/, '');
    }

    /* Strip the inline markdown that would otherwise show up as literal
       asterisks and brackets in an excerpt or meta description. */
    function markdownToPlainText(value) {
        return String(value == null ? '' : value)
            .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
            .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
            .replace(/`([^`]*)`/g, '$1')
            .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function truncate(text, limit) {
        var value = String(text == null ? '' : text).trim();
        if (value.length <= limit) {
            return value;
        }
        var clipped = value.slice(0, limit);
        var lastSpace = clipped.lastIndexOf(' ');
        if (lastSpace > limit * 0.6) {
            clipped = clipped.slice(0, lastSpace);
        }
        return clipped.replace(/[\s.,;:!?-]+$/, '') + '…';
    }

    function firstParagraph(body) {
        var blocks = body.split(/\r?\n[ \t]*\r?\n/);
        for (var i = 0; i < blocks.length; i += 1) {
            var block = blocks[i].trim();
            if (!block) {
                continue;
            }
            /* Skip headings, quotes, lists, code fences and images. */
            if (/^(#{1,6}\s|>|[-*+]\s|\d+\.\s|```|!\[)/.test(block)) {
                continue;
            }
            return block;
        }
        return '';
    }

    function parseTags(value) {
        if (!value) {
            return [];
        }
        return String(value)
            .split(',')
            .map(function (tag) {
                return stripQuotes(tag);
            })
            .filter(function (tag) {
                return tag.length > 0;
            });
    }

    function prettifySlug(slug) {
        return String(slug)
            .replace(/^\d{4}-\d{2}-\d{2}-/, '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, function (ch) {
                return ch.toUpperCase();
            });
    }

    /*
     * The one parser both pages use. Title precedence is frontmatter →
     * leading `# heading` → prettified slug, so blog.html and post.html can
     * no longer disagree about what a post is called.
     */
    function parseMarkdownPost(markdown, slug) {
        var parsed = parseFrontmatter(markdown);
        var data = parsed.data;
        var body = parsed.body;

        var headingMatch = /^[ \t]*#[ \t]+(.+?)[ \t]*$/m.exec(body);
        var title = data.title || (headingMatch ? headingMatch[1].trim() : prettifySlug(slug));

        var content = stripDuplicateHeading(body, title);

        var excerpt = data.excerpt
            ? markdownToPlainText(data.excerpt)
            : truncate(markdownToPlainText(firstParagraph(content)), EXCERPT_LENGTH);

        /* Frontmatter is the declared date; the filename prefix is the
           fallback for posts that omit it. */
        var date = '';
        if (isoDate(data.date)) {
            date = isoDate(data.date);
        } else {
            var slugDate = /^(\d{4}-\d{2}-\d{2})/.exec(slug);
            date = slugDate ? slugDate[1] : '';
        }

        return {
            slug: slug,
            title: title,
            content: content,
            excerpt: excerpt,
            date: date,
            tags: parseTags(data.tags),
            url: 'post.html?post=' + encodeURIComponent(slug),
            canonical: SITE_ORIGIN + '/post.html?post=' + encodeURIComponent(slug)
        };
    }

    /* ------------------------------------------------------------------ *
     * Markdown rendering (sanitised)
     * ------------------------------------------------------------------ */

    var hooksInstalled = false;

    function installPurifyHooks() {
        if (hooksInstalled || typeof global.DOMPurify === 'undefined') {
            return;
        }
        global.DOMPurify.addHook('afterSanitizeAttributes', function (node) {
            if (node.nodeName === 'A' && node.hasAttribute('href')) {
                var href = node.getAttribute('href') || '';
                if (/^https?:/i.test(href) && href.indexOf(global.location.origin) !== 0) {
                    node.setAttribute('target', '_blank');
                    node.setAttribute('rel', 'noopener noreferrer');
                }
            }
            if (node.nodeName === 'IMG') {
                node.setAttribute('loading', 'lazy');
                node.setAttribute('decoding', 'async');
                if (!node.hasAttribute('alt')) {
                    node.setAttribute('alt', '');
                }
            }
        });
        hooksInstalled = true;
    }

    /*
     * marked passes raw HTML in the source straight through, so its output
     * is untrusted. Fail closed: if DOMPurify has not loaded we refuse to
     * render rather than injecting unsanitised markup.
     */
    function renderMarkdown(markdown) {
        if (typeof global.marked === 'undefined') {
            throw new Error('Markdown renderer unavailable');
        }
        if (typeof global.DOMPurify === 'undefined') {
            throw new Error('HTML sanitiser unavailable');
        }
        installPurifyHooks();
        return global.DOMPurify.sanitize(global.marked.parse(markdown), {
            USE_PROFILES: { html: true },
            ADD_ATTR: ['target']
        });
    }

    /* ------------------------------------------------------------------ *
     * Loading
     * ------------------------------------------------------------------ */

    function normaliseIndex(payload) {
        var entries = Array.isArray(payload)
            ? payload
            : (payload && Array.isArray(payload.posts) ? payload.posts : []);

        var seen = Object.create(null);
        return entries
            .map(function (entry) {
                if (typeof entry === 'string') {
                    return entry.trim().replace(/\.md$/, '');
                }
                if (entry && typeof entry.slug === 'string') {
                    return entry.slug.trim().replace(/\.md$/, '');
                }
                return '';
            })
            .filter(function (slug) {
                if (!SLUG_PATTERN.test(slug) || seen[slug]) {
                    return false;
                }
                seen[slug] = true;
                return true;
            });
    }

    /* A stalled connection should land in the error state with a retry, not
       spin the skeleton forever. */
    var REQUEST_TIMEOUT = 15000;

    function fetchWithTimeout(url) {
        var options = { cache: 'no-cache' };
        if (typeof AbortController === 'undefined') {
            return fetch(url, options);
        }
        var controller = new AbortController();
        var timer = global.setTimeout(function () {
            controller.abort();
        }, REQUEST_TIMEOUT);
        options.signal = controller.signal;
        return fetch(url, options).then(function (response) {
            global.clearTimeout(timer);
            return response;
        }, function (error) {
            global.clearTimeout(timer);
            throw error;
        });
    }

    var indexPromise = null;

    /* The allowlist. blog.html uses it to know what to list; post.html uses
       it to decide whether a `?post=` value is allowed anywhere near fetch(). */
    function loadIndex() {
        if (!indexPromise) {
            indexPromise = fetchWithTimeout(INDEX_URL)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Failed to load post index (' + response.status + ')');
                    }
                    return response.json();
                })
                .then(normaliseIndex)
                .catch(function (error) {
                    indexPromise = null;
                    throw error;
                });
        }
        return indexPromise;
    }

    function isAllowedSlug(slug, allowlist) {
        return typeof slug === 'string'
            && SLUG_PATTERN.test(slug)
            && allowlist.indexOf(slug) !== -1;
    }

    function loadPost(slug) {
        return loadIndex().then(function (allowlist) {
            if (!isAllowedSlug(slug, allowlist)) {
                throw PostNotFoundError(slug);
            }
            return fetchWithTimeout(POSTS_DIR + encodeURIComponent(slug) + '.md')
                .then(function (response) {
                    if (response.status === 404 || response.status === 410) {
                        throw PostNotFoundError(slug);
                    }
                    if (!response.ok) {
                        throw new Error('Failed to load ' + slug + ' (' + response.status + ')');
                    }
                    return response.text();
                })
                .then(function (markdown) {
                    return parseMarkdownPost(markdown, slug);
                });
        });
    }

    function sortPosts(posts) {
        return posts.slice().sort(function (a, b) {
            if (a.date !== b.date) {
                return a.date < b.date ? 1 : -1;
            }
            /* Deterministic tie-break so equal dates never reshuffle. */
            return a.slug < b.slug ? 1 : (a.slug > b.slug ? -1 : 0);
        });
    }

    /* One request per post, so keep the fan-out bounded: firing all of them
       at once makes servers reset connections and silently drops articles. */
    var MAX_CONCURRENT_POSTS = 6;

    function mapWithLimit(items, limit, worker) {
        var results = new Array(items.length);
        var next = 0;

        function run() {
            if (next >= items.length) {
                return Promise.resolve();
            }
            var index = next;
            next += 1;
            return worker(items[index]).then(function (value) {
                results[index] = value;
                return run();
            });
        }

        var runners = [];
        for (var i = 0; i < Math.min(limit, items.length); i += 1) {
            runners.push(run());
        }
        return Promise.all(runners).then(function () {
            return results;
        });
    }

    /*
     * Resolves to every post that loaded, newest first. A single bad file is
     * skipped; a total failure rejects so the page can show the network
     * error instead of an empty "no posts yet" state.
     */
    function loadAllPosts() {
        return loadIndex().then(function (allowlist) {
            if (allowlist.length === 0) {
                return [];
            }
            return mapWithLimit(allowlist, MAX_CONCURRENT_POSTS, function (slug) {
                return loadPost(slug).catch(function (error) {
                    console.warn('Skipping post "' + slug + '":', error.message);
                    return null;
                });
            }).then(function (results) {
                var posts = results.filter(Boolean);
                if (posts.length === 0) {
                    throw new Error('No posts could be loaded');
                }
                return sortPosts(posts);
            });
        });
    }

    /* ------------------------------------------------------------------ *
     * Head / metadata
     * ------------------------------------------------------------------ */

    function setMetaContent(selector, value) {
        var node = document.head.querySelector(selector);
        if (node) {
            node.setAttribute('content', value);
        }
    }

    function setCanonical(href) {
        var link = document.head.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', href);
    }

    /* JSON.stringify can emit "</script>" and U+2028/9, which break out of a
       <script> element. textContent plus these escapes keeps it inert. */
    function addJsonLd(data) {
        /* Idempotent: a re-render replaces its block instead of stacking one. */
        var previous = document.head.querySelector('script[data-tlp-jsonld]');
        if (previous) {
            previous.remove();
        }
        var script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-tlp-jsonld', '');
        script.textContent = JSON.stringify(data)
            .replace(/</g, '\\u003c')
            .replace(/\u2028/g, '\\u2028')
            .replace(/\u2029/g, '\\u2029');
        document.head.appendChild(script);
    }

    /* ------------------------------------------------------------------ *
     * Shared UI behaviour
     * ------------------------------------------------------------------ */

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /* The hamburger lives in nav.js, which every page loads and which
       initialises itself. Smooth-scroll for in-page anchors lives there too
       now, self-initialised the same way. */

    /* Header animation, skipped entirely under reduced motion. */
    function animateHeader(selectors) {
        if (prefersReducedMotion() || typeof global.gsap === 'undefined') {
            return;
        }
        if (global.ScrollTrigger && global.gsap.registerPlugin) {
            global.gsap.registerPlugin(global.ScrollTrigger);
        }
        selectors.forEach(function (item, index) {
            if (!document.querySelector(item)) {
                return;
            }
            global.gsap.from(item, {
                opacity: 0,
                y: 24,
                duration: 0.7,
                delay: index * 0.12,
                ease: 'power2.out'
            });
        });
    }

    global.TLP = {
        SITE_ORIGIN: SITE_ORIGIN,
        SLUG_PATTERN: SLUG_PATTERN,
        formatDate: formatDate,
        isoDate: isoDate,
        markdownToPlainText: markdownToPlainText,
        parseMarkdownPost: parseMarkdownPost,
        renderMarkdown: renderMarkdown,
        loadIndex: loadIndex,
        loadPost: loadPost,
        loadAllPosts: loadAllPosts,
        isNotFound: isNotFound,
        setMetaContent: setMetaContent,
        setCanonical: setCanonical,
        addJsonLd: addJsonLd,
        prefersReducedMotion: prefersReducedMotion,
        animateHeader: animateHeader
    };
}(window));
