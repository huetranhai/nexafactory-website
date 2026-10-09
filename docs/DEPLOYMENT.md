# Triển khai NexaFactory lên danhnguyen.me

Hướng dẫn cho project HTML/CSS/JavaScript thuần, quản lý mã nguồn trên GitHub và DNS tại Namecheap. Cập nhật theo tài liệu chính thức ngày 09/10/2026. Các giá trị dưới đây là cấu hình cần đạt, không phải xác nhận DNS hiện tại của bạn.

## 1. Chuẩn bị và xem thử

Bạn cần tài khoản GitHub, quyền quản lý `danhnguyen.me` và project đã giải nén. `USERNAME` trong hướng dẫn là tên tài khoản GitHub thật, không phải địa chỉ email.

Mở thư mục `nexafactory-website`, nhấp đúp `index.html`. Để thử clipboard và điều hướng trong môi trường web, dùng Terminal tại thư mục project:

```bash
cd /duong-dan/nexafactory-website
python3 -m http.server 8080
```

Mở `http://localhost:8080`. Trên Windows, nếu lệnh `python3` không có, dùng `py -m http.server 8080`. Có thể dùng extension Live Server của VS Code thay thế.

Kiểm tra: menu, liên kết các phần, lựa chọn A/B/C trong dashboard, FAQ, trường bắt buộc trong form, nút soạn email và giao diện khi thu nhỏ trình duyệt. Nút email cần ứng dụng xử lý `mailto:`; nếu không có, chọn sao chép nội dung rồi dán vào Gmail.

Tên NexaFactory, email liên hệ và nội dung dịch vụ là mẫu. Thay bằng thông tin thực tế trước khi công bố. Nếu dùng `contact@danhnguyen.me`, tạo hộp thư hoặc alias Google Workspace tương ứng và thử nhận thư. Dashboard không kết nối nhà máy thật.

### Phạm vi sử dụng GitHub Pages

Tài liệu GitHub giới hạn việc dùng Pages làm hosting miễn phí để vận hành kinh doanh trực tuyến, thương mại điện tử hoặc SaaS thương mại. Các bước dưới đây dành cho việc triển khai bản mẫu tĩnh. Khi chuyển thành website vận hành kinh doanh, hãy đối chiếu mục đích với [giới hạn GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), và dùng hosting phù hợp nếu thuộc phạm vi bị hạn chế. Việc chỉ dùng HTML không tự động khiến mọi mô hình kinh doanh phù hợp với Pages. Mã nguồn này có thể triển khai trên hosting tĩnh khác mà không cần viết lại.

## 2. Tạo repository GitHub

