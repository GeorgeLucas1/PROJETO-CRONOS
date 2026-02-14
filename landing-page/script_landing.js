// ══════════════════════════════════════════════
//  CRONOS — script_landing.js  (versão corrigida)
// ══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── CURSOR ──
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  if (cur && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top  = my + 'px';
    });

    function animRing() {
      rx += (mx - rx) * .12;
      ry += (my - ry) * .12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => { cur.classList.add('active');    ring.classList.add('active');    });
      el.addEventListener('mouseleave', () => { cur.classList.remove('active'); ring.classList.remove('active'); });
    });
  }

  // ── NAV SCROLL ──
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ── WAVE BG ──
  const cv = document.getElementById('bg-canvas');
  if (cv) {
    const cx = cv.getContext('2d');

    function rs() { cv.width = window.innerWidth; cv.height = window.innerHeight; }
    rs();
    window.addEventListener('resize', rs);

    const ws = [
      { a: 45, f: .010, sp: .014, ph: 0,   color: 'rgba(87,16,209,.65)',   y: .25 },
      { a: 30, f: .016, sp: .020, ph: 1.4,  color: 'rgba(160,80,255,.42)',  y: .42 },
      { a: 55, f: .008, sp: .010, ph: 2.6,  color: 'rgba(50,0,130,.55)',    y: .58 },
      { a: 24, f: .020, sp: .028, ph: .8,   color: 'rgba(192,120,255,.28)', y: .72 },
      { a: 40, f: .006, sp: .008, ph: 3.6,  color: 'rgba(75,8,160,.5)',     y: .85 },
      { a: 18, f: .024, sp: .036, ph: 5.2,  color: 'rgba(130,40,220,.3)',   y: .95 },
    ];

    let t = 0;
    function draw() {
      cx.clearRect(0, 0, cv.width, cv.height);
      ws.forEach(w => {
        cx.beginPath();
        const by = cv.height * w.y;
        cx.moveTo(0, by);
        for (let x = 0; x <= cv.width; x += 3) {
          const y = by
            + Math.sin(x * w.f + t * w.sp + w.ph) * w.a
            + Math.sin(x * w.f * 1.7 + t * w.sp * .6 + w.ph) * (w.a * .4);
          cx.lineTo(x, y);
        }
        cx.lineTo(cv.width, cv.height);
        cx.lineTo(0, cv.height);
        cx.closePath();
        const g = cx.createLinearGradient(0, by - w.a, 0, by + w.a * 2.2);
        g.addColorStop(0, w.color);
        g.addColorStop(1, 'transparent');
        cx.fillStyle = g;
        cx.fill();
      });
      t++;
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ── MINI CHART ──
  const mc = document.getElementById('miniChart');
  if (mc) {
    const vals = [45, 62, 55, 80, 70, 88, 72, 95, 60, 85, 78, 100];
    const max  = Math.max(...vals);
    mc.innerHTML = vals.map((v, i) => {
      const h   = Math.round((v / max) * 52) + 4;
      const clr = i === vals.length - 1 ? 'var(--verde)' : 'rgba(184,127,255,.4)';
      return `<div class="mcb" style="height:${h}px;background:${clr}"></div>`;
    }).join('');
  }

  // ── CAROUSEL ──
  const slides  = document.querySelectorAll('.carousel-slide');
  const track   = document.getElementById('carouselTrack');
  const dotsEl  = document.getElementById('ccDots');
  const btnPrev = document.getElementById('ccPrev');
  const btnNext = document.getElementById('ccNext');

  if (slides.length && track && dotsEl) {
    let current = 0;
    const total   = slides.length;
    const visible = 3;

    // Garante que o primeiro slide começa como active
    slides.forEach((s, i) => s.classList.toggle('active', i === 0));

    // Constrói dots
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.className = 'cc-dot' + (i === 0 ? ' active' : '');
      d.onclick   = () => goSlide(i);
      dotsEl.appendChild(d);
    }

    function goSlide(n) {
      slides[current].classList.remove('active');
      current = ((n % total) + total) % total;   // ← wrap seguro sem NaN
      slides[current].classList.add('active');

      const slideW = 344;
      const offset = Math.max(0, Math.min(current - 1, total - visible)) * slideW;
      track.style.transform = `translateX(-${offset}px)`;

      document.querySelectorAll('.cc-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
    }

    if (btnPrev) btnPrev.onclick = () => goSlide(current - 1);
    if (btnNext) btnNext.onclick = () => goSlide(current + 1);

    let autoTimer = setInterval(() => goSlide(current + 1), 3600);
    track.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => goSlide(current + 1), 3600);
    });
  }

  // ── HOW IT WORKS ──
  const steps = document.querySelectorAll('.how-step');
  const panels = document.querySelectorAll('.visual-panel');

  if (steps.length) {
    steps.forEach(s => {
      s.addEventListener('click', () => {
        const n = +s.dataset.step;
        steps.forEach(x  => x.classList.remove('active'));
        panels.forEach((p, i) => p.classList.toggle('active', i === n));
        s.classList.add('active');
      });
    });

    // auto-cycle
    let howIdx = 0;
    setInterval(() => {
      howIdx = (howIdx + 1) % steps.length;
      steps[howIdx].click();
    }, 4000);
  }

  // ── SCROLL REVEAL ──
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: .12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── COUNT UP ANIMATION ──
  const numObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;

      const el = e.target.querySelector('[data-target]');
      if (!el || el.dataset.done) return;
      el.dataset.done = '1';

      const target = +el.dataset.target;
      let start = 0;
      const dur  = 1800;
      const step = 16;
      const inc  = target / (dur / step);

      // Sufixo correto para cada métrica
      const suffix = target === 3 ? '×'
                   : target === 87 ? '%'
                   : target === 40 ? '%'
                   : target === 100 ? '%'
                   : '';

      const timer = setInterval(() => {
        start = Math.min(start + inc, target);
        el.textContent = Math.round(start) + suffix;
        if (start >= target) clearInterval(timer);
      }, step);

      e.unobserve(e.target);
    });
  }, { threshold: .4 });

  document.querySelectorAll('.metric-card').forEach(c => numObserver.observe(c));

}); // fim DOMContentLoaded