/* =========================================================
   Parth Chaudhari — portfolio
   Plain JavaScript, no build step. Works on GitHub Pages as-is.
   ========================================================= */
(() => {
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover)').matches;
const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const css = name => getComputedStyle(root).getPropertyValue(name).trim();
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------------- Content ---------------- */
const LINKS = {
  email: 'parth.chaudhari@students.iiit.ac.in',
  github: 'https://github.com/Parth12-ui',
  linkedin: 'https://www.linkedin.com/in/parthnc/',
  resume: 'assets/Parth_Chaudhari_Resume.pdf',
};

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: 'ML & NLP' },
  { id: 'cv', label: 'Computer vision' },
  { id: 'systems', label: 'Systems' },
  { id: 'net', label: 'Networking' },
  { id: 'web', label: 'Web & IoT' },
];

const PROJECTS = [
  {
    id: 'llm', icon: '?!', title: 'LLM Confidence Under Pressure', when: 'Sep – Oct 2026', cats: ['ml'],
    stack: ['PyTorch', 'Hugging Face', 'W&B'],
    blurb: 'Do language models hold on to a right answer when a user keeps telling them they are wrong?',
    body: [
      'Course project for Advanced NLP (ANLP). I built a reproducible multi-turn pipeline that puts Qwen2.5-7B and Llama-3.1-8B through six turns of criticism, praise or a neutral control.',
      'It runs on 450 claims whose truth is known (from MATH-500 and real analysis), and logs each turn\'s verdict, token-probability probes and the model\'s stated confidence.',
      'Criticism hurt Llama far more than Qwen. Harsher tone on its own did little; it only mattered when paired with a claim that the answer was wrong.',
    ],
    repo: 'https://github.com/Parth12-ui/CONFIDENCE-matters_ANLP', demo: 'llm',
  },
  {
    id: 'polygons', icon: '◬', title: 'Passing Polygons', when: 'Apr 2026 – now', cats: ['cv', 'ml'],
    stack: ['Python', 'OpenCV', 'YOLO', 'K-Means'],
    blurb: 'Computer vision that reads a football match: passes, formations and which actions create chances.',
    body: [
      'Research with Prof. Kamalakar Karlapalem at the Data Sciences and Analytics Center, IIIT-H.',
      'YOLO detects the players and the ball; K-Means clustering on jersey colours separates the two teams. From there the software tracks passes, formations and attacking patterns.',
      'Each action gets a score for how much it adds to the chances created, and the results are visualised over the pitch. The animated background on this site is a small homage to it.',
    ],
    repo: 'https://github.com/Parth12-ui/Passing_polygons', demo: 'kmeans',
  },
  {
    id: 'shell', icon: '$_', title: 'C-Shell', when: 'Sep 2025', cats: ['systems'],
    stack: ['C', 'POSIX'],
    blurb: 'A POSIX-compliant UNIX shell with a grammar-based parser, pipelines and job control.',
    body: [
      'The command parser is driven by a context-free grammar (CFG), and supports multi-stage pipelines and input/output redirection.',
      'Custom signal handling for Ctrl-C (SIGINT) and Ctrl-Z (SIGTSTP), job control with fg/bg, asynchronous reaping of finished processes, and history that persists across sessions.',
    ],
    repo: 'https://github.com/Parth12-ui/C-Shell', demo: 'parse',
  },
  {
    id: 'net', icon: '⇄', title: 'Reliable Transport over UDP', when: 'Sep – Oct 2025', cats: ['systems', 'net'],
    stack: ['C', 'TCP', 'UDP', 'HTTP', 'DNS'],
    blurb: 'A TCP-like protocol built on UDP: handshakes, sliding windows, cumulative ACKs and retransmission.',
    body: [
      'Part of my Network Protocol Suite. The protocol does its own connection handshake, sliding-window flow control, cumulative acknowledgements and retransmission of lost packets.',
      'On top of it I built a client-server chat and a file transfer tool that checks files with MD5, using select() to handle many connections without blocking.',
    ],
    repo: 'https://github.com/Parth12-ui/Net_Protocol-Suite', demo: 'window',
  },
  {
    id: 'sniffer', icon: '0x', title: 'Packet Sniffer', when: 'Sep – Oct 2025', cats: ['systems', 'net'],
    stack: ['C', 'libpcap', 'BPF'],
    blurb: 'A terminal network sniffer that decodes live traffic layer by layer.',
    body: [
      'Captures network frames in real time with libpcap and Berkeley Packet Filters (BPF).',
      'Decodes Ethernet, IPv4/IPv6, ARP and TCP/UDP, and keeps sessions in memory so you can inspect payloads afterwards as hex and ASCII.',
    ],
    repo: 'https://github.com/Parth12-ui/packet_sniffer', demo: 'hex',
  },
  {
    id: 'docs', icon: '¶', title: 'CLI-Docs', when: 'Sep 2025', cats: ['systems', 'net'],
    stack: ['C', 'TCP sockets', 'POSIX threads'],
    blurb: 'A distributed shared-document system where many people can edit the same file at once.',
    body: [
      'Multi-threaded naming and storage servers talking over TCP sockets.',
      'Sentence-level locks let people edit different sentences of the same document at once without conflicts. Owners approve access requests.',
      'Also: metadata that survives restarts, word-by-word streaming of content, and one shared error-handling framework across every server.',
    ],
    repo: 'https://github.com/Parth12-ui/CLI-Docs', demo: 'locks',
  },
  {
    id: 'printer', icon: '▲', title: 'Remote 3D Printer Control', when: 'Jan – May 2026', cats: ['web'],
    stack: ['React', 'MQTT', 'ESP32', 'Three.js'],
    blurb: 'Run and watch a network of 3D printers from any browser. Internship at Cosmic 3D, Maker\'s Lab.',
    body: [
      'A web system for controlling and monitoring 3D printers over the internet, built during the DASS course with Cosmic 3D.',
      'MQTT messages carry live updates between the backend API, a React dashboard and ESP32 firmware on the printers: telemetry one way, commands the other.',
      'File management with G-code slicing, 3D model previews in Three.js, and sign-in so several users can share a printer network safely.',
    ],
    repo: null, demo: 'mqtt',
  },
];

const SKILLS = {
  'Languages': ['Python', 'C/C++', 'SQL', 'JavaScript', 'HTML/CSS', 'Arduino C++'],
  'Frameworks': ['PyTorch', 'Hugging Face Transformers', 'TensorFlow', 'Scikit-Learn', 'React', 'Node.js', 'Express', 'FastAPI'],
  'Tools': ['Git', 'Docker', 'Google Cloud Platform', 'Weights & Biases', 'Slurm', 'Linux', 'VS Code', 'PyCharm', 'ESP-32', 'MongoDB'],
  'Libraries': ['pandas', 'NumPy', 'Matplotlib', 'OpenCV', 'YOLO', 'bitsandbytes'],
};
// Which projects each skill appears in (only where the resume says so).
const SKILL_USES = {
  'Python': ['llm', 'polygons'], 'C/C++': ['shell', 'net', 'sniffer', 'docs'], 'JavaScript': ['printer'],
  'HTML/CSS': ['printer'], 'PyTorch': ['llm'], 'Hugging Face Transformers': ['llm'], 'React': ['printer'],
  'Weights & Biases': ['llm'], 'Linux': ['shell', 'sniffer'], 'ESP-32': ['printer'], 'OpenCV': ['polygons'], 'YOLO': ['polygons'],
};
const byId = Object.fromEntries(PROJECTS.map(p => [p.id, p]));

/* ---------------- Small UI helpers ---------------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}
async function copyEmail() {
  try { await navigator.clipboard.writeText(LINKS.email); toast('Email copied to clipboard ✓'); }
  catch { toast(LINKS.email); }
}
const themeListeners = [];
function setTheme(t) {
  root.dataset.theme = t;
  try { localStorage.setItem('theme', t); } catch {}
  themeListeners.forEach(f => f());
}
const toggleTheme = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');

$('#year').textContent = new Date().getFullYear();
$$('.modKey').forEach(k => k.textContent = isMac ? '⌘' : 'Ctrl');
$('#themeBtn').addEventListener('click', toggleTheme);
$('#copyEmail').addEventListener('click', copyEmail);

/* ---------------- Nav, progress, active section ---------------- */
const nav = $('#nav'), prog = $('#progress');
function onScroll() {
  const h = document.documentElement.scrollHeight - innerHeight;
  prog.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
  nav.classList.toggle('scrolled', scrollY > 20);
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();

const navLinks = $$('.nav-links a');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => secObs.observe(s));

const menuBtn = $('#menuBtn'), navList = $('#navLinks');
menuBtn.addEventListener('click', () => {
  const open = navList.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', open);
});
navLinks.forEach(a => a.addEventListener('click', () => { navList.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }));

