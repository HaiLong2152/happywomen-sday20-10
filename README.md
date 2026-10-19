# 💐 Web Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10

Trang web thiệp chúc mừng tương tác 20/10 đẹp mắt, lãng mạn và hiện đại, thiết kế hoàn hảo cho cả điện thoại (Zalo / Messenger) và máy tính.

---

## ✨ Các Tính Năng Nổi Bật

1. **Phong Thư Tương Tác 3D (Interactive Wax Seal Envelope):** Chạm vào con dấu sáp đỏ để mở bung nắp thiệp, bắn pháo hoa giấy và hé lộ bức tâm thư ấm áp.
2. **Cá Nhân Hóa Tên & Đối Tượng (Role Switcher):** 
   - Lựa chọn sẵn: **Mẹ Yêu, Vợ / Người Yêu, Chị / Em Gái, Cô Giáo, Bạn Bè / Đồng Nghiệp**.
   - Ô nhập tên riêng tùy ý (VD: *Lan Anh, Thu Hà, Mẹ yêu...*).
3. **Tạo Link Riêng Biệt Gửi Zalo / Messenger (`?to=Tên&role=lover`):**
   - Tự động sinh link kèm tham số URL. Người nhận khi bấm vào link sẽ thấy ngay tên của mình và thiệp tự động mở!
4. **Nhạc Nền Hộp Nhạc Tự Động (Web Audio API Synthesizer):**
   - Tích hợp sẵn bộ tổng hợp âm thanh nốt chuông lãng mạn nhẹ nhàng, **không phụ thuộc file MP3 ngoài**, chạy mượt 100% không lo lỗi link âm thanh.
5. **Hiệu Ứng Rơi Cánh Hoa & Trái Tim (HTML5 Canvas 60 FPS):**
   - Cánh hoa hồng, trái tim và bụi sao lấp lánh rơi uyển chuyển.
   - Chạm/click bất kỳ đâu trên màn hình để tỏa ra những chùm trái tim & ngôi sao lấp lánh.
6. **Rút Quẻ May Mắn 20/10 (Interactive Flip Cards):**
   - 4 Hộp quà may mắn bí ẩn (Sắc đẹp, Hạnh phúc, Thành công, Bình an).
7. **Khung Ảnh Kỷ Niệm Tùy Chọn:** Cho phép tải ảnh cá nhân lên trực tiếp để chụp ảnh màn hình hoặc gửi tặng.

---

## 🚀 Hướng Dẫn Deploy Lên Mạng (Miễn Phí 100%)

Bạn có thể đưa trang web lên mạng với tên miền riêng hoặc tên miền miễn phí bằng một trong các cách sau:

