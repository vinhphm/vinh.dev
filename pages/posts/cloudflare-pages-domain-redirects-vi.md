---
title: Thiết lập domain redirects cho Cloudflare Pages
date: 2023-08-21T12:30:00+07:00
lang: vi
duration: 6min
description: Chuyển domain *.pages.dev sang custom domain, từ www sang non-www (apex) domain
---

[[toc]]

[<span i-simple-icons-cloudflarepages /> Cloudflare Pages](https://pages.cloudflare.com/) là nhân vật mới trong giới JAMstack khi có thể so sánh với Netlify hay Vercel. Dù là cái tên mới nhưng Cloudflare lại là cái tên được nhiều người biết đến nên dần nhiều người bắt đầu chuyển sang dịch vụ này của Cloudflare. Cloudflare Pages có nhiều ưu điểm để nhiều người cân nhắc nhưng cũng những vấn đề bạn phải cân chỉnh, thiết lập thì mới đạt được điều mình mong muốn. Một trong số đó là redirects.

## Vấn đề

Cloudflare Pages hỗ trợ chức năng redirect thông qua file `_redirects`, tương tự như Netlify. Bạn có thể tạo một file như thế này:

```
/articles/*  /blog/:splat  301
```

Rule này redirect tất cả đường link blog của bạn từ dạng `/articles/...` sang `/blog/...`. Nhưng rule này cũng chỉ ở mức subpath, bạn không thể làm hai điều mà mình sắp hướng dẫn dưới đây thông qua file `_redirects` này được.

## Redirect từ *.pages.dev sang custom domain của bạn

### Tại sao phải làm điều này?

Khi bạn deploy project của mình lên Cloudflare Pages, địa chỉ domain đầu tiên mà bạn có sẽ là dạng `*.pages.dev`. Và rồi sau đó bạn có thể gán custom domain tùy úy cho trang này ở dashboard. Khi đã gán custom domain rồi thì trang ở `*.pages.dev` vẫn tồn tại riêng biệt mà nếu bạn muốn thống nhất địa chỉ trang web của mình thì bạn phải thiết lập redirect cho nó.

### Tiến hành

1. Log in vào [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/pages/view/:pages-project/domains) và chọn account của bạn.
2. Chọn **Workers & Pages** rồi chọn Pages mà bạn muốn.
3. Vào **Custom domains** và kiểm tra lại xem custom domain của bạn có ở đó chưa. Nếu chưa, thêm mới bằng cách chọn **Set up a custom domain**.
4. Tìm đến **Account Home** > **Bulk Redirects**.
5. Chọn **Create a new Bulk Redirects list** > **Create new list**.
<img src="/images/2023/create_a_new_bulk_redirect_list.png" rounded-lg>
6. Ở mục content type, chọn **Redirect**.
7. Thêm domain `*.pages.dev` của project bạn vào source URL.
8. Nhập target custom domain URL. Lưu ý là bạn phải thêm `https://` vào trước tên apex domain (domain không có `www`).
9. Click **Edit parameters** và tick chọn **Preserve query string**, **Subpath matching**, **Preserve path suffix**.
> Optional: Nếu tick vào **Include subdomains box**, toàn bộ những URLs bản preview sẽ bị redirect tới custom domain chính.
10.  Click **Add to list**.
11. Vào lại **Bulk Redirects** > **Create Bulk Redirects** > chọn list bạn vừa tạo > **Save and Deploy**.
<img src="/images/2023/create_new_bulk_redirect.png" rounded-lg>