/* ---------------- Cursor glow, magnetic buttons, tilt ---------------- */
if (canHover && !reduced) {
  const glow = $('.cursor-glow');
  addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }, { passive: true });
}
function magnetic(el) {
  if (!canHover || reduced) return;
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`;
  });
  el.addEventListener('pointerleave', () => { el.style.transform = ''; });
}
function tilt(el, max = 6) {
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%');
    if (canHover && !reduced) el.style.transform = `perspective(900px) rotateX(${(.5 - y) * max}deg) rotateY(${(x - .5) * max}deg) translateY(-4px)`;
  });
  el.addEventListener('pointerleave', () => { el.style.transform = ''; });
}
$$('.magnetic').forEach(magnetic);
$$('.tilt').forEach(el => tilt(el, 8));

/* ---------------- Reveal + counters ---------------- */
function countUp(el) {
  const to = +el.dataset.count, start = performance.now(), dur = 1400;
  if (reduced) { el.textContent = to; return; }
  const step = now => {
    const t = clamp((now - start) / dur, 0, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    $$('[data-count]', e.target).forEach(countUp);
    revObs.unobserve(e.target);
  });
}, { threshold: .12 });
const observeReveals = () => $$('.reveal:not(.in)').forEach(el => revObs.observe(el));

/* ---------------- Typed roles ---------------- */
(function typed() {
  const el = $('#typed');
  const words = ['systems in C', 'computer vision for football', 'LLM experiments', 'networked hardware', 'UNIX shells'];
  if (reduced) return;
  let w = 0, i = words[0].length, del = true;
  const tick = () => {
    const word = words[w];
    i += del ? -1 : 1;
    el.textContent = word.slice(0, i);
    let wait = del ? 40 : 75;
    if (!del && i === word.length) { del = true; wait = 1900; }
    else if (del && i === 0) { del = false; w = (w + 1) % words.length; wait = 300; }
    setTimeout(tick, wait);
  };
  setTimeout(tick, 2200);
})();

/* ---------------- Canvas helper ---------------- */
function fitCanvas(cv, h) {
  const dpr = Math.min(devicePixelRatio || 1, 2), w = cv.clientWidth;
  cv.width = w * dpr; cv.height = h * dpr; cv.style.height = h + 'px';
  const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}
function palette() {
  return { acc: css('--accent'), acc2: css('--accent-2'), acc3: css('--accent-3'), text: css('--text'), muted: css('--muted'), line: css('--line'), surf: css('--surface'), surf2: css('--surface-2'), pitch: css('--pitch-line'), bg: css('--bg') };
}
function hexA(hex, a) {
  const h = hex.replace('#', ''); const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`;
}

/* =========================================================
   HERO: live passing network
   ========================================================= */
(function pitch() {
  const cv = $('#pitch'), ctx = cv.getContext('2d');
  let W = 0, H = 0, C = palette(), running = true, last = performance.now();
  themeListeners.push(() => { C = palette(); if (reduced) draw(); });

  const homeA = [[.14, .5], [.3, .24], [.3, .76], [.44, .5], [.58, .2], [.58, .8], [.74, .38], [.76, .64]];
  const homeB = [[.92, .5], [.8, .28], [.8, .72], [.66, .5], [.5, .32], [.5, .68], [.38, .42], [.36, .62]];
  const mk = (h, team) => ({ hx: h[0], hy: h[1], x: 0, y: 0, vx: 0, vy: 0, team, ph: Math.random() * 6.28, call: 0, cx: 0, cy: 0 });
  const A = homeA.map(h => mk(h, 'A')), B = homeB.map(h => mk(h, 'B'));
  const mouse = { x: -1e4, y: -1e4, on: false };
  let holder = 3, prev = -1, chain = [3], trails = [], wait = 1.2;
  const ball = { from: 3, to: 3, t: 1, x: 0, y: 0 };

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const nW = cv.clientWidth, nH = cv.clientHeight;
    cv.width = nW * dpr; cv.height = nH * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const first = !W; W = nW; H = nH;
    if (first) [...A, ...B].forEach(p => { p.x = p.hx * W; p.y = p.hy * H; });
    if (reduced) draw();
  }
  new ResizeObserver(resize).observe(cv);

  const d2 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  function choosePass() {
    const h = A[holder];
    const called = A.findIndex(p => p.call > 0);
    if (called >= 0 && called !== holder) return called;
    let best = -1, bs = -Infinity;
    A.forEach((p, j) => {
      if (j === holder) return;
      const open = Math.min(...B.map(b => d2(b, p)), mouse.on ? Math.hypot(mouse.x - p.x, mouse.y - p.y) : 1e4);
      const dist = d2(h, p);
      const s = Math.min(open, 160) - .32 * dist + (p.x - h.x) * .12 - (j === prev ? 60 : 0) + Math.random() * 40;
      if (s > bs) { bs = s; best = j; }
    });
    return best;
  }

  function update(dt, t) {
    const hp = A[holder];
    for (const p of [...A, ...B]) {
      let tx = p.hx * W + Math.sin(t * .55 + p.ph) * 22, ty = p.hy * H + Math.cos(t * .45 + p.ph * 1.3) * 16;
      if (p.team === 'B') { tx = lerp(tx, hp.x, .16); ty = lerp(ty, hp.y, .16); }
      if (p.call > 0) { tx = p.cx; ty = p.cy; p.call -= dt; }
      let ax = (tx - p.x) * 2.4 - p.vx * 2.2, ay = (ty - p.y) * 2.4 - p.vy * 2.2;
      if (mouse.on && p.team === 'A') {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 140 && d > 1) { const f = (1 - d / 140) * 1400; ax += dx / d * f; ay += dy / d * f; }
      }
      p.vx += ax * dt; p.vy += ay * dt; p.x += p.vx * dt; p.y += p.vy * dt;
    }
    if (ball.t < 1) {
      ball.t = Math.min(1, ball.t + dt / .6);
      const e = 1 - Math.pow(1 - ball.t, 2), a = A[ball.from], b = A[ball.to];
      ball.x = lerp(a.x, b.x, e); ball.y = lerp(a.y, b.y, e);
      if (ball.t >= 1) {
        trails.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, life: 1 });
        prev = holder; holder = ball.to; chain.push(holder); if (chain.length > 6) chain.shift();
      }
    } else {
      ball.x = hp.x + 9; ball.y = hp.y + 4;
      const pressed = mouse.on && Math.hypot(mouse.x - hp.x, mouse.y - hp.y) < 120;
      wait -= dt * (pressed ? 3 : 1);
      if (wait <= 0) { const j = choosePass(); if (j >= 0) { ball.from = holder; ball.to = j; ball.t = 0; } wait = 1 + Math.random() * 1; }
    }
    trails.forEach(tr => tr.life -= dt * .35); trails = trails.filter(tr => tr.life > 0);
  }

  function hull(pts) {
    pts = [...pts].sort((a, b) => a.x - b.x || a.y - b.y);
    if (pts.length < 3) return pts;
    const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    const lo = [], up = [];
    for (const p of pts) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
    for (const p of pts.reverse()) { while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // pitch markings
    const m = 28, pw = W - m * 2, ph = H - m * 2;
    ctx.strokeStyle = C.pitch; ctx.lineWidth = 1.5;
    ctx.strokeRect(m, m, pw, ph);
    ctx.beginPath(); ctx.moveTo(W / 2, m); ctx.lineTo(W / 2, H - m); ctx.stroke();
    ctx.beginPath(); ctx.arc(W / 2, H / 2, Math.min(pw, ph) * .14, 0, 7); ctx.stroke();
    const bw = Math.min(pw * .13, 160), bh = ph * .5;
    ctx.strokeRect(m, H / 2 - bh / 2, bw, bh); ctx.strokeRect(W - m - bw, H / 2 - bh / 2, bw, bh);

    // passing polygon from the recent passers
    const poly = hull([...new Set(chain)].map(i => A[i]));
    if (poly.length >= 3) {
      ctx.beginPath(); poly.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath();
      ctx.fillStyle = hexA(C.acc, .07); ctx.fill();
      ctx.setLineDash([5, 6]); ctx.strokeStyle = hexA(C.acc, .3); ctx.lineWidth = 1.2; ctx.stroke(); ctx.setLineDash([]);
    }
    // team links
    ctx.lineWidth = 1;
    for (let i = 0; i < A.length; i++) for (let j = i + 1; j < A.length; j++) {
      const d = d2(A[i], A[j]); if (d > 240) continue;
      ctx.strokeStyle = hexA(C.acc, .12 * (1 - d / 240)); ctx.beginPath(); ctx.moveTo(A[i].x, A[i].y); ctx.lineTo(A[j].x, A[j].y); ctx.stroke();
    }
    // completed pass trails
    trails.forEach(tr => {
      ctx.strokeStyle = hexA(C.acc, .55 * tr.life); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(tr.x1, tr.y1); ctx.lineTo(tr.x2, tr.y2); ctx.stroke();
    });
    // pass in flight
    if (ball.t < 1) {
      const a = A[ball.from];
      ctx.strokeStyle = hexA(C.acc, .8); ctx.lineWidth = 2; ctx.setLineDash([2, 5]);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(ball.x, ball.y); ctx.stroke(); ctx.setLineDash([]);
    }
    // players
    B.forEach(p => { ctx.fillStyle = hexA(C.acc2, .75); ctx.beginPath(); ctx.arc(p.x, p.y, 5.5, 0, 7); ctx.fill(); });
    A.forEach((p, i) => {
      ctx.fillStyle = C.acc; ctx.beginPath(); ctx.arc(p.x, p.y, 6.5, 0, 7); ctx.fill();
      if (i === holder || p.call > 0) {
        ctx.strokeStyle = hexA(C.acc, .5); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, 13 + Math.sin(performance.now() / 200) * 2, 0, 7); ctx.stroke();
      }
    });
    // ball
    ctx.fillStyle = C.text; ctx.shadowColor = C.acc; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(ball.x, ball.y, 4, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
    // presser
    if (mouse.on) {
      ctx.strokeStyle = hexA(C.acc2, .35); ctx.setLineDash([4, 6]); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 120, 0, 7); ctx.stroke(); ctx.setLineDash([]);
    }
  }

  function loop(now) {
    const dt = Math.min((now - last) / 1000, .05); last = now;
    if (running && !document.hidden) { update(dt, now / 1000); draw(); }
    requestAnimationFrame(loop);
  }

  const pos = e => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  cv.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; Object.assign(mouse, pos(e), { on: true }); });
  cv.addEventListener('pointerleave', () => { mouse.on = false; });
  cv.addEventListener('pointerdown', e => {
    const p = pos(e); let best = 0, bd = Infinity;
    A.forEach((a, i) => { if (i === holder) return; const d = Math.hypot(a.x - p.x, a.y - p.y); if (d < bd) { bd = d; best = i; } });
    A.forEach(a => a.call = 0);
    Object.assign(A[best], { call: 2.4, cx: p.x, cy: p.y });
    if (ball.t >= 1) wait = Math.min(wait, .35);
    if (reduced) { holder = best; chain.push(best); if (chain.length > 6) chain.shift(); A[best].x = p.x; A[best].y = p.y; ball.x = p.x + 9; ball.y = p.y + 4; draw(); }
  });
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }).observe(cv);

  resize();
  if (!reduced) requestAnimationFrame(loop);
})();