### Cách 1: Netlify Drop (Nhanh nhất - Không cần gõ lệnh - 10 giây có link ngay)
1. Truy cập: [https://app.netlify.com/drop](https://app.netlify.com/drop) (đăng nhập bằng Google hoặc GitHub).
2. Kéo thả nguyên thư mục `chuc-mung-20-10` vào khung trên trang web.
3. Chờ 5 giây, Netlify sẽ cấp ngay cho bạn một đường link công khai dạng `https://ten-ngau-nhien.netlify.app`.
4. Bạn có thể vào **Site Configuration -> Change site name** để đổi thành link đẹp như `https://chuc-mung-20-10-yeu-thuong.netlify.app`.

---

### Cách 2: Vercel (Khuyên dùng cho lập trình viên)
Nếu máy bạn đã có Node.js:
1. Mở PowerShell hoặc Terminal tại thư mục `chuc-mung-20-10`.
2. Chạy lệnh:
   ```bash
   npx vercel
   ```
3. Đăng nhập theo hướng dẫn trên màn hình và bấm `Enter` chọn mặc định. Sau vài giây Vercel sẽ trả về link `https://chuc-mung-20-10-xxx.vercel.app`.

---

### Cách 3: GitHub Pages (Lưu trữ vĩnh viễn)
1. Tạo một repository mới trên GitHub (ví dụ: `chuc-mung-20-10`).
2. Tại thư mục máy tính, chạy các lệnh:
   ```bash
   git init
   git add .
   git commit -m "Khoi tao web chuc mung 20-10"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-github>/chuc-mung-20-10.git
   git push -u origin main
   ```
3. Vào repository trên GitHub -> Chọn **Settings** -> **Pages** -> Tại **Branch** chọn `main` và thư mục `/ (root)` -> Bấm **Save**.
4. Sau 1 phút, web của bạn sẽ hoạt động tại: `https://<tai-khoan-github>.github.io/chuc-mung-20-10/`.

---

### Cách 4: Surge.sh (Chỉ 1 dòng lệnh)
1. Trong terminal thư mục dự án, chạy:
   ```bash
   npx surge
   ```
2. Nhập email/password (lần đầu) và chọn domain (ví dụ `chucmung2010.surge.sh`).
3. Trang web của bạn lập tức hoạt động online!

---

## 🎁 Hướng Dẫn Gửi Thiệp Cho Từng Người (Chế Độ Người Nhận Riêng Biệt)

Hệ thống được thiết kế thông minh với 2 chế độ:

### 1. Dành cho người nhận (Chỉ xem & cảm nhận - Không chọn role):
Khi người nhận bấm vào link bạn gửi (có chứa tham số `?role=...` hoặc `?to=...`):
- **Hoàn toàn ẩn bộ chọn vai trò**: Người nhận không hề thấy các nút chọn Mẹ, Vợ, Cô giáo... hay ô nhập tên.
- **Trải nghiệm cá nhân hóa 100%**:
  - Tiêu đề thiệp gửi đúng tên/đối tượng (VD: *Gửi: Mẹ Kính Yêu ❤️* hoặc *Gửi: Lan Anh 💖*).
  - Chạm vào con dấu sáp đỏ để mở thiệp: phát giai điệu lãng mạn, bung pháo hoa và cánh hoa rơi.
  - Lời chúc và trích dẫn chuẩn mực theo đúng mối quan hệ.
  - Rút quẻ thông điệp may mắn 20/10.
  - Bắn pháo hoa kỷ niệm và bật nhạc nền.

---

### 2. Dành cho bạn (Người gửi - Trung tâm tạo & điều phối link):
Khi bạn mở trang web gốc (không có tham số):
- **Cách 1 - Lấy link nhanh theo vai trò (1 chạm):**
  - 👩 **Mẹ Kính Yêu**: `?role=mother`
  - 💖 **Vợ / Người Yêu**: `?role=lover`
  - 👧 **Chị / Em Gái**: `?role=sister`
  - 👩‍🏫 **Cô Giáo**: `?role=teacher`
  - 💼 **Bạn Bè / Đồng Nghiệp**: `?role=colleague`
  - Mỗi thẻ có sẵn nút **[📋 Sao Chép Link]**, nút **[💬 Copy Tin Nhắn Zalo]** (đã soạn sẵn lời chúc lịch sự kèm link) và nút **[👁️ Xem Thử]**.

- **Cách 2 - Tạo link kèm tên riêng:**
  - Chọn vai trò -> Nhập tên người nhận (VD: *Lan Anh, Mẹ Loan, Em Thảo...*) -> Chọn mẫu lời chúc.
  - Hệ thống tự sinh link: `?role=lover&to=Lan+Anh` kèm mẫu tin nhắn Zalo gửi ngay.
  - Có nút **[👁️ Xem Thử Thiệp Như Người Nhận Sẽ Thấy]** để bạn kiểm tra trước khi gửi.

- **Cách 3 - Mã QR 100% Offline (Quét Zalo / In thiệp & dán hộp quà):**
  - Cả 5 vai trò nhanh và bộ tạo link tùy chỉnh đều tích hợp nút **[📱 Mã QR]** / khung QR trực quan.
  - Bấm **[⬇️ Tải Ảnh QR (PNG)]** để lưu ảnh mã QR sắc nét về máy, dễ dàng in ra giấy kẹp vào bó hoa, dán hộp quà hoặc gửi qua Zalo/Facebook.
  - Hoạt động hoàn toàn offline nhờ thư viện `qrcode.min.js`, không gửi dữ liệu ra ngoài, bảo mật và tốc độ tức thì.

---

## 💌 Trải Nghiệm Mở Thiệp Đỉnh Cao Cho Người Nhận

Khi người nhận mở link (hoặc quét mã QR):
1. **Hộp Thoại Chào Đón Tinh Tế (Welcome Photo):**
   - Người nhận có thể chọn **tải ảnh chân dung/kỷ niệm của mình** lên để dán vào thiệp.
   - Hoặc bấm **"Mở Thiệp Ngay"** nếu muốn xem trực tiếp mà không cần chọn ảnh.
2. **Con Tem Bưu Chính Kỷ Niệm (Stamp):**
   - Ảnh người nhận tải lên sẽ được thu nhỏ lồng vào con tem bưu chính mạ vàng ở góc bức thư bên trong phong bì và đồng bộ vào khung ảnh kỷ niệm.
3. **Tự Động Phát Nhạc Du Dương:**
   - Ngay khoảnh khắc người nhận bấm con dấu sáp đỏ `[MỞ THIỆP]`, bộ nhạc nền hộp nhạc (Music Box) sẽ tự động ngân vang nốt chuông êm dịu mà không bị trình duyệt chặn.
4. **Hiệu Ứng Gõ Chữ Tay (Typewriter):**
   - Từng dòng tâm thư ấm áp được viết ra tự nhiên như người gửi đang nắn nót từng chữ.
5. **Nút 1-Chạm Gửi Lời Cảm Ơn:**
   - Sau khi đọc thư, người nhận có thể bấm nút **[💖 Gửi Lời Cảm Ơn Đến Người Tặng]** để tự động copy lời cảm kích ngọt ngào và dán gửi lại cho bạn qua Zalo.

