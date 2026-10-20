/* Khởi tạo: đổ nội dung từ CONFIG, bộ đếm, sự kiện mở quà */
(function () {
  const C = window.CONFIG, $ = id => document.getElementById(id);

  $("gate-kicker").textContent = C.gate.kicker;
  $("gate-title").textContent = C.gate.title;
  $("gate-lead").textContent = C.gate.lead;
  $("open-btn").textContent = C.gate.button;
  $("hero-title").textContent = C.hero.title;
  $("hero-wish").textContent = C.hero.wish;
  $("hero-names").textContent = C.name + "  ❤";
  $("letter-title").textContent = C.letter.title;
  $("letter-sign").textContent = C.letter.signature;
  $("album-title").textContent = C.albumTitle;
  $("end-thanks").textContent = C.ending.thanks;
  $("end-inf").textContent = C.ending.infinity;
  $("end-wish").textContent = C.ending.wish;
  document.title = C.gate.title + " – " + C.name;

  // Cụm ảnh 3D: 1 ảnh trung tâm, các ảnh còn lại xoay vòng đổi chỗ cho nhau
  const stack = $("stack");
  const SLOTS = [ // x, y, z, xoay, scale (slot 0 = trung tâm)
    [0, 0, 120, 0, 1], [-190, -20, -40, -10, .68], [190, 10, -40, 10, .68], [-90, 150, -120, 6, .52], [100, -150, -140, -6, .52]];
  const RING = [0, 2, 4, 3, 1].filter(s => s < Math.min(C.heroPhotoCount, 5, C.photos.length)); // thứ tự vòng quay
  const cards = C.photos.slice(0, RING.length).map((p, i) => {
    const wrap = document.createElement("div");
    wrap.className = "hp";
    const inner = document.createElement("div"); inner.className = "hp-in"; inner.dataset.d = .7;
    inner.appendChild(Gallery.img(p.src, p.caption || "", i));
    wrap.appendChild(inner); stack.appendChild(wrap);
    return wrap;
  });
  let turn = 0;
  function place() {
    cards.forEach((el, i) => {
      const [x, y, z, r, k] = SLOTS[RING[(i + turn) % RING.length]];
      el.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateZ(${r}deg) scale(${k})`;
      el.classList.toggle("front", RING[(i + turn) % RING.length] === 0);
    });
  }
  place();
  function startCarousel() {
    if (Anim.reduce || RING.length < 2) return;
    setInterval(() => { if (!document.hidden) { turn = (turn + RING.length - 1) % RING.length; place(); } }, C.rotateEveryMs || 3600);
  }

  Gallery.render(C.photos, $("grid"));
  Music.init(C.music);
  Anim.startFx(C.effects);

  let typed = false;
  function startLetter() {
    if (typed) return; typed = true;
    Anim.typewriter($("letter-body"), C.letter.paragraphs, C.effects.typeSpeedMs, () => {
      $("letter-sign").classList.add("show"); Anim.burst(6);
    });
  }

  $("open-btn").addEventListener("click", () => {
    const gate = $("gate"), app = $("app");
    app.hidden = false;
    document.body.classList.remove("locked");
    gate.classList.add("open");
    Anim.burst(24); Music.show(); Music.play();
    setTimeout(() => { gate.hidden = true; scrollTo(0, 0); }, Anim.reduce ? 0 : 1300);
    requestAnimationFrame(() => app.classList.add("on"));
    Anim.reveal();
    startCarousel();
    if (C.effects.tilt) Anim.tilt($("stack"), Array.from(document.querySelectorAll(".hp-in")));
    if ("IntersectionObserver" in window && !Anim.reduce) {
      new IntersectionObserver((es, io) => es.forEach(e => { if (e.isIntersecting) { startLetter(); io.disconnect(); } }), { threshold: 0.4 }).observe($("letter"));
    } else startLetter();
  });
})();
