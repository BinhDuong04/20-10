/* ==========================================================
   CẤU HÌNH DUY NHẤT - chỉ cần sửa file này và thay ảnh/nhạc
   trong thư mục assets. Dữ liệu dưới đây chỉ là MẪU.
   ========================================================== */
window.CONFIG = {
  name: "Nhin",               // thay bằng tên thật (hiện kèm trái tim ở đầu trang)

  gate: {
    title: "Chúc mừng 20.10",
    lead: "Gửi đến em một chút yêu thương qua những hình ảnh kỷ niệm muốn dành riêng cho em...",
    button: "Mở món quà ❤️"
  },

  hero: {
    title: "Happy Women’s Day",
    wish: "20.10 – chúc em luôn xinh đẹp, bình yên và được yêu thương thật nhiều."
  },

  letter: {
    title: "Gửi em, anh muốn nói với em rằng...",
    paragraphs: [
      "Em à,",
      "Thật lòng, anh buồn. Buồn vì đáng lẻ bây giờ anh phải bên em và trò chuyện với em.", 
      "Buồn vì những ngày vừa qua, chúng ta chẳng vui vẻ với nhau như anh mong muốn. Có những vấn đề mà anh không thể giải quyết được, và anh cũng không biết phải làm gì để em vui lên...",
      "Có lẽ cả hai đều có những điều ấm ức, những suy nghĩ riêng mà đối phương chưa thực sự hiểu được.",
      "Anh không biết em đang nghĩ gì, cũng chẳng chắc những lời này có thể khiến em vui hơn hay không. Anh chỉ biết rằng anh không muốn ngày 20/10 của em trôi qua với tâm trạng như vậy. Anh nghĩ khi em nhìn những tấm ảnh này sẽ dễ chịu hơn và hi vọng em sẽ thích món quà anh đã chuẩn bị.",
    ],
    signature: "Luôn luôn như vậy..."
  },

  albumTitle: "Những khoảnh khắc đẹp của em",
  // Thêm/xóa ảnh bằng cách thêm/xóa dòng. Ảnh nằm trong assets/images/
  photos: [   // ảnh đầu tiên sẽ nằm giữa lúc mở thiệp
    { src: "assets/images/couple_3.jpg", caption: "Dạo phố đêm.." },
    { src: "assets/images/couple6.jpg", caption: "Gần nhau thật gần" },
    { src: "assets/images/couple6_.jpg", caption: "Quậy quá chời luôn. Haha" },
    { src: "assets/images/couple2.jpg", caption: "Tạo dáng kiểu gì đây?" },
    { src: "assets/images/couple1.jpg", caption: "Anh, em & photobooth " },
    { src: "assets/images/couple5.jpg", caption: "Lượn lờ cùng nhau nè" }
  ],
  heroPhotoCount: 5,                // số ảnh đầu danh sách dùng cho cụm 3D xoay vòng (tối đa 5)
  rotateEveryMs: 3600,              // thời gian giữa mỗi lần các ảnh đổi chỗ

  ending: {
    thanks: "Thank you for being you",
    infinity: "Happy 20.10, my love",
    wish: "Chúc em một ngày 20.10 thật rạng rỡ và ngập tràn hoa."
  },

  music: { src: "assets/music/music.mp3", title: "Nhạc nền", volume: 0.6 },

  effects: { hearts: true, particles: true, petals: true, tilt: true, typeSpeedMs: 38 }
};
