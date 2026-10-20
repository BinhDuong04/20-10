/* Trình phát nhạc: chỉ phát sau khi người dùng tương tác */
(function () {
  const audio = document.getElementById("audio");
  const btn = document.getElementById("music-toggle");
  const vol = document.getElementById("vol");
  const msg = document.getElementById("music-msg");
  const player = document.getElementById("player");
  let broken = false;

  function ui(on) { player.classList.toggle("playing", on); btn.setAttribute("aria-pressed", String(on)); }
  function fail(t) { broken = true; ui(false); msg.textContent = t; }
  audio.addEventListener("error", () => fail("Chưa có file nhạc (assets/music/music.mp3)"));

  window.Music = {
    init(cfg) {
      document.getElementById("song-name").textContent = cfg.title;
      audio.src = cfg.src; audio.volume = vol.value = cfg.volume;
      vol.addEventListener("input", () => (audio.volume = +vol.value));
      btn.addEventListener("click", () => (audio.paused ? this.play() : this.pause()));
    },
    show() { player.hidden = false; },
    async play() {
      if (broken) return;
      try { audio.load && audio.readyState === 0 && audio.load(); await audio.play(); msg.textContent = ""; ui(true); }
      catch (e) { if (!broken) { ui(false); msg.textContent = "Nhấn nút để bật nhạc"; } }
    },
    pause() { audio.pause(); ui(false); }
  };
})();
