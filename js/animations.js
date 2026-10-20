/* Hiệu ứng: nền trái tim/hạt sáng, reveal khi cuộn, tilt 3D, gõ chữ */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const A = (window.Anim = { reduce });

  const cv = document.getElementById("fx"), ctx = cv.getContext("2d");
  let W = 0, H = 0, items = [], running = false, dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize() {
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.width = W + "px"; cv.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const COLORS = ["#FF7BAC", "#A78BFA", "#FFF4FA"];
  function make(kind, fromBottom) {
    return {
      kind, x: Math.random() * W, y: fromBottom ? H + 20 : Math.random() * H,
      s: kind === "heart" ? 8 + Math.random() * 14 : kind === "petal" ? 5 + Math.random() * 6 : 1 + Math.random() * 2,
      v: kind === "heart" ? 0.25 + Math.random() * 0.5 : kind === "petal" ? 0.4 + Math.random() * 0.7 : 0.08 + Math.random() * 0.2,
      p: Math.random() * 6.28, c: COLORS[(Math.random() * 3) | 0],
      a: kind === "heart" ? 0.12 + Math.random() * 0.25 : kind === "petal" ? 0.4 + Math.random() * 0.4 : 0.25 + Math.random() * 0.5, rot: Math.random() * 6.28
    };
  }
  function heart(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.35);
    ctx.bezierCurveTo(x - s, y - s * 0.4, x - s * 0.5, y - s, x, y - s * 0.4);
    ctx.bezierCurveTo(x + s * 0.5, y - s, x + s, y - s * 0.4, x, y + s * 0.35);
    ctx.fill();
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (const o of items) {
      const petal = o.kind === "petal";
      if (!reduce) { o.y += petal ? o.v : -o.v; o.p += 0.01; o.x += Math.sin(o.p) * (petal ? 0.8 : 0.3); o.rot += 0.02; }
      if (petal && o.y > H + 30) { Object.assign(o, make("petal")); o.y = -20; }
      else if (!petal && o.y < -30) Object.assign(o, make(o.kind, true));
      ctx.globalAlpha = o.a; ctx.fillStyle = petal ? (o.s > 8 ? "#FF7BAC" : "#FFF4FA") : o.c;
      if (petal) { ctx.beginPath(); ctx.ellipse(o.x, o.y, o.s, o.s * 0.55, o.rot, 0, 6.28); ctx.fill(); }
      else if (o.kind === "heart") heart(o.x, o.y, o.s);
      else { ctx.beginPath(); ctx.arc(o.x, o.y, o.s, 0, 6.28); ctx.fill(); }
    }
    if (running && !reduce) requestAnimationFrame(frame);
  }
  A.startFx = function (cfg) {
    resize(); items = [];
    if (cfg.hearts) for (let i = 0; i < (isMobile ? 8 : 16); i++) items.push(make("heart"));
    if (cfg.particles) for (let i = 0; i < (isMobile ? 20 : 45); i++) items.push(make("dot"));
    if (cfg.petals) for (let i = 0; i < (isMobile ? 10 : 22); i++) items.push(make("petal"));
    running = true; frame(); // reduced-motion: chỉ vẽ một khung tĩnh
  };
  A.burst = function (n) {
    if (reduce) return;
    for (let i = 0; i < n; i++) { const o = make("heart", true); o.v += 1; o.a = 0.5; o.burst = true; items.push(o); }
    setTimeout(() => { items = items.filter(o => !o.burst); }, 9000);
  };
  addEventListener("resize", () => { resize(); if (reduce) frame(); });
  document.addEventListener("visibilitychange", () => {
    if (reduce) return;
    running = !document.hidden; if (running) frame();
  });

  A.reveal = function () {
    const els = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) return els.forEach(e => e.classList.add("in"));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    els.forEach(e => io.observe(e));
  };

  A.tilt = function (el, parallaxEls) {
    if (reduce) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function loop() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      el.style.transform = `rotateX(${(-cy * 10).toFixed(2)}deg) rotateY(${(cx * 14).toFixed(2)}deg)`;
      parallaxEls.forEach(p => { p.style.transform = `translate(${(cx * 12 * p.dataset.d).toFixed(1)}px, ${(cy * 8 * p.dataset.d).toFixed(1)}px)`; });
      raf = (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002) ? requestAnimationFrame(loop) : null;
    }
    function set(x, y) { tx = Math.max(-1, Math.min(1, x)); ty = Math.max(-1, Math.min(1, y)); if (!raf) raf = requestAnimationFrame(loop); }
    addEventListener("pointermove", e => { if (e.pointerType !== "touch") set((e.clientX / innerWidth - 0.5) * 2, (e.clientY / innerHeight - 0.5) * 2); });
    addEventListener("deviceorientation", e => { if (e.gamma != null && e.beta != null) set(e.gamma / 30, (e.beta - 45) / 30); });
  };

  A.typewriter = function (el, paragraphs, speed, done) {
    el.textContent = "";
    if (reduce) { el.textContent = paragraphs.join("\n\n"); return done && done(); }
    const text = Array.from(paragraphs.join("\n\n"));
    let i = 0;
    (function step() {
      el.textContent += text[i++] || "";
      if (i < text.length) setTimeout(step, text[i - 1] === "\n" ? speed * 6 : speed);
      else done && done();
    })();
  };
})();
