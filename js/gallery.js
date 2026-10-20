/* Album ảnh + lightbox + ảnh dự phòng khi thiếu file */
(function () {
  function placeholder(i, label) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#${["FF7BAC","A78BFA"][i % 2]}"/><stop offset="1" stop-color="#21102D"/></linearGradient></defs><rect width="600" height="750" fill="url(#g)"/><text x="300" y="375" fill="#FFF4FA" font-family="sans-serif" font-size="26" text-anchor="middle" opacity=".8">${label}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function img(src, alt, i) {
    const el = new Image();
    el.alt = alt; el.decoding = "async";
    el.onerror = () => { el.onerror = null; el.src = placeholder(i, "Thay ảnh " + (i + 1)); };
    el.src = src; return el;
  }

  const lb = document.getElementById("lightbox"), lbImg = document.getElementById("lb-img"), lbCap = document.getElementById("lb-cap");
  let list = [], cur = 0, opener = null;
  function show(i) {
    cur = (i + list.length) % list.length;
    lbImg.onerror = () => { lbImg.onerror = null; lbImg.src = placeholder(cur, "Thay ảnh " + (cur + 1)); };
    lbImg.src = list[cur].src; lbImg.alt = list[cur].caption || ""; lbCap.textContent = list[cur].caption || "";
  }
  function open(i, from) { opener = from; lb.hidden = false; show(i); document.getElementById("lb-close").focus(); }
  function close() { lb.hidden = true; opener && opener.focus(); }
  document.getElementById("lb-close").onclick = close;
  document.getElementById("lb-prev").onclick = () => show(cur - 1);
  document.getElementById("lb-next").onclick = () => show(cur + 1);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show(cur - 1); else if (e.key === "ArrowRight") show(cur + 1);
  });

  window.Gallery = {
    img,
    render(photos, grid) {
      list = photos; grid.innerHTML = "";
      photos.forEach((p, i) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "polaroid reveal";
        b.style.setProperty("--r", ((i % 3) - 1) * 2.2 + "deg");
        b.setAttribute("aria-label", "Xem ảnh: " + (p.caption || i + 1));
        b.appendChild(img(p.src, p.caption || "", i));
        const c = document.createElement("span"); c.textContent = p.caption || ""; b.appendChild(c);
        b.onclick = () => open(i, b);
        grid.appendChild(b);
      });
    }
  };
})();
