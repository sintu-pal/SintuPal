
document.addEventListener("DOMContentLoaded", () => {

    // Select portfolio sections and cards
    const elements = document.querySelectorAll(
        "section, main article, .experience-card, " +
        ".project-card, .skill-card, .section-title"
    );

    // Add reveal animation
    elements.forEach((element, index) => {
        if (!element.classList.contains("reveal")) {
            element.classList.add("reveal");
        }

        // Slightly stagger the animation
        element.style.transitionDelay =
            `${(index % 4) * 100}ms`;
    });

    // Intersection Observer
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });

    // Hero animation
    const hero = document.querySelector("h1");

    if (hero) {
        hero.classList.add("hero-animation");
    }

    // Smooth navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function(event) {
            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

});
