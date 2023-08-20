---
title: Cài đặt Redirects cho Netlify và Vercel
date: 2023-08-20T10:30:00+07:00
lang: vi
duration: 5min
type: note
---

[[toc]]

> [Tiếng Anh - English Version](/posts/set-up-redirect-netlify-vercel)

Cho là bạn vừa đổi địa chỉ phần blog trên web của mình từ `/articles/*` sang `/blog/*`. Việc này chắc chắn sẽ ảnh hưởng đến SEO và cũng như những links mà bạn đã chia sẻ ở đâu đó nếu như bạn không thiết lập redirect trong trường hợp này. Bạn có thể tìm hết tất cả path của các bài post rồi set từng rule, nhưng mà vậy thì không cần thiết. Thay vào đó, bạn chỉ cần set một rule thôi.

## Netlify

Trên Netlify, bạn có thể dùng file `netlify.toml` hoặc `_redirects` để set redirect rule.

Đối với file `netlify.toml`, rule nên là như thế này:

```toml
[[redirects]]
  from = "/articles/*"
  to = "/blog/:splat"
  status = 301
```

Còn đây là file `_redirects`:

```
/articles/*  /blog/:splat  301
```

## Vercel

Đối với Vercel, chúng ta dùng file `vercel.json`:

```json
{
  "redirects": [
    { "source": "/articles/(.*)", "destination": "/blog/$1", "statusCode": 301 }
  ]
}
```
