---
title: Chuyển Domain Từ Google Domains Sang Dịch Vụ Khác
date: 2023-08-19T15:00:00+07:00
lang: vi
duration: 5min
---

[[toc]]

Vừa qua, Google đã gửi email thông báo đến người dùng về việc họ sẽ cho bán lại mảng dịch vụ Google Domains cho Squarespace. Tin này khiến cho người dùng không hài lòng và dự định sẽ chuyển domain (tên miền) của họ trên Google Domains sang một nhà cung cấp khác.

## Về Google Domains

Google Domains là một công ty đăng ký tên miền được vận hành bởi Google. Google đã trở thành một công ty đăng ký tên miền ngay từ năm 2005. Google Domains được ra mắt công khai dưới chế độ thử nghiệm beta vào ngày 13 tháng 1 năm 2015 và giai đoạn beta kết thúc vào ngày 15 tháng 3 năm 2022. Đến ngày 4 tháng 2 năm 2022, nó hỗ trợ hơn 300 tên miền cấp cao (top-level domains).

Vào ngày 15 tháng 3 năm 2022, Google thông báo rằng Google Domains đã chính thức ra khỏi giai đoạn beta.

Vào ngày 15 tháng 6 năm 2023, Squarespace đã kết thúc thỏa thuận để mua lại kinh doanh Google Domains, bao gồm khoảng 10 triệu tên miền đã đăng ký. Dịch vụ Google Domains sẽ đóng cửa sau khi việc bán và chuyển nhượng tên miền hoàn thành, dự kiến vào ngày 31 tháng 10 năm 2023.

Nhiều người chọn Google Domains vì sự thuận tiện khi liên kết với các dịch vụ khác của Google. Ngoài ra việc domain được quản lý bởi Google cũng khiến mọi người tin tưởng hơn so với các dịch vụ khác. Google cũng là người tiên phong cho người đăng ký các tên miền mới sau này như `.dev`, `.life`, `.digital`,...

## Chuyển sang nhà cung cấp khác

Tên miền của bạn hoàn toàn có thể được chuyển từ nhà cung cấp này sang nhà cung cấp khác chỉ bằng một vài thao tác đơn giản, nhưng cũng có một số điều bạn cần lưu ý:

- Nhà cung cấp (registrar) mà bạn chuyển domain đến phải hỗ trợ top-level domain của bạn. Ví dụ, chỉ mới vài tháng trước, Cloudflare vẫn chưa hỗ trợ ai có domain đuôi `.dev` chuyển sang dịch vụ của họ, nhưng rất may là họ đã hỗ trợ domain này vào giữa tháng 7 vừa rồi.
- Domain của bạn đã đăng ký hoặc chuyển lần gần nhất phải là ít nhất 60 ngày cho tới thời điểm hiện tại.
- Thông tin đăng ký domain của bạn không có thay đổi trong 60 ngày gần đây.
- Chuyển domain sang nhà cung cấp khác thường sẽ không mất phí nhưng theo quy định của nhà quản lý (ICANN), bạn phải gia hạn domain thêm một năm khi thực hiện chuyển. Phần gia hạn này sẽ được thực hiện bên phía nhà cung cấp mới khi bạn đã hoàn thành các thao tác chuyển.

Sau khi nắm rõ về những điều trên, việc tiếp theo là lựa chọn nhà cung cấp dịch vụ mà bạn tin cậy và giá thành phù hợp với túi tiền của bạn. Một khi quyết định được, dù là về tay nơi nào đi nữa thì chung quy các bước để đổi domain đều là:

1. Vào trang web của nhà cung cấp bạn muốn chuyển tới và tìm đến mục "Transfer domain". Thông thường họ sẽ đặt mục này ở những nơi rất dễ tìm thấy trên trang web của họ. Sau đó nhập tên domain để họ xem có thể chuyển về họ quản lý được không (thông thường là kiểm tra các mục nêu trên và một vài đuôi tên miền có các quy định đặc biệt khác).
2. Tắt DNSSEC trong thiết lập DNS của bên quản lý DNS domain của bạn.
3. Mở khoá domain. Thường bên nhà cung cấp sẽ có một công tắc ngăn chặn người lạ tìm cách chuyển tên miền. Nên bạn cần vào trang quản lý của Google Domains để mở khoá (tắt chức năng này).
4. Lấy mã authorization (auth code, authinfo code, hoặc transfer code) ở Google Domains. Sau đó bạn sẽ điền mã này khi được yêu cầu bởi nhà cung cấp bạn muốn đổi tới.
5. Xác nhận thông tin liên lạc và thanh toán phí gia hạn.
6. Xác nhận chuyển domain. Google Domains sẽ gửi email đến bạn để thông báo về việc chuyển domain. Thường quá trình sẽ tự động hoàn tất trong 5 ngày nếu bạn không huỷ, bạn cũng có thể bấm xác nhận để chuyển ngay.

Một số dịch vụ sẽ có những yêu cầu khác trong quá trình chuyển đổi nhưng cũng không quá phức tạp. Mình đã chuyển từ Google Domains sang dịch vụ khác sau hai năm gắn bó. Mong bài viết này đã giúp bạn hiểu rõ hơn được phần nào về quá trình này.
