/* ─── PARALLAX + PIXEL PARTICLES ──────────────────────────────────────── */

const COLORS = ['#00ff9f', '#7c3aed', '#ff4d6d', '#00d4ff'];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function buildParticles(containerId, count, sizeRange, opacityRange) {
  const el = document.getElementById(containerId);
  if (!el) return;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'pixel-dot';
    const size = randomBetween(sizeRange[0], sizeRange[1]);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const opacity = randomBetween(opacityRange[0], opacityRange[1]);
    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${randomBetween(0, 100)}%;
      top: ${randomBetween(0, 140)}%;
      background: ${color};
      opacity: ${opacity};
      box-shadow: 0 0 ${size * 2}px ${color};
    `;
    el.appendChild(dot);
  }
}

buildParticles('layer1', 60, [2, 6],  [0.08, 0.4]);
buildParticles('layer2', 30, [6, 14], [0.06, 0.25]);
buildParticles('layer3', 15, [14, 28],[0.04, 0.12]);

/* ─── SCROLL PARALLAX ─────────────────────────────────────────────────── */

let ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

function updateParallax() {
  const scrollY = window.scrollY;

  // Hero background layers
  const bg = document.getElementById('parallaxBg');
  if (bg) bg.style.transform = `translateY(${scrollY * 0.45}px)`;

  const l1 = document.getElementById('layer1');
  if (l1) l1.style.transform = `translateY(${scrollY * 0.15}px)`;

  const l2 = document.getElementById('layer2');
  if (l2) l2.style.transform = `translateY(${scrollY * 0.28}px)`;

  const l3 = document.getElementById('layer3');
  if (l3) l3.style.transform = `translateY(${scrollY * 0.05}px)`;

  // Divider stripe parallax
  const dl = document.getElementById('dividerLayer');
  if (dl) dl.style.transform = `translateX(${scrollY * 0.08}px)`;

  ticking = false;
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ─── INTERSECTION OBSERVER – fade-in sections ─────────────────────────── */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.skill-category, .timeline-item, .contact-card, .about-grid'
).forEach((el) => {
  el.classList.add('fade-target');
  observer.observe(el);
});

/* inject fade CSS */
const style = document.createElement('style');
style.textContent = `
  .fade-target {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 600ms ease, transform 600ms ease;
  }
  .fade-target.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .skill-category:nth-child(2).fade-target { transition-delay: 120ms; }
  .skill-category:nth-child(3).fade-target { transition-delay: 240ms; }
  .timeline-item:nth-child(2).fade-target { transition-delay: 160ms; }
  .contact-card:nth-child(2).fade-target { transition-delay: 120ms; }
  .contact-card:nth-child(3).fade-target { transition-delay: 240ms; }
`;
document.head.appendChild(style);
