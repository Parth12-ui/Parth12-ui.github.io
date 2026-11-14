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
  { id: 'data', label: 'Data & sports analytics' },
  { id: 'systems', label: 'Systems' },
  { id: 'net', label: 'Networking' },
  { id: 'web', label: 'Web & mobile' },
];

const PROJECTS = [
  {
    id: 'llm', icon: '?!', title: 'LLM Confidence Under Pressure', when: 'Sep – Oct 2026', cats: ['ml'],
    stack: ['PyTorch', 'Hugging Face', 'Slurm', 'W&B'],
    blurb: 'Do language models hold on to a right answer when a user keeps telling them they are wrong?',
    body: [
      'Course project for Advanced NLP (ANLP). A reproducible evaluation harness puts Qwen2.5-7B and Llama-3.1-8B (in 4-bit) through six-turn conversations of criticism, praise or a neutral control.',
      'It covers 450 claims whose truth is known (from MATH-500 and real analysis), runs on a Slurm cluster, and logs each turn\'s verdict, token-probability probes and the model\'s stated confidence. Every table in the report rebuilds from the logged runs without a GPU.',
      'Criticism hurt Llama far more than Qwen. Harsher tone on its own did little; it only mattered when paired with a claim that the answer was wrong.',
    ],
    repo: 'https://github.com/Parth12-ui/CONFIDENCE-matters_ANLP', demo: 'llm',
  },
  {
    id: 'polygons', icon: '◬', title: 'Passing Polygons', when: 'Apr 2026 – now', cats: ['data', 'ml'],
    stack: ['Python', 'JavaScript', 'Canvas', 'OpenCV'],
    blurb: 'Research that turns tracking data from professional football into phases of play, and labels every passing option.',
    body: [
      'Research assistant work with Prof. Kamalakar Karlapalem at the Data Science and Analytics Centre, IIIT-H.',
      'A Python pipeline turns player-tracking data from 17 professional matches (A-League, Bundesliga) into 8,087 labelled phases of play, measuring 9 defensive-shape metrics every half second.',
      'A framework-free Canvas/JavaScript dashboard steps through 9,566 on-ball moments and labels 24,374 passing options as clear, contested or blocked.',
      'The blocking rule held up on 5,803 held-out passes: 86% vs 62% completion. The animated background on this site is a small nod to this project.',
    ],
    repo: 'https://github.com/Parth12-ui/Passing_polygons', demo: 'lanes',
  },
  {
    id: 'events', icon: '◎', title: 'Event Management Platform', when: 'Feb 2026', cats: ['web'],
    stack: ['React', 'Express', 'MongoDB', 'Socket.IO'],
    blurb: 'A full-stack platform for college fests, built and deployed solo, with portals for participants, organisers and admins.',
    body: [
      'Built on my own and deployed on Vercel and Render: about 7,800 lines, 52 REST endpoints and 9 Mongoose data models.',
      'Sign-in with JSON Web Tokens (JWT) and separate portals for participants, organisers and admins.',
      'Real-time Socket.IO forums and team chat with file uploads, a custom registration-form builder, team matchmaking and approval of payment proofs.',
      'QR e-tickets sent by email, double-blind feedback, and a password reset protected by reCAPTCHA.',
    ],
    repo: 'https://github.com/Parth12-ui/dass_a1', live: 'https://dass-a1-green.vercel.app/', demo: 'forum',
  },
  {
    id: 'android', icon: '▢', title: 'Institute Management App', when: 'Apr 2026', cats: ['web'],
    stack: ['Kotlin', 'Jetpack Compose', 'Material 3'],
    blurb: 'An Android app for students and faculty: timetables, attendance and dashboards that change with your role.',
    body: [
      'Two-person team project. I wrote the 5,500-line Kotlin codebase (26 files).',
      'Dashboards that adapt to whether you are a student or faculty member, and sign-in with a one-time password (OTP).',
      'A 24-hour timetable with alerts, and attendance marking for each course.',
    ],
    repo: 'https://github.com/Parth12-ui/institute-management-app', demo: 'phone',
  },
  {
    id: 'quakes', icon: '≋', title: 'Global Earthquakes, 2015–2025', when: 'Mar 2026', cats: ['data'],
    stack: ['D3.js', 'JavaScript'],
    blurb: 'Interactive D3 visualisations of 80,829 earthquakes recorded by the USGS.',
    body: [
      'Three-person team project for the Data Visualization course.',
      'Interactive D3 views of 80,829 earthquake records from the US Geological Survey (USGS): a hexbin density map with tectonic plate boundaries, a depth vs magnitude density plot, and a map of where monitoring is strong and where the data is patchy.',
    ],
    repo: null, demo: 'mag',
  },
  {
    id: 'printer', icon: '▲', title: 'Cosmic 3D: Remote Printer Control', when: 'Jan – May 2026', cats: ['web', 'net'],
    stack: ['TypeScript', 'React', 'Express', 'MQTT', 'ESP32'],
    blurb: 'Five-person client project to control and watch ESP32 3D printers from any browser. I owned the MQTT layer.',
    body: [
      'Client project for Cosmic 3D (Maker\'s Lab) in the Design and Analysis of Software Systems (DASS) course, in a team of five. The system controls and monitors ESP32-based 3D printers remotely (React, Express, Three.js, JWT).',
      'I owned the MQTT messaging layer: set up the Mosquitto broker over both TCP and WebSockets, and rewrote the backend MQTT service and the dashboard\'s subscriptions so printer telemetry reaches any browser on the network.',
    ],
    repo: null, demo: 'mqtt',
  },
  {
    id: 'docs', icon: '¶', title: 'CLI-Docs: Distributed Document Store', when: 'Oct – Nov 2025', cats: ['systems', 'net'],
    stack: ['C', 'pthreads', 'TCP sockets'],
    blurb: 'A shared document editor in C where many people can edit the same file at once.',
    body: [
      'Two-person team; I wrote most of the 4,700-line C system (18 of 22 commits).',
      'A name server, several multi-threaded storage servers and a command-line client. Clients read and write directly to the storage servers.',
      'Per-sentence write locks let many people edit one document while reads carry on. djb2 hash tables give constant-time user and file lookups.',
      'New files go to the least-loaded server, metadata survives restarts, and there is one-step undo and word-by-word streaming.',
    ],
    repo: 'https://github.com/Parth12-ui/CLI-Docs', demo: 'locks',
  },
  {
    id: 'xv6', icon: '⚙', title: 'xv6 Kernel: Schedulers & Demand Paging', when: '2025', cats: ['systems'],
    stack: ['C', 'RISC-V', 'QEMU'],
    blurb: 'Added two CPU schedulers and demand paging to the xv6 teaching operating system.',
    body: [
      'Added a first-come-first-served (FCFS) scheduler and a Completely Fair Scheduler (CFS) with nice values from −20 to +20.',
      'Added demand paging: pages are loaded only when first used, with first-in-first-out (FIFO) eviction per process and swap slots.',
      'Benchmarked the schedulers on CPU-bound and mixed I/O workloads.',
    ],
    repo: null, demo: 'sched',
  },
  {
    id: 'shell', icon: '$_', title: 'C-Shell', when: 'Sep 2025', cats: ['systems'],
    stack: ['C', 'POSIX'],
    blurb: 'A 1,100-line POSIX shell with a grammar-based parser, pipelines and job control.',
    body: [
      'A grammar-based parser handles pipelines, command lists with ;, && and ||, background jobs with &, and < > redirection.',
      'Job control with fg/bg, Ctrl-C (SIGINT) and Ctrl-Z (SIGTSTP) handling, asynchronous reaping of finished child processes, and history that persists across sessions.',
    ],
    repo: 'https://github.com/Parth12-ui/C-Shell', demo: 'parse',
  },
  {
    id: 'net', icon: '⇄', title: 'Reliable Transport over UDP', when: 'Sep – Oct 2025', cats: ['systems', 'net'],
    stack: ['C', 'UDP'],
    blurb: 'A TCP-like protocol built on UDP: handshakes, sliding windows, cumulative ACKs and retransmission.',
    body: [
      'Part of my Network Protocol Suite: a 12-byte header, a three-way handshake and four-way teardown, a 10-packet sliding window, cumulative acknowledgements and flow control.',
      'On top of it, a file transfer tool that checks files with MD5 and a chat that uses select() to handle many connections without blocking.',
    ],
    repo: 'https://github.com/Parth12-ui/Net_Protocol-Suite', demo: 'window',
  },
  {
    id: 'sniffer', icon: '0x', title: 'Packet Sniffer', when: 'Sep – Oct 2025', cats: ['systems', 'net'],
    stack: ['C', 'libpcap', 'BPF'],
    blurb: 'A terminal network sniffer that decodes live traffic layer by layer.',
    body: [
      'Part of my Network Protocol Suite. Captures traffic with libpcap and filters it with Berkeley Packet Filters (BPF).',
      'Decodes Ethernet, IPv4/IPv6, ARP and TCP/UDP, recognises HTTP and DNS by port, and keeps up to 10,000 packets in memory for hex/ASCII inspection later.',
    ],
    repo: 'https://github.com/Parth12-ui/packet_sniffer', demo: 'hex',
  },
];