/* =========================================================
   PROJECTS: filters, cards, modal
   ========================================================= */
const grid = $('#projectGrid'), filtersEl = $('#filters');
filtersEl.innerHTML = FILTERS.map((f, i) => {
  const n = f.id === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.cats.includes(f.id)).length;
  return `<button class="filter" role="tab" aria-selected="${i === 0}" data-f="${f.id}">${f.label}<sup>${n}</sup></button>`;
}).join('');
grid.innerHTML = PROJECTS.map(p => `
  <button class="card reveal" data-id="${p.id}" data-cats="${p.cats.join(' ')}" aria-label="Open ${esc(p.title)}">
    <div class="card-top"><span class="card-icon">${esc(p.icon)}</span><span class="mono small muted">${esc(p.when)}</span></div>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.blurb)}</p>
    <div class="tags">${p.stack.map(s => `<span>${esc(s)}</span>`).join('')}</div>
    <span class="open">open demo <i>→</i></span>
  </button>`).join('');
$$('.card', grid).forEach(c => { tilt(c, 7); c.addEventListener('click', () => openProject(c.dataset.id, c)); });
filtersEl.addEventListener('click', e => {
  const b = e.target.closest('.filter'); if (!b) return;
  $$('.filter', filtersEl).forEach(x => x.setAttribute('aria-selected', x === b));
  const f = b.dataset.f;
  $$('.card', grid).forEach(c => c.classList.toggle('hide', f !== 'all' && !c.dataset.cats.split(' ').includes(f)));
});
$$('[data-open-project]').forEach(b => b.addEventListener('click', () => openProject(b.dataset.openProject, b)));
observeReveals();

const modal = $('#modal');
let demoCleanup = null, lastFocus = null;
function openProject(id, opener) {
  const p = byId[id]; if (!p) return;
  lastFocus = opener || document.activeElement;
  closeOverlays();
  $('#modalMeta').textContent = `${p.when} · ${p.stack.join(' · ')}`;
  $('#modalTitle').textContent = p.title;
  $('#modalBody').innerHTML = `<ul>${p.body.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
  $('#modalLinks').innerHTML = (p.repo ? `<a class="btn primary" href="${p.repo}" target="_blank" rel="noopener">View code on GitHub ↗</a>` : '<span class="muted small mono">Code is private to the lab.</span>');
  modal.hidden = false; document.body.style.overflow = 'hidden';
  const demoEl = $('#modalDemo'); demoEl.innerHTML = '';
  demoCleanup = DEMOS[p.demo] ? DEMOS[p.demo](demoEl) : null;
  history.replaceState(null, '', '#p/' + id);
  $('.modal-close', modal).focus();
}
function closeModal() {
  if (modal.hidden) return;
  modal.hidden = true; document.body.style.overflow = '';
  if (typeof demoCleanup === 'function') demoCleanup(); demoCleanup = null;
  $('#modalDemo').innerHTML = '';
  history.replaceState(null, '', location.pathname + location.search);
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
}
$$('[data-close]', modal).forEach(b => b.addEventListener('click', closeModal));

/* =========================================================
   DEMOS — each returns a cleanup function
   ========================================================= */
const DEMOS = {};

/* ---- LLM: what criticism did to the models ---- */
DEMOS.llm = el => {
  const data = {
    keep: { label: 'Kept a correct MATH answer', unit: '%', max: 100, rows: [['Qwen2.5-7B', 93.9, 76.3], ['Llama-3.1-8B', 68.6, 14.7]] },
    disc: { label: 'True/false discrimination', unit: '', max: 1, rows: [['Llama-3.1-8B', .46, .11]] },
  };
  el.innerHTML = `
    <div class="demo-title"><span>Results · six turns of pushback</span></div>
    <div class="demo-controls"><div class="seg" id="llmSeg"><button class="on" data-k="keep">Answer retention</button><button data-k="disc">Discrimination</button></div>
    <span class="small muted mono"><span style="color:var(--accent-3)">■</span> without criticism &nbsp; <span style="color:var(--accent-2)">■</span> under criticism</span></div>
    <div class="bars" id="llmBars"></div>
    <div class="drop-callout" id="llmCall"></div>
    <p class="demo-note">Discrimination = how well the model's answers separate true claims from false ones (higher is better).</p>`;
  const render = k => {
    const d = data[k], fmt = v => d.unit ? v.toFixed(1) + '%' : v.toFixed(2);
    $('#llmBars', el).innerHTML = d.rows.map(([m, a, b]) => `
      <div><div class="mono small" style="margin-bottom:6px">${m}</div>
      <div class="bar-row"><span class="muted">without</span><div class="bar-track"><div class="bar-fill base" data-w="${a / d.max * 100}"></div></div><b>${fmt(a)}</b></div>
      <div class="bar-row" style="margin-top:6px"><span class="muted">criticised</span><div class="bar-track"><div class="bar-fill crit" data-w="${b / d.max * 100}"></div></div><b>${fmt(b)}</b></div></div>`).join('');
    requestAnimationFrame(() => requestAnimationFrame(() => $$('.bar-fill', el).forEach(f => f.style.width = f.dataset.w + '%')));
    $('#llmCall', el).innerHTML = k === 'keep'
      ? 'Llama dropped <b>−53.9 pts</b>; Qwen only <b>−17.6 pts</b>. And when Qwen did give in, its own working still reached the right answer <b>73%</b> of the time.'
      : 'Under criticism Llama\'s ability to tell true claims from false ones fell from <b>0.46</b> to <b>0.11</b>, close to guessing.';
  };
  $('#llmSeg', el).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#llmSeg button', el).forEach(x => x.classList.toggle('on', x === b)); render(b.dataset.k);
  });
  render('keep');
};

