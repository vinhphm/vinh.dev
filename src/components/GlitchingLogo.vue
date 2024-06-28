<script lang="ts" setup>
import { onMounted } from 'vue'
import VinhDev from './icons/VinhDev.vue'

onMounted(async () => {
  const { PowerGlitch } = await import('powerglitch')
  PowerGlitch.glitch('.glitching', {
    timing: {
      duration: 5000,
    },
  })
})
</script>

<template>
  <VinhDev class="glitching text-dark dark:text-white" />
</template>
