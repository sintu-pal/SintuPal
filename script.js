document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal sections and cards as they enter the viewport
  const revealItems = document.querySelectorAll(
    ".section-heading, .about-card, .focus-item, .timeline-item, " +
    ".project-card, .skill-card, .education-grid article, .closing-cta"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    revealItems.forEach((item, index) => {
      item.classList.add("reveal");
      item.style.transitionDelay = `${(index % 3) * 90}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Rotating professional focus line with a typing effect
  const typing = document.getElementById("typing-text");
  const phrases = [
    "critical applications reliable.",
    "financial data flowing.",
    "production platforms stable.",
    "complex issues moving toward resolution."
  ];
  if (typing && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let deleting = false;

    const type = () => {
      const phrase = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        typing.textContent = phrase.slice(0, charIndex);
        if (charIndex >= phrase.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        charIndex--;
        typing.textContent = phrase.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 35 : 65);
    };
    setTimeout(type, 1800);
  }
});
