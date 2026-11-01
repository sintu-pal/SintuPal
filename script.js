
<script>
document.addEventListener("DOMContentLoaded", function () {

    // Select existing portfolio elements
    const animatedElements = document.querySelectorAll(`
        main > section:not(#about),
        #experience .relative.pl-10.group,
        #projects .grid > div
    `);

    // Add animation classes
    animatedElements.forEach((element, index) => {
        element.classList.add("scroll-reveal");

        // Stagger individual card animations
        element.style.transitionDelay =
            `${(index % 3) * 120}ms`;
    });

    // Observe elements during scrolling
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (event) {

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
</script>
