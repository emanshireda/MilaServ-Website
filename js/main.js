/* MilaServ homepage scripts — four small independent blocks */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. Header border after scrolling */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* 2. Close the mobile menu after choosing a link */
const menu = document.getElementById('mainNav');
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
}));

/* 3. Reveal [data-reveal] items once, staggered within each row of three */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('[data-reveal]').forEach((el, i) => {
  el.style.setProperty('--d', `${(i % 3) * 0.1}s`);
  revealObserver.observe(el);
});

/* 4. Count-up for metrics: <b data-count="4.7" data-decimals="1"> */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = +el.dataset.decimals || 0;
  const fmt = new Intl.NumberFormat('ar-EG', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const start = performance.now(), duration = 1400;
  (function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = fmt.format(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}
if (!reduceMotion) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); countObserver.unobserve(e.target); } });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
}

/* Footer year */
document.getElementById('year').textContent = new Intl.NumberFormat('ar-EG', { useGrouping: false }).format(new Date().getFullYear());