/* ---- Passing Polygons: K-Means splitting two teams ---- */
DEMOS.kmeans = el => {
  el.innerHTML = `
    <div class="demo-title"><span>K-Means: who plays for which team?</span><span id="kmIt">iteration 0</span></div>
    <canvas id="kmCv"></canvas>
    <div class="demo-controls"><button class="mini-btn" id="kmStep">Step</button><button class="mini-btn" id="kmRun">▶ Run</button><button class="mini-btn" id="kmNew">New match</button></div>
    <p class="demo-note">Each dot is a detected player's jersey colour, squashed to 2D. K-Means (k = 2) finds the two kits. Click to add players.</p>`;
  const cv = $('#kmCv', el);
  let S, C = palette(), pts = [], cents = [], it = 0, timer = null;
  const rnd = (m, s) => m + (Math.random() + Math.random() + Math.random() - 1.5) * s;
  function newMatch() {
    pts = []; it = 0;
    const a = [.3 + Math.random() * .1, .35 + Math.random() * .3], b = [.62 + Math.random() * .1, .35 + Math.random() * .3];
    for (let i = 0; i < 22; i++) { const c = i < 11 ? a : b; pts.push({ x: rnd(c[0], .16), y: rnd(c[1], .22), k: -1 }); }
    pts.push({ x: .5, y: .1, k: -1 }); // the referee
    cents = [{ x: Math.random(), y: Math.random() }, { x: Math.random(), y: Math.random() }];
    draw();
  }
  function step() {
    let moved = false;
    pts.forEach(p => { const k = Math.hypot(p.x - cents[0].x, p.y - cents[0].y) < Math.hypot(p.x - cents[1].x, p.y - cents[1].y) ? 0 : 1; if (k !== p.k) moved = true; p.k = k; });
    cents = cents.map((c, k) => { const m = pts.filter(p => p.k === k); return m.length ? { x: m.reduce((s, p) => s + p.x, 0) / m.length, y: m.reduce((s, p) => s + p.y, 0) / m.length } : c; });
    it++; draw(); return moved;
  }
  function draw() {
    const { ctx, w, h } = S; ctx.clearRect(0, 0, w, h);
    const X = v => 16 + v * (w - 32), Y = v => 16 + v * (h - 32), col = k => k < 0 ? C.muted : k ? C.acc2 : C.acc3;
    pts.forEach(p => {
      const c = cents[p.k];
      if (c) { ctx.strokeStyle = hexA(col(p.k), .18); ctx.beginPath(); ctx.moveTo(X(p.x), Y(p.y)); ctx.lineTo(X(c.x), Y(c.y)); ctx.stroke(); }
      ctx.fillStyle = col(p.k); ctx.beginPath(); ctx.arc(X(p.x), Y(p.y), 6, 0, 7); ctx.fill();
    });
    cents.forEach((c, k) => {
      ctx.strokeStyle = col(k); ctx.lineWidth = 3; const x = X(c.x), y = Y(c.y);
      ctx.beginPath(); ctx.moveTo(x - 9, y - 9); ctx.lineTo(x + 9, y + 9); ctx.moveTo(x + 9, y - 9); ctx.lineTo(x - 9, y + 9); ctx.stroke(); ctx.lineWidth = 1;
    });
    $('#kmIt', el).textContent = `iteration ${it}`;
  }
  const stop = () => { clearInterval(timer); timer = null; $('#kmRun', el).textContent = '▶ Run'; };
  $('#kmStep', el).onclick = () => { stop(); step(); };
  $('#kmRun', el).onclick = () => {
    if (timer) return stop();
    $('#kmRun', el).textContent = '❚❚ Pause';
    timer = setInterval(() => { if (!step()) { stop(); toast(`Converged after ${it} iterations`); } }, 650);
  };
  $('#kmNew', el).onclick = () => { stop(); newMatch(); };
  cv.addEventListener('pointerdown', e => {
    const r = cv.getBoundingClientRect();
    pts.push({ x: clamp((e.clientX - r.left - 16) / (S.w - 32), 0, 1), y: clamp((e.clientY - r.top - 16) / (S.h - 32), 0, 1), k: -1 }); draw();
  });
  const ro = new ResizeObserver(() => { S = fitCanvas(cv, 280); draw(); });
  S = fitCanvas(cv, 280); newMatch(); ro.observe(cv);
  const th = () => { C = palette(); draw(); }; themeListeners.push(th);
  return () => { stop(); ro.disconnect(); themeListeners.splice(themeListeners.indexOf(th), 1); };
};

/* ---- C-Shell: parse a command line ---- */
DEMOS.parse = el => {
  el.innerHTML = `
    <div class="demo-title"><span>How the shell reads a command</span></div>
    <input class="mono" id="psIn" value="cat log.txt | grep error | sort > errors.txt &" spellcheck="false" autocomplete="off"
      style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--text);font-size:.9rem">
    <div class="demo-controls">${['ls -la | wc -l', 'sort < in.txt >> out.txt', 'sleep 30 &', 'echo hi > a ; cat a'].map(x => `<button class="mini-btn mono" data-x="${esc(x)}">${esc(x)}</button>`).join('')}</div>
    <div id="psOut"></div>
    <div class="demo-controls"><button class="btn ghost" data-open-terminal style="padding:9px 14px">Try a shell in this page →</button></div>`;
  const out = $('#psOut', el), inp = $('#psIn', el);
  const box = (label, inner, color) => `<div style="border:1px solid ${color};border-radius:10px;padding:10px;margin-top:8px"><div class="mono small" style="color:${color};margin-bottom:6px">${label}</div>${inner}</div>`;
  function render() {
    const src = inp.value;
    const jobs = src.split(/;|&&/).map(s => s.trim()).filter(Boolean);
    if (!jobs.length) { out.innerHTML = '<p class="demo-note">Type a command above.</p>'; return; }
    out.innerHTML = jobs.map(job => {
      const bg = /&\s*$/.test(job); job = job.replace(/&\s*$/, '').trim();
      const stages = job.split('|').map(s => s.trim()).filter(Boolean);
      const inner = stages.map((st, i) => {
        const toks = st.match(/>>|[<>]|[^\s<>]+/g) || [];
        const argv = [], redir = [];
        for (let k = 0; k < toks.length; k++) {
          if (['<', '>', '>>'].includes(toks[k])) { redir.push(`${esc(toks[k])} ${toks[k + 1] ? esc(toks[k + 1]) : '<span style="color:var(--accent-2)">missing file</span>'}`); k++; }
          else argv.push(toks[k]);
        }
        return box(`stage ${i + 1}${stages.length > 1 ? (i < stages.length - 1 ? ' · stdout → pipe' : '') : ''}`,
          `<div class="mono small">argv = [${argv.map(a => `"${esc(a)}"`).join(', ')}]</div>${redir.length ? `<div class="mono small" style="color:var(--accent-2)">redirect: ${redir.join(', ')}</div>` : ''}`, 'var(--line)');
      }).join('');
      return box(`${stages.length > 1 ? 'pipeline' : 'command'} · ${bg ? 'background job (&)' : 'foreground'}`, inner, bg ? 'var(--accent-3)' : 'var(--accent)');
    }).join('');
  }
  inp.addEventListener('input', render);
  $$('[data-x]', el).forEach(b => b.onclick = () => { inp.value = b.dataset.x; render(); });
  $('[data-open-terminal]', el).onclick = () => { closeModal(); openTerminal(); };
  render();
};

