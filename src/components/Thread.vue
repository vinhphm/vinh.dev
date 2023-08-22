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
