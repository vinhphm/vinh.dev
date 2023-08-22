---
title: Integrate Threads
date: 2023-08-22T23:00:00+07:00
lang: en
duration: 5min
---

Ever since Threads is released, I find myself using it more frequently and moving away from Twitter (or should I call it X now). With Threads web version a few days away, let's find a way to add it to our websites, like this:

<Thread href="https://www.threads.net/@threads/post/CwQEkZfgBH0" />

## Embedding threads from Threads

The basic version of Threads web has a place for you to copy the embed code. But the problem is, it was made for plain HTML and JavaScript for sure, because it cost me a whole day trying to figure out how to make it work properly on Vite, but still got nothing. When I almost gave up, I saw The Verge has an article with a Threads post embedded. So, I inspect their HTML code in the hope of finding some magic tricks that make it work somehow (though I have no idea what framework they used for their website). And voila, they used a third-party widget instead of the one provided by Threads team. Well, as long as work then.

The name in question is [Iframely](https://iframely.com). So basically, you gave them a link for almost anything out there and they will give you "the frame". If your site is small and has geeky purposes like mine then you could try this, until Threads have official documentation about their API.

You will also need to create a component for that "frame" and here it is:

```vue
<script setup lang="ts">
const props = defineProps<{
  href: string
}>()

const threadContainer = ref<HTMLElement | null>(null)
const iframelyKeyHash = import.meta.env.VITE_IFRAMELY_KEY_HASH

onMounted(() => {
  if (threadContainer.value) {
    const script = document.createElement('script')
    script.setAttribute('async', '')
    script.setAttribute('src', 'https://cdn.iframe.ly/embed.js')
    threadContainer.value.appendChild(script)
  }
})
</script>

<template>
  <div v-if="props.href" ref="threadContainer">
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
