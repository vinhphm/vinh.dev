<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'
import { getOembedData } from '../utils/oembed'

const props = defineProps<{
  url: string
  maxWidth?: number
}>()

const isDark = useDark()
const oembedData = ref<any>(null)

async function fetchOembedData() {
  oembedData.value = await getOembedData(props.url, {
    theme: isDark.value ? 'dark' : 'light',
  })
}

onMounted(() => {
  fetchOembedData()
})

// Refetch when theme changes
watch(isDark, () => {
  fetchOembedData()
})
</script>

<template>
  <div v-if="oembedData" class="oembed-container">
    <div
      v-if="oembedData.type === 'rich'"
      :style="`max-width: ${maxWidth || 800}px;`"
      v-html="oembedData.html"
    />

    <img
      v-else-if="oembedData.type === 'photo'"
      :src="oembedData.url"
      :alt="oembedData.title || ''"
      :width="oembedData.width"
      :height="oembedData.height"
      :style="`max-width: ${maxWidth || 800}px;`"
    >

    <div
      v-else-if="oembedData.type === 'video'"
      class="video-container"
      :style="`max-width: ${maxWidth || 800}px;`"
      v-html="oembedData.html"
    />

    <a
      v-else-if="oembedData.type === 'link'"
      :href="oembedData.url"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ oembedData.title || url }}
    </a>
  </div>
</template>

<style scoped>
.oembed-container {
  margin: 1rem 0;
  width: 100%;
}
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}
.video-container :deep(iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
img {
  max-width: 100%;
  height: auto;
}
</style>