1. Đăng nhập [GitHub](https://github.com).
2. Chọn **New repository**.
3. Nhập tên `nexafactory-website`.
4. Chọn **Public** khi dùng GitHub Free cho hướng dẫn này.
5. Nếu dùng các lệnh Git bên dưới, để repository trống: chưa chọn README, .gitignore hoặc license.
6. Chọn **Create repository**.

Không đưa dữ liệu nội bộ nhà máy, mật khẩu hoặc khóa API vào repository công khai.

### Cách A — Upload qua giao diện

Trong repository trống, nhấn **uploading an existing file**; ở repository đã có nội dung, chọn **Add file → Upload files**. Kéo các tệp và thư mục **bên trong** `nexafactory-website` vào, gồm `index.html`, `assets`, các trang phụ và tài liệu. Nhấn **Commit changes**.

Sau upload, `index.html` phải nằm ngay ở gốc repository, không nằm trong một thư mục `nexafactory-website` lồng thêm. `.nojekyll` là tệp hỗ trợ tĩnh; nếu Finder ẩn tệp này, nhấn Command+Shift+. để hiện hoặc dùng Git. Giữ nguyên thư mục `assets`, không tải mỗi `index.html`.

### Cách B — Dùng Git trong Terminal

Chạy trong thư mục project; thay `USERNAME` trước khi chạy:

```bash
git init
git add .
git commit -m "Create NexaFactory startup website"
git branch -M main
git remote add origin https://github.com/USERNAME/nexafactory-website.git
git push -u origin main
```

GitHub yêu cầu phương thức xác thực được hỗ trợ, như SSH hoặc credential manager/token phù hợp; không dùng mật khẩu tài khoản thay token. Nếu chưa quen Git, cách upload qua giao diện là đủ. Nếu báo `Author identity unknown`, cấu hình `git config user.name "Ten cua ban"` và `git config user.email "Email GitHub cua ban"`, rồi commit lại.

## 3. Xuất bản bản mẫu bằng GitHub Pages

Trong **repository**:

1. **Settings → Pages**.
2. **Build and deployment → Source: Deploy from a branch**.
3. **Branch: main**, thư mục **/(root)**.
4. Nhấn **Save**.
5. Xem tab **Actions** hoặc thông báo ở Pages; chờ deployment thành công.
6. Mở `https://USERNAME.github.io/nexafactory-website/` để kiểm tra trước.

Project không cần npm hoặc build. Nguồn xuất bản phải là gốc repository vì `index.html` ở đó. Xem [cấu hình nguồn xuất bản](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Project có `CNAME.example`, chưa có tệp `CNAME` hoạt động để bạn thử URL GitHub trước. Tên miền chính được thiết lập ở bước 5. Canonical, sitemap và đường dẫn trang 404 đã dành cho `danhnguyen.me`; nút về trang chủ của 404 chỉ hoạt động đúng sau khi domain đã kết nối.

## 4. Xác minh quyền sở hữu tên miền

Trong **Settings của tài khoản GitHub** (nhấn avatar → Settings, không phải Settings của repository), chọn **Pages → Add a domain**, nhập `danhnguyen.me`.

GitHub cung cấp tên và mã TXT. Trên Namecheap, tạo TXT với Host tương ứng, thường dạng `_github-pages-challenge-USERNAME`, và Value là mã được GitHub cấp. Namecheap tự nối phần `danhnguyen.me`; sao chép giá trị theo tài khoản thật, không tự tạo mã. Quay lại GitHub nhấn **Verify** khi TXT đã cập nhật. Giữ TXT sau xác minh. Đây là TXT của GitHub, khác TXT `google-site-verification` của Google Workspace. Xem [hướng dẫn xác minh domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

## 5. Gắn danhnguyen.me vào repository

Vào **repository → Settings → Pages → Custom domain**, nhập:

```text
danhnguyen.me
```

Nhấn **Save**. Không nhập `https://`, đường dẫn hoặc tên repository. Thực hiện bước này trước khi đổi DNS trỏ website.

Với phương án triển khai từ branch, GitHub tạo commit chứa tệp `CNAME` tại gốc. Nội dung tệp là `danhnguyen.me`. Giữ tệp đó trong các lần cập nhật. Nếu dùng Git trên máy, chạy `git pull --ff-only origin main` để lấy commit mới về trước khi cập nhật tiếp. Chỉ đặt tệp CNAME không thay thế việc cấu hình Custom domain trong Pages settings. Xem [quản lý domain riêng](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## 6. Cấu hình DNS trên Namecheap

Mở [Namecheap](https://www.namecheap.com) → **Domain List → danhnguyen.me → Manage**.

### 6.1. Kiểm tra nơi đang quản lý DNS

Trong tab **Domain**, kiểm tra **Nameservers**. Khi đang dùng Namecheap BasicDNS/PremiumDNS/FreeDNS, cấu hình ở **Advanced DNS → Host Records** theo bảng dưới. Nếu đang dùng nameserver của nhà cung cấp khác, cấu hình ở nhà cung cấp đó; thay tại Namecheap Advanced DNS sẽ không có tác dụng. Không chuyển nameserver chỉ để thêm website, vì có thể làm mất hiệu lực các bản ghi email nếu chưa sao chép đầy đủ.

### 6.2. Bản ghi website cần đạt

TTL có thể để `Automatic`. Các bản ghi đã đúng thì giữ, không thêm trùng.

| Type | Host | Value |
|---|---|---|
| A Record | @ | 185.199.108.153 |
| A Record | @ | 185.199.109.153 |
| A Record | @ | 185.199.110.153 |
| A Record | @ | 185.199.111.153 |
| CNAME Record | www | USERNAME.github.io |

Mỗi IP là một A Record riêng. CNAME chỉ chứa `USERNAME.github.io`, không chứa `https://` hoặc `/nexafactory-website`. Nếu `www` hiện là `danhnguyen.me.`, sửa sang tài khoản GitHub thật. Không tạo CNAME ở Host `@` theo phương án này.

Kiểm tra bản ghi website cũ gây xung đột tại `@` và `www`, như A/AAAA đến hosting khác hoặc URL Redirect. Chỉ sửa bản ghi thuộc website dự định thay thế. Nhấn dấu tick để lưu từng dòng hoặc **Save All Changes** theo giao diện đang hiển thị. Xem [hướng dẫn GitHub Pages của Namecheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages/).

### 6.3. Giữ cấu hình Google Workspace

Việc kết nối website thực hiện ở Host Records. Không chuyển Mail Settings về Email Forwarding và không xóa:

- MX của Google Workspace.
- TXT xác minh Google (`google-site-verification=...`).
- SPF tại `@`, DKIM tại selector như `google._domainkey`, DMARC tại `_dmarc`.
- TXT xác minh GitHub vừa tạo ở bước 4.

TXT tại `@` có thể cùng tồn tại với các A Record website. Website và email dùng các loại bản ghi khác nhau. Hướng dẫn này không thay thế bước kích hoạt Gmail; nếu email chưa hoạt động, hoàn thành Google Workspace riêng trước.

## 7. Bật HTTPS và kiểm tra

Sau khi DNS cập nhật, mở **repository → Settings → Pages** và kiểm tra domain. Khi khả dụng, bật **Enforce HTTPS**. GitHub quản lý chứng chỉ cho domain được cấu hình đúng; không cần mua/cài SSL Namecheap riêng cho GitHub Pages. DNS và việc cấp chứng chỉ có thể cần thời gian, không phải lỗi ngay sau khi Save. Xem [HTTPS trên GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

Kiểm tra kết quả mong muốn:

- `https://danhnguyen.me` mở trang NexaFactory.
- `https://www.danhnguyen.me` chuyển về tên miền chính khi cả hai đã cấu hình đúng.
- Không có cảnh báo chứng chỉ; CSS, JS và ảnh tải đầy đủ.
- Menu mobile, dashboard A/B/C, FAQ và biểu mẫu hoạt động.
- `https://danhnguyen.me/privacy.html` mở trang riêng tư.
- Một đường dẫn không tồn tại hiển thị trang 404 sau deployment.
- Email Google Workspace vẫn gửi và nhận được.

Trên Mac/Linux, có thể kiểm tra bằng Terminal:

```bash
dig +short NS danhnguyen.me
dig +short A danhnguyen.me
dig +short CNAME www.danhnguyen.me
dig +short MX danhnguyen.me
```

Đầu ra A cần trỏ IP Pages trong bảng; thứ tự không quan trọng. CNAME cần là tài khoản GitHub của bạn. MX phục vụ Google Workspace. Nếu dùng Windows, có thể dùng `nslookup -type=A danhnguyen.me` và `nslookup -type=CNAME www.danhnguyen.me`.

## 8. Cập nhật và xử lý lỗi

Để chỉnh nội dung, sửa `index.html`; chỉnh màu trong `assets/css/styles.css`; chỉnh recipient và dữ liệu mẫu trong `assets/js/main.js`. Có thể sửa file trực tiếp trên GitHub rồi commit. Nếu dùng Git trên máy:

```bash
git pull --ff-only origin main
git add .
git commit -m "Update NexaFactory content"
git push origin main
```

Pages triển khai lại theo branch đã chọn. Giữ tệp CNAME và cấu trúc assets. Nếu Git báo conflict, xử lý trước khi push; không force push chỉ để bỏ qua lỗi.

| Hiện tượng | Việc cần kiểm tra |
|---|---|
| URL GitHub trả 404 | Branch main, /(root), index.html ở gốc và trạng thái Actions |
| Không có CSS/ảnh | Assets có được upload không; tên file có đúng chữ hoa/thường không |
| DNS check chưa thành công | Nameserver có đúng nơi đang sửa; A và CNAME có đúng giá trị; DNS đã cập nhật chưa |
| HTTPS chưa khả dụng | DNS xung đột ở @/www, đặc biệt A/AAAA cũ; trạng thái cấp chứng chỉ; nếu có CAA, kiểm tra quyền cấp chứng chỉ theo tài liệu GitHub |
| Nút email không mở | Máy chưa cấu hình trình xử lý mailto; dùng nút sao chép và dán vào Gmail |
| Email không nhận được | Hộp thư/alias contact đã tạo chưa; MX và trạng thái kích hoạt Gmail; không thay A Record để sửa lỗi mail |
| Bản cập nhật chưa hiển thị | Deployment mới đã thành công chưa; tải lại bỏ cache |

Tham khảo thêm [xử lý domain riêng](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages).

## 9. Bàn giao và bước tiếp theo

Mở `docs/DESIGN.md` để biết cấu trúc từng phần và nơi chỉnh sửa. Website hiện là bản mẫu hoàn chỉnh về giao diện, không phải nền tảng MES/ERP vận hành. Nếu cần gửi biểu mẫu trực tiếp, đăng nhập, cơ sở dữ liệu hoặc dashboard dữ liệu thật, phải triển khai thêm backend và hosting phù hợp.

Project được cung cấp để bạn triển khai. Tài khoản GitHub, cấu hình DNS và website đang chạy trên domain chưa được thay đổi từ cuộc trao đổi này.
