<script setup lang="ts">
import iframely from '@iframely/embed.js'

const props = defineProps<{
  href: string
}>()

const iframelyKeyHash = import.meta.env.VITE_IFRAMELY_KEY_HASH

onMounted(() => {
  iframely.load()
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
