---
title: Cloudflare Pages Surprised Me
date: 2023-08-21T23:27:00+07:00
lang: en
duration: 5 mins
description: Discover why Cloudflare Pages surprised me and how it outperformed other JAMstack platforms. Learn from my experience with Next.js, Astro, and Vite.
---

[[toc]]

And maybe you would be too...

## The Past

[<span i-simple-icons-cloudflarepages /> Cloudflare Pages](https://pages.cloudflare.com/) was first introduced in late 2020 as beta and went GA in the following year. At the time, I had got myself used to the JAMstack world and hosted my websites on GitHub Page and [<span i-simple-icons-vercel /> Vercel](https://vercel.com/) (formerly ZEIT). Hearing a big name like Cloudflare released a JAMstack platform, of course, made me want to try it right away.

My website tech stack at the moment was Next.js, and just as you would have guessed, Vercel handled it better than Cloudflare Pages. At the beginning of 2023, I was exploring Astro, and the idea of another attempt at Cloudflare Pages occurred to me. This was especially true since I was already using their DNS service.

Astro did have support for Cloudflare Pages at the time, even though they (Astro) were still quite new in this field. But my site backend heavily relied on serverless functions, which I was already using with Next.js and Vercel. Though Cloudflare Pages do have "Worker", the thought of rewriting the functions after transforming my website from Next.js to Astro felt like too much work and not worth it. So, a "no" for Cloudflare Pages again.

So... why does it surprise me now?

## The Present

Because my new experiment with Vite got a little bit bumpy. Just like Next.js, my Vite website is a SPA (everything, every path should be resolved to `/index.html`). But with a note from Vercel themselves, [it wouldn't be an it-just-works moment](https://vercel.com/docs/frameworks/vite#using-vite-to-make-spas).

I did as instructed, and somehow still didn't achieve the OG generation behavior that I would like. And then I tried [<span i-simple-icons-netlify /> Netlify](https://www.netlify.com), still needed redirect configurations to make the app/web accessible but at least my OG generation worked this time. But coming from the generous offer of Vercel's free plan, I found Netlify's offers are a bit limited. I know I would never use up all 300 minutes of build time in a month and my site would never reach 100 GB bandwidth, but still.

Also, I did notice the load speed is not very good in my location. Then, Cloudflare Pages it is. It was time to test out the unlimited bandwidth it seemed (And hey, some can dream).

And the surprise part was "It just works". No need to set redirects or rewrites. And the load speed is super, it sure gave a better score than Netlify the last time I tested with [GTmetrix](https://gtmetrix.com/reports/vinh.dev/eRt421z7/)](https://gtmetrix.com/reports/vinh.dev/eRt421z7/) (talking about the speed with someone who has DNS and network experience huh).

## Conclusion

From expecting nothing to be fully impressed by Cloudflare Pages, I have to say they are a solid choice from the world of JAMstack now and should absolutely consider and try it yourself to see if it meets your needs. It surely meets mine ;)
