/**
 * Sintu Pal - Portfolio Core JavaScript Framework
 * Handles UI interactions, dynamic content switching, observability tracking, and telemetry logic.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SUB-NAVIGATION & SECTION TOGGLING (Resume Tabs)
    // ==========================================
    const tabButtons = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.getAttribute('data-tab-target');

                // Update active state on buttons
                tabButtons.forEach(btn => {
                    btn.classList.remove('text-teal-400', 'border-teal-400', 'bg-slate-800/50');
                    btn.classList.add('text-slate-400', 'border-transparent');
                });
                button.classList.add('text-teal-400', 'border-teal-400', 'bg-slate-800/50');
                button.classList.remove('text-slate-400', 'border-transparent');

                // Toggle visibility animations for the sections
                tabContents.forEach(content => {
                    if (content.getAttribute('id') === target) {
                        content.classList.remove('hidden');
                        content.classList.add('block', 'animate-fade-in');
                    } else {
                        content.classList.remove('block', 'animate-fade-in');
                        content.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ==========================================
    // 2. THEME SWITCHER (System Default / Dark / Light)
    // ==========================================
    const themeDropdown = document.querySelector('[data-theme-select]');
    
    // Apply initial saved theme preference or fallback to system configuration
    const applyTheme = (theme) => {
        const root = document.documentElement;
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
            document.body.style.backgroundColor = '#0f172a'; // Force Slate-900 baseline
        } else {
            root.classList.remove('dark');
            document.body.style.backgroundColor = '#f8fafc'; // Slate-50 light mode baseline
        }
        localStorage.setItem('portfolio-theme', theme);
    };

    if (themeDropdown) {
        themeDropdown.addEventListener('change', (e) => {
            applyTheme(e.target.value);
        });
        // Set initial selector state from storage
        const savedTheme = localStorage.getItem('portfolio-theme') || 'system';
        themeDropdown.value = savedTheme;
        applyTheme(savedTheme);
    }

    // ==========================================
    // 3. INTERACTIVE CONTACT FORM SUBMISSION WITH TELEMETRY
    // ==========================================
    const contactForm = document.getElementById('portfolioContactForm');
    const formStatusMessage = document.getElementById('formStatus');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            // Collect operational data payloads
            const formData = new FormData(contactForm);
            
            // Visual feedback loop startup (Loading Phase)
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = `<i class="fas fa-spinner animate-spin"></i> Processing...`;
            }
            
            formStatusMessage.textContent = "Telemetry connection active. Delivering payload...";
            formStatusMessage.className = "text-xs font-mono text-teal-400 mt-2 block transition-all animate-pulse";

            try {
                // Point this to your Formspree endpoint token (e.g., https://formspree.io)
                const response = await fetch(contactForm.action || 'https://formspree.io', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success validation loop triggered
                    formStatusMessage.textContent = "✓ Message sent successfully! Operational queues updated.";
                    formStatusMessage.className = "text-xs font-mono text-emerald-400 mt-2 block border border-emerald-500/20 bg-emerald-500/5 p-2 rounded";
                    contactForm.reset();
                } else {
                    const errorPayload = await response.json();
                    formStatusMessage.textContent = `Submission rejected: ${errorPayload.errors ? errorPayload.errors.map(err => err.message).join(', ') : 'Server Exception'}`;
                    formStatusMessage.className = "text-xs font-mono text-rose-400 mt-2 block border border-rose-500/20 bg-rose-500/5 p-2 rounded";
                }
            } catch (networkError) {
                // Circuit breaker fallback protocol execution
                formStatusMessage.textContent = "Connection Failure: Check network configurations or fallback to direct LinkedIn routing.";
                formStatusMessage.className = "text-xs font-mono text-rose-400 mt-2 block border border-rose-500/20 bg-rose-500/5 p-2 rounded";
            } finally {
                // Reset interaction parameters
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = `<i class="fas fa-paper-plane"></i> Send Message`;
                }
            }
        });
    }

    // ==========================================
    // 4. OBSERVABILITY SMOOTH ELEMENT ANCHORING
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
