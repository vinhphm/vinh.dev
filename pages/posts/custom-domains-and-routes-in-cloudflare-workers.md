---
title: Custom Domains and Routes in Cloudflare Workers
date: 2023-08-25T22:00:00+07:00
lang: en
duration: 5min
description: The guild to start with Cloudflare Workers
---
[[toc]]

You are new to Cloudflare Workers. You just created your first Worker but not sure what to do next. This is for you.

So a Worker is like a mini-application with a small piece of code that you would like to run. But when? That is when the **Triggers** tab on your Worker's dashboard comes in. There are so many options there but for the sake of this post, we will only talk about **Custom Domains** and **Routes**.

## Triggers

By default, when creating a Worker, you will be assigned to a domain like this `<worker-name>.<subdomain>.workers.dev`. It will show up in the **Routes** list, meaning that any request sent to that domain should trigger your Worker (if you haven't disabled it). I don't know about you but I personally don't like lengthy subdomain routes like that. So I chose one of the options below.

### Use Custom Domains

Using the dashboard interface to add Custom Domains is super quick and easy. It's a one-click operation for websites on Cloudflare or using Cloudflare DNS (which is the requirement here).

> You should note that custom domains point all paths of a domain or subdomain to your Worker, so be wise to choose a domain that won't conflict with your main website. For example, if you have your website at `abc.dev`, you should not add `abc.dev` to your Worker again, instead you can use `<subdomain>.abc.dev`.

### Use Routes

If you're not a fan of the note above, then you can consider using **Routes** instead.

Routes allow users to map a URL pattern to a Worker. When a request comes in to the Cloudflare network that matches the specified URL pattern, your Worker will execute on that route.

Just like Custom Domains, adding Routes via the dashboard interface is very simple. All you need is to define a route and select the zone it applies to. For example, route `api.abc.dev/og` with zone `abc.dev`.

## Final notes
After setting all these configurations on the dashboard, all will be saved to `wrangler.toml` file in the Worker project, make sure you don't accidentally replace those configuration when deploying new code to the Worker.