/* ---- Network: sliding window with cumulative ACKs ---- */
DEMOS.window = el => {
  el.innerHTML = `
    <div class="demo-title"><span>Sliding window · window = 4</span><span id="swStat">ready</span></div>
    <canvas id="swCv"></canvas>
    <div class="demo-controls"><button class="mini-btn" id="swGo">▶ Send file</button>
    <label class="small muted mono" style="display:flex;align-items:center;gap:8px">random loss <input type="range" id="swLoss" min="0" max="40" value="10"> <span id="swLv">10%</span></label></div>
    <p class="demo-note"><b>Click a packet or ACK in flight to drop it</b> and watch the sender time out and resend. ACKs are cumulative: "ACK 5" means "I have everything before 5".</p>`;
  const cv = $('#swCv', el), N = 12, WIN = 4, TRAVEL = 1.5, TIMEOUT = 3.2;
  let S, C = palette(), raf, st;
  const reset = () => st = { on: false, base: 0, next: 0, exp: 0, got: Array(N).fill(false), acked: Array(N).fill(false), sentAt: [], fly: [], gap: 0, now: 0, rtx: 0, done: false, flash: [] };
  reset();
  const loss = () => +$('#swLoss', el).value / 100;
  $('#swLoss', el).oninput = () => $('#swLv', el).textContent = $('#swLoss', el).value + '%';
  const send = (seq, rt) => { st.fly.push({ kind: 'data', seq, t: 0, drop: Math.random() < loss(), dead: 0 }); st.sentAt[seq] = st.now; if (rt) { st.rtx++; st.flash.push({ seq, life: 1 }); } };
  function tick(dt) {
    if (!st.on || st.done) return;
    st.now += dt; st.gap -= dt;
    if (st.gap <= 0 && st.next < Math.min(st.base + WIN, N)) { send(st.next++); st.gap = .28; }
    if (st.base < st.next && st.now - st.sentAt[st.base] > TIMEOUT) send(st.base, true);
    for (const f of st.fly) {
      if (f.dead) { f.dead += dt; continue; }
      f.t += dt / TRAVEL;
      if (f.drop && f.t > .5) { f.dead = .001; continue; }
      if (f.t >= 1) {
        f.done = true;
        if (f.kind === 'data') {
          st.got[f.seq] = true; while (st.exp < N && st.got[st.exp]) st.exp++;
          st.fly.push({ kind: 'ack', seq: st.exp, t: 0, drop: Math.random() < loss(), dead: 0 });
        } else if (f.seq > st.base) {
          for (let i = st.base; i < f.seq; i++) st.acked[i] = true;
          st.base = f.seq; if (st.base < st.next) st.sentAt[st.base] = st.now;
          if (st.base >= N) { st.done = true; $('#swGo', el).textContent = '↺ Again'; toast(`Delivered all ${N} packets with ${st.rtx} retransmission${st.rtx === 1 ? '' : 's'}`); }
        }
      }
    }
    st.fly = st.fly.filter(f => !f.done && f.dead < .6);
    st.flash.forEach(f => f.life -= dt); st.flash = st.flash.filter(f => f.life > 0);
    $('#swStat', el).textContent = st.done ? `done · ${st.rtx} resent` : `base ${st.base} · next ${st.next} · resent ${st.rtx}`;
  }
  const geom = () => { const { w } = S, bw = Math.min(40, (w - 40) / N - 4); return { bw, x0: (w - (bw + 4) * N + 4) / 2, sx: 40, rx: w - 40, laneD: 112, laneA: 162 }; };
  function draw() {
    const { ctx, w, h } = S, g = geom(); ctx.clearRect(0, 0, w, h); ctx.font = '600 11px JetBrains Mono, monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const cell = (i, y, fill, stroke, txtc) => { const x = g.x0 + i * (g.bw + 4); ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect(x, y, g.bw, 26, 6); ctx.fill(); ctx.stroke(); ctx.fillStyle = txtc; ctx.fillText(i, x + g.bw / 2, y + 13); };
    ctx.fillStyle = C.muted; ctx.textAlign = 'left'; ctx.fillText('SENDER', g.x0, 14); ctx.fillText('RECEIVER', g.x0, h - 50); ctx.textAlign = 'center';
    for (let i = 0; i < N; i++) {
      const fl = st.flash.find(f => f.seq === i);
      const fill = st.acked[i] ? hexA(C.acc, .9) : i < st.next ? hexA(C.acc3, .25) : C.surf;
      cell(i, 26, fill, fl ? C.acc2 : C.line, st.acked[i] ? C.bg : C.text);
      cell(i, h - 36, st.got[i] ? hexA(C.acc3, .85) : C.surf, C.line, st.got[i] ? C.bg : C.muted);
    }
    // window bracket
    const wx = g.x0 + st.base * (g.bw + 4) - 3, ww = Math.min(WIN, N - st.base) * (g.bw + 4) + 2;
    if (st.base < N) { ctx.strokeStyle = C.acc; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(wx, 22, ww, 34, 8); ctx.stroke(); }
    // lanes
    ctx.strokeStyle = C.line; ctx.setLineDash([3, 5]); ctx.lineWidth = 1;
    [g.laneD, g.laneA].forEach(y => { ctx.beginPath(); ctx.moveTo(g.sx, y); ctx.lineTo(g.rx, y); ctx.stroke(); }); ctx.setLineDash([]);
    ctx.fillStyle = C.muted; ctx.textAlign = 'left'; ctx.fillText('data →', g.sx, g.laneD - 16); ctx.textAlign = 'right'; ctx.fillText('← ack', g.rx, g.laneA + 18); ctx.textAlign = 'center';
    st.fly.forEach(f => {
      const x = f.kind === 'data' ? lerp(g.sx, g.rx, Math.min(f.t, 1)) : lerp(g.rx, g.sx, Math.min(f.t, 1));
      const y = (f.kind === 'data' ? g.laneD : g.laneA) + (f.dead ? f.dead * 60 : 0);
      f.x = x; f.y = y;
      ctx.globalAlpha = f.dead ? Math.max(0, 1 - f.dead / .6) : 1;
      ctx.fillStyle = f.dead ? C.acc2 : f.kind === 'data' ? C.acc3 : C.acc;
      ctx.beginPath(); ctx.roundRect(x - 22, y - 12, 44, 24, 7); ctx.fill();
      ctx.fillStyle = C.bg; ctx.fillText(f.dead ? '✕' : (f.kind === 'data' ? '#' : 'A') + f.seq, x, y + 1);
      ctx.globalAlpha = 1;
    });
  }
  function loop(t0) { let last = t0; const fr = t => { tick(Math.min((t - last) / 1000, .05)); last = t; draw(); raf = requestAnimationFrame(fr); }; raf = requestAnimationFrame(fr); }
  $('#swGo', el).onclick = () => {
    if (st.done || !st.on) { if (st.done) reset(); st.on = true; $('#swGo', el).textContent = '❚❚ Pause'; }
    else { st.on = false; $('#swGo', el).textContent = '▶ Resume'; }
  };
  cv.addEventListener('pointerdown', e => {
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    const f = st.fly.find(f => !f.dead && Math.abs(f.x - x) < 26 && Math.abs(f.y - y) < 16);
    if (f) { f.dead = .001; }
  });
  const ro = new ResizeObserver(() => { S = fitCanvas(cv, 250); }); S = fitCanvas(cv, 250); ro.observe(cv);
  const th = () => { C = palette(); }; themeListeners.push(th);
  loop(performance.now());
  return () => { cancelAnimationFrame(raf); ro.disconnect(); themeListeners.splice(themeListeners.indexOf(th), 1); };
};

/* ---- Packet sniffer: decode a frame ---- */
DEMOS.hex = el => {
  const bytes = [], fields = [];
  const add = (layer, name, arr, desc) => { fields.push({ layer, name, from: bytes.length, to: bytes.length + arr.length, desc }); bytes.push(...arr); };
  const u16 = v => [v >> 8 & 255, v & 255], u32 = v => [v >>> 24 & 255, v >> 16 & 255, v >> 8 & 255, v & 255];
  add('eth', 'Destination MAC', [0x3c, 0x22, 0xfb, 0x8a, 0x10, 0x5e], '3c:22:fb:8a:10:5e — the router');
  add('eth', 'Source MAC', [0xa4, 0x83, 0xe7, 0x1d, 0x42, 0x07], 'a4:83:e7:1d:42:07 — this laptop');
  add('eth', 'EtherType', [0x08, 0x00], '0x0800 → the payload is IPv4');
  add('ip', 'Version + header length', [0x45], 'IPv4, header is 5 × 4 = 20 bytes');
  add('ip', 'Type of service', [0x00], 'default priority');
  const payload = [...'GET / HTTP/1.1\r\nHost: example.com\r\n\r\n'].map(c => c.charCodeAt(0));
  add('ip', 'Total length', u16(20 + 20 + payload.length), `${40 + payload.length} bytes (IP header + TCP header + data)`);
  add('ip', 'Identification', [0x1c, 0x46], 'used to reassemble fragments');
  add('ip', 'Flags + fragment offset', [0x40, 0x00], "Don't Fragment set");
  add('ip', 'TTL', [0x40], '64 hops before the packet is discarded');
  add('ip', 'Protocol', [0x06], '6 → TCP');
  add('ip', 'Header checksum', [0xb1, 0xe6], 'checks the IP header for corruption');
  add('ip', 'Source IP', [192, 168, 1, 10], '192.168.1.10');
  add('ip', 'Destination IP', [93, 184, 216, 34], '93.184.216.34');
  add('tcp', 'Source port', u16(51514), '51514 — a temporary client port');
  add('tcp', 'Destination port', u16(80), '80 → HTTP');
  add('tcp', 'Sequence number', u32(0x6b8b4567), 'byte position of this data in the stream');
  add('tcp', 'Acknowledgement number', u32(0x327b23c6), 'next byte expected from the server');
  add('tcp', 'Header length + flags', [0x50, 0x18], 'header 20 bytes · flags PSH, ACK');
  add('tcp', 'Window size', u16(64240), '64240 bytes the sender can still receive');
  add('tcp', 'Checksum', [0x8f, 0x2a], 'checks header and data');
  add('tcp', 'Urgent pointer', [0, 0], 'unused');
  add('http', 'HTTP request', payload, 'GET / HTTP/1.1 · Host: example.com');
  const LAY = { eth: ['Ethernet', '--accent-3'], ip: ['IPv4', '--accent'], tcp: ['TCP', '--accent-2'], http: ['HTTP payload', '--muted'] };
  el.innerHTML = `
    <div class="demo-title"><span>One captured frame · ${bytes.length} bytes</span><span class="seg" id="hxMode"><button class="on" data-m="hex">hex</button><button data-m="ascii">ascii</button></span></div>
    <div class="layers">${Object.entries(LAY).map(([k, [n, c]]) => `<button class="layer" data-l="${k}"><i style="background:var(${c})"></i>${n}</button>`).join('')}</div>
    <div class="hex" id="hx"></div>
    <div class="field-info" id="hxInfo"><span class="muted">Hover over a byte, or pick a layer, to see what it means.</span></div>`;
  const hx = $('#hx', el), info = $('#hxInfo', el); let mode = 'hex';
  const fieldOf = i => fields.find(f => i >= f.from && i < f.to);
  const render = () => { hx.innerHTML = bytes.map((b, i) => `<span data-i="${i}">${mode === 'hex' ? b.toString(16).padStart(2, '0') : (b >= 32 && b < 127 ? esc(String.fromCharCode(b)) : '·')}</span>`).join(''); };
  const light = pred => $$('span', hx).forEach((s, i) => { const f = fieldOf(i), on = pred(f); s.classList.toggle('on', on); s.style.background = on ? `var(${LAY[f.layer][1]})` : ''; });
  hx.addEventListener('pointerover', e => {
    const s = e.target.closest('span'); if (!s) return; const f = fieldOf(+s.dataset.i);
    light(x => x === f);
    info.innerHTML = `<b style="color:var(${LAY[f.layer][1]})">${LAY[f.layer][0]} › ${f.name}</b> <span class="muted mono small">bytes ${f.from}–${f.to - 1}</span><br>${esc(f.desc)}`;
  });
  $$('.layer', el).forEach(b => b.onclick = () => {
    $$('.layer', el).forEach(x => x.classList.toggle('on', x === b));
    light(f => f.layer === b.dataset.l);
    const fs = fields.filter(f => f.layer === b.dataset.l);
    info.innerHTML = `<b style="color:var(${LAY[b.dataset.l][1]})">${LAY[b.dataset.l][0]}</b> <span class="muted mono small">${fs[fs.length - 1].to - fs[0].from} bytes</span><br>${fs.map(f => esc(f.name)).join(' · ')}`;
  });
  $('#hxMode', el).onclick = e => { const b = e.target.closest('button'); if (!b) return; mode = b.dataset.m; $$('#hxMode button', el).forEach(x => x.classList.toggle('on', x === b)); render(); };
  render();
};

