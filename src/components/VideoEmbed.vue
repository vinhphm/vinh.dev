<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  src: string
  class?: string
}>()

const videoSrc = ref<string | undefined>()

function getVideoUrl(videoPath: string): string {
  return new URL(videoPath, import.meta.url).href
}

onMounted(() => {
  videoSrc.value = getVideoUrl(props.src)
})

watch(() => props.src, (newPath) => {
  videoSrc.value = getVideoUrl(newPath)
})
</script>

<template>
  <video
    v-if="videoSrc"
    :src="videoSrc"
    autoplay loop muted playsinline :class="class"
  />
</template>
