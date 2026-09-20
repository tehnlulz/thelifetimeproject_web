/*
 * Shared site navigation.
 *
 * Every page loads this as `<script src="nav.js" defer></script>` and gets the
 * same hamburger behaviour. It self-initialises and exports nothing: a page
 * only has to ship the canonical markup (#nav-toggle + #mobile-menu).
 *
 * The menu is a block below the fixed header rather than an overlay, so the
 * body never needs a scroll lock — nothing here touches `overflow` or the
 * scroll position, which is what used to make the page jump on open/close.
 */
(function (global) {
    'use strict';

    /* Matches the `@media (min-width: 1024px)` in styles.css that hides the
       toggle and shows the desktop link row. Keep the two in step. */
    var DESKTOP_QUERY = '(min-width: 1024px)';

    function initMobileNav() {
        var toggle = document.getElementById('nav-toggle');
        var menu = document.getElementById('mobile-menu');
        if (!toggle || !menu) {
            return;
        }

        var icon = toggle.querySelector('i');

        function isOpen() {
            return toggle.getAttribute('aria-expanded') === 'true';
        }

        function setOpen(open) {
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            menu.classList.toggle('is-open', open);
            if (icon) {
                /* Both class strings are literals so a future Tailwind build
                   step can still see every class this file can produce. */
                icon.className = open ? 'fas fa-times' : 'fas fa-bars';
            }
        }

        toggle.addEventListener('click', function () {
            setOpen(!isOpen());
        });

        /* A link click closes the menu but never calls preventDefault, so the
           page's own smooth-scroll handler still gets the event. */
        menu.addEventListener('click', function (event) {
            if (event.target.closest && event.target.closest('a')) {
                setOpen(false);
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && isOpen()) {
                setOpen(false);
                toggle.focus();
            }
        });

        document.addEventListener('click', function (event) {
            if (isOpen() && !menu.contains(event.target) && !toggle.contains(event.target)) {
                setOpen(false);
            }
        });

        /* Crossing into desktop hides the menu via CSS; without this the
           toggle would still report aria-expanded="true" to a screen reader
           and the menu would reappear on the way back down. */
        if (global.matchMedia) {
            var desktop = global.matchMedia(DESKTOP_QUERY);
            var onChange = function (event) {
                if (event.matches) {
                    setOpen(false);
                }
            };
            desktop.addEventListener('change', onChange);
        }

        /* Normalises the markup's starting state (aria-expanded, label, icon)
           however the page authored it. */
        setOpen(false);
    }

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    var NATIVELY_FOCUSABLE = /^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/;

    function focusScrollTarget(element) {
        if (!NATIVELY_FOCUSABLE.test(element.tagName) && !element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '-1');
        }
        try {
            element.focus({ preventScroll: true });
        } catch (error) {
            element.focus();
        }
    }

    /*
     * Smooth-scroll for in-page anchors, shared by every page. Delegated so
     * in-page links added later behave the same way. The mobile menu's own
     * click handler above never calls preventDefault on a link click, so
     * that handler and this one compose: the menu closes and the page still
     * scrolls.
     */
    function initSmoothScroll() {
        document.addEventListener('click', function (event) {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            var anchor = event.target.closest && event.target.closest('a[href^="#"]');
            if (!anchor) return;

            var hash = anchor.getAttribute('href');
            // "#" alone is a placeholder - leave it to the browser.
            if (!hash || hash === '#') return;

            var target = document.getElementById(hash.slice(1));
            if (!target) {
                try {
                    target = document.querySelector(hash);
                } catch (error) {
                    return; // not a valid selector, e.g. "#1-thing"
                }
            }
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                block: 'start'
            });
            focusScrollTarget(target);
        });
    }

    /* `defer` normally means the document is still parsing when this runs, but
       the file is also safe to load any other way. */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initMobileNav();
            initSmoothScroll();
        }, { once: true });
    } else {
        initMobileNav();
        initSmoothScroll();
    }
}(window));
