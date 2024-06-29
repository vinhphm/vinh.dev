<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  src: string
}>()

const videoSrc = ref<string | undefined>()

function getVideoUrl(videoPath: string): string {
  return new URL(videoPath, import.meta.url).href
}

onMounted(() => {
  videoSrc.value = getVideoUrl(props.src)
})
</script>

<template>
  <video
    v-if="videoSrc"
    :src="videoSrc"
    autoplay loop muted playsinline
  />
</template>
