// Used by index.html (redesign, 2026-11-10). The previous script, main.js, is no longer linked.
// Progressive enhancement only: the page works fully without this file.
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

/* --- Recorded call player --------------------------------------------------
   Plays assets/audio/layan-demo.mp3. If the file can't play, the button falls
   back to opening WhatsApp so the visitor never hits a dead control. */
const playBtn = document.getElementById('demo-play');
const audio = document.getElementById('demo-audio');
const eq = document.getElementById('demo-eq');
const note = document.getElementById('demo-note');
const bar = document.getElementById('demo-bar');
const cur = document.getElementById('demo-cur');
const dur = document.getElementById('demo-dur');
const WA_FALLBACK = 'https://wa.me/962792977389?text=' +
  encodeURIComponent('مرحبا، بدي أسمع مكالمة تجريبية مع ليان');

const clock = (seconds) => {
  if (!Number.isFinite(seconds)) return '';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ':' + String(s).padStart(2, '0');
};

if (playBtn && audio) {
  const iconPlay = playBtn.querySelector('.ic-play');
  const iconPause = playBtn.querySelector('.ic-pause');

  const showPlaying = (playing) => {
    playBtn.setAttribute('aria-pressed', String(playing));
    if (iconPlay) iconPlay.toggleAttribute('hidden', playing);
    if (iconPause) iconPause.toggleAttribute('hidden', !playing);
    if (eq) eq.classList.toggle('playing', playing);
  };

  const fallbackToWhatsApp = () => {
    if (note) {
      note.textContent = 'التسجيل ما اشتغل عندك. احكينا على واتساب ونسمّعك ياه.';
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
  audio.addEventListener('error', () => showPlaying(false));

  audio.addEventListener('loadedmetadata', () => {
    if (dur) dur.textContent = clock(audio.duration);
  });
  audio.addEventListener('timeupdate', () => {
    if (cur) cur.textContent = clock(audio.currentTime);
    if (bar && audio.duration) {
      bar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
    }
  });
}

/* --- Things that "arrive" when scrolled to --------------------------------
   Content is visible by default. Only when motion is allowed do we hide a
   list just before it enters the screen, then let its rows arrive in order.
   The lit window in the night section switches on the same way. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const swap = (el, from, to) => { el.classList.remove(from); el.classList.add(to); };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('seq-ready')) swap(el, 'seq-ready', 'seq-play');
      if (el.classList.contains('lamp-ready')) swap(el, 'lamp-ready', 'lamp-play');
      obs.unobserve(el);

      // Morning list: once the rows have arrived, one request gets confirmed,
      // the way the receptionist would do it.
      const chip = el.querySelector('[data-confirm]');
      if (chip) {
        setTimeout(() => {
          chip.textContent = chip.dataset.confirm;
          chip.classList.add('is-confirmed');
        }, 2600);
      }
    });
  }, { threshold: 0.3 });

  // The WhatsApp example plays like a real chat (slower timing, set in CSS).
  const chat = document.querySelector('.thread--full .thread-body');
  if (chat) chat.setAttribute('data-seq', 'chat');

  document.querySelectorAll('[data-seq]').forEach((list) => {
    Array.from(list.children).forEach((row, i) => row.style.setProperty('--i', i));
    list.classList.add('seq-ready');
    io.observe(list);
  });

  document.querySelectorAll('.windows').forEach((windows) => {
    windows.classList.add('lamp-ready');
    io.observe(windows);
  });

  /* The clock reaching 9:00. The page always says 9:00 in its HTML; here the
     time is set back two minutes just as it enters the screen, then ticks
     forward once it is fully visible. */
  const tickIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      const steps = el.dataset.tick.split(',');
      if (entry.isIntersecting && !el.dataset.primed) {
        el.dataset.primed = '1';
        el.textContent = steps[0];
      }
      if (entry.intersectionRatio >= 1 && !el.dataset.ran) {
        el.dataset.ran = '1';
        tickIO.unobserve(el);
        steps.slice(1).forEach((value, i) => {
          setTimeout(() => {
            el.textContent = value;
            if (i === steps.length - 2) el.classList.add('tick-done');
          }, 600 + i * 550);
        });
      }
    });
  }, { threshold: [0, 1] });

  document.querySelectorAll('[data-tick]').forEach((el) => tickIO.observe(el));
}
