/* The Lifetime Project - site interactions.
 *
 * Sections, in order:
 *   1. Character data
 *   2. Shared helpers
 *   3. Conversation rendering
 *   4. Character selection
 *   5. 3D physics scene
 *   6. Smooth scrolling
 *   7. Scroll animations (GSAP)
 *   8. Email modal
 *   9. Init
 *
 * Everything lives inside one IIFE - the page needs no globals from this file.
 */
(function () {
    'use strict';

    // =====================================================================
    // 1. Character data
    // =====================================================================

    const charactersData = {
        jake: {
            name: "Jake",
            age: 34,
            role: "Marketing Director",
            tagline: "New Dad",
            image: "assets/images/jake.png",
            goal: "Reconnecting with his wife after baby",
            color: "#E2B93B",
            borderColor: "#E2B93B",
            protocol: {
                name: "BREATHE Protocol",
                icon: "fa-lungs",
                steps: [
                    "Breathe - Take 3 deep belly breaths before speaking",
                    "Recognize - Name what you're feeling inside",
                    "Express - Use 'I feel...' statements, stay vulnerable"
                ],
                tip: "Don't rush. Hold eye contact. Let silence happen."
            },
            conversations: {
                morning: [
                    { type: "marcus", text: "Morning Jake. Sarah mentioned you two haven't connected much lately. What's really going on?" },
                    { type: "you", text: "I don't know how to be vulnerable with her anymore. I just talk about logistics - diapers, feeding schedules." },
                    { type: "marcus", text: "You're word-vomiting to avoid feeling. Try this: The BREATHE protocol. Your anxious attachment is making you chase connection by over-talking." },
                    { type: "you", text: "I always do that. I just word-vomit when I'm nervous. What's BREATHE?" },
                    { type: "marcus", text: "It's your emergency brake. B-R-E-A-T-H-E: Belly breath 3 times, Recognize the emotion, Express using 'I feel', Allow silence, Take your time, Hold eye contact, Exit if overwhelmed. Practice on me. What are you feeling right now?" }
                ],
                midday: [
                    { type: "marcus", text: "How's the vulnerability practice going? Used BREATHE yet?" },
                    { type: "you", text: "Tried at breakfast. Started explaining why I was late getting home, caught myself mid-ramble." },
                    { type: "marcus", text: "Good catch. What happened when you stopped?" },
                    { type: "you", text: "Silence. Terrifying silence. Then Sarah said 'I just miss you.' I almost cried." },
                    { type: "marcus", text: "That's the doorway. Your over-explaining blocks intimacy. Tonight's date night - can you share one real fear?" }
                ],
                moment: {
                    time: "7:30 PM",
                    title: "Jake's Vulnerability Practice",
                    dialogue: [
                        { type: "boss", name: "Sarah", text: "This is nice. First time we've been out in months." },
                        { type: "you", text: "Sarah, I need to share something. I feel scared we're losing each other.", note: "[3 deep breaths, maintaining eye contact]" },
                        { type: "boss", name: "Sarah", text: "Losing each other? Jake, I'm the one home all day with the baby while you—" },
                        { type: "you", text: "I hear you're overwhelmed. I feel it too. I miss us - not just as parents, but as partners. I miss laughing with you, touching you without it being about the baby.", note: "[Staying present despite defensive response]" },
                        { type: "boss", name: "Sarah", text: "When would we even have time for that? The baby needs—" },
                        { type: "you", text: "What I need is for us to be a priority too. Even 10 minutes a day where we're Jake and Sarah, not just mom and dad. I'm scared if we don't fight for us now, we'll wake up as strangers." }
                    ],
                    outcome: "The conversation continues for another hour. Real tears. Real connection. They agree: 10 minutes every evening, phones down, just them. Sarah reaches across the table, takes his hand. 'I miss you too.' The BREATHE protocol didn't just help Jake speak - it helped him listen. For the first time in months, they both feel seen."
                }
            },
            evening: {
                breakthrough: "For the first time in months, Jake feels connected to Sarah. His vulnerability opened a door they both needed.",
                achievement: "Share one fear with Sarah",
                nextStep: "Tomorrow's practice will build on tonight's connection"
            }
        },
        andy: {
            name: "Andy",
            age: 38,
            role: "Tech Lead",
            tagline: "Tech Lead",
            image: "assets/images/andy.png",
            goal: "Asking for the raise he deserves",
            color: "#47B5A5",
            borderColor: "#47B5A5",
            protocol: {
                name: "WORTH Framework",
                icon: "fa-chart-line",
                steps: [
                    "Write your achievements (data, not feelings)",
                    "Own your impact (specific business outcomes)",
                    "Request with confidence (no minimizing)",
                    "Take up space (power pose before)",
                    "Hold the silence (after stating your number)"
                ],
                tip: "Your avoidant attachment makes you minimize achievements. Fight it with facts."
            },
            conversations: {
                morning: [
                    { type: "marcus", text: "Andy, you've been putting off this raise conversation for two years. What's the real fear?" },
                    { type: "you", text: "They already pay me well. Maybe I should wait until next quarter when—" },
                    { type: "marcus", text: "There it is. The avoidant pattern. You're negotiating against yourself before you even start. What did you actually deliver this year?" },
                    { type: "you", text: "I mean, I rebuilt the payment system. Reduced processing time by 70%. But the whole team—" },
                    { type: "marcus", text: "Stop. You led that project. You saved them $2M annually. Time to claim your space. I want you to do something that'll feel weird: Stand up, take a power pose for 2 minutes. Yes, now." }
                ],
                midday: [
                    { type: "marcus", text: "Meeting's in an hour. How are you feeling after the power pose practice?" },
                    { type: "you", text: "Ridiculous. But also... different? I keep wanting to lower my ask from 25% to 15%." },
                    { type: "marcus", text: "There's the avoidant pattern - pre-negotiating against yourself. What did your research show?" },
                    { type: "you", text: "Market rate is 120-150k. I'm at 100k. So 25% gets me to 125k - still below market." },
                    { type: "marcus", text: "Facts, not feelings. You're asking for BELOW market rate for someone with your impact. Time for another power pose. And Andy? No apologizing. Not once." }
                ],
                moment: {
                    time: "2:00 PM",
                    title: "Andy's Salary Negotiation",
                    dialogue: [
                        { type: "boss", name: "Manager", text: "So Andy, you wanted to discuss compensation?" },
                        { type: "you", text: "Yes. I've been looking at my contributions this year. The payment system rebuild alone saved the company $2M annually. I'm requesting a 25% increase.", note: "[No apologies, stating facts]" },
                        { type: "boss", name: "Manager", text: "25%? That's... significant. The payment system was a team effort—" },
                        { type: "you", text: "You're right, it was a team effort. I led that team. Based on market rates for technical leads with my impact, I'm asking for a 25% increase.", note: "[Strategic pause - 5 seconds of silence]" },
                        { type: "boss", name: "Manager", text: "25%? That's... Andy, be realistic. I could maybe do 10%—" },
                        { type: "you", text: "I've done my research. Technical leads at my level are earning 20-30% more. I'm asking for the lower end of market rate. I believe 25% reflects my value.", note: "[Broken record - calmly restating]" }
                    ],
                    outcome: "Andy's old self would have accepted the first 'no.' But Marcus's training kicks in. Every pushback, he responds with calm facts. No apologies, no minimizing. His manager tries three different angles to reduce the ask. Andy holds firm, using the broken record technique. The power pose wasn't just physical - it rewired his sense of worth. The conversation ends at 22% with a 6-month review for the rest."
                }
            },
            evening: {
                breakthrough: "Andy learned that claiming space isn't aggressive - it's necessary. His worth isn't determined by others' recognition, but by his courage to ask.",
                achievement: "Ask for the raise I deserve",
                nextStep: "Tomorrow's practice will build on this newfound assertiveness"
            }
        },
        adam: {
            name: "Adam",
            age: 31,
            role: "Operations Manager",
            tagline: "Searching",
            image: "assets/images/adam.png",
            goal: "Finding his true purpose beyond the paycheck",
            color: "#E2B93B",
            borderColor: "#E2B93B",
            protocol: {
                name: "PURPOSE Protocol",
                icon: "fa-compass",
                steps: [
                    "Pause - Stop the autopilot. What am I really doing here?",
                    "Uncover - What lights me up? When do I lose track of time?",
                    "Reframe - How can I bring more of that into my current role?"
                ],
                tip: "Purpose isn't found, it's built daily through aligned actions."
            },
            conversations: {
                morning: [
                    { type: "marcus", text: "Adam, you've hit every career milestone by 31. Six figures, nice car, respect. So why do you feel empty?" },
                    { type: "you", text: "I don't know. I should be happy. I have everything I'm supposed to want." },
                    { type: "marcus", text: "'Supposed to want' - there's your prison. You're living someone else's definition of success. When was the last time you felt truly alive at work?" },
                    { type: "you", text: "Honestly? When I was training the new hires last month. Time just flew." },
                    { type: "marcus", text: "That's data. You light up when developing others. Let's try the PURPOSE protocol. This morning, journal for 10 minutes: 'When I feel most alive...'. No editing, just write." }
                ],
                midday: [
                    { type: "marcus", text: "Adam, how's the PURPOSE clarity exercise going? Found any patterns in what energizes you?" },
                    { type: "you", text: "I wrote for 10 minutes like you said. All my 'alive' moments involve mentoring junior team members." },
                    { type: "marcus", text: "There it is. You're not just managing operations - you're developing people. What would happen if you made that 20% of your role?" },
                    { type: "you", text: "But I'm paid to optimize processes, not teach people..." },
                    { type: "marcus", text: "That's the trap talking. Purpose isn't about abandoning responsibility - it's about expanding it. Start small. One lunch mentoring session this week. Track how it affects your energy for the rest of the day." }
                ],
                moment: {
                    time: "3:00 PM",
                    title: "Adam's Purpose Pivot",
                    dialogue: [
                        { type: "boss", name: "Manager", text: "Adam, can you join the new hire onboarding? I know it's not your job but—" },
                        { type: "you", text: "Actually, I'd love to. I've been thinking about proposing a mentorship program. Could we discuss making development part of my official responsibilities?", note: "[Turning obligation into opportunity]" },
                        { type: "boss", name: "Manager", text: "A mentorship program? That's... actually not a bad idea. But who would run it?" },
                        { type: "you", text: "I would. I've already sketched out a framework. It would improve retention, speed up onboarding, and honestly - it's where I feel most valuable.", note: "[Speaking truth about what matters]" },
                        { type: "boss", name: "Manager", text: "You've thought this through. Send me the proposal. If it's solid, we'll pilot it next quarter." }
                    ],
                    outcome: "Adam spent years climbing the 'success' ladder only to realize it was leaning against the wrong wall. But Marcus helped him see: you don't need to burn it all down. Sometimes purpose is about reshaping your current role to align with who you're becoming. By speaking up about what truly energized him, Adam created a new path within his existing career."
                }
            },
            evening: {
                breakthrough: "For the first time in years, Adam went home energized. Not from hitting KPIs, but from creating a path where success and meaning intersect.",
                achievement: "Find one way to align work with purpose",
                nextStep: "Tomorrow: Draft the mentorship program proposal (with excitement, not obligation)"
            }
        },
        jason: {
            name: "Jason",
            age: 29,
            role: "Sales Associate",
            tagline: "Stuck",
            image: "assets/images/jason.png",
            goal: "Breaking through procrastination and staying consistent",
            color: "#47B5A5",
            borderColor: "#47B5A5",
            protocol: {
                name: "Momentum Stack",
                icon: "fa-bolt",
                steps: [
                    "2-Minute Rule - If it takes less than 2 minutes, do it NOW",
                    "Friction Barriers - Make bad habits harder than good ones",
                    "Progress Tracking - Visual proof beats mental gymnastics"
                ],
                tip: "Consistency isn't perfection. It's showing up more than you don't."
            },
            conversations: {
                morning: [
                    { type: "marcus", text: "Jason, your potential is being hijacked by your dopamine system. How many tabs do you have open right now?" },
                    { type: "you", text: "...47. But I need them all for—" },
                    { type: "marcus", text: "No, you need the dopamine hit from switching between them. Your brain is addicted to the search, not the find. Close 45 of them. Now." },
                    { type: "you", text: "Done. That was harder than it should've been." },
                    { type: "marcus", text: "That resistance? That's your brain fighting for its drug. Today we break the cycle. First tool: The 2-minute rule. If a task takes less than 2 minutes, you do it immediately. No list, no planning, just execution." }
                ],
                midday: [
                    { type: "marcus", text: "Jason, quick check. How many 2-minute tasks have you knocked out today?" },
                    { type: "you", text: "Three emails, updated my CRM notes, called that lead back. Felt weird not overthinking it." },
                    { type: "marcus", text: "That 'weird' feeling? That's your dopamine system recalibrating. You're training it to reward completion, not perfection." },
                    { type: "you", text: "I keep wanting to scroll Instagram instead of doing the next task though..." },
                    { type: "marcus", text: "Friction time. When you feel that urge, do 5 pushups first. If you still want to scroll after, go ahead. But that physical barrier will break the automatic pattern. Your brain hates effort more than it loves dopamine." }
                ],
                moment: {
                    time: "4:30 PM",
                    title: "Jason's Consistency Breakthrough",
                    dialogue: [
                        { type: "boss", name: "Manager", text: "Jason, your numbers this week... what happened? You're up 40%." },
                        { type: "you", text: "I stopped overthinking. Started doing all the small stuff immediately. Turns out half my 'big projects' were just 2-minute tasks I was avoiding." },
                        { type: "boss", name: "Manager", text: "This is the Jason I hired. What changed?" },
                        { type: "you", text: "I put my phone in a drawer. Set up friction between me and distractions. And I track everything - seeing those green checkmarks is addictive.", note: "[Building systems, not relying on willpower]" },
                        { type: "you", text: "Also did 35 pushups today. Every time I wanted to scroll, I did 5 instead. My chest is sore but my pipeline is full." }
                    ],
                    outcome: "Jason's breakthrough wasn't dramatic - it was systematic. By breaking the dopamine loop of endless scrolling and replacing it with immediate action, he discovered something profound: momentum is a choice you make every 2 minutes. His manager noticed. His commission check will too. But more importantly, Jason proved to himself that consistency isn't a personality trait - it's a skill you build one small win at a time."
                }
            },
            evening: {
                breakthrough: "Jason closed his laptop with 17 completed tasks. A month ago, he'd have 17 open tabs. The difference? He stopped negotiating with himself and started executing.",
                achievement: "Complete 5 tasks daily using 2-minute rule",
                nextStep: "Tomorrow: Same system, bigger momentum (and maybe fewer pushups)"
            }
        }
    };

    // Characters currently rendered into the timeline.
    let activeCharacters = [];

    // =====================================================================
    // 2. Shared helpers
    // =====================================================================

    const COLLEAGUE_IMAGE = 'assets/images/colleague.jpg';
    const WIFE_IMAGE = 'assets/images/wife.png';
    const MOBILE_BREAKPOINT = 768;

    function isMobileViewport() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Appends an alpha channel to a 6-digit hex colour, e.g. withAlpha('#E2B93B', 0.1)
    // -> '#E2B93B1a'. Keeps tinted backgrounds out of runtime-built Tailwind classes.
    function withAlpha(hex, alpha) {
        const clamped = Math.max(0, Math.min(1, alpha));
        return hex + Math.round(clamped * 255).toString(16).padStart(2, '0');
    }

    function onReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback, { once: true });
        } else {
            callback();
        }
    }

    // =====================================================================
    // 3. Conversation rendering
    // =====================================================================

    function renderConversationBubble(message, character) {
        const characterData = charactersData[character];
        if (!characterData) return '';

        if (message.type === 'marcus') {
            return `
            <div class="conversation-bubble marcus">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#E2B93B]/20 to-[#47B5A5]/20 flex items-center justify-center flex-shrink-0" style="border: 2px solid ${characterData.borderColor}50;">
                        <i class="fas fa-robot text-sm" style="color: ${characterData.color};"></i>
                    </div>
                    <div>
                        <p class="text-white text-base">${message.text}</p>
                    </div>
                </div>
            </div>
        `;
        }

        if (message.type === 'you') {
            return `
            <div class="conversation-bubble you">
                <div class="flex items-start gap-3 flex-row-reverse">
                    <img src="${characterData.image}" alt="${characterData.name}" class="w-10 h-10 rounded-full flex-shrink-0" style="border: 2px solid ${characterData.borderColor}50;">
                    <div>
                        <p class="text-white text-base">${message.text}</p>
                        ${message.note ? `<p class="text-xs text-gray-400 mt-1 italic">${message.note}</p>` : ''}
                    </div>
                </div>
            </div>
        `;
        }

        if (message.type === 'boss') {
            // Only Jake's partner has her own portrait; everyone else gets the colleague.
            const image = (character === 'jake' && message.name === 'Sarah') ? WIFE_IMAGE : COLLEAGUE_IMAGE;

            return `
            <div class="conversation-bubble boss">
                <div class="flex items-start gap-3">
                    <img src="${image}" alt="${message.name || 'Manager'}" class="w-10 h-10 rounded-full border-2 border-[#E2B93B]/50">
                    <div>
                        <p class="text-white text-base">${message.text}</p>
                    </div>
                </div>
            </div>
        `;
        }

        return '';
    }

    // Clears a timeline container and hands back the characters to render into it.
    function prepareContainer(selector) {
        const container = document.querySelector(selector);
        if (!container) return null;

        container.innerHTML = '';
        return activeCharacters.length ? container : null;
    }

    function renderMorningConversations() {
        const container = prepareContainer('.morning-conversations');
        if (!container) return;

        activeCharacters.forEach(key => {
            const character = charactersData[key];
            if (!character) return;

            const morningDiv = document.createElement('div');
            morningDiv.className = 'moment-content timeline-character';
            morningDiv.setAttribute('data-character', key);

            const conversationHTML = character.conversations.morning
                .map(msg => renderConversationBubble(msg, key))
                .join('');

            morningDiv.innerHTML = `
            <h4 class="text-xl font-bold text-white mb-4 flex items-center">
                <span class="mr-3" style="color: ${character.color};">${character.name}</span>
                <span class="text-sm font-normal text-gray-400">Learning the ${character.protocol.name}</span>
            </h4>
            <div class="space-y-3">
                ${conversationHTML}
            </div>
            <div class="mt-6 rounded-lg p-4" style="background-color: ${withAlpha(character.color, 0.1)}; border: 1px solid ${withAlpha(character.color, 0.3)};">
                <p class="font-semibold text-sm mb-2" style="color: ${character.color};">
                    <i class="fas ${character.protocol.icon} mr-2"></i>${character.protocol.name}
                </p>
                <ul class="text-gray-300 text-sm space-y-1">
                    ${character.protocol.steps.map(step => `<li>• ${step}</li>`).join('')}
                </ul>
                ${character.protocol.tip ? `<p class="text-xs text-gray-400 mt-2 italic">${character.protocol.tip}</p>` : ''}
            </div>
        `;

            container.appendChild(morningDiv);
        });
    }

    function renderMiddayConversations() {
        const container = prepareContainer('.midday-conversations');
        if (!container) return;

        activeCharacters.forEach(key => {
            const character = charactersData[key];
            if (!character) return;

            const middayDiv = document.createElement('div');
            middayDiv.className = 'moment-content timeline-character';
            middayDiv.setAttribute('data-character', key);

            const conversationHTML = character.conversations.midday
                .map(msg => renderConversationBubble(msg, key))
                .join('');

            middayDiv.innerHTML = `
            <div class="space-y-4">
                ${conversationHTML}
                ${renderProgressTracker(character, key)}
            </div>
        `;

            container.appendChild(middayDiv);
        });
    }

    function renderMomentConversations() {
        const container = prepareContainer('.moment-conversations');
        if (!container) return;

        activeCharacters.forEach(key => {
            const character = charactersData[key];
            if (!character) return;

            const moment = character.conversations.moment;
            const momentDiv = document.createElement('div');
            momentDiv.className = 'moment-content timeline-character';
            momentDiv.setAttribute('data-character', key);

            const dialogueHTML = moment.dialogue
                .map(msg => renderConversationBubble(msg, key))
                .join('');

            momentDiv.innerHTML = `
            <h4 class="text-xl font-bold text-white mb-4 flex items-center">
                <span class="mr-3" style="color: ${character.color};">${moment.time}</span>
                <span class="text-sm font-normal text-gray-400">${moment.title}</span>
            </h4>
            <div class="rounded-lg p-4 mb-4" style="background-color: ${withAlpha(character.color, 0.1)}; border: 1px solid ${withAlpha(character.color, 0.3)};">
                <p class="text-sm text-gray-300 mb-3">
                    <i class="fas ${character.protocol.icon} mr-2" style="color: ${character.color};"></i>
                    <strong>${character.name}'s using the ${character.protocol.name}:</strong>
                </p>
                <ul class="text-sm text-gray-400 space-y-2 ml-6">
                    ${character.protocol.steps.map(step => `<li>${step}</li>`).join('')}
                </ul>
                <p class="text-xs text-gray-400 mt-2 ml-6 italic">
                    Key: ${character.protocol.tip}
                </p>
            </div>
            <div class="space-y-3">
                ${dialogueHTML}
            </div>
            <p class="text-gray-300 mt-6 text-sm">
                ${moment.outcome}
            </p>
        `;

            container.appendChild(momentDiv);
        });
    }

    const EVENING_HEADINGS = {
        jake: 'Breakthrough',
        andy: 'Assertiveness Win',
        adam: 'Purpose Alignment',
        jason: 'Momentum Victory'
    };

    function renderEveningConversations() {
        const container = prepareContainer('.evening-conversations');
        if (!container) return;

        activeCharacters.forEach(key => {
            const character = charactersData[key];
            if (!character) return;

            const evening = character.evening;
            const eveningDiv = document.createElement('div');
            eveningDiv.className = 'moment-content timeline-character';
            eveningDiv.setAttribute('data-character', key);

            eveningDiv.innerHTML = `
            <h4 class="text-xl font-bold text-white mb-4">
                <span style="color: ${character.color};">${character.name}'s ${EVENING_HEADINGS[key] || 'Momentum Victory'}</span>
            </h4>
            <p class="text-gray-300 mb-4">
                ${evening.breakthrough}
            </p>
            <div class="rounded-lg p-4" style="background-color: ${withAlpha(character.color, 0.1)}; border: 1px solid ${withAlpha(character.color, 0.3)};">
                <p class="text-white text-sm">
                    <i class="fas fa-check-circle mr-2" style="color: ${character.color};"></i>
                    Weekly goal achieved: "${evening.achievement}"
                </p>
                <p class="text-gray-400 text-xs mt-2">
                    ${evening.nextStep}
                </p>
            </div>
        `;

            container.appendChild(eveningDiv);
        });
    }

    function renderProgressTracker(character, key) {
        const tint = withAlpha(character.color, 0.1);
        const edge = withAlpha(character.color, 0.3);

        if (key === 'jake') {
            return `
            <div class="rounded-lg p-4 mt-4" style="background-color: ${tint}; border: 1px solid ${edge};">
                <p class="text-white text-sm mb-2">
                    <i class="fas fa-heart mr-2" style="color: ${character.color};"></i>
                    <strong>Tonight's goal:</strong> Share one real fear with Sarah
                </p>
                <p class="text-gray-400 text-xs">Progress: Vulnerability muscles warming up</p>
            </div>
        `;
        }

        if (key === 'andy') {
            return `
            <div class="info-box rounded-lg p-4 mt-4" style="background-color: ${tint}; border: 1px solid ${edge};">
                <p class="text-white text-sm">
                    <i class="fas fa-chart-line mr-2" style="color: ${character.color};"></i>
                    <strong>Final prep:</strong> WORTH script reviewed, power pose completed
                </p>
            </div>
        `;
        }

        if (key === 'adam') {
            return `
            <div class="purpose-tracker rounded-lg p-4 mt-4" style="background-color: ${tint}; border: 1px solid ${edge};">
                <p class="text-white text-sm mb-2">
                    <i class="fas fa-compass mr-2" style="color: ${character.color};"></i>
                    <strong>Purpose Alignment Check:</strong>
                </p>
                <p class="text-gray-400 text-sm">
                    Morning energy: 4/10 (spreadsheets and KPIs)<br>
                    After mentoring discussion: 8/10 (felt like real impact)
                </p>
            </div>
        `;
        }

        if (key === 'jason') {
            const chip = withAlpha(character.color, 0.2);
            return `
            <div class="habit-tracker rounded-lg p-4 mt-4" style="background-color: ${tint}; border: 1px solid ${edge};">
                <p class="text-white text-sm mb-2">
                    <i class="fas fa-tasks mr-2" style="color: ${character.color};"></i>
                    <strong>Momentum Building:</strong>
                </p>
                <!-- text-gray-100, not inherited ink: these chips sit on a
                     translucent tint over the navy timeline, where the body's
                     #1F2937 was effectively invisible (about 1:1). -->
                <div class="flex flex-wrap gap-2 text-xs text-gray-100">
                    <span class="px-2 py-1 rounded" style="background-color: ${chip};">✓ Email client</span>
                    <span class="px-2 py-1 rounded" style="background-color: ${chip};">✓ Update CRM</span>
                    <span class="px-2 py-1 rounded" style="background-color: ${chip};">✓ Return call</span>
                </div>
                <p class="text-gray-400 text-xs mt-2">
                    Procrastination cycles broken: 3 | Dopamine hits earned: 3
                </p>
            </div>
        `;
        }

        return '';
    }

    function renderAllConversations() {
        renderMorningConversations();
        renderMiddayConversations();
        renderMomentConversations();
        renderEveningConversations();

        // Freshly rendered bubbles are invisible until a scroll trigger reveals them.
        if (!scrollAnimationsAvailable()) revealTimelineWithoutAnimation();
    }

    // =====================================================================
    // 4. Character selection
    // =====================================================================

    // The visitor's explicit pick, if they have made one. Desktop keeps its own
    // random pair in activeCharacters, so the two are tracked separately.
    let selectedCharacter = null;

    // Marks whoever is actually on screen, so the carousel is never unlabelled.
    function applyActiveButtons() {
        const marked = selectedCharacter ? [selectedCharacter] : activeCharacters;
        document.querySelectorAll('.character-select-btn').forEach(btn => {
            btn.classList.toggle('active', marked.includes(btn.getAttribute('data-character')));
        });
    }

    // Brings the chosen button fully into the carousel without moving the page.
    function centreButtonInCarousel(button) {
        const carousel = button && button.closest('.character-carousel');
        if (!carousel) return;

        const buttonRect = button.getBoundingClientRect();
        const carouselRect = carousel.getBoundingClientRect();
        const delta = (buttonRect.left + buttonRect.width / 2) - (carouselRect.left + carouselRect.width / 2);
        const left = carousel.scrollLeft + delta;

        if (typeof carousel.scrollTo === 'function') {
            carousel.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        } else {
            carousel.scrollLeft = left;
        }
    }

    // (Re)builds the carousel buttons and the intro cards. Clicks are handled by a
    // single delegated listener on the carousel, so rebuilding is always safe.
    function initializeCharacterSelection() {
        const characterCarousel = document.querySelector('.character-carousel');
        if (characterCarousel) {
            characterCarousel.innerHTML = '';

            Object.entries(charactersData).forEach(([key, character]) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'character-select-btn flex-shrink-0';
                button.setAttribute('data-character', key);

                button.innerHTML = `
                <img src="${character.image}" alt="${character.name}" class="w-20 h-20 rounded-full border-3 border-white/20 object-cover">
                <span>${character.name}</span>
                <span class="text-xs text-gray-300 mt-1">${character.tagline}</span>
            `;

                characterCarousel.appendChild(button);
            });

            applyActiveButtons();
        }

        const introGrid = document.querySelector('.character-intro-grid');
        if (introGrid) {
            introGrid.innerHTML = '';

            // Desktop shows only the characters currently in the timeline; mobile shows
            // every card and reveals the chosen one via .show-mobile.
            const charsToRender = (!isMobileViewport() && activeCharacters.length > 0)
                ? activeCharacters
                : Object.keys(charactersData);

            charsToRender.forEach(key => {
                const character = charactersData[key];
                if (!character) return;

                const card = document.createElement('div');
                card.className = 'moment-content text-center character-card';
                card.setAttribute('data-character', key);

                card.innerHTML = `
                <div class="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl md:block hidden" style="border: 4px solid ${character.borderColor}50;">
                    <img src="${character.image}" alt="${character.name}" class="w-full h-full object-cover">
                </div>
                <h3 class="text-3xl font-bold text-white mb-4">${character.name}</h3>
                <div class="text-lg space-y-2">
                    <p class="text-gray-300">
                        <span class="font-semibold">${character.age}, ${character.role}</span>
                    </p>
                    <p class="text-gray-300">
                        Working on: <span class="font-medium" style="color: ${character.color};">${character.goal}</span>
                    </p>
                </div>
            `;

                introGrid.appendChild(card);
            });
        }
    }

    function selectCharacter(character) {
        if (!character || !charactersData[character]) return;

        selectedCharacter = character;

        // Mobile drives the timeline off the selection; desktop keeps its own pair.
        if (isMobileViewport()) {
            activeCharacters = [character];
        } else {
            initializeCharacterSelection();
        }

        // Applied after any rebuild so the highlight survives it.
        applyActiveButtons();
        centreButtonInCarousel(document.querySelector(`.character-select-btn[data-character="${character}"]`));

        document.querySelectorAll('.character-card').forEach(card => {
            card.classList.toggle('show-mobile', card.dataset.character === character);
        });

        if (isMobileViewport()) {
            const continueButton = document.getElementById('continue-button');
            if (continueButton) continueButton.classList.remove('hidden');
        }

        renderAllConversations();
    }

    function initCharacterSelection() {
        if (isMobileViewport()) {
            // Mobile: nothing is rendered until the visitor picks someone.
            initializeCharacterSelection();
        } else {
            // Desktop: show two random characters side by side.
            const allCharacters = Object.keys(charactersData);
            const randomChars = [];
            while (randomChars.length < 2 && randomChars.length < allCharacters.length) {
                const randomChar = allCharacters[Math.floor(Math.random() * allCharacters.length)];
                if (!randomChars.includes(randomChar)) randomChars.push(randomChar);
            }

            activeCharacters = randomChars;
            initializeCharacterSelection();
            renderAllConversations();
        }

        // One delegated listener on the container that outlives every rebuild.
        const characterCarousel = document.querySelector('.character-carousel');
        if (characterCarousel) {
            characterCarousel.addEventListener('click', event => {
                const button = event.target.closest('.character-select-btn');
                if (button && characterCarousel.contains(button)) {
                    selectCharacter(button.getAttribute('data-character'));
                }
            });
        }
    }

    // =====================================================================
    // 5. 3D physics scene
    // =====================================================================

    // Demand blocks are spawned continuously, but the text they draw comes
    // from a small fixed vocabulary (~30 strings). Cache the rendered
    // texture per string instead of re-drawing a canvas for every block.
    // Shared textures are disposed once, in the scene teardown path below,
    // not per-block in destroyBlock().
    const textTextureCache = new Map();

    function initPhysics() {
        const container = document.getElementById('physics-container');
        if (!container) return;

        const wrapper = document.getElementById('physics-wrapper') || container.parentElement;
        const loading = document.getElementById('physics-loading');
        const hint = (wrapper && wrapper.querySelector('.hover-hint')) || document.getElementById('physics-hint');

        const hideLoader = () => {
            if (loading) loading.classList.add('is-hidden');
        };

        // No scene means no sphere to tap, so stop the hint promising one.
        const giveUp = () => {
            hideLoader();
            if (hint) hint.style.display = 'none';
        };

        // three.js is a classic script: by now it has either run or failed.
        if (typeof THREE === 'undefined') {
            giveUp();
            return;
        }

        // cannon-es ships ES modules only, so index.html imports it in a module
        // script that publishes window.CANNON. This file is loaded with `defer`,
        // and per the HTML spec a deferred script only runs after every module
        // script earlier in the document has finished (success or failure), so
        // window.CANNON is already settled by the time we get here. If script.js
        // ever stops being `defer`, this check needs to go back to waiting on an
        // event instead.
        if (typeof CANNON === 'undefined') {
            giveUp();
            return;
        }

        startPhysicsScene(container, wrapper, hideLoader, giveUp);
    }

    function startPhysicsScene(container, wrapper, hideLoader, giveUp) {
        let destroy;
        try {
            destroy = buildPhysicsScene(container, wrapper, hideLoader);
        } catch (error) {
            // WebGL unavailable or context creation failed - degrade quietly.
            console.warn('3D physics scene unavailable:', error);
            giveUp();
            const canvas = container.querySelector('canvas');
            if (canvas) canvas.remove();
            return;
        }

        // pagehide instead of beforeunload so the page stays bfcache eligible.
        window.addEventListener('pagehide', destroy, { once: true });
    }

    function buildPhysicsScene(physicsContainer, physicsWrapper, hideLoader) {
        const bottomMessage = document.getElementById('bottom-message');
        const breakthroughMessage = document.getElementById('breakthrough-message');

        // Life demands - what's weighing you down
        const demands = [
            "CAREER", "FAMILY", "MONEY", "HEALTH", "SOCIAL", "TIME", "STRESS", "SUCCESS",
            "KIDS", "HOME", "STATUS", "BOSS", "BILLS", "EMAILS", "DEADLINES", "MEETINGS",
            "COMMUTE", "EXERCISE", "DIET", "SLEEP", "ANXIETY", "MORTGAGE", "RETIREMENT",
            "INSURANCE", "TAXES", "REPAIRS", "GROCERIES", "LAUNDRY", "CLEANING", "COOKING"
        ];

        const isMobile = isMobileViewport();
        const reduceMotion = prefersReducedMotion();

        const scene = new THREE.Scene();

        const getContainerSize = () => {
            const rect = physicsContainer.getBoundingClientRect();
            return {
                width: rect.width || 800,
                height: rect.height || 500
            };
        };

        let { width, height } = getContainerSize();

        // Camera - perspective for 3D depth
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 5, isMobile ? 22 : 18);
        camera.lookAt(0, 2, 0);

        // Renderer with antialiasing and transparency
        const renderer = new THREE.WebGLRenderer({
            antialias: !isMobile, // Disable antialiasing on mobile for performance
            alpha: true,
            powerPreference: isMobile ? 'low-power' : 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
        renderer.shadowMap.enabled = !isMobile;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0x000000, 0);
        physicsContainer.appendChild(renderer.domElement);

        // Gradient background
        const bgCanvas = document.createElement('canvas');
        bgCanvas.width = 512;
        bgCanvas.height = 512;
        const bgCtx = bgCanvas.getContext('2d');
        const bgGradient = bgCtx.createLinearGradient(0, 0, 0, 512);
        bgGradient.addColorStop(0, '#f0f4f8');
        bgGradient.addColorStop(0.5, '#e8ecf0');
        bgGradient.addColorStop(1, '#d8dce0');
        bgCtx.fillStyle = bgGradient;
        bgCtx.fillRect(0, 0, 512, 512);
        const bgTexture = new THREE.CanvasTexture(bgCanvas);
        scene.background = bgTexture;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(10, 20, 10);
        mainLight.castShadow = !isMobile;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 50;
        mainLight.shadow.camera.left = -15;
        mainLight.shadow.camera.right = 15;
        mainLight.shadow.camera.top = 15;
        mainLight.shadow.camera.bottom = -15;
        scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0x47B5A5, 0.3);
        fillLight.position.set(-10, 10, -10);
        scene.add(fillLight);

        const goldLight = new THREE.PointLight(0xE2B93B, 0.5, 20);
        goldLight.position.set(0, 0, 5);
        scene.add(goldLight);

        // Physics world
        const world = new CANNON.World();
        world.gravity.set(0, -15, 0);
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = 10;

        const groundMaterial = new CANNON.Material('ground');
        const blockMaterial = new CANNON.Material('block');
        const youMaterial = new CANNON.Material('you');

        world.addContactMaterial(new CANNON.ContactMaterial(groundMaterial, blockMaterial, {
            friction: 0.6,
            restitution: 0.1
        }));
        world.addContactMaterial(new CANNON.ContactMaterial(blockMaterial, blockMaterial, {
            friction: 0.4,
            restitution: 0.05
        }));
        world.addContactMaterial(new CANNON.ContactMaterial(youMaterial, blockMaterial, {
            friction: 0.3,
            restitution: 0.3
        }));

        // Ground plane (invisible)
        const groundShape = new CANNON.Box(new CANNON.Vec3(20, 0.5, 20));
        const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
        groundBody.addShape(groundShape);
        groundBody.position.set(0, -0.5, 0);
        world.addBody(groundBody);

        // Visual ground with subtle shadow receiver
        const groundGeom = new THREE.PlaneGeometry(40, 40);
        const groundMat = new THREE.MeshStandardMaterial({
            color: 0xe8ecf0,
            transparent: true,
            opacity: 0.5
        });
        const groundMesh = new THREE.Mesh(groundGeom, groundMat);
        groundMesh.rotation.x = -Math.PI / 2;
        groundMesh.position.y = 0;
        groundMesh.receiveShadow = true;
        scene.add(groundMesh);

        // Invisible arena walls
        const wallThickness = 0.5;
        const wallHeight = 30;
        const arenaWidth = isMobile ? 7 : 9;
        const arenaDepth = isMobile ? 5 : 6;

        const createWall = (x, y, z, w, h, d) => {
            const shape = new CANNON.Box(new CANNON.Vec3(w / 2, h / 2, d / 2));
            const body = new CANNON.Body({ mass: 0, material: groundMaterial });
            body.addShape(shape);
            body.position.set(x, y, z);
            world.addBody(body);
        };

        createWall(-arenaWidth, wallHeight / 2, 0, wallThickness, wallHeight, arenaDepth * 2);
        createWall(arenaWidth, wallHeight / 2, 0, wallThickness, wallHeight, arenaDepth * 2);
        createWall(0, wallHeight / 2, -arenaDepth, arenaWidth * 2, wallHeight, wallThickness);
        createWall(0, wallHeight / 2, arenaDepth, arenaWidth * 2, wallHeight, wallThickness);

        // ----- Demand blocks -------------------------------------------------

        const blocks = [];
        const MAX_BLOCKS = isMobile ? 40 : 60;
        let demandIndex = 0;

        function createTextTexture(text) {
            const cached = textTextureCache.get(text);
            if (cached) return cached;

            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');

            const gradient = ctx.createLinearGradient(0, 0, 0, 128);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(1, '#f5f5f5');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 256, 128);

            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 4;
            ctx.strokeRect(2, 2, 252, 124);

            ctx.fillStyle = '#374151';
            ctx.font = 'bold 28px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, 128, 64);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            textTextureCache.set(text, texture);
            return texture;
        }

        function createDemandBlock(text) {
            const blockWidth = isMobile ? 1.4 : 1.6;
            const blockHeight = isMobile ? 0.6 : 0.7;
            const blockDepth = isMobile ? 0.5 : 0.6;

            const shape = new CANNON.Box(new CANNON.Vec3(blockWidth / 2, blockHeight / 2, blockDepth / 2));
            const body = new CANNON.Body({
                mass: 1,
                material: blockMaterial,
                linearDamping: 0.3,
                angularDamping: 0.5
            });
            body.addShape(shape);

            // Reduced motion drops them in from just above the pile instead of raining them down.
            const spawnX = (Math.random() - 0.5) * (arenaWidth * 1.5);
            const spawnY = reduceMotion ? 1 + Math.random() * 3 : 12 + Math.random() * 5;
            const spawnZ = (Math.random() - 0.5) * (arenaDepth * 1.2);
            body.position.set(spawnX, spawnY, spawnZ);
            body.quaternion.setFromEuler(
                Math.random() * 0.3 - 0.15,
                Math.random() * Math.PI * 2,
                Math.random() * 0.3 - 0.15
            );
            world.addBody(body);

            const geometry = new THREE.BoxGeometry(blockWidth, blockHeight, blockDepth);
            const texture = createTextTexture(text);

            const materials = [
                new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }),
                new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }),
                new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }),
                new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }),
                new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3 }),
                new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3 })
            ];

            const mesh = new THREE.Mesh(geometry, materials);
            mesh.castShadow = !isMobile;
            mesh.receiveShadow = !isMobile;
            scene.add(mesh);

            return { body, mesh, text, destroyed: false };
        }

        // Single teardown path for every way a block can leave the scene.
        function destroyBlock(block) {
            world.removeBody(block.body);
            scene.remove(block.mesh);
            block.mesh.geometry.dispose();
            // Materials are per-block, but their texture map may be a cached,
            // shared CanvasTexture from textTextureCache - dispose only the
            // material here, and dispose cached textures in scene teardown.
            const materials = Array.isArray(block.mesh.material) ? block.mesh.material : [block.mesh.material];
            materials.forEach(material => {
                material.dispose();
            });
        }

        function spawnBlock() {
            if (blocks.length >= MAX_BLOCKS) return;
            blocks.push(createDemandBlock(demands[demandIndex % demands.length]));
            demandIndex++;
        }

        // Initial pile. Staggered normally, all at once for reduced motion.
        const initialBlocks = isMobile ? 8 : 12;
        const spawnTimeouts = [];
        for (let i = 0; i < initialBlocks; i++) {
            if (reduceMotion) {
                spawnBlock();
            } else {
                spawnTimeouts.push(window.setTimeout(spawnBlock, i * 100));
            }
        }

        // ----- "YOU" sphere --------------------------------------------------

        const youRadius = isMobile ? 0.8 : 1.0;
        const youShape = new CANNON.Sphere(youRadius);
        const youBody = new CANNON.Body({
            mass: 0, // Start static
            material: youMaterial,
            linearDamping: 0.1,
            angularDamping: 0.5
        });
        youBody.addShape(youShape);
        youBody.position.set(0, youRadius + 0.1, 2);
        world.addBody(youBody);

        const youGeometry = new THREE.SphereGeometry(youRadius, 32, 32);

        const youCanvas = document.createElement('canvas');
        youCanvas.width = 512;
        youCanvas.height = 512;
        const youCtx = youCanvas.getContext('2d');
        const youGradient = youCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
        youGradient.addColorStop(0, '#FFD700');
        youGradient.addColorStop(0.5, '#E2B93B');
        youGradient.addColorStop(1, '#47B5A5');
        youCtx.fillStyle = youGradient;
        youCtx.fillRect(0, 0, 512, 512);
        const youTexture = new THREE.CanvasTexture(youCanvas);

        const youMaterialVisual = new THREE.MeshStandardMaterial({
            map: youTexture,
            metalness: 0.3,
            roughness: 0.4,
            emissive: 0xE2B93B,
            emissiveIntensity: 0.3
        });

        const youMesh = new THREE.Mesh(youGeometry, youMaterialVisual);
        youMesh.castShadow = !isMobile;
        scene.add(youMesh);

        // Glow effect around YOU
        const glowGeometry = new THREE.SphereGeometry(youRadius * 1.3, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xE2B93B,
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        scene.add(glowMesh);

        const outerGlowGeometry = new THREE.SphereGeometry(youRadius * 1.6, 32, 32);
        const outerGlowMaterial = new THREE.MeshBasicMaterial({
            color: 0x47B5A5,
            transparent: true,
            opacity: 0.08,
            side: THREE.BackSide
        });
        const outerGlowMesh = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
        scene.add(outerGlowMesh);

        function createYouSprite() {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 40px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 4;
            ctx.fillText('YOU', 64, 32);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                depthWrite: false,
                // The sprite rides at the sphere's centre, so depth testing buried it
                // inside the sphere and the label never showed. Draw it on top.
                depthTest: false
            });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(1.5, 0.75, 1);
            sprite.renderOrder = 10;
            return sprite;
        }

        const youSprite = createYouSprite();
        scene.add(youSprite);

        // ----- Debris --------------------------------------------------------

        const debris = [];

        // The only call site (below) always passes 0xffffff. Debris pieces
        // still need independent per-instance opacity (each one fades out on
        // its own timeline in the frame loop), so the material can't be one
        // literal shared instance - instead a lazily-built template is
        // cloned per piece, which skips re-resolving the options object and
        // lets Three.js reuse its compiled shader program. Geometry has no
        // per-instance state, so one unit box is shared outright and each
        // piece gets its random size via mesh.scale instead of unique
        // dimensions. Both the shared geometry and the template are disposed
        // once, in scene teardown, not per-piece here.
        let debrisGeometry = null;
        let debrisMaterialTemplate = null;

        function createDebris(position, color) {
            const count = isMobile ? 4 : 6;

            if (!debrisGeometry) {
                debrisGeometry = new THREE.BoxGeometry(1, 1, 1);
            }
            if (!debrisMaterialTemplate) {
                debrisMaterialTemplate = new THREE.MeshStandardMaterial({
                    color: color || 0xffffff,
                    transparent: true,
                    opacity: 1
                });
            }

            for (let i = 0; i < count; i++) {
                const size = 0.1 + Math.random() * 0.15;
                const material = debrisMaterialTemplate.clone();
                const mesh = new THREE.Mesh(debrisGeometry, material);
                mesh.scale.setScalar(size);
                mesh.position.copy(position);
                mesh.velocity = new THREE.Vector3(
                    (Math.random() - 0.5) * 8,
                    Math.random() * 6 + 2,
                    (Math.random() - 0.5) * 8
                );
                mesh.rotationSpeed = new THREE.Vector3(
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10
                );
                mesh.life = 1;
                mesh.castShadow = false;
                scene.add(mesh);
                debris.push(mesh);
            }
        }

        // ----- Interaction ---------------------------------------------------

        let hasBreakthrough = false;
        let isLaunching = false;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onInteraction(event) {
            // No preventDefault: the touch listener stays passive so the canvas
            // never swallows a vertical scroll.
            const rect = renderer.domElement.getBoundingClientRect();
            if (!rect.width || !rect.height) return;

            let clientX;
            let clientY;

            if (event.touches) {
                if (!event.touches.length) return;
                clientX = event.touches[0].clientX;
                clientY = event.touches[0].clientY;
            } else {
                clientX = event.clientX;
                clientY = event.clientY;
            }

            mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObject(youMesh);
            if (intersects.length > 0 || isNearYou(mouse)) {
                launchYou();
            }
        }

        function isNearYou(mousePos) {
            const youScreenPos = youMesh.position.clone().project(camera);
            const distance = Math.sqrt(
                Math.pow(mousePos.x - youScreenPos.x, 2) +
                Math.pow(mousePos.y - youScreenPos.y, 2)
            );
            return distance < 0.3;
        }

        function launchYou() {
            if (isLaunching) return;
            isLaunching = true;

            if (youBody.position.y < youRadius + 0.5) {
                youBody.position.set(0, youRadius + 0.1, 2);
            }

            youBody.mass = 8;
            youBody.updateMassProperties();

            const launchForce = isMobile ? 350 : 450;
            youBody.velocity.set(
                (Math.random() - 0.5) * 3,
                launchForce / youBody.mass,
                (Math.random() - 0.5) * 2 - 1
            );

            youMaterialVisual.emissiveIntensity = 0.8;
            glowMaterial.opacity = 0.4;
            outerGlowMaterial.opacity = 0.2;

            window.setTimeout(() => {
                youMaterialVisual.emissiveIntensity = 0.3;
                glowMaterial.opacity = 0.15;
                outerGlowMaterial.opacity = 0.08;
                isLaunching = false;
            }, 500);

            if (!hasBreakthrough) {
                hasBreakthrough = true;
                if (physicsWrapper) physicsWrapper.classList.add('activated');
                if (bottomMessage) bottomMessage.classList.add('opacity-0');
                if (breakthroughMessage) {
                    breakthroughMessage.classList.remove('hidden');
                    window.setTimeout(() => breakthroughMessage.classList.remove('opacity-0'), 50);
                }
            }
        }

        renderer.domElement.addEventListener('click', onInteraction);
        renderer.domElement.addEventListener('touchstart', onInteraction, { passive: true });

        // Blocks are only flagged here; the teardown happens in the frame loop so
        // bodies are never removed while the solver is mid-step.
        world.addEventListener('postStep', () => {
            if (youBody.velocity.length() <= 5) return;

            blocks.forEach(block => {
                if (block.destroyed) return;

                const distance = youBody.position.distanceTo(block.body.position);
                if (distance < youRadius + 1.2) {
                    block.destroyed = true;
                    createDebris(
                        new THREE.Vector3(
                            block.body.position.x,
                            block.body.position.y,
                            block.body.position.z
                        ),
                        0xffffff
                    );
                }
            });
        });

        // ----- Frame loop ----------------------------------------------------

        const clock = new THREE.Clock();
        let time = 0;
        let firstRenderDone = false;

        function step() {
            const delta = Math.min(clock.getDelta(), 0.05);
            time += delta;

            world.step(1 / 60, delta, 3);

            // Sync meshes, and retire blocks that were hit or fell out of the arena.
            for (let i = blocks.length - 1; i >= 0; i--) {
                const block = blocks[i];
                if (block.destroyed || block.body.position.y < -10) {
                    destroyBlock(block);
                    blocks.splice(i, 1);
                    continue;
                }
                block.mesh.position.copy(block.body.position);
                block.mesh.quaternion.copy(block.body.quaternion);
            }

            youMesh.position.copy(youBody.position);
            youMesh.quaternion.copy(youBody.quaternion);

            glowMesh.position.copy(youBody.position);
            outerGlowMesh.position.copy(youBody.position);
            youSprite.position.copy(youBody.position);
            goldLight.position.copy(youBody.position);

            if (!reduceMotion) {
                const pulse = Math.sin(time * 3) * 0.05 + 0.15;
                glowMaterial.opacity = pulse;
                glowMesh.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
            }

            for (let i = debris.length - 1; i >= 0; i--) {
                const d = debris[i];
                d.velocity.y -= 20 * delta; // gravity
                d.position.add(d.velocity.clone().multiplyScalar(delta));
                d.rotation.x += d.rotationSpeed.x * delta;
                d.rotation.y += d.rotationSpeed.y * delta;
                d.rotation.z += d.rotationSpeed.z * delta;
                d.life -= delta * 0.5;
                d.material.opacity = d.life;

                if (d.life <= 0) {
                    scene.remove(d);
                    // d.geometry is the shared debrisGeometry - disposed once in
                    // scene teardown, not here. The material is this piece's own
                    // clone, so it's disposed normally.
                    d.material.dispose();
                    debris.splice(i, 1);
                }
            }

            // Keep YOU from falling through the ground
            if (youBody.position.y < youRadius) {
                youBody.position.y = youRadius;
                youBody.velocity.y = Math.max(0, youBody.velocity.y);
            }

            renderer.render(scene, camera);

            if (!firstRenderDone) {
                firstRenderDone = true;
                hideLoader();
            }
        }

        // ----- Run state: only animate while on screen and the tab is visible ---

        let rafId = null;
        let spawnTimer = null;
        let running = false;
        let onScreen = true;

        function frame() {
            rafId = window.requestAnimationFrame(frame);
            step();
        }

        function start() {
            if (running) return;
            running = true;
            clock.getDelta(); // discard the gap we spent paused
            rafId = window.requestAnimationFrame(frame);
            if (!reduceMotion) {
                spawnTimer = window.setInterval(spawnBlock, isMobile ? 600 : 400);
            }
        }

        function stop() {
            if (!running) return;
            running = false;
            if (rafId !== null) window.cancelAnimationFrame(rafId);
            rafId = null;
            if (spawnTimer !== null) window.clearInterval(spawnTimer);
            spawnTimer = null;
        }

        function syncRunState() {
            if (onScreen && !document.hidden) start();
            else stop();
        }

        let observer = null;
        if (typeof IntersectionObserver !== 'undefined' && physicsWrapper) {
            observer = new IntersectionObserver(entries => {
                onScreen = entries.some(entry => entry.isIntersecting);
                syncRunState();
            }, { rootMargin: '100px' });
            observer.observe(physicsWrapper);
        }

        document.addEventListener('visibilitychange', syncRunState);

        // A drag-resize fires many 'resize' events per frame; coalesce them so
        // setSize/updateProjectionMatrix run at most once per animation frame.
        let resizeFrame = null;

        function onResize() {
            if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
            resizeFrame = window.requestAnimationFrame(() => {
                resizeFrame = null;
                const size = getContainerSize();
                width = size.width;
                height = size.height;
                if (!width || !height) return;

                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            });
        }

        window.addEventListener('resize', onResize);

        syncRunState();

        return function destroy() {
            stop();
            spawnTimeouts.forEach(window.clearTimeout);
            if (observer) observer.disconnect();
            document.removeEventListener('visibilitychange', syncRunState);
            window.removeEventListener('resize', onResize);
            if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
            textTextureCache.forEach(texture => texture.dispose());
            textTextureCache.clear();
            if (debrisGeometry) debrisGeometry.dispose();
            if (debrisMaterialTemplate) debrisMaterialTemplate.dispose();
            renderer.dispose();
        };
    }

    // =====================================================================
    // 6. Scroll animations (GSAP)
    // =====================================================================
    // (Smooth-scroll for in-page anchors now lives in nav.js, which every
    // page loads and which self-initialises it.)

    function scrollAnimationsAvailable() {
        return typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
    }

    // The timeline starts at opacity 0 and is revealed by the scroll triggers below.
    // If GSAP never loaded there is nothing to reveal it, so show it outright.
    function revealTimelineWithoutAnimation() {
        const cinematicTimeline = document.querySelector('.cinematic-timeline');
        if (!cinematicTimeline) return;

        cinematicTimeline.querySelectorAll('.timeline-title, .timeline-subtitle, .conversation-bubble')
            .forEach(el => el.classList.add('visible'));
        cinematicTimeline.querySelectorAll('.timeline-moment')
            .forEach(el => el.classList.add('active'));

        const timelineProgress = cinematicTimeline.querySelector('.timeline-progress');
        if (timelineProgress) timelineProgress.style.height = '100%';
    }

    function initScrollAnimations() {
        if (!scrollAnimationsAvailable()) {
            revealTimelineWithoutAnimation();
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.wisdom-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                },
                opacity: 0,
                y: 20,
                duration: 0.4,
                delay: i * 0.05
            });
        });

        gsap.utils.toArray('.journey-dot').forEach((dot, i) => {
            gsap.from(dot, {
                scrollTrigger: {
                    trigger: dot,
                    start: "top 80%"
                },
                scale: 0,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.2,
                ease: "back.out(1.7)"
            });
        });

        const cinematicTimeline = document.querySelector('.cinematic-timeline');
        if (!cinematicTimeline) return;

        const timelineTitle = cinematicTimeline.querySelector('.timeline-title');
        const timelineSubtitle = cinematicTimeline.querySelector('.timeline-subtitle');

        ScrollTrigger.create({
            trigger: cinematicTimeline,
            start: "top 80%",
            onEnter: () => {
                if (timelineTitle) timelineTitle.classList.add('visible');
                if (timelineSubtitle) timelineSubtitle.classList.add('visible');
            }
        });

        const timelineMoments = cinematicTimeline.querySelectorAll('.timeline-moment');
        const timelineProgress = cinematicTimeline.querySelector('.timeline-progress');

        timelineMoments.forEach((moment, index) => {
            ScrollTrigger.create({
                trigger: moment,
                start: "top 70%",
                onEnter: () => {
                    moment.classList.add('active');

                    if (timelineProgress) {
                        const progress = ((index + 1) / timelineMoments.length) * 100;
                        timelineProgress.style.height = `${progress}%`;
                    }

                    // Reveal the conversation bubbles one after another.
                    moment.querySelectorAll('.conversation-bubble').forEach((bubble, i) => {
                        window.setTimeout(() => bubble.classList.add('visible'), 200 + (i * 300));
                    });
                }
            });
        });

        // Parallax on the moment times
        gsap.utils.toArray('.moment-time').forEach(time => {
            const isTheMoment = time.textContent.includes('MOMENT');

            gsap.to(time, {
                yPercent: isTheMoment ? -80 : -60,
                scale: 0.85,
                opacity: 0.3,
                ease: "none",
                scrollTrigger: {
                    trigger: time,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            if (isTheMoment) {
                gsap.to(time, {
                    rotation: -5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: time,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2
                    }
                });
            }
        });
    }

    // =====================================================================
    // 7. Email modal
    // =====================================================================

    const FOCUSABLE_SELECTOR = ['a[href]', 'button', 'input', 'select', 'textarea', '[tabindex]']
        .map(sel => `${sel}:not([disabled]):not([tabindex="-1"]):not([type="hidden"])`)
        .join(',');

    function initModal() {
        const modal = document.getElementById('emailModal');
        if (!modal) return;

        const dialog = modal.firstElementChild;
        const form = document.getElementById('mc-embedded-subscribe-form');
        const nameInput = document.getElementById('mce-FNAME');
        const closeButton = document.getElementById('closeModal');
        const successResponse = document.getElementById('mce-success-response');
        const errorResponse = document.getElementById('mce-error-response');

        let lastTrigger = null;
        let previousOverflow = '';

        const isOpen = () => modal.classList.contains('flex');

        function focusableElements() {
            if (!dialog) return [];
            return Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR))
                .filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
        }

        function openModal(trigger) {
            if (isOpen()) return;

            lastTrigger = trigger || document.activeElement;

            if (successResponse) successResponse.style.display = 'none';
            if (errorResponse) errorResponse.style.display = 'none';

            modal.classList.remove('hidden');
            modal.classList.add('flex');

            previousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            const first = nameInput || focusableElements()[0];
            if (first) first.focus();
        }

        function closeModal() {
            if (!isOpen()) return;

            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = previousOverflow;

            if (lastTrigger && document.contains(lastTrigger)) {
                lastTrigger.focus();
            }
            lastTrigger = null;
        }

        document.querySelectorAll('.primary-btn').forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                openModal(button);
            });
        });

        // Backdrop click
        modal.addEventListener('click', event => {
            if (event.target === modal) closeModal();
        });

        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }

        document.addEventListener('keydown', event => {
            if (!isOpen()) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                closeModal();
                return;
            }

            if (event.key !== 'Tab') return;

            const focusable = focusableElements();
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement;

            if (event.shiftKey && (active === first || !dialog.contains(active))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
                event.preventDefault();
                first.focus();
            }
        });

        if (form) {
            form.addEventListener('submit', event => {
                // Never claim success on input the browser would reject.
                if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
                    event.preventDefault();
                    if (typeof form.reportValidity === 'function') form.reportValidity();
                    return;
                }

                // The native POST to Mailchimp continues in its own tab; acknowledge
                // here and get out of the way.
                if (successResponse) {
                    successResponse.textContent = 'Thanks! Check the new tab to confirm your subscription.';
                    successResponse.style.display = 'block';
                }
                window.setTimeout(closeModal, 1200);
            });
        }
    }

    // =====================================================================
    // 8. Init
    // =====================================================================

    onReady(function init() {
        initCharacterSelection();
        initPhysics();
        initScrollAnimations();
        initModal();
    });
})();
