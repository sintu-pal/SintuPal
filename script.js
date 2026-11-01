document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. HIGH-PERFORMANCE SCROLL REVEAL LOGIC
    // ==========================================
    // Step A: Target all core segments to dynamically transition into view
    const targetSections = document.querySelectorAll('section, #experience, #projects, #skills, #education, hr');
    
    const revealOptions = {
        root: null, // evaluates relative to the device viewport
        threshold: 0.05, // triggers when at least 5% of the item is visible
        rootMargin: "0px 0px -40px 0px" // triggers slightly before entering view for fluid pacing
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Unobserve once animated to free up system memory
            }
        });
    }, revealOptions);

    targetSections.forEach(section => {
        section.classList.add('reveal-on-scroll'); // Inject the CSS transition base hook
        sectionObserver.observe(section);
    });


    // ==========================================
    // 2. RECRUITER HEADLINE AUTOMATED TYPING ENGINE
    // ==========================================
    // Step B: Locate your text title target element (or replace your span text header with id="typing-header")
    const typingSpan = document.getElementById('typing-header') || document.querySelector('main span.text-teal-400');
    
    if (typingSpan) {
        // Professional headlines array showcasing your exact expertise focus
        const technicalTitles = [
            "System Analyst", 
            "Production Support Specialist", 
            "BFSI Infrastructure Reliability Engineer",
            "Cloud Ops Analytics Specialist"
        ];
        
        let currentTitleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        typingSpan.classList.add('typing-cursor');

        function executeTypingCycle() {
            const currentFullText = technicalTitles[currentTitleIndex];

            if (isDeleting) {
                // Delete text character
                typingSpan.textContent = currentFullText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40; // speed up deletion loop
            } else {
                // Construct text character
                typingSpan.textContent = currentFullText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // standard typing speed pacing
            }

            // Word construction complete state routing
            if (!isDeleting && charIndex === currentFullText.length) {
                typingSpeed = 2000; // Pause display state at full word completion for readability
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % technicalTitles.length; // cycle next word configuration
                typingSpeed = 400; // brief recovery buffer pause before typing next title
            }

            setTimeout(executeTypingCycle, typingSpeed);
        }

        // Initialize typing timeline simulation loop
        setTimeout(executeTypingCycle, 1000);
    }
});
