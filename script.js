// Track active characters
let activeCharacters = [];

// Character data as JSON
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

// Helper function to add or update a character
function addOrUpdateCharacter(key, characterData) {
    charactersData[key] = characterData;
    // Re-initialize the interface if already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initializeCharacterSelection();
    }
}

// Helper function to remove a character
function removeCharacter(key) {
    delete charactersData[key];
    // Re-initialize the interface if already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initializeCharacterSelection();
    }
}

// Helper function to get character data
function getCharacter(key) {
    return charactersData[key] || null;
}

// Get currently active characters based on screen size and selection
function getActiveCharacters() {
    // Simply return the activeCharacters array
    return activeCharacters;
}

// Function to render a conversation bubble
function renderConversationBubble(message, character, bossImage = "assets/images/colleauge.jpeg") {
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
    } else if (message.type === 'you') {
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
    } else if (message.type === 'boss') {
        // For boss messages, we need to determine the correct image based on the character
        let image = 'assets/images/colleauge.jpeg';
        if (character === 'jake' && message.name === 'Sarah') {
            image = 'assets/images/wife.png';
        } else if (character === 'andy' || character === 'adam') {
            image = 'assets/images/colleauge.jpeg';
        } else if (character === 'jason') {
            image = 'assets/images/colleauge.jpeg';
        }

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

// Function to render morning conversations
function renderMorningConversations() {
    const container = document.querySelector('.morning-conversations');
    if (!container) {
        console.log('Morning conversations container not found');
        return;
    }

    container.innerHTML = '';

    const active = getActiveCharacters();
    console.log('Active characters for morning:', active, 'activeCharacters global:', activeCharacters);
    if (active.length === 0) {
        console.log('No active characters, skipping morning render');
        return;
    }

    active.forEach(key => {
        const character = charactersData[key];
        if (!character) return;
        const morningDiv = document.createElement('div');
        morningDiv.className = 'moment-content timeline-character';
        morningDiv.setAttribute('data-character', key);

        let conversationHTML = character.conversations.morning.map(msg =>
            renderConversationBubble(msg, key)
        ).join('');

        morningDiv.innerHTML = `
            <h4 class="text-xl font-bold text-white mb-4 flex items-center">
                <span class="mr-3" style="color: ${character.color};">${character.name}</span>
                <span class="text-sm font-normal text-gray-400">Learning the ${character.protocol.name}</span>
            </h4>
            <div class="space-y-3">
                ${conversationHTML}
            </div>
            <div class="mt-6 rounded-lg p-4" style="background-color: ${character.color}1A; border: 1px solid ${character.color}4D;">
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

// Function to render midday conversations
function renderMiddayConversations() {
    const container = document.querySelector('.midday-conversations');
    if (!container) return;

    container.innerHTML = '';

    const active = getActiveCharacters();
    if (active.length === 0) return;

    active.forEach(key => {
        const character = charactersData[key];
        if (!character) return;
        const middayDiv = document.createElement('div');
        middayDiv.className = 'timeline-content timeline-character';
        middayDiv.setAttribute('data-character', key);

        let conversationHTML = character.conversations.midday.map(msg =>
            renderConversationBubble(msg, key)
        ).join('');

        middayDiv.innerHTML = `
            <div class="space-y-4">
                ${conversationHTML}
                ${renderProgressTracker(character, key)}
            </div>
        `;

        container.appendChild(middayDiv);
    });
}

// Function to render moment conversations
function renderMomentConversations() {
    const container = document.querySelector('.moment-conversations');
    if (!container) return;

    container.innerHTML = '';

    const active = getActiveCharacters();
    if (active.length === 0) return;

    active.forEach(key => {
        const character = charactersData[key];
        if (!character) return;
        const moment = character.conversations.moment;
        const momentDiv = document.createElement('div');
        momentDiv.className = 'moment-content timeline-character';
        momentDiv.setAttribute('data-character', key);

        let dialogueHTML = moment.dialogue.map(msg =>
            renderConversationBubble(msg, key)
        ).join('');

        momentDiv.innerHTML = `
            <h4 class="text-xl font-bold text-white mb-4 flex items-center">
                <span class="text-[${character.color}] mr-3">${moment.time}</span>
                <span class="text-sm font-normal text-gray-400">${moment.title}</span>
            </h4>
            <div class="bg-[${character.color}]/10 border border-[${character.color}]/30 rounded-lg p-4 mb-4">
                <p class="text-sm text-gray-300 mb-3">
                    <i class="fas ${character.protocol.icon} text-[${character.color}] mr-2"></i>
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

// Function to render evening conversations
function renderEveningConversations() {
    const container = document.querySelector('.evening-conversations');
    if (!container) return;

    container.innerHTML = '';

    const active = getActiveCharacters();
    if (active.length === 0) return;

    active.forEach(key => {
        const character = charactersData[key];
        if (!character) return;
        const evening = character.evening;
        const eveningDiv = document.createElement('div');
        eveningDiv.className = 'moment-content timeline-character';
        eveningDiv.setAttribute('data-character', key);

        eveningDiv.innerHTML = `
            <h4 class="text-xl font-bold text-white mb-4">
                <span class="text-[${character.color}]">${character.name}'s ${key === 'jake' ? 'Breakthrough' : key === 'andy' ? 'Assertiveness Win' : key === 'adam' ? 'Purpose Alignment' : 'Momentum Victory'}</span>
            </h4>
            <p class="text-gray-300 mb-4">
                ${evening.breakthrough}
            </p>
            <div class="bg-[${character.color}]/10 border border-[${character.color}]/30 rounded-lg p-4">
                <p class="text-white text-sm">
                    <i class="fas fa-check-circle text-[${character.color}] mr-2"></i>
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

// Helper function to render progress trackers
function renderProgressTracker(character, key) {
    if (key === 'jake') {
        return `
            <div class="rounded-lg p-4 mt-4" style="background-color: ${character.color}1A; border: 1px solid ${character.color}4D;">
                <p class="text-white text-sm mb-2">
                    <i class="fas fa-heart mr-2" style="color: ${character.color};"></i>
                    <strong>Tonight's goal:</strong> Share one real fear with Sarah
                </p>
                <p class="text-gray-400 text-xs">Progress: Vulnerability muscles warming up</p>
            </div>
        `;
    } else if (key === 'andy') {
        return `
            <div class="info-box rounded-lg p-4 mt-4" style="background-color: ${character.color}1A; border: 1px solid ${character.color}4D;">
                <p class="text-white text-sm">
                    <i class="fas fa-chart-line mr-2" style="color: ${character.color};"></i>
                    <strong>Final prep:</strong> WORTH script reviewed, power pose completed
                </p>
            </div>
        `;
    } else if (key === 'adam') {
        return `
            <div class="purpose-tracker rounded-lg p-4 mt-4" style="background-color: ${character.color}1A; border: 1px solid ${character.color}4D;">
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
    } else if (key === 'jason') {
        return `
            <div class="habit-tracker rounded-lg p-4 mt-4" style="background-color: ${character.color}1A; border: 1px solid ${character.color}4D;">
                <p class="text-white text-sm mb-2">
                    <i class="fas fa-tasks mr-2" style="color: ${character.color};"></i>
                    <strong>Momentum Building:</strong>
                </p>
                <div class="flex gap-2 text-xs">
                    <span class="px-2 py-1 rounded" style="background-color: ${character.color}33;">✓ Email client</span>
                    <span class="px-2 py-1 rounded" style="background-color: ${character.color}33;">✓ Update CRM</span>
                    <span class="px-2 py-1 rounded" style="background-color: ${character.color}33;">✓ Return call</span>
                </div>
                <p class="text-gray-400 text-xs mt-2">
                    Procrastination cycles broken: 3 | Dopamine hits earned: 3
                </p>
            </div>
        `;
    }
    return '';
}

// Initialize character selection interface
function initializeCharacterSelection() {
    // Generate character selection buttons
    const characterCarousel = document.querySelector('.character-carousel');
    if (characterCarousel) {
        characterCarousel.innerHTML = '';

        Object.entries(charactersData).forEach(([key, character]) => {
            const button = document.createElement('button');
            button.className = 'character-select-btn flex-shrink-0';
            button.setAttribute('data-character', key);
            button.style.cssText = 'pointer-events: auto; z-index: 20004 !important; position: relative; isolation: isolate;';
            button.onclick = () => selectCharacter(key);

            button.innerHTML = `
                <img src="${character.image}" alt="${character.name}" class="w-20 h-20 rounded-full border-3 border-white/20 object-cover" style="pointer-events: none;">
                <span style="pointer-events: none;">${character.name}</span>
                <span class="text-xs text-gray-300 mt-1" style="pointer-events: none;">${character.tagline}</span>
            `;

            characterCarousel.appendChild(button);
        });
    }

    // Generate character intro cards
    const introGrid = document.querySelector('.character-intro-grid');
    if (introGrid) {
        introGrid.innerHTML = '';

        // For desktop with active characters, only show those
        // For mobile or initial load, show all characters
        let charsToRender;
        if (window.innerWidth > 768 && activeCharacters.length > 0) {
            charsToRender = activeCharacters;
        } else if (window.innerWidth <= 768) {
            // On mobile, show all character cards initially
            charsToRender = Object.keys(charactersData);
        } else {
            // Desktop initial load - show all
            charsToRender = Object.keys(charactersData);
        }

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

// Character selection function
function selectCharacter(character) {
    console.log('selectCharacter called with:', character, 'Window width:', window.innerWidth);

    if (!charactersData[character]) {
        console.error('Invalid character:', character);
        return;
    }

    // Update button states
    document.querySelectorAll('.character-select-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const selectedBtn = document.querySelector(`.character-select-btn[data-character="${character}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // Set active character for mobile
    if (window.innerWidth <= 768) {
        activeCharacters = [character];
        console.log('Set activeCharacters for mobile:', activeCharacters);
    }

    // Don't re-initialize on mobile as it might clear activeCharacters
    if (window.innerWidth > 768) {
        initializeCharacterSelection();
    }

    // Show selected character intro
    document.querySelectorAll('.character-card').forEach(card => {
        card.classList.remove('show-mobile');
        if (card.dataset.character === character) {
            card.classList.add('show-mobile');
        }
    });

    // Show continue button on mobile after selection
    if (window.innerWidth <= 768) {
        const continueButton = document.getElementById('continue-button');
        if (continueButton) {
            continueButton.classList.remove('hidden');
        }
    }

    // Re-render all conversations with selected character
    console.log('Rendering conversations for character:', character);
    renderMorningConversations();
    renderMiddayConversations();
    renderMomentConversations();
    renderEveningConversations();
}

// Debug and setup character selection
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing character selection...');

    // Initialize character selection from JSON data
    initializeCharacterSelection();

    // For mobile, don't render until character is selected
    // For desktop, render will happen after random selection

    // After initialization, set up event listeners
    const buttons = document.querySelectorAll('.character-select-btn');
    console.log('Found buttons:', buttons.length);

    buttons.forEach((btn, index) => {
        const character = btn.getAttribute('data-character');
        console.log('Button found:', character);

        // Add event listeners programmatically as backup
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Programmatic click on:', character);
            selectCharacter(character);
        });

        btn.addEventListener('touchend', function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Programmatic touch on:', character);
            selectCharacter(character);
        });
    });

    // Handle character selection based on screen size
    console.log('Window width:', window.innerWidth);
    if (window.innerWidth <= 768) {
        // Mobile: No auto-selection, let user choose from carousel
        console.log('Mobile detected - carousel ready');
    } else {
        // Desktop: Randomly show 2 characters
        const allCharacters = Object.keys(charactersData);
        const randomChars = [];

        // Select 2 random characters
        while (randomChars.length < 2) {
            const randomChar = allCharacters[Math.floor(Math.random() * allCharacters.length)];
            if (!randomChars.includes(randomChar)) {
                randomChars.push(randomChar);
            }
        }

        console.log('Desktop: Showing random characters:', randomChars);

        // Set active characters for desktop
        activeCharacters = randomChars;

        // Re-initialize character cards to show only the selected 2
        setTimeout(() => {
            initializeCharacterSelection();

            // Timeline content will be filtered by render functions

            // Render conversations for desktop with selected 2 characters
            renderMorningConversations();
            renderMiddayConversations();
            renderMomentConversations();
            renderEveningConversations();
        }, 100);
    }
});

// 3D Physics Simulation using Three.js and Cannon-es
const physicsContainer = document.getElementById('physics-container');
const physicsLoading = document.getElementById('physics-loading');
const physicsHint = document.getElementById('physics-hint');
const bottomMessage = document.getElementById('bottom-message');
const breakthroughMessage = document.getElementById('breakthrough-message');

if (physicsContainer && typeof THREE !== 'undefined' && typeof CANNON !== 'undefined') {
    // Initialize 3D Physics Scene
    (function init3DPhysics() {
        // Life demands - what's weighing you down
        const demands = [
            "CAREER", "FAMILY", "MONEY", "HEALTH", "SOCIAL", "TIME", "STRESS", "SUCCESS",
            "KIDS", "HOME", "STATUS", "BOSS", "BILLS", "EMAILS", "DEADLINES", "MEETINGS",
            "COMMUTE", "EXERCISE", "DIET", "SLEEP", "ANXIETY", "MORTGAGE", "RETIREMENT",
            "INSURANCE", "TAXES", "REPAIRS", "GROCERIES", "LAUNDRY", "CLEANING", "COOKING"
        ];

        // Scene setup
        const scene = new THREE.Scene();

        // Responsive dimensions
        const getContainerSize = () => {
            const rect = physicsContainer.getBoundingClientRect();
            return {
                width: rect.width || 800,
                height: rect.height || 500
            };
        };

        let { width, height } = getContainerSize();
        const isMobile = window.innerWidth <= 768;

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
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
        renderer.shadowMap.enabled = !isMobile;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0x000000, 0);
        physicsContainer.appendChild(renderer.domElement);

        // Create gradient background
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

        // Gold accent light
        const goldLight = new THREE.PointLight(0xE2B93B, 0.5, 20);
        goldLight.position.set(0, 0, 5);
        scene.add(goldLight);

        // Physics world
        const world = new CANNON.World();
        world.gravity.set(0, -15, 0);
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = 10;

        // Materials
        const groundMaterial = new CANNON.Material('ground');
        const blockMaterial = new CANNON.Material('block');
        const youMaterial = new CANNON.Material('you');

        // Contact materials
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

        // Invisible walls
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

        // Arena walls
        createWall(-arenaWidth, wallHeight / 2, 0, wallThickness, wallHeight, arenaDepth * 2);
        createWall(arenaWidth, wallHeight / 2, 0, wallThickness, wallHeight, arenaDepth * 2);
        createWall(0, wallHeight / 2, -arenaDepth, arenaWidth * 2, wallHeight, wallThickness);
        createWall(0, wallHeight / 2, arenaDepth, arenaWidth * 2, wallHeight, wallThickness);

        // Demand blocks array
        const blocks = [];
        const MAX_BLOCKS = isMobile ? 40 : 60;
        let demandIndex = 0;

        // Create text texture for blocks
        function createTextTexture(text) {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');

            // Gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, 128);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(1, '#f5f5f5');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 256, 128);

            // Border
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 4;
            ctx.strokeRect(2, 2, 252, 124);

            // Text
            ctx.fillStyle = '#374151';
            ctx.font = 'bold 28px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, 128, 64);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        // Create demand block
        function createDemandBlock(text) {
            const blockWidth = isMobile ? 1.4 : 1.6;
            const blockHeight = isMobile ? 0.6 : 0.7;
            const blockDepth = isMobile ? 0.5 : 0.6;

            // Physics body
            const shape = new CANNON.Box(new CANNON.Vec3(blockWidth / 2, blockHeight / 2, blockDepth / 2));
            const body = new CANNON.Body({
                mass: 1,
                material: blockMaterial,
                linearDamping: 0.3,
                angularDamping: 0.5
            });
            body.addShape(shape);

            // Random spawn position above the scene
            const spawnX = (Math.random() - 0.5) * (arenaWidth * 1.5);
            const spawnY = 12 + Math.random() * 5;
            const spawnZ = (Math.random() - 0.5) * (arenaDepth * 1.2);
            body.position.set(spawnX, spawnY, spawnZ);
            body.quaternion.setFromEuler(
                Math.random() * 0.3 - 0.15,
                Math.random() * Math.PI * 2,
                Math.random() * 0.3 - 0.15
            );
            world.addBody(body);

            // Visual mesh with text
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

        // Create initial blocks
        const initialBlocks = isMobile ? 8 : 12;
        for (let i = 0; i < initialBlocks; i++) {
            setTimeout(() => {
                if (blocks.length < MAX_BLOCKS) {
                    blocks.push(createDemandBlock(demands[demandIndex % demands.length]));
                    demandIndex++;
                }
            }, i * 100);
        }

        // Spawn more blocks over time
        const spawnInterval = setInterval(() => {
            const activeBlocks = blocks.filter(b => !b.destroyed).length;
            if (activeBlocks < MAX_BLOCKS) {
                blocks.push(createDemandBlock(demands[demandIndex % demands.length]));
                demandIndex++;
            }
        }, isMobile ? 600 : 400);

        // Create "YOU" sphere
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

        // YOU sphere visual with glow effect
        const youGeometry = new THREE.SphereGeometry(youRadius, 32, 32);

        // Create gradient texture for YOU sphere
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

        // Outer glow ring
        const outerGlowGeometry = new THREE.SphereGeometry(youRadius * 1.6, 32, 32);
        const outerGlowMaterial = new THREE.MeshBasicMaterial({
            color: 0x47B5A5,
            transparent: true,
            opacity: 0.08,
            side: THREE.BackSide
        });
        const outerGlowMesh = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
        scene.add(outerGlowMesh);

        // "YOU" text sprite
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
                depthWrite: false
            });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(1.5, 0.75, 1);
            return sprite;
        }

        const youSprite = createYouSprite();
        scene.add(youSprite);

        // Debris particles
        const debris = [];

        function createDebris(position, color) {
            const count = isMobile ? 4 : 6;
            for (let i = 0; i < count; i++) {
                const size = 0.1 + Math.random() * 0.15;
                const geometry = new THREE.BoxGeometry(size, size, size);
                const material = new THREE.MeshStandardMaterial({
                    color: color || 0xffffff,
                    transparent: true,
                    opacity: 1
                });
                const mesh = new THREE.Mesh(geometry, material);
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

        // Interaction state
        let hasBreakthrough = false;
        let isLaunching = false;

        // Raycaster for click detection
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onInteraction(event) {
            event.preventDefault();

            // Get coordinates
            const rect = renderer.domElement.getBoundingClientRect();
            let clientX, clientY;

            if (event.touches) {
                clientX = event.touches[0].clientX;
                clientY = event.touches[0].clientY;
            } else {
                clientX = event.clientX;
                clientY = event.clientY;
            }

            mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            // Check if clicking on YOU sphere
            const intersects = raycaster.intersectObject(youMesh);

            if (intersects.length > 0 || isNearYou(mouse)) {
                launchYou();
            }
        }

        function isNearYou(mousePos) {
            // Project YOU position to screen space
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

            // Reset position if fallen
            if (youBody.position.y < youRadius + 0.5) {
                youBody.position.set(0, youRadius + 0.1, 2);
            }

            // Make dynamic and launch
            youBody.mass = 8;
            youBody.updateMassProperties();

            // Strong upward force
            const launchForce = isMobile ? 350 : 450;
            youBody.velocity.set(
                (Math.random() - 0.5) * 3,
                launchForce / youBody.mass,
                (Math.random() - 0.5) * 2 - 1
            );

            // Enhance glow during launch
            youMaterialVisual.emissiveIntensity = 0.8;
            glowMaterial.opacity = 0.4;
            outerGlowMaterial.opacity = 0.2;

            setTimeout(() => {
                youMaterialVisual.emissiveIntensity = 0.3;
                glowMaterial.opacity = 0.15;
                outerGlowMaterial.opacity = 0.08;
                isLaunching = false;
            }, 500);

            // Update UI
            if (!hasBreakthrough) {
                hasBreakthrough = true;
                physicsContainer.parentElement.classList.add('activated');
                if (bottomMessage) bottomMessage.classList.add('opacity-0');
                if (breakthroughMessage) {
                    breakthroughMessage.classList.remove('hidden');
                    setTimeout(() => breakthroughMessage.classList.remove('opacity-0'), 50);
                }
            }
        }

        // Event listeners for both mouse and touch
        renderer.domElement.addEventListener('click', onInteraction);
        renderer.domElement.addEventListener('touchstart', onInteraction, { passive: false });

        // Collision detection for destroying blocks
        world.addEventListener('postStep', () => {
            const youVelocity = youBody.velocity.length();

            if (youVelocity > 5) {
                blocks.forEach(block => {
                    if (block.destroyed) return;

                    const distance = youBody.position.distanceTo(block.body.position);
                    if (distance < youRadius + 1.2) {
                        // Destroy block
                        block.destroyed = true;

                        // Create debris
                        createDebris(
                            new THREE.Vector3(
                                block.body.position.x,
                                block.body.position.y,
                                block.body.position.z
                            ),
                            0xffffff
                        );

                        // Remove from physics and scene
                        setTimeout(() => {
                            world.removeBody(block.body);
                            scene.remove(block.mesh);
                            block.mesh.geometry.dispose();
                            block.mesh.material.forEach(m => {
                                if (m.map) m.map.dispose();
                                m.dispose();
                            });
                        }, 10);
                    }
                });
            }
        });

        // Animation loop
        const clock = new THREE.Clock();
        let time = 0;

        function animate() {
            requestAnimationFrame(animate);

            const delta = Math.min(clock.getDelta(), 0.05);
            time += delta;

            // Step physics
            world.step(1 / 60, delta, 3);

            // Update block meshes
            blocks.forEach(block => {
                if (!block.destroyed) {
                    block.mesh.position.copy(block.body.position);
                    block.mesh.quaternion.copy(block.body.quaternion);

                    // Remove blocks that fell too far
                    if (block.body.position.y < -10) {
                        block.destroyed = true;
                        world.removeBody(block.body);
                        scene.remove(block.mesh);
                    }
                }
            });

            // Update YOU sphere
            youMesh.position.copy(youBody.position);
            youMesh.quaternion.copy(youBody.quaternion);

            // Update glow positions
            glowMesh.position.copy(youBody.position);
            outerGlowMesh.position.copy(youBody.position);
            youSprite.position.copy(youBody.position);
            goldLight.position.copy(youBody.position);

            // Pulsing glow effect
            const pulse = Math.sin(time * 3) * 0.05 + 0.15;
            glowMaterial.opacity = pulse;
            glowMesh.scale.setScalar(1 + Math.sin(time * 2) * 0.05);

            // Update debris
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
                    d.geometry.dispose();
                    d.material.dispose();
                    debris.splice(i, 1);
                }
            }

            // Keep YOU from falling through ground
            if (youBody.position.y < youRadius) {
                youBody.position.y = youRadius;
                youBody.velocity.y = Math.max(0, youBody.velocity.y);
            }

            renderer.render(scene, camera);
        }

        // Handle resize
        function onResize() {
            const size = getContainerSize();
            width = size.width;
            height = size.height;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }

        window.addEventListener('resize', onResize);

        // Hide loading indicator
        setTimeout(() => {
            if (physicsLoading) physicsLoading.classList.add('hidden');
        }, 500);

        // Start animation
        animate();

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(spawnInterval);
            renderer.dispose();
        });
    })();
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Simple scroll animations
gsap.registerPlugin(ScrollTrigger);

