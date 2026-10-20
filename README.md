# Thiệp chúc 20/10

Web tĩnh thuần HTML/CSS/JS (không cần build, không phụ thuộc thư viện; chỉ tải Google Fonts, có font dự phòng).

## Cấu trúc
- `index.html` – khung 6 màn hình + lightbox + trình phát nhạc
- `js/config.js` – **toàn bộ nội dung cần chỉnh** (tên, lời chúc, ảnh, nhạc)
- `js/animations.js` – nền trái tim/hạt sáng, reveal, tilt 3D, gõ chữ
- `js/music.js`, `js/gallery.js`, `js/main.js` – nhạc, album/lightbox, khởi tạo
- `assets/images/`, `assets/music/` – ảnh và nhạc của bạn

## Chạy thử
Cách 1: mở `index.html` bằng trình duyệt. Cách 2 (khuyên dùng): VS Code → cài *Live Server* → chuột phải `index.html` → Open with Live Server. Hoặc chạy `python -m http.server 8000` rồi mở http://localhost:8000.

## Cá nhân hóa
1. Sửa `names`, `letter`, `ending` trong `js/config.js`.
2. Chép ảnh vào `assets/images/` (đặt tên trùng `photos[].src`, hoặc sửa danh sách). Thêm/xóa ảnh = thêm/xóa một dòng. Ảnh dọc tỷ lệ 4:5 đẹp nhất; nên nén dưới ~300KB/ảnh.
3. Chép nhạc bạn có quyền sử dụng thành `assets/music/music.mp3`, sửa `music.title`.
Thiếu ảnh sẽ hiện ảnh thay thế; thiếu nhạc sẽ hiện thông báo, web vẫn chạy.

## Đưa lên mạng để gửi link
- **Netlify Drop**: vào app.netlify.com/drop, kéo cả thư mục `love-anniversary` vào → có link ngay.
- **GitHub Pages**: tạo repo, đẩy code, Settings → Pages → chọn nhánh `main`, thư mục `/root`.
- **Vercel/Cloudflare Pages**: import repo, không cần cấu hình build.
