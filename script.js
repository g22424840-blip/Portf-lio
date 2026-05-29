/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mx = -100, my = -100;
let rx = -100, ry = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

/* ── Intersection Observer: scroll reveal + skill bars ── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('skill-card')) {
        entry.target.classList.add('animated');
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

/* ── Hero glow parallax ── */
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const glow = document.querySelector('.hero-glow-center');
  if (glow) {
    glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  }
});
