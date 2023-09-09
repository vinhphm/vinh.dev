---
title: The move from Next.js to Astro
date: 2023-03-12
duration: 10min
lang: en
description: Read about my experience of migrating my website from Next.js to Astro, a new web framework designed for speed. Learn how I solved some of the challenges and improved the site performance.
---

[[toc]]

At first glance, you would think the move is easy, and it might actually be if your site doesn’t have much going on. In my case though, it was a whole different story.

Let's start by taking a look at [Astro's document](https://docs.astro.build/en/guides/migrate-to-astro/) for the migration. They have all sorts of scenarios of which framework you’re coming from, so I took a look at the [Next.js page](https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/)

Following all of those steps was kind of easy, you should find no trouble doing it on a simple static site. However, some parts of my website did not work so well after the conversion.

## The header

My header has a specific animation and behavior. It will show itself when the user scrolls up. This once relied heavily on React’s useRef and useEffects hooks. With the conversion to `.astro` file, I either had to convert those hooks and functions to the vanilla JS or keep those in `.tsx` file. The latter did not sound good, the header is always present on the site, I would rather have it optimized by Astro. It took me a while but I made it.

## The font

I use Inter variable font for Vinh.Dev. Since it’s a variable font, the size of the font files is somewhat bigger than normal font files. In Next.js, since it has all been loaded the first time you load the page when you navigate through the site, you won’t see anything strange. However, that’s not the case with Astro, since almost anything in Astro is static. When you navigate through the site, everything needs to be loaded again, including the fonts. This can cause a layout shift when your font of choice hasn’t loaded yet but the page’s contents have already appeared.

The best way to avoid this is to have your font preloaded by putting this tag inside `<header>...</header>`

```html
<link
  rel="preload"
  href="{interVariable}"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

## Spotify

If you have ever created a personal website with Next.js, you might have seen a Spotify widget on someone else’s site. I have one on mine too 😎. It was probably inspired by [this tutorial](https://leerob.io/blog/spotify-api-nextjs) from Lee Robinson. It’s a cool widget, but you couldn’t use it in Astro until version 2.0.0 came out. (Well, technically you could, but that did require another site to act as API Endpoints, and we don’t want to complicate things up, do we?)

So in version 2.0.0, Astro supports SSR endpoints so that we can have all kinds of APIs we want, and that means? Yes, Spotify 🎉. So here is how the code for Spotify API looks like in Astro's way:

```ts
// src/pages/api/spotify.json.ts

import { getNowPlaying } from '@/lib/spotify'

export async function get() {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
    })
  }

  const nowPlaying = await response.json()
  if (nowPlaying.currently_playing_type === 'track') {
    // song
    const isPlaying = nowPlaying.is_playing
    const title = nowPlaying.item.name
    const artist = nowPlaying.item.artists
      .map((_artist: any) => _artist.name)
      .join(', ')
    const songUrl = nowPlaying.item.external_urls.spotify

    return new Response(
      JSON.stringify({
        artist,
        isPlaying,
        songUrl,
        title,
      }),
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
      }
    )
  }
  else if (nowPlaying.currently_playing_type === 'episode') {
    // podcast
    return new Response(
      JSON.stringify({
        isPlaying: nowPlaying.is_playing,
        songUrl: 'https://open.spotify.com',
        title: 'Podcast',
      }),
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
      }
    )
  }
}
```

We don’t have a `handler` function with `req` and `res` cooked for us. Instead, we have to define functions with the corresponding HTTP request type, then get the request and make the response by ourselves. Actually, the Spotify example above is not very clear on how can you get data from the request's body. Here is another example of how you can do it:

Also remember that the filename should include the data type your API will return, for example, `spotify.json.ts`

In my case, the component that uses the API is a `.tsx file. This means that when I want to use that component in some place on my Astro site, I have to call it like this:

```tsx
// ...
<NowPlaying client:only="preact" />
// ...
```

That has covered up all the big issues I encountered during the transfer to Astro. In the next article in the series, I will tell you how Astro made my website better than ever.