// Fade in elements as they come into view
gsap.utils.toArray('.wisdom-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        delay: i * 0.05
    });
});

// Animate journey dots
gsap.utils.toArray('.journey-dot').forEach((dot, i) => {
    gsap.from(dot, {
        scrollTrigger: {
            trigger: dot,
            start: "top 80%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.2,
        ease: "back.out(1.7)"
    });
});

// Cinematic timeline animations
const cinematicTimeline = document.querySelector('.cinematic-timeline');
if (cinematicTimeline) {
    // Animate title and subtitle
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

    // Animate timeline moments
    const timelineMoments = cinematicTimeline.querySelectorAll('.timeline-moment');
    const timelineProgress = cinematicTimeline.querySelector('.timeline-progress');

    timelineMoments.forEach((moment, index) => {
        ScrollTrigger.create({
            trigger: moment,
            start: "top 70%",
            onEnter: () => {
                moment.classList.add('active');

                // Update progress bar
                if (timelineProgress) {
                    const progress = ((index + 1) / timelineMoments.length) * 100;
                    timelineProgress.style.height = `${progress}%`;
                }

                // Animate conversation bubbles
                const bubbles = moment.querySelectorAll('.conversation-bubble');
                bubbles.forEach((bubble, i) => {
                    setTimeout(() => {
                        bubble.classList.add('visible');
                    }, 200 + (i * 300));
                });
            }
        });
    });

    // Enhanced parallax effect for moment times
    gsap.utils.toArray('.moment-time').forEach((time, index) => {
        // Different parallax speeds for variety
        const speed = time.textContent.includes('MOMENT') ? -80 : -60;

        gsap.to(time, {
            yPercent: speed,
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

        // Add subtle rotation for "THE MOMENT"
        if (time.textContent.includes('MOMENT')) {
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

    // Glow animations
    gsap.utils.toArray('.timeline-glow').forEach(glow => {
        gsap.to(glow, {
            x: "random(-50, 50)",
            y: "random(-50, 50)",
            duration: "random(15, 25)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
}

// Mailchimp modal functionality - wait for DOM to be ready
function initializeModal() {
    const emailModal = document.getElementById('emailModal');
    const mailchimpForm = document.getElementById('mc-embedded-subscribe-form');
    const emailInput = document.getElementById('mce-EMAIL');
    const nameInput = document.getElementById('mce-FNAME');

    console.log('Initializing modal...', { emailModal, mailchimpForm });

    // Add click handlers to all CTA buttons
    document.querySelectorAll('.primary-btn').forEach(button => {
        console.log('Adding click handler to button:', button);
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('CTA button clicked, emailModal exists:', !!emailModal);
            if (emailModal) {
                console.log('Before showing modal, classes:', emailModal.className);
                emailModal.classList.remove('hidden');
                emailModal.classList.add('flex');
                console.log('After showing modal, classes:', emailModal.className);
                console.log('Modal computed style display:', window.getComputedStyle(emailModal).display);

                if (nameInput) nameInput.focus();

                // Track button click
                const buttonText = button.textContent.trim();
                console.log('CTA clicked:', buttonText);
            } else {
                console.error('emailModal not found!');
            }
        });
    });

    // Close modal when clicking outside
    if (emailModal) {
        emailModal.addEventListener('click', (e) => {
            if (e.target === emailModal) {
                emailModal.classList.add('hidden');
                emailModal.classList.remove('flex');
            }
        });
    }

    // Close modal with close button
    const closeButton = document.getElementById('closeModal');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (emailModal) {
                emailModal.classList.add('hidden');
                emailModal.classList.remove('flex');
            }
        });
    }

    // Handle successful Mailchimp submission
    if (mailchimpForm) {
        mailchimpForm.addEventListener('submit', function (e) {
            try {
                // Track email capture
                const email = emailInput ? emailInput.value : '';
                const name = nameInput ? nameInput.value : '';

                console.log('Mailchimp form submitted:', { email, name });

                // Close modal after a short delay to allow form submission
                setTimeout(() => {
                    if (emailModal) {
                        emailModal.classList.add('hidden');
                        emailModal.classList.remove('flex');
                    }
                }, 1000);
            } catch (error) {
                console.error('Error handling form submission:', error);
            }
        });
    }
}

// Initialize modal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeModal);
} else {
    initializeModal();
}

// Debug function to test modal manually
window.testModal = function () {
    const emailModal = document.getElementById('emailModal');
    if (emailModal) {
        console.log('Testing modal...');
        emailModal.classList.remove('hidden');
        emailModal.classList.add('flex');
        emailModal.style.display = 'flex';
        console.log('Modal should be visible now');
    } else {
        console.error('Modal not found for testing');
    }
};