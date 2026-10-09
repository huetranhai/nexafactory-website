# NexaFactory — Website startup công nghệ sản xuất

Website mẫu tiếng Việt dành cho ý tưởng startup công nghệ sản xuất và chuyển đổi số, chuẩn bị cho tên miền `danhnguyen.me`. Dùng HTML, CSS và JavaScript thuần, không cần npm, framework, database hoặc bước build.

## Bắt đầu

1. Giải nén project.
2. Mở `index.html` để xem giao diện; hoặc chạy `python3 -m http.server 8080` trong thư mục này, rồi mở `http://localhost:8080`.
3. Mở `docs/DEPLOYMENT.html` để xem hướng dẫn chi tiết GitHub và Namecheap.
4. Đọc `docs/DESIGN.md` khi cần thay đổi bố cục hoặc nội dung.

## Cấu trúc

```text
nexafactory-website/
├── index.html                 # Landing page 6 phần và FAQ
├── privacy.html               # Mô tả việc dùng thông tin biểu mẫu
├── 404.html                   # Trang không tìm thấy, dành cho domain đích
├── robots.txt
├── sitemap.xml
├── CNAME.example              # Mẫu domain; xem lưu ý bên dưới
├── .nojekyll                  # Phục vụ tệp tĩnh trên GitHub Pages
├── .gitignore
├── README.md
├── assets/
│   ├── css/styles.css         # Design system và responsive
│   ├── js/main.js             # Menu, dashboard, biểu mẫu
│   └── images/
│       ├── favicon.svg
│       ├── factory.svg        # Minh họa vector nhà máy tự dựng
│       └── social-card.png    # Ảnh chia sẻ mạng xã hội 1200×630
└── docs/
    ├── DEPLOYMENT.html        # Hướng dẫn từng bước
    └── DESIGN.md              # Cấu trúc giao diện và điểm chỉnh sửa
```

## Chức năng

- Menu mobile có trạng thái mở/đóng, hỗ trợ phím Escape.
- Liên kết đến các phần, FAQ dùng `details/summary`.
- Dashboard 3 dây chuyền dùng dữ liệu giả lập; tổng sản lượng và OEE được tính từ dữ liệu mẫu.
- Nút trong thẻ giải pháp chọn sẵn nhu cầu tương ứng trong biểu mẫu.
- Biểu mẫu kiểm tra các trường bắt buộc, tạo email qua `mailto:`; không gửi hoặc lưu trên server. Có nút sao chép nội dung và phương án sao chép thủ công.
- Responsive cho desktop/tablet/mobile; hỗ trợ focus bàn phím, skip link và giảm chuyển động.
- SEO cơ bản: tiêu đề, description, canonical, Open Graph, sitemap, favicon.
- Toàn bộ tài nguyên giao diện nằm trong project, không phụ thuộc CDN.

## Những thông tin cần thay trước khi sử dụng thực tế

- Tên NexaFactory và thông điệp là nội dung mẫu. Cập nhật pháp nhân, thương hiệu và mô tả dịch vụ theo thực tế.
- `contact@danhnguyen.me` là email mẫu. Tạo hộp thư hoặc alias Google Workspace, kiểm tra nhận email rồi mới công bố. Khi thay địa chỉ, cập nhật `SITE_CONFIG.contactEmail` trong JS và các liên kết `mailto:`/nội dung trong HTML.
- Dashboard không tích hợp PLC, SAP, ERP hoặc nguồn dữ liệu thật.
- Trang riêng tư phản ánh đúng mã nguồn hiện tại; cập nhật khi thêm backend, analytics hoặc thay quy trình xử lý thông tin.

## Domain và GitHub Pages

Để kiểm tra trước ở `USERNAME.github.io/nexafactory-website/`, project chưa có tệp `CNAME` hoạt động. `CNAME.example` là mẫu. Khi sẵn sàng kết nối domain, nhập `danhnguyen.me` trong **repository Settings → Pages → Custom domain**. Khi triển khai từ branch, GitHub sẽ tạo tệp `CNAME`; giữ tệp này trong các lần cập nhật sau. Không chỉ đổi tên file và bỏ qua Pages settings.

Các tài nguyên ở trang chủ và trang riêng tư dùng đường dẫn tương đối để hoạt động trên cả domain riêng và repository URL. `404.html` dùng đường dẫn domain đích để không bị hỏng khi người dùng vào URL lồng nhau. Trước khi domain hoạt động, nút trên trang 404 vẫn dẫn tới domain đích. Canonical, ảnh Open Graph và sitemap cũng đã dành cho domain đích.

## Phạm vi hosting

Hướng dẫn GitHub Pages dùng cho bản mẫu tĩnh. Theo tài liệu GitHub, Pages không phải dịch vụ hosting để vận hành kinh doanh trực tuyến, thương mại điện tử hoặc SaaS thương mại. Đọc phần tương ứng trong hướng dẫn trước khi đưa website vào hoạt động kinh doanh. Mã nguồn tĩnh này có thể chuyển sang hosting khác mà không cần viết lại.

Project được bàn giao dưới dạng source. Chưa được đẩy lên tài khoản GitHub của bạn, chưa sửa DNS và chưa xác nhận tên miền đang phục vụ website này.
