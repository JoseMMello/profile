/* ─── INTERSECTION OBSERVER – fade-in on scroll ───────────────────────── */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(
  '.skill-category, .timeline-item, .contact-card, .edu-card'
).forEach((el, i) => {
  el.classList.add('fade-target');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});
