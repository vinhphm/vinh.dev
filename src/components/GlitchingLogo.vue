<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import VinhDev from './icons/VinhDev.vue'

const props = defineProps<{
  class?: string
}>()

const mergedClass = computed(() => `${props.class || ''} text-dark dark:text-white`.trim())

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
  <div class="glitching">
    <VinhDev :class="mergedClass" />
  </div>
</template>
