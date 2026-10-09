# Thiết kế NexaFactory

## Định hướng

NexaFactory là thương hiệu mẫu cho startup kết nối dữ liệu nhà máy và chuyển đổi số. Ngôn ngữ Việt, bố cục landing page 1 trang để dễ hiểu và dễ triển khai; không có lời chứng thực, khách hàng hoặc thành tích được bịa ra.

## Hệ thống giao diện

| Thành phần | Quy cách |
|---|---|
| Nền chính | `#f5f6f0`, nền trắng ngà giúp nội dung dễ đọc |
| Màu chữ / nền công nghệ | `#142f36` / `#132d35` |
| Điểm nhấn | `#d6f36b`, xanh lime |
| Màu dữ liệu | `#547c68`, xanh trầm |
| Font | System UI; Georgia cho từ nhấn; Consolas cho nhãn kỹ thuật |
| Chiều rộng nội dung | Tối đa 1200px, căn giữa |
| Kích thước chữ | H1 khoảng 39–60px, H2 33–48px, nội dung 14–16px |
| Bố cục | Grid và Flexbox, breakpoint 1100 / 800 / 480px |
| Thẻ nội dung | Viền mảnh, góc bo 12px, khoảng trắng rộng |
| Chuyển động | Hover nhẹ; tắt transition theo `prefers-reduced-motion` |

## Nội dung theo từng phần

| Phần | Mục tiêu | Nội dung và tương tác |
|---|---|---|
| Header | Điều hướng và tiếp cận liên hệ | Logo, 3 anchor, CTA, menu mobile |
| Hero | Nêu giá trị trong vài giây | Thông điệp 2 dòng, CTA, minh họa nhà máy SVG |
| Ngành sản xuất | Định vị nhóm đối tượng | Vật liệu, cơ khí, hàng tiêu dùng, chế biến |
| 01. Giải pháp | Làm rõ 4 nhóm dịch vụ | IIoT/OEE, ERP/DWH, năng lượng, workflow; chọn sẵn nhu cầu |
| 02. Dashboard | Thể hiện ý tưởng sản phẩm | 3 bộ dữ liệu mẫu, OEE, sản lượng, điện năng, biểu đồ giờ, gợi ý |
| 03. Triển khai | Giải thích cách làm | Khảo sát → Thiết kế → Thí điểm → Mở rộng |
| 04. Giới thiệu | Nêu nguyên tắc của startup | Tận dụng hệ thống có sẵn, đo bằng chỉ số, bàn giao |
| 05. FAQ | Trả lời câu hỏi trước liên hệ | Tích hợp, dữ liệu demo, chi phí và tiến độ |
| 06. Liên hệ | Thuận tiện bắt đầu trao đổi | Thông tin có kiểm tra; soạn email, sao chép thủ công |
| Footer | Điều hướng phụ | Nhãn website ý tưởng, trang riêng tư, về đầu trang |

## Điểm chỉnh sửa

1. **Tên thương hiệu và nội dung:** `index.html`, `privacy.html`, `404.html`, `README.md`. Khi đổi tên, thay cả `<title>`, description, OG và footer.
2. **Màu sắc:** biến ở đầu `assets/css/styles.css`; cập nhật màu SVG/favicon và ảnh social nếu thay hệ thống màu.
3. **Email:** `SITE_CONFIG` trong `assets/js/main.js` và email trong HTML, FAQ/nội dung riêng tư khi cần.
4. **Dashboard:** `DEMO_LINES` trong JS. `hours` gồm 8 giờ; biểu đồ có trục tham chiếu 200 sản phẩm/giờ. Nếu giá trị vượt 200, sửa thang biểu đồ và nhãn trục cùng lúc. OEE = availability × performance × quality × 100; tổng sản lượng = tổng `hours`.
5. **Domain:** canonical/OG trong HTML, link trang 404, `robots.txt`, `sitemap.xml`, Pages settings và DNS. Tệp CNAME hoạt động phải được giữ sau khi kết nối domain.
6. **Hình ảnh:** `factory.svg` và `favicon.svg` là vector tự dựng. `social-card.png` là ảnh chia sẻ 1200×630; thay khi đổi thương hiệu.

## Khả năng mở rộng

Có thể thêm trang riêng cho mỗi giải pháp mà vẫn dùng chung CSS và JS (các phần JS tùy chọn đã có kiểm tra tồn tại). Khi cần biểu mẫu gửi trực tiếp, thêm endpoint backend hoặc dịch vụ biểu mẫu có cấu hình phù hợp, xác thực input trên server và xử lý lỗi. Không đặt SMTP password, API secret hoặc token trong JavaScript công khai.

Không cần backend để chạy giao diện hiện tại. Website chưa có đăng nhập, CMS, database, thanh toán, kết nối hệ thống hoặc ứng dụng MES thực tế.
