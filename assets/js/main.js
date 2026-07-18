// Progressive enhancement only — the page works fully without this file.
// (All WhatsApp links still work as plain wa.me links if JS is disabled.)

/* --- Current year in footer ----------------------------------------------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* --- WhatsApp links: attach a pre-filled Arabic message safely ------------
   We build ?text=... in JS so the Arabic is encoded correctly and the raw
   href stays a clean, working wa.me link without JS. */
document.querySelectorAll('a[data-wa-text]').forEach((link) => {
  const msg = link.getAttribute('data-wa-text');
  if (!msg) return;
  const sep = link.href.includes('?') ? '&' : '?';
  link.href = link.href + sep + 'text=' + encodeURIComponent(msg);
});

/* --- Mobile nav disclosure ------------------------------------------------ */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
if (toggle && navLinks) {
  const closeNav = () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  // Close after tapping a link, or on Escape.
  navLinks.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeNav();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
}

/* --- Demo audio player ----------------------------------------------------
   Plays assets/audio/layan-demo.mp3 when present. If the file is missing (or
   can't load), the button gracefully falls back to opening WhatsApp so the
   visitor never hits a dead control. */
const playBtn = document.getElementById('demo-play');
const audio = document.getElementById('demo-audio');
const eq = document.getElementById('demo-eq');
const note = document.getElementById('demo-note');
const WA_FALLBACK = 'https://wa.me/962792977389?text=' +
  encodeURIComponent('مرحبا، بدي أسمع مكالمة تجريبية مع لَيان');

if (playBtn && audio) {
  const iconPlay = playBtn.querySelector('.ic-play');
  const iconPause = playBtn.querySelector('.ic-pause');

  const showPlaying = (playing) => {
    playBtn.setAttribute('aria-pressed', String(playing));
    if (iconPlay) iconPlay.hidden = playing;
    if (iconPause) iconPause.hidden = !playing;
    if (eq) eq.classList.toggle('playing', playing);
  };

  const fallbackToWhatsApp = () => {
    if (note) {
      note.textContent = 'المكالمة التجريبية رح تكون جاهزة قريباً — احكينا على واتساب ونسمّعك ياها.';
    }
    window.open(WA_FALLBACK, '_blank', 'noopener');
  };

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      const p = audio.play();
      if (p && typeof p.catch === 'function') p.catch(fallbackToWhatsApp);
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => showPlaying(true));
  audio.addEventListener('pause', () => showPlaying(false));
  audio.addEventListener('ended', () => showPlaying(false));
  audio.addEventListener('error', () => { showPlaying(false); });
}

/* --- Scroll reveal (enhances an already-visible default) ------------------
   Content is visible by default; JS only adds .reveal (which hides then
   animates in) when motion is allowed and IntersectionObserver exists. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll('.section-head, .stat, .feature, .step, .price, .why, .demo-card, .call-card');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
    io.observe(el);
  });
}
