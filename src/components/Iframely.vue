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
