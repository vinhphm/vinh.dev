---
title: Integrate Threads
date: 2023-08-22T23:00:00+07:00
lang: en
duration: 5min
description: Embed Threads contents to your website/app
---

> **Updated on 30 Aug 2023:** New API call method

Ever since Threads (an Instagram-powered social network) was released, I find myself using it more frequently and moving away from Twitter, or should I call it X now. With Threads web version a few days away, let's find a way to add it to our websites, like this:

<Iframely href="https://www.threads.net/@threads/post/CwQEkZfgBH0" />

## Embed threads from Threads

The basic version of Threads web has a place for you to copy an embed code. But the problem is, it was made for plain HTML and JavaScript for sure, because it took me a whole day trying to figure out how to make it work properly on Vite, but I got nothing. When I almost gave up, I saw The Verge had an article with a Threads post embedded. So, I inspected their HTML code in the hope of finding some magic tricks that make it work somehow (though I have no idea what framework they used for their website). And voilà, they used a third-party widget instead of the one provided by Threads team. Well, as long as work then.

The name in question is [Iframely](https://iframely.com). So basically, you give them a link for almost anything out there and they will give you "the frame". If your site is small and has geeky purposes like mine, then you could try this until Threads have official documentation about their API.

You will also need to create a component for that "frame" and here it is:

```vue
<script setup lang="ts">
import { isDark } from '../logics'

const props = defineProps<{
  href: string
}>()

const API_KEY = import.meta.env.VITE_IFRAMELY_KEY
const html = ref('')

async function fetchEmbed() {
  const theme = isDark.value ? 'dark' : 'light'
  const response = await fetch(
    `https://iframe.ly/api/iframely?url=${encodeURIComponent(
      props.href,
    )}&api_key=${API_KEY}&theme=${theme}&omit_script=1`,
  )
  const data = await response.json()
  html.value = data.html
  // @ts-expect-error cdn
  window?.iframely && window.iframely.load()
}

onMounted(() => {
  fetchEmbed()
})

watch(isDark, () => {
  fetchEmbed()
})
</script>

<template>
  <div v-html="html" />
</template>
```

But it wouldn't work smoothly right away. You know notice something strange about the way it renders. Our component uses `v-html` to update the `innerHTML`. Per HTML5 [specification](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML), any `<script>` tag is ignored. It means that rich media from publishers like Twitter, Instagram, Facebook, TikTok and our Threads will not work out-of-the-box and require a hosted iFrame. So we fixed that in our component by adding [&omit_script=1](https://iframely.com/docs/omit-script). But iFrame sizing might feel a little bit strange after that. So need to add `embed.js` to `index.html` and load it in the component with `window?.iframely && window.iframely.load()` to fix that:

```html
<script async src="//cdn.iframe.ly/embed.js"></script>
```

And that's it. Now your website is partly prepared for Threads, so let's hang back and wait for Threads web version.

<Iframely href="https://www.threads.net/@vinh.phm/post/CwNHs0Nv66-" />

Good luck!
