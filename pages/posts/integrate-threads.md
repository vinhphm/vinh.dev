---
title: Integrate Threads
date: 2023-08-22T23:00:00+07:00
lang: en
duration: 5min
description: Embed Threads contents to your website/app
---

Ever since Threads (an Instagram-powered social network) was released, I find myself using it more frequently and moving away from Twitter, or should I call it X now. With Threads web version a few days away, let's find a way to add it to our websites, like this:

<Thread href="https://www.threads.net/@threads/post/CwQEkZfgBH0" />

## Embed threads from Threads

The basic version of Threads web has a place for you to copy an embed code. But the problem is, it was made for plain HTML and JavaScript for sure, because it took me a whole day trying to figure out how to make it work properly on Vite, but I got nothing. When I almost gave up, I saw The Verge had an article with a Threads post embedded. So, I inspected their HTML code in the hope of finding some magic tricks that make it work somehow (though I have no idea what framework they used for their website). And voilà, they used a third-party widget instead of the one provided by Threads team. Well, as long as work then.

The name in question is [Iframely](https://iframely.com). So basically, you give them a link for almost anything out there and they will give you "the frame". If your site is small and has geeky purposes like mine, then you could try this until Threads have official documentation about their API.

You will also need to create a component for that "frame" and here it is:

```vue
<script setup lang="ts">
const props = defineProps<{
  href: string
}>()

const iframelyKeyHash = import.meta.env.VITE_IFRAMELY_KEY_HASH

onMounted(() => {
  // @ts-expect-error cdn
  window?.iframely && window.iframely.load()
})
</script>

<template>
  <div v-if="props.href">
    <div class="iframely-embed">
      <div class="iframely-responsive" style="padding-bottom: 100%">
        <a
          :href="props.href"
          :data-iframely-url="`https://cdn.iframe.ly/api/iframe?url=${encodeURIComponent(props.href)}&key=${iframelyKeyHash}`"
        />
      </div>
    </div>
  </div>
</template>
```

Iframely provides many ways to use their service but I feel like this is the fastest way for now.

So, when you signed up for Iframely, you were provided with a key and a MD5 hash version of it. In this method of ours, we are going to use the hash key. You will need to save it in an environment variable.

We have this code snippet, `window?.iframely && window.iframely.load();`, on the `onMounted` method. This is to call the Iframely's `embed.js` whenever our component appears. And also, make sure you have added the script tag below to your `index.html`:

```html
<script async src="//cdn.iframe.ly/embed.js"></script>
```

And that's it. Now your website is partly prepared for Threads, so let's hang back and wait for Threads web version.

<Thread href="https://www.threads.net/@vinh.phm/post/CwNHs0Nv66-" />

Good luck!