const SKILLS = {
  'Languages': ['C', 'C++', 'Python', 'TypeScript', 'JavaScript', 'Kotlin', 'SQL'],
  'Systems': ['POSIX processes & signals', 'pthreads', 'TCP/UDP sockets', 'libpcap', 'xv6', 'Linux'],
  'Web & mobile': ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'MQTT', 'Jetpack Compose'],
  'ML & data': ['PyTorch', 'Hugging Face Transformers', 'bitsandbytes', 'scikit-learn', 'OpenCV', 'pandas', 'NumPy', 'Matplotlib', 'D3.js'],
  'Methods': ['LLM evaluation', 'Hidden-state probing', 'Logistic regression', 'Bootstrap confidence intervals', 'Cross-validation'],
  'Tools': ['Git', 'Make', 'QEMU', 'Slurm', 'Weights & Biases', 'Jupyter'],
};
// Which projects each skill appears in (only where the resume says so).
const SKILL_USES = {
  'C': ['docs', 'xv6', 'shell', 'net', 'sniffer'], 'Python': ['llm', 'polygons'], 'TypeScript': ['printer'],
  'JavaScript': ['polygons', 'quakes'], 'Kotlin': ['android'],
  'POSIX processes & signals': ['shell'], 'pthreads': ['docs'], 'TCP/UDP sockets': ['docs', 'net'], 'libpcap': ['sniffer'], 'xv6': ['xv6'],
  'React': ['events', 'printer'], 'Node.js': ['events', 'printer'], 'Express': ['events', 'printer'], 'MongoDB': ['events', 'printer'],
  'Socket.IO': ['events'], 'MQTT': ['printer'], 'Jetpack Compose': ['android'],
  'PyTorch': ['llm'], 'Hugging Face Transformers': ['llm'], 'bitsandbytes': ['llm'], 'OpenCV': ['polygons'], 'D3.js': ['quakes'],
  'LLM evaluation': ['llm'], 'Hidden-state probing': ['llm'], 'QEMU': ['xv6'], 'Slurm': ['llm'], 'Weights & Biases': ['llm'],
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
$$('[data-stat]').forEach(el => { el.dataset.count = el.dataset.stat === 'c' ? PROJECTS.filter(p => p.stack.includes('C')).length : PROJECTS.length; });
const observeReveals = () => $$('.reveal:not(.in)').forEach(el => revObs.observe(el));

/* ---------------- Typed roles ---------------- */
(function typed() {
  const el = $('#typed');
  const words = ['systems in C', 'football analytics', 'LLM experiments', 'real-time web apps', 'Android apps', 'UNIX shells'];
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
  $('#modalLinks').innerHTML = (p.live ? `<a class="btn primary" href="${p.live}" target="_blank" rel="noopener">Open the live site ↗</a>` : '')
    + (p.repo ? `<a class="btn ${p.live ? 'ghost' : 'primary'}" href="${p.repo}" target="_blank" rel="noopener">View code on GitHub ↗</a>` : '<span class="muted small mono">The code for this one isn\'t public.</span>');
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

/* ---- Passing Polygons: clear / contested / blocked passing options ---- */
const AMBER = '#e8a93a';
DEMOS.lanes = el => {
  el.innerHTML = `
    <div class="demo-title"><span>Passing options: clear, contested or blocked</span><span id="lnStat"></span></div>
    <canvas id="lnCv"></canvas>
    <div class="demo-controls"><span class="small mono"><span style="color:var(--accent)">━</span> clear &nbsp; <span style="color:${AMBER}">━</span> contested &nbsp; <span style="color:var(--accent-2)">┅</span> blocked</span><button class="mini-btn" id="lnReset">Reset</button></div>
    <p class="demo-note"><b>Drag the defenders</b> (or any player). This is a simplified version of the idea: a pass counts as blocked when a defender stands on its line, and contested when one is close to it. The research works on real tracking data with its own rule.</p>`;
  const cv = $('#lnCv', el);
  let S, C = palette(), drag = null;
  const start = () => ({
    ball: { x: .2, y: .5 },
    mates: [{ x: .45, y: .16 }, { x: .5, y: .56 }, { x: .74, y: .32 }, { x: .8, y: .8 }],
    defs: [{ x: .33, y: .33 }, { x: .52, y: .76 }, { x: .62, y: .1 }, { x: .92, y: .5 }],
  });
  let st = start();
  const P = p => ({ x: 20 + p.x * (S.w - 40), y: 20 + p.y * (S.h - 40) });
  function segDist(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y, L2 = dx * dx + dy * dy;
    const t = clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / L2, 0, 1);
    return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
  }
  function classify() {
    const a = P(st.ball), blockR = S.w * .025, contR = S.w * .05;
    return st.mates.map(m => {
      const b = P(m), d = Math.min(...st.defs.map(df => segDist(P(df), a, b)));
      return d < blockR ? 'blocked' : d < contR ? 'contested' : 'clear';
    });
  }
  function draw() {
    const { ctx, w, h } = S; ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = C.line; ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 10, w - 20, h - 20); ctx.beginPath(); ctx.moveTo(w / 2, 10); ctx.lineTo(w / 2, h - 10); ctx.stroke();
    ctx.beginPath(); ctx.arc(w / 2, h / 2, h * .16, 0, 7); ctx.stroke();
    const cls = classify(), a = P(st.ball), counts = { clear: 0, contested: 0, blocked: 0 };
    st.mates.forEach((m, i) => {
      const b = P(m), c = cls[i]; counts[c]++;
      ctx.strokeStyle = c === 'clear' ? C.acc : c === 'contested' ? AMBER : C.acc2;
      ctx.lineWidth = c === 'clear' ? 3 : 2.5; ctx.setLineDash(c === 'blocked' ? [4, 6] : []);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.setLineDash([]);
    });
    st.defs.forEach(d => { const p = P(d); ctx.fillStyle = C.acc2; ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, 7); ctx.fill(); ctx.strokeStyle = hexA(C.acc2, .35); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(p.x, p.y, 15, 0, 7); ctx.stroke(); });
    st.mates.forEach((m, i) => {
      const p = P(m); ctx.fillStyle = C.acc; ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, 7); ctx.fill();
      ctx.font = '600 11px JetBrains Mono, monospace'; ctx.textAlign = 'center'; ctx.fillStyle = C.text; ctx.fillText(cls[i], p.x, p.y - 16);
    });
    ctx.fillStyle = C.acc; ctx.beginPath(); ctx.arc(a.x, a.y, 11, 0, 7); ctx.fill();
    ctx.fillStyle = C.text; ctx.shadowColor = C.acc; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(a.x + 12, a.y + 6, 5, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
    $('#lnStat', el).textContent = `${counts.clear} clear · ${counts.contested} contested · ${counts.blocked} blocked`;
  }
  const local = e => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  cv.addEventListener('pointerdown', e => {
    const p = local(e); let best = null, bd = 26;
    [st.ball, ...st.mates, ...st.defs].forEach(o => { const q = P(o), d = Math.hypot(q.x - p.x, q.y - p.y); if (d < bd) { bd = d; best = o; } });
    if (best) { drag = best; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing'; }
  });
  cv.addEventListener('pointermove', e => {
    const p = local(e);
    if (drag) { drag.x = clamp((p.x - 20) / (S.w - 40), 0, 1); drag.y = clamp((p.y - 20) / (S.h - 40), 0, 1); draw(); return; }
    const near = [st.ball, ...st.mates, ...st.defs].some(o => { const q = P(o); return Math.hypot(q.x - p.x, q.y - p.y) < 26; });
    cv.style.cursor = near ? 'grab' : 'default';
  });
  const up = () => { drag = null; cv.style.cursor = 'default'; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  $('#lnReset', el).onclick = () => { st = start(); draw(); };
  const ro = new ResizeObserver(() => { S = fitCanvas(cv, Math.round(Math.min(320, Math.max(220, cv.clientWidth * .55)))); draw(); });
  S = fitCanvas(cv, 300); draw(); ro.observe(cv);
  const th = () => { C = palette(); draw(); }; themeListeners.push(th);
  return () => { ro.disconnect(); themeListeners.splice(themeListeners.indexOf(th), 1); };
};

/* ---- C-Shell: parse a command line ---- */
DEMOS.parse = el => {
  el.innerHTML = `
    <div class="demo-title"><span>How the shell reads a command</span></div>
    <input class="mono" id="psIn" value="cat log.txt | grep error | sort > errors.txt &" spellcheck="false" autocomplete="off"
      style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--text);font-size:.9rem">
    <div class="demo-controls">${['make && ./run || echo failed', 'ls -la | wc -l', 'sort < in.txt >> out.txt', 'sleep 30 &', 'echo hi > a ; cat a'].map(x => `<button class="mini-btn mono" data-x="${esc(x)}">${esc(x)}</button>`).join('')}</div>
    <div id="psOut"></div>
    <div class="demo-controls"><button class="btn ghost" data-open-terminal style="padding:9px 14px">Try a shell in this page →</button></div>`;
  const out = $('#psOut', el), inp = $('#psIn', el);
  const box = (label, inner, color) => `<div style="border:1px solid ${color};border-radius:10px;padding:10px;margin-top:8px"><div class="mono small" style="color:${color};margin-bottom:6px">${label}</div>${inner}</div>`;
  function render() {
    const src = inp.value;
    const parts = src.split(/(;|&&|\|\|)/).map(s => s.trim());
    const jobs = []; for (let i = 0; i < parts.length; i += 2) if (parts[i]) jobs.push({ job: parts[i], conn: i ? parts[i - 1] : null });
    if (!jobs.length) { out.innerHTML = '<p class="demo-note">Type a command above.</p>'; return; }
    const CONN = { ';': 'then, regardless (;)', '&&': 'only if the previous one succeeded (&&)', '||': 'only if the previous one failed (||)' };
    out.innerHTML = jobs.map(({ job, conn }) => {
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
      return (conn ? `<div class="mono small muted" style="margin:10px 0 0 4px">↓ ${CONN[conn]}</div>` : '') + box(`${stages.length > 1 ? 'pipeline' : 'command'} · ${bg ? 'background job (&)' : 'foreground'}`, inner, bg ? 'var(--accent-3)' : 'var(--accent)');
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
    <div class="demo-title"><span>Sliding window · 4 here, 10 in the real protocol</span><span id="swStat">ready</span></div>
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
  const nodes = () => { const w = S.w; return [{ x: w * .16, label: 'React dashboard' }, { x: w * .5, label: 'Mosquitto broker' }, { x: w * .84, label: 'ESP32 printer' }]; };
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
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '10px JetBrains Mono, monospace'; ctx.fillStyle = C.muted;
    if (w > 520) { ctx.fillText('WebSockets', (N[0].x + N[1].x) / 2, y - 8); ctx.fillText('TCP', (N[1].x + N[2].x) / 2, y - 8); }
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

/* ---- Event platform: real-time forum over Socket.IO ---- */
DEMOS.forum = el => {
  const roles = [['participant', 'A'], ['organiser', 'B']];
  el.innerHTML = `
    <div class="demo-title"><span>Real-time forum over Socket.IO (illustration)</span><span>room: event:hackathon</span></div>
    <div class="fm-grid">${roles.map(([r, b]) => `
      <div class="fm-pane" data-r="${r}">
        <div class="fm-head mono small"><span class="fm-dot"></span>browser ${b} · ${r}</div>
        <div class="fm-msgs"></div>
        <form class="fm-form"><input placeholder="Message as ${r}…" maxlength="120" aria-label="Message as ${r}"><button class="mini-btn">Send</button></form>
      </div>`).join('')}
    </div>
    <div class="fm-server mono small" id="fmServer">server: io.to('event:hackathon').emit(…)</div>
    <div class="log" id="fmLog"></div>
    <p class="demo-note">Send from either window: the message goes to the server once and is pushed to everyone in the event's room, with no refresh. Organisers can pin messages.</p>`;
  let id = 0;
  const msgs = [
    { id: id++, role: 'organiser', text: 'Registrations close at 6 pm today.', pinned: true },
    { id: id++, role: 'participant', text: 'Is the maximum team size 4?', pinned: false },
  ];
  const log = m => $('#fmLog', el).insertAdjacentHTML('afterbegin', `<div>${m}</div>`);
  const pulse = () => { const s = $('#fmServer', el); s.classList.remove('hit'); void s.offsetWidth; s.classList.add('hit'); };
  function render() {
    const order = [...msgs].sort((a, b) => (b.pinned - a.pinned) || a.id - b.id);
    $$('.fm-pane', el).forEach(pane => {
      const me = pane.dataset.r, box = $('.fm-msgs', pane);
      box.innerHTML = order.map(m => `<div class="fm-msg ${m.role === me ? 'mine' : ''} ${m.pinned ? 'pinned' : ''}">
        <span class="mono small muted">${m.pinned ? '📌 ' : ''}${m.role}</span><span>${esc(m.text)}</span>
        ${me === 'organiser' ? `<button class="fm-pin mono small" data-id="${m.id}">${m.pinned ? 'unpin' : 'pin'}</button>` : ''}</div>`).join('');
      box.scrollTop = box.scrollHeight;
    });
  }
  $$('.fm-form', el).forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const inp = $('input', f), text = inp.value.trim(), role = f.closest('.fm-pane').dataset.r;
    if (!text) return; inp.value = '';
    log(`${role} → socket.emit('message', "${esc(text.slice(0, 40))}")`); pulse();
    setTimeout(() => { msgs.push({ id: id++, role, text, pinned: false }); render(); log('<span class="t-acc">server → broadcast to 2 clients in room</span>'); }, 280);
  }));
  el.addEventListener('click', e => {
    const b = e.target.closest('.fm-pin'); if (!b) return;
    const m = msgs.find(x => x.id === +b.dataset.id); m.pinned = !m.pinned;
    log(`organiser → socket.emit('${m.pinned ? 'pin' : 'unpin'}', ${m.id})`); pulse(); setTimeout(render, 280);
  });
  render();
};

/* ---- Institute app: role-aware phone UI with OTP sign-in ---- */
DEMOS.phone = el => {
  const courses = [
    { name: 'Operating Systems', time: '09:00', room: 'H-101', held: 12, present: 10, alert: true },
    { name: 'Linear Algebra', time: '11:30', room: 'H-204', held: 10, present: 9, alert: false },
    { name: 'Software Systems', time: '14:00', room: 'Lab 3', held: 8, present: 5, alert: true },
  ];
  const roster = [['You', true], ['Student 2', true], ['Student 3', false], ['Student 4', true]];
  let role = 'student', screen = 'login', marked = false;
  el.innerHTML = `
    <div class="demo-title"><span>Same app, different dashboards (illustration)</span></div>
    <div class="demo-controls"><span class="small muted">Sign in as</span><div class="seg" id="phRole"><button class="on" data-r="student">student</button><button data-r="faculty">faculty</button></div></div>
    <div class="phone"><div class="phone-notch"></div><div class="phone-screen" id="phScreen"></div></div>
    <p class="demo-note">Faculty mark attendance; switch back to the student view to see your percentage update.</p>`;
  const scr = $('#phScreen', el);
  const pct = c => Math.round(c.present / c.held * 100);
  function render() {
    if (screen === 'login') {
      scr.innerHTML = `<div class="ph-center"><div class="ph-logo">▢</div><h4>Institute</h4><p class="muted small">Sign in as ${role}</p>
        <div class="otp" id="otp">${'<span></span>'.repeat(4)}</div><button class="btn primary ph-btn" id="phSend">Send OTP</button></div>`;
      $('#phSend', el).onclick = () => {
        const code = '4821', boxes = $$('#otp span', el); $('#phSend', el).disabled = true; $('#phSend', el).textContent = 'Code sent ✓';
        [...code].forEach((d, i) => setTimeout(() => { boxes[i].textContent = d; if (i === 3) setTimeout(() => { screen = 'home'; render(); }, 450); }, 350 + i * 260));
      };
      return;
    }
    const head = `<div class="ph-bar"><b>${role === 'student' ? 'My day' : 'Teaching'}</b><button class="ph-out mono small" id="phOut">sign out</button></div>`;
    if (role === 'student') {
      scr.innerHTML = head + `<div class="ph-sec mono small muted">Today's timetable</div>` + courses.map((c, i) => `
        <div class="ph-card"><div><b>${c.time}</b> · ${c.name}<div class="muted small">${c.room}</div></div>
        <button class="ph-bell ${c.alert ? 'on' : ''}" data-i="${i}" aria-label="Toggle alert for ${c.name}">${c.alert ? '🔔' : '🔕'}</button></div>`).join('')
        + `<div class="ph-sec mono small muted">Attendance</div>` + courses.map(c => `
        <div class="ph-att"><span>${c.name}</span><b class="${pct(c) < 75 ? 'low' : ''}">${pct(c)}%</b><i style="width:${pct(c)}%"></i></div>`).join('');
      $$('.ph-bell', scr).forEach(b => b.onclick = () => { const c = courses[+b.dataset.i]; c.alert = !c.alert; render(); toast(c.alert ? `Alert set 10 min before ${c.name}` : 'Alert off'); });
    } else {
      const c = courses[0];
      scr.innerHTML = head + `<div class="ph-sec mono small muted">${c.name} · ${c.time} · class ${c.held + 1}</div>` + roster.map(([n, p], i) => `
        <label class="ph-row"><span>${n}</span><input type="checkbox" data-i="${i}" ${p ? 'checked' : ''} ${marked ? 'disabled' : ''}><em>${p ? 'present' : 'absent'}</em></label>`).join('')
        + `<button class="btn primary ph-btn" id="phSubmit" ${marked ? 'disabled' : ''}>${marked ? 'Submitted ✓' : 'Submit attendance'}</button>`;
      $$('.ph-row input', scr).forEach(cb => cb.onchange = () => { roster[+cb.dataset.i][1] = cb.checked; render(); });
      const sb = $('#phSubmit', scr); if (sb && !marked) sb.onclick = () => { c.held++; if (roster[0][1]) c.present++; marked = true; render(); toast('Attendance saved'); };
    }
    $('#phOut', scr).onclick = () => { screen = 'login'; render(); };
  }
  $('#phRole', el).onclick = e => {
    const b = e.target.closest('button'); if (!b) return; role = b.dataset.r; screen = 'login'; if (role === 'faculty') marked = false;
    $$('#phRole button', el).forEach(x => x.classList.toggle('on', x === b)); render();
  };
  render();
};

/* ---- Earthquakes: what one magnitude step means ---- */
DEMOS.mag = el => {
  el.innerHTML = `
    <div class="demo-title"><span>How much bigger is one step on the magnitude scale?</span></div>
    <div class="mag-grid">
      <label class="mono small">Quake A <b id="mgAv"></b><input type="range" id="mgA" min="2" max="9.5" step="0.1" value="5"></label>
      <label class="mono small">Quake B <b id="mgBv"></b><input type="range" id="mgB" min="2" max="9.5" step="0.1" value="7"></label>
    </div>
    <div class="mag-out" id="mgOut"></div>
    <div class="mag-dots" id="mgDots"></div>
    <p class="demo-note">Uses the standard relation log₁₀E = 1.5M + 4.8 (E in joules) and 1 tonne of TNT = 4.184 GJ. The project itself charted 80,829 real USGS records.</p>`;
  const E = m => Math.pow(10, 1.5 * m + 4.8), tnt = j => j / 4.184e9;
  const fmt = n => n >= 1e6 ? n.toExponential(1).replace('e+', ' × 10^') : n >= 100 ? Math.round(n).toLocaleString() : n >= 1 ? n.toFixed(1) : n.toPrecision(2);
  const fmtT = t => t >= 1e6 ? fmt(t / 1e6) + ' megatonnes' : t >= 1e3 ? fmt(t / 1e3) + ' kilotonnes' : t >= 1 ? fmt(t) + ' tonnes' : fmt(t * 1000) + ' kg';
  function render() {
    const a = +$('#mgA', el).value, b = +$('#mgB', el).value, lo = Math.min(a, b), hi = Math.max(a, b), d = hi - lo;
    $('#mgAv', el).textContent = a.toFixed(1); $('#mgBv', el).textContent = b.toFixed(1);
    const ratio = Math.pow(10, 1.5 * d);
    $('#mgOut', el).innerHTML = `
      <div><span class="muted small">Shaking (wave amplitude)</span><b>× ${fmt(Math.pow(10, d))}</b></div>
      <div><span class="muted small">Energy released</span><b>× ${fmt(ratio)}</b></div>
      <div><span class="muted small">Quake A ≈ TNT</span><b>${fmtT(tnt(E(a)))}</b></div>
      <div><span class="muted small">Quake B ≈ TNT</span><b>${fmtT(tnt(E(b)))}</b></div>`;
    const n = Math.round(ratio);
    $('#mgDots', el).innerHTML = d === 0 ? '<span class="muted small">Same magnitude, same energy.</span>'
      : n <= 400 ? `<span class="muted small">The magnitude ${hi.toFixed(1)} quake releases as much energy as ${n.toLocaleString()} quakes of magnitude ${lo.toFixed(1)}:</span><div class="dots">${'<i></i>'.repeat(n)}</div>`
      : `<span class="muted small">The magnitude ${hi.toFixed(1)} quake releases as much energy as <b>${fmt(ratio)}</b> quakes of magnitude ${lo.toFixed(1)}. Too many dots to draw!</span>`;
  }
  $$('input', el).forEach(i => i.addEventListener('input', render));
  render();
};

/* ---- xv6: FCFS vs Completely Fair Scheduler ---- */
DEMOS.sched = el => {
  const procs = [
    { name: 'P1', arrive: 0, burst: 6, nice: 0 }, { name: 'P2', arrive: 1, burst: 3, nice: 0 },
    { name: 'P3', arrive: 2, burst: 4, nice: -5 }, { name: 'P4', arrive: 3, burst: 2, nice: 5 },
  ];
  const COL = ['var(--accent)', 'var(--accent-3)', 'var(--accent-2)', AMBER];
  el.innerHTML = `
    <div class="demo-title"><span>FCFS vs Completely Fair Scheduler</span></div>
    <table class="sched-tbl mono small"><thead><tr><th>process</th><th>arrives</th><th>CPU time</th><th>nice</th></tr></thead><tbody>
      ${procs.map((p, i) => `<tr><td><i style="background:${COL[i]}"></i>${p.name}</td><td>t=${p.arrive}</td>
        <td><input type="range" min="1" max="8" value="${p.burst}" data-i="${i}" data-k="burst" aria-label="${p.name} CPU time"> <span>${p.burst}</span></td>
        <td><select data-i="${i}" data-k="nice" aria-label="${p.name} nice value">${[-10, -5, 0, 5, 10].map(n => `<option ${n === p.nice ? 'selected' : ''}>${n}</option>`).join('')}</select></td></tr>`).join('')}
    </tbody></table>
    <div id="schOut"></div>
    <p class="demo-note">Simplified: one CPU, 1-unit time slices, no I/O. FCFS runs each process to completion in arrival order. CFS always runs whoever has had the least weighted CPU time, so a lower nice value earns a bigger share.</p>`;
  const weight = n => 1024 / Math.pow(1.25, n);
  function simulate(kind) {
    const left = procs.map(p => p.burst), vr = procs.map(() => 0), first = procs.map(() => -1), done = procs.map(() => -1), seen = procs.map(() => false);
    const tl = []; let t = 0, cur = -1;
    while (done.some(d => d < 0) && t < 200) {
      const ready = procs.map((p, i) => i).filter(i => procs[i].arrive <= t && left[i] > 0);
      ready.forEach(i => { if (!seen[i]) { seen[i] = true; const others = ready.filter(j => j !== i && seen[j]); vr[i] = others.length ? Math.min(...others.map(j => vr[j])) : 0; } });
      if (!ready.length) { tl.push(-1); t++; continue; }
      let pick;
      if (kind === 'fcfs') pick = cur >= 0 && left[cur] > 0 ? cur : ready.sort((a, b) => procs[a].arrive - procs[b].arrive || a - b)[0];
      else pick = ready.sort((a, b) => vr[a] - vr[b] || a - b)[0];
      cur = pick; if (first[pick] < 0) first[pick] = t;
      left[pick]--; vr[pick] += 1024 / weight(procs[pick].nice); tl.push(pick); t++;
      if (left[pick] === 0) done[pick] = t;
    }
    const turn = procs.reduce((s, p, i) => s + done[i] - p.arrive, 0) / procs.length;
    const resp = procs.reduce((s, p, i) => s + first[i] - p.arrive, 0) / procs.length;
    return { tl, turn, resp };
  }
  function row(label, r) {
    const segs = []; r.tl.forEach(p => { const last = segs[segs.length - 1]; if (last && last.p === p) last.n++; else segs.push({ p, n: 1 }); });
    return `<div class="gantt-row"><div class="mono small gantt-label">${label}</div><div class="gantt">${segs.map(s => `<span style="flex:${s.n};background:${s.p < 0 ? 'transparent' : COL[s.p]}" title="${s.p < 0 ? 'idle' : procs[s.p].name} × ${s.n}">${s.p < 0 ? '' : procs[s.p].name}</span>`).join('')}</div>
      <div class="mono small muted">avg turnaround <b>${r.turn.toFixed(1)}</b> · avg wait to first run <b>${r.resp.toFixed(1)}</b></div></div>`;
  }
  function render() {
    const f = simulate('fcfs'), c = simulate('cfs'), T = Math.max(f.tl.length, c.tl.length);
    $('#schOut', el).innerHTML = row('FCFS', f) + row('CFS', c) + `<div class="mono small muted gantt-axis"><span>t=0</span><span>t=${T}</span></div>`;
  }
  el.addEventListener('input', e => {
    const x = e.target.closest('[data-k]'); if (!x) return;
    procs[+x.dataset.i][x.dataset.k] = +x.value; if (x.dataset.k === 'burst') x.nextElementSibling.textContent = x.value; render();
  });
  render();
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
  whoami: () => [L('Parth Nitesh Chaudhari — CS undergrad at IIIT Hyderabad (2024–2028). Systems, full-stack, sports analytics, NLP.')],
  about: () => [L('I grew up in Abu Dhabi and study Computer Science at IIIT Hyderabad.'), L('I write systems software in C, build full-stack and Android apps, analyse football tracking data,'), L('and run experiments on how language models behave when users push back.')],
  education: () => [L('2024–2028  B.Tech, Computer Science & Engineering — IIIT Hyderabad', 't-acc'), L('2014–2024  High School Diploma — Asian International School, Abu Dhabi')],
  experience: () => [
    L('Apr 2026 – now   Undergraduate Research Assistant, Data Science and Analytics Centre, IIIT-H', 't-acc'),
    L('                  Football tracking data → 8,087 phases of play; dashboard labelling 24,374 passing options'),
    L('Jan – May 2026    Software Engineering Team Project, Cosmic 3D (Maker\'s Lab)', 't-acc'),
    L('                  Remote control of ESP32 3D printers; owned the MQTT layer (Mosquitto over TCP + WebSockets)'),
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
    L('   ▀▀▀▀   OS: GitHub Pages'), L('          Uni: IIIT Hyderabad · CSE · 2028'), L('          Shell: pc-sh (inspired by C-Shell)'), L('          Langs: C, C++, Python, TypeScript, Kotlin, SQL'),
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
