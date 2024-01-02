---
title: Set Domain Redirects for Cloudflare Pages
date: 2023-08-21T12:30:00+07:00
lang: en
duration: 10min
description: Redirect *.pages.dev domain to custom domain, from www to non-www (apex) domain
---

[[toc]]

> [Tiếng Việt - Vietnamese Version](/posts/cloudflare-pages-domain-redirects-vi)

[<span i-simple-icons-cloudflarepages /> Cloudflare Pages](https://pages.cloudflare.com/) is a new player in the JAMstack world, alongside Netlify and Vercel. Despite being a newcomer, Cloudflare is a well-known name, so many people are starting to shift to this Cloudflare service. Cloudflare Pages offers numerous advantages that many consider, but there are also aspects you need to adjust and configure to achieve your desired outcomes. One of these aspects is redirects.

## The Issue

Cloudflare Pages supports redirect functionality through the `_redirects` file, similar to Netlify. You can create a file like this:

```
/articles/*  /blog/:splat  301
```

This rule redirects all your blog links from the form `/articles/...` to `/blog/...`. You can read more about this in the [Cloudflare documentation](https://developers.cloudflare.com/pages/platform/redirects/). However, this rule only works at the subpath level, and you can't accomplish the two scenarios I'm about to guide you through using this `_redirects` file.

## Redirect from `*.pages.dev` to Your Custom Domain

### Why do this?

When you deploy your project on Cloudflare Pages, the initial domain address you'll have is in the form of `*.pages.dev`. Later, you can assign a custom domain to your site via the dashboard. Once you've set up a custom domain, the page at `*.pages.dev` still exists separately. If you want to unify your website's address, you need to set up a redirect for it.

### Steps

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/pages/view/:pages-project/domains) and select your account.
2. Choose **Workers & Pages**, then select the Pages project you want.
3. Go to **Custom domains** and check if your custom domain is listed there. If not, add it by selecting **Set up a custom domain**.
4. Navigate to **Account Home** > **Bulk Redirects**.
5. Choose **Create a new Bulk Redirects list** > **Create new list**.
   <img src="/images/2023/create_a_new_bulk_redirect_list.png" alt="Create new Bulk Redirect list" rounded-lg>
6. In the content type section, select **Redirect**.
7. Add your project's `*.pages.dev` domain to the source URL.
8. Enter the target custom domain URL. Note that you need to prepend `https://` before the apex domain name (domain without `www`).
9. Click **Edit parameters** and check **Preserve query string**, **Subpath matching**, **Preserve path suffix**.

> [!NOTE]
> If you check the **Include subdomains box**, all preview URLs will be redirected to the main custom domain.

10. Click **Add to list**.
11. Go back to **Bulk Redirects** > **Create Bulk Redirects** > select the list you just created > **Save and Deploy**.
    <img src="/images/2023/create_new_bulk_redirect.png" alt="Create new Bulk Redirects" rounded-lg>

## Redirect from `www` Domain to Non-`www` Domain (Apex Domain)

In some cases, instead of wanting a `www.example.com` domain, users prefer a shorter domain like ```example.com` in the address bar. Achieving this consistent display is crucial in web development. Typically, services like Netlify or Vercel support this through DNS settings along with visual adjustments in their dashboard. With Cloudflare Pages, you need to set up this feature yourself, using **Bulk Redirects**, as follows:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), select your account and website.
2. Go to the DNS section.
3. Create a new DNS record for the `www` subdomain. Either an `A` record with a value of `192.0.2.1` or an `AAAA` record with a value of `100::`. This new record should also be proxied by Cloudflare (orange cloud) to be compatible with the redirect rule we'll set up.
   <img src="/images/2023/www_subdomain.png" alt="DNS record setting" rounded-lg>
4. Next, navigate to **Account Home** > **Bulk Redirects** and set up a redirect rule similar to the instructions above (you can add additional rules to the list created earlier). Still, check **Preserve query string**, **Subpath matching**, **Preserve path suffix**. Finally, **Save and Deploy**.
   <img src="/images/2023/redirect-parameters.png" alt="Redirect parameters" rounded-lg>

I hope this guide helps you in transitioning to Cloudflare Pages. Cheers!
