<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(async () => {
  const { PowerGlitch } = await import('powerglitch')
  PowerGlitch.glitch('.glitched-logo', {
    timing: {
      duration: 5000,
    },
  })
})
</script>

<template>
  <div class="glitched-logo">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        class="logo-fill-color"
        d="M31.4 47.4V53H25.8V41.8H20.2V25H14.6V13.8H25.8V25H31.4V41.8H37V47.4H31.4ZM48.2 25H42.6V13.8H53.8V19.4H48.2V25ZM42.6 30.6V36.2H37V30.6H42.6Z"
      />
    </svg>
  </div>
</template>

<style scoped>
.glitched-logo {
  width: 48px;
  height: 48px;
}
</style>