/* ---- CLI-Docs: sentence-level locks ---- */
DEMOS.locks = el => {
  const sents = ['The storage server keeps each document on disk.', 'The naming server knows which server holds which file.', 'Clients ask the naming server, then talk to storage directly.', 'Each sentence can be locked by one writer at a time.', 'Readers never wait for a lock.'];
  const lock = Array(sents.length).fill(null); let me = 'A';
  const names = { A: 'alice', B: 'bob' };
  el.innerHTML = `
    <div class="demo-title"><span>doc.txt · sentence locks</span></div>
    <div class="demo-controls"><span class="small muted">You are</span><div class="seg" id="lkWho"><button class="on" data-u="A">alice</button><button data-u="B">bob</button></div></div>
    <div class="doc" id="lkDoc"></div>
    <div class="log" id="lkLog"><div>Click a sentence to start editing it. Switch users and try the same one.</div></div>`;
  const log = m => { const l = $('#lkLog', el); l.insertAdjacentHTML('afterbegin', `<div>${m}</div>`); };
  const render = () => {
    $('#lkDoc', el).innerHTML = sents.map((s, i) => `<div class="sent ${lock[i] || ''}" data-i="${i}" role="button" tabindex="0"><span>${esc(s)}</span><span class="who">${lock[i] ? '🔒 ' + names[lock[i]] : 'free'}</span></div>`).join('');
  };
  const act = i => {
    const who = names[me];
    if (!lock[i]) { lock[i] = me; log(`${who} → WRITE doc.txt ${i}: <span class="t-acc">LOCK GRANTED</span>`); }
    else if (lock[i] === me) { lock[i] = null; log(`${who} → ETIRW doc.txt ${i}: changes saved, lock released`); }
    else {
      log(`${who} → WRITE doc.txt ${i}: <span class="t-err">DENIED, sentence ${i} is locked by ${names[lock[i]]}</span>`);
      const n = $(`.sent[data-i="${i}"]`, el); n.classList.remove('shake'); void n.offsetWidth; n.classList.add('shake'); return;
    }
    render();
  };
  $('#lkDoc', el).addEventListener('click', e => { const s = e.target.closest('.sent'); if (s) act(+s.dataset.i); });
  $('#lkDoc', el).addEventListener('keydown', e => { const s = e.target.closest('.sent'); if (s && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); act(+s.dataset.i); } });
  $('#lkWho', el).onclick = e => { const b = e.target.closest('button'); if (!b) return; me = b.dataset.u; $$('#lkWho button', el).forEach(x => x.classList.toggle('on', x === b)); };
  render();
};

/* ---- 3D printer: MQTT message flow ---- */
DEMOS.mqtt = el => {
  el.innerHTML = `
    <div class="demo-title"><span>How a click reaches a printer (illustration)</span><span id="mqState">idle</span></div>
    <canvas id="mqCv"></canvas>
    <div class="demo-controls"><button class="mini-btn" data-c="start">▶ Start print</button><button class="mini-btn" data-c="pause">❚❚ Pause</button><button class="mini-btn" data-c="heat">Heat nozzle to 210 °C</button><button class="mini-btn" data-c="cool">Cool down</button></div>
    <div class="log" id="mqLog"></div>`;
  const cv = $('#mqCv', el); let S, C = palette(), raf;
  const st = { state: 'idle', temp: 24, target: 24, prog: 0, msgs: [], tel: 0 };
  const log = m => $('#mqLog', el).insertAdjacentHTML('afterbegin', `<div>${m}</div>`);
  const nodes = () => { const w = S.w; return [{ x: w * .16, label: 'React dashboard' }, { x: w * .5, label: 'MQTT broker + API' }, { x: w * .84, label: 'ESP32 printer' }]; };
  const sendMsg = (from, to, color, topic, onArrive) => st.msgs.push({ from, to, t: 0, color, topic, onArrive });
  function cmd(c) {
    const payload = { start: '{"cmd":"start"}', pause: '{"cmd":"pause"}', heat: '{"nozzle":210}', cool: '{"nozzle":0}' }[c];
    log(`<span class="t-blue">PUB</span> printers/p1/cmd ${esc(payload)}`);
    sendMsg(0, 1, C.acc3, 'cmd', () => sendMsg(1, 2, C.acc3, 'cmd', () => {
      if (c === 'start') { st.state = 'printing'; if (st.target < 200) st.target = 210; }
      if (c === 'pause') st.state = st.state === 'printing' ? 'paused' : st.state;
      if (c === 'heat') st.target = 210;
      if (c === 'cool') { st.target = 24; if (st.state === 'printing') st.state = 'paused'; }
    }));
  }
  $$('[data-c]', el).forEach(b => b.onclick = () => cmd(b.dataset.c));
  let disp = { temp: 24, prog: 0, state: 'idle' };
  function tick(dt) {
    st.temp += (st.target - st.temp) * dt * .6;
    if (st.state === 'printing' && st.temp > 195) st.prog = Math.min(100, st.prog + dt * 4);
    if (st.prog >= 100 && st.state === 'printing') { st.state = 'done'; st.target = 24; }
    st.tel -= dt;
    if (st.tel <= 0) {
      st.tel = 1.2; const snap = { temp: st.temp, prog: st.prog, state: st.state };
      sendMsg(2, 1, C.acc, 'tel', () => sendMsg(1, 0, C.acc, 'tel', () => { disp = snap; $('#mqState', el).textContent = `${snap.state} · ${snap.temp.toFixed(0)} °C · ${snap.prog.toFixed(0)}%`; }));
    }
    st.msgs.forEach(m => { m.t += dt / .7; if (m.t >= 1 && !m.done) { m.done = true; m.onArrive && m.onArrive(); } });
    st.msgs = st.msgs.filter(m => !m.done);
  }
  function draw() {
    const { ctx, w, h } = S, N = nodes(), y = 90; ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(N[0].x, y); ctx.lineTo(N[2].x, y); ctx.stroke();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    N.forEach((n, i) => {
      const bw = Math.min(w * .28, 170);
      ctx.fillStyle = C.surf; ctx.strokeStyle = C.line; ctx.beginPath(); ctx.roundRect(n.x - bw / 2, y - 34, bw, 68, 12); ctx.fill(); ctx.stroke();
      ctx.fillStyle = C.text; ctx.font = '600 12px Space Grotesk, sans-serif'; ctx.fillText(n.label, n.x, y - 14);
      ctx.font = '11px JetBrains Mono, monospace'; ctx.fillStyle = C.muted;
      if (i === 0) ctx.fillText(`${disp.temp.toFixed(0)} °C · ${disp.prog.toFixed(0)}%`, n.x, y + 10);
      if (i === 1) ctx.fillText('printers/p1/#', n.x, y + 10);
      if (i === 2) ctx.fillText(`${st.state} · ${st.temp.toFixed(0)} °C`, n.x, y + 10);
    });
    // progress bar under dashboard
    ctx.fillStyle = C.line; ctx.fillRect(N[0].x - 50, y + 22, 100, 4); ctx.fillStyle = C.acc; ctx.fillRect(N[0].x - 50, y + 22, disp.prog, 4);
    st.msgs.forEach(m => {
      const x = lerp(N[m.from].x, N[m.to].x, m.t), yy = y + (m.topic === 'cmd' ? -48 : 48);
      ctx.fillStyle = m.color; ctx.beginPath(); ctx.arc(x, yy, 6, 0, 7); ctx.fill();
      ctx.font = '10px JetBrains Mono, monospace'; ctx.fillText(m.topic === 'cmd' ? 'cmd' : 'telemetry', x, yy + (m.topic === 'cmd' ? -14 : 14));
    });
  }
  let last = performance.now();
  const fr = t => { tick(Math.min((t - last) / 1000, .05)); last = t; draw(); raf = requestAnimationFrame(fr); };
  const ro = new ResizeObserver(() => { S = fitCanvas(cv, 190); }); S = fitCanvas(cv, 190); ro.observe(cv);
  const th = () => { C = palette(); }; themeListeners.push(th);
  log('Printer publishes telemetry on printers/p1/telemetry every second.');
  raf = requestAnimationFrame(fr);
  return () => { cancelAnimationFrame(raf); ro.disconnect(); themeListeners.splice(themeListeners.indexOf(th), 1); };
};

/* =========================================================
   SKILLS
   ========================================================= */
(function skills() {
  const wrap = $('#skillGroups'), name = $('#skillName'), uses = $('#skillUses');
  wrap.innerHTML = Object.entries(SKILLS).map(([g, list]) => `
    <div class="skill-group"><h3>${g}</h3><div class="chips">${list.map(s => `<button class="chip${SKILL_USES[s] ? '' : ' plain'}" data-s="${esc(s)}">${esc(s)}</button>`).join('')}</div></div>`).join('');
  let pinned = null;
  function show(s) {
    $$('.chip', wrap).forEach(c => c.classList.toggle('on', c.dataset.s === s));
    name.textContent = s;
    const ids = SKILL_USES[s] || [];
    uses.innerHTML = ids.length
      ? ids.map(id => `<li><button data-p="${id}">${esc(byId[id].title)} →</button><small>${esc(byId[id].when)}</small></li>`).join('')
      : '<li class="muted">Part of my toolkit from coursework and side work; not tied to a project on this page.</li>';
    $$('.card', grid).forEach(c => { c.classList.toggle('glow', ids.includes(c.dataset.id)); });
  }
  wrap.addEventListener('pointerover', e => { const c = e.target.closest('.chip'); if (c && canHover && !pinned) show(c.dataset.s); });
  wrap.addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; pinned = pinned === c.dataset.s ? null : c.dataset.s; show(c.dataset.s); });
  wrap.addEventListener('pointerleave', () => { if (!pinned) $$('.card', grid).forEach(c => c.classList.remove('glow')); });
  uses.addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (b) openProject(b.dataset.p, b); });
})();

/* =========================================================
   TERMINAL
   ========================================================= */
const term = $('#terminal'), tOut = $('#termOut'), tIn = $('#termIn'), tBody = $('#termBody');
const hist = []; let hIdx = 0, booted = false;
const L = (t, c) => ({ t, c });
const FILES = ['about.txt', 'education.txt', 'experience.txt', 'skills.txt', 'contact.txt', 'resume.pdf', 'projects/'];
const CMDS = {
  help: () => [
    L('Commands', 't-acc'),
    ...[['whoami', 'one-line intro'], ['about', 'a bit more about me'], ['education', 'where I study'], ['experience', 'research & internship'],
      ['projects', 'list projects'], ['open <id>', 'open a project demo, e.g. open llm'], ['skills', 'languages, frameworks, tools'],
      ['contact', 'how to reach me'], ['resume', 'open my resume (PDF)'], ['github | linkedin', 'open profiles'],
      ['theme [light|dark]', 'switch theme'], ['ls, cat <file>, pwd, echo, history, date, clear, exit', 'the usual']]
      .map(([c, d]) => L(`  ${c.padEnd(22)} ${d}`)),
    L('Pipes work too:  projects | grep POSIX   ·   skills | wc -l', 't-mut'),
  ],
  whoami: () => [L('Parth Nitesh Chaudhari — CS undergrad at IIIT Hyderabad (2024–2028). Systems, computer vision, NLP.')],
  about: () => [L('I grew up in Abu Dhabi and study Computer Science at IIIT Hyderabad.'), L('I build things in C that talk to networks and processes, computer vision for football,'), L('and experiments on how language models behave when users push back.')],
  education: () => [L('2024–2028  B.Tech, Computer Science & Engineering — IIIT Hyderabad', 't-acc'), L('2014–2024  High School Diploma — Asian International School, Abu Dhabi')],
  experience: () => [
    L('Apr 2026 – now   Undergraduate Research Assistant, Data Sciences and Analytics Center, IIIT-H', 't-acc'),
    L('                  Computer vision for football: passes, formations, attacking patterns (Python, OpenCV, YOLO)'),
    L('Jan – May 2026    Undergraduate Intern, Cosmic 3D (Maker\'s Lab)', 't-acc'),
    L('                  Remote 3D printer control: React dashboard, MQTT, ESP32 firmware, Three.js'),
  ],
  projects: () => PROJECTS.map(p => L(`${p.id.padEnd(10)} ${p.title.padEnd(32)} ${p.stack.join(', ')}`)).concat([L('Type  open <id>  to see one.', 't-mut')]),
  open: a => {
    const id = (a[0] || '').toLowerCase();
    if (byId[id]) { setTimeout(() => { closeTerminal(); openProject(id); }, 250); return [L(`opening ${byId[id].title}…`, 't-acc')]; }
    return [L(`open: no such project "${a[0] || ''}". Try: ${PROJECTS.map(p => p.id).join(', ')}`, 't-err')];
  },
  skills: () => Object.entries(SKILLS).flatMap(([g, l]) => [L(g + ':', 't-acc'), L('  ' + l.join(', '))]),
  contact: () => [L(`email     ${LINKS.email}`), L(`linkedin  ${LINKS.linkedin}`), L(`github    ${LINKS.github}`)],
  resume: () => { window.open(LINKS.resume, '_blank', 'noopener'); return [L('Opening resume in a new tab…', 't-acc')]; },
  github: () => { window.open(LINKS.github, '_blank', 'noopener'); return [L('Opening GitHub…', 't-acc')]; },
  linkedin: () => { window.open(LINKS.linkedin, '_blank', 'noopener'); return [L('Opening LinkedIn…', 't-acc')]; },
  email: () => { copyEmail(); return [L(`${LINKS.email} (copied)`, 't-acc')]; },
  theme: a => { const t = a[0] === 'light' || a[0] === 'dark' ? a[0] : (root.dataset.theme === 'dark' ? 'light' : 'dark'); setTheme(t); return [L(`theme set to ${t}`)]; },
  ls: a => (a[0] || '').replace(/\/$/, '') === 'projects' ? PROJECTS.map(p => L(p.id + '/', 't-blue')) : [L(FILES.join('   '), 't-blue')],
  cat: a => {
    const f = (a[0] || '').replace(/\.txt$/, '');
    if (!a[0]) return [L('cat: missing file operand', 't-err')];
    if (f === 'resume.pdf') return [L('cat: resume.pdf is a binary file. Try: resume', 't-err')];
    if (['about', 'education', 'experience', 'skills', 'contact'].includes(f)) return CMDS[f]();
    return [L(`cat: ${a[0]}: No such file or directory`, 't-err')];
  },
  cd: a => a[0] && a[0] !== '~' && a[0] !== '.' ? [L(`cd: ${a[0]}: this portfolio only has one room`, 't-err')] : [],
  pwd: () => [L('/home/parth/portfolio')],
  echo: a => [L(a.join(' '))],
  date: () => [L(new Date().toString())],
  history: () => hist.map((h, i) => L(`${String(i + 1).padStart(4)}  ${h}`)),
  clear: () => { tOut.innerHTML = ''; return []; },
  sudo: () => [L('parth is not in the sudoers file. This incident will be reported. 🙂', 't-err')],
  exit: () => { setTimeout(closeTerminal, 150); return [L('logout')]; },
  neofetch: () => [
    L('   ▄▄▄▄   parth@portfolio', 't-acc'), L('  █ pc █  ---------------', 't-acc'),
    L('   ▀▀▀▀   OS: GitHub Pages'), L('          Uni: IIIT Hyderabad · CSE · 2028'), L('          Shell: pc-sh (inspired by C-Shell)'), L('          Langs: Python, C/C++, JavaScript, SQL'),
  ],
};
CMDS.ll = CMDS.ls; CMDS['?'] = CMDS.help; CMDS.man = CMDS.help;
const FILTERS_CMD = {
  grep: (lines, a) => { const ci = a[0] === '-i'; const pat = (ci ? a[1] : a[0]) || ''; const re = new RegExp(pat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), ci ? 'i' : ''); return lines.filter(l => re.test(l.t)); },
  wc: lines => [L(String(lines.length))],
  head: (lines, a) => lines.slice(0, a[0] === '-n' ? +a[1] || 10 : 10),
  sort: lines => [...lines].sort((x, y) => x.t.localeCompare(y.t)),
};
function print(lines) {
  tOut.insertAdjacentHTML('beforeend', lines.map(l => `<pre class="${l.c || ''}">${esc(l.t)}</pre>`).join(''));
  tBody.scrollTop = tBody.scrollHeight;
}
function run(raw) {
  const line = raw.trim();
  print([L(`parth@portfolio:~$ ${raw}`, 't-mut')]);
  if (!line) return;
  hist.push(line); hIdx = hist.length;
  const stages = line.split('|').map(s => s.trim().split(/\s+/));
  const [cmd, ...args] = stages[0];
  const fn = CMDS[cmd.toLowerCase()];
  if (!fn) { print([L(`pc-sh: command not found: ${cmd}. Type help.`, 't-err')]); return; }
  let out = fn(args) || [];
  for (const [f, ...fa] of stages.slice(1)) {
    const ff = FILTERS_CMD[f];
    if (!ff) { out = [L(`pc-sh: ${f}: not supported in pipes (try grep, wc, head, sort)`, 't-err')]; break; }
    out = ff(out, fa);
  }
  print(out);
}
function openTerminal() {
  closeOverlays(); term.hidden = false; document.body.style.overflow = 'hidden';
  if (!booted) {
    booted = true;
    print([L('pc-sh 1.0 — a tiny shell in honour of my C-Shell project', 't-acc'), L('Type help to see what you can do. Tab completes, ↑/↓ for history, Ctrl-L clears.', 't-mut'), L('')]);
  }
  setTimeout(() => tIn.focus(), 30);
}
function closeTerminal() { if (term.hidden) return; term.hidden = true; document.body.style.overflow = ''; }
tIn.addEventListener('keydown', e => {
  if (e.key === 'Enter') { run(tIn.value); tIn.value = ''; }
  else if (e.key === 'ArrowUp') { e.preventDefault(); if (hIdx > 0) tIn.value = hist[--hIdx]; }
  else if (e.key === 'ArrowDown') { e.preventDefault(); hIdx = Math.min(hist.length, hIdx + 1); tIn.value = hist[hIdx] || ''; }
  else if (e.key === 'Tab') {
    e.preventDefault();
    const parts = tIn.value.split(' '), last = parts[parts.length - 1];
    const pool = parts.length === 1 ? Object.keys(CMDS) : parts[0] === 'open' ? PROJECTS.map(p => p.id) : parts[0] === 'theme' ? ['light', 'dark'] : FILES;
    const m = pool.filter(c => c.startsWith(last));
    if (m.length === 1) { parts[parts.length - 1] = m[0]; tIn.value = parts.join(' ') + (parts.length === 1 ? ' ' : ''); }
    else if (m.length > 1) print([L(m.join('   '), 't-mut')]);
  }
  else if (e.ctrlKey && e.key.toLowerCase() === 'l') { e.preventDefault(); tOut.innerHTML = ''; }
  else if (e.ctrlKey && e.key.toLowerCase() === 'c') { e.preventDefault(); print([L(`parth@portfolio:~$ ${tIn.value}^C`, 't-mut')]); tIn.value = ''; }
});
tBody.addEventListener('click', () => { if (!getSelection().toString()) tIn.focus(); });
term.addEventListener('click', e => { if (e.target === term) closeTerminal(); });
$$('[data-close-term]').forEach(b => b.addEventListener('click', closeTerminal));
document.addEventListener('click', e => { const b = e.target.closest('[data-open-terminal]'); if (b && !b.closest('.demo')) openTerminal(); });

/* =========================================================
   COMMAND PALETTE
   ========================================================= */
const pal = $('#palette'), pIn = $('#paletteIn'), pList = $('#paletteList');
const go = id => () => document.getElementById(id).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
const ACTIONS = [
  ...['about', 'experience', 'projects', 'skills', 'contact'].map(s => ({ label: 'Go to ' + s[0].toUpperCase() + s.slice(1), hint: 'section', run: go(s) })),
  ...PROJECTS.map(p => ({ label: p.title, hint: 'project demo', run: () => openProject(p.id) })),
  { label: 'Open terminal', hint: 'action', run: openTerminal },
  { label: 'Toggle light / dark theme', hint: 'action', run: toggleTheme },
  { label: 'Copy email address', hint: 'action', run: copyEmail },
  { label: 'Open resume (PDF)', hint: 'link', run: () => window.open(LINKS.resume, '_blank', 'noopener') },
  { label: 'GitHub profile', hint: 'link', run: () => window.open(LINKS.github, '_blank', 'noopener') },
  { label: 'LinkedIn profile', hint: 'link', run: () => window.open(LINKS.linkedin, '_blank', 'noopener') },
];
let pSel = 0, pItems = ACTIONS;
function fuzzy(q, s) {
  q = q.toLowerCase(); s = s.toLowerCase(); if (!q) return 1;
  if (s.includes(q)) return 100 - s.indexOf(q);
  let i = 0, score = 0; for (const ch of s) { if (ch === q[i]) { i++; score++; } } return i === q.length ? score : -1;
}
function renderPalette() {
  const q = pIn.value.trim();
  pItems = ACTIONS.map(a => ({ a, s: fuzzy(q, a.label + ' ' + a.hint) })).filter(x => x.s > 0).sort((x, y) => y.s - x.s).map(x => x.a);
  pSel = clamp(pSel, 0, Math.max(0, pItems.length - 1));
  pList.innerHTML = pItems.length ? pItems.map((a, i) => `<li role="option" aria-selected="${i === pSel}" class="${i === pSel ? 'sel' : ''}" data-i="${i}"><span>${esc(a.label)}</span><small>${a.hint}</small></li>`).join('') : '<li class="muted">Nothing matches.</li>';
  const sel = $('.sel', pList); sel && sel.scrollIntoView({ block: 'nearest' });
}
function openPalette() { closeOverlays(); pal.hidden = false; pIn.value = ''; pSel = 0; renderPalette(); setTimeout(() => pIn.focus(), 20); }
function closePalette() { pal.hidden = true; }
function runPalette(i) { const a = pItems[i]; if (!a) return; closePalette(); a.run(); }
pIn.addEventListener('input', () => { pSel = 0; renderPalette(); });
pIn.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') { e.preventDefault(); pSel = (pSel + 1) % Math.max(1, pItems.length); renderPalette(); }
  if (e.key === 'ArrowUp') { e.preventDefault(); pSel = (pSel - 1 + pItems.length) % Math.max(1, pItems.length); renderPalette(); }
  if (e.key === 'Enter') { e.preventDefault(); runPalette(pSel); }
});
pList.addEventListener('click', e => { const li = e.target.closest('[data-i]'); if (li) runPalette(+li.dataset.i); });
pal.addEventListener('click', e => { if (e.target === pal) closePalette(); });
$('#paletteBtn').addEventListener('click', openPalette);

/* ---------------- Global keys + overlays ---------------- */
function closeOverlays() { closePalette(); closeTerminal(); closeModal(); }
document.addEventListener('keydown', e => {
  const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? openPalette() : closePalette(); return; }
  if (e.key === 'Escape') { closeOverlays(); return; }
  if (e.key === '`' && (!typing || document.activeElement === tIn)) { e.preventDefault(); term.hidden ? openTerminal() : closeTerminal(); }
  // keep Tab focus inside the open modal
  if (e.key === 'Tab' && !modal.hidden) {
    const f = $$('button, a[href], input, [tabindex="0"]', modal).filter(x => x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
});

// Deep links: /#p/llm opens that project
const m = location.hash.match(/^#p\/(\w+)/);
if (m && byId[m[1]]) setTimeout(() => openProject(m[1]), 400);

console.log('%c👋 Hi! Press ` on the page for a shell, or Ctrl/⌘ K to jump around.', 'color:#c8f24a;font:600 13px monospace');
})();
