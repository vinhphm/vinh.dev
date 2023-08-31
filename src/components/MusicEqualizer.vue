<script setup lang="ts">
defineProps<{
  wrapperClass?: string
}>()
</script>

<template>
  <div class="flex h-3 w-4 items-center gap-0.75" :class="[wrapperClass]">
    <span class="h-3 w-0.75 animate-shrink rounded-sm bg-spotify-green" />
    <span class="h-1.5 w-0.75 animate-expand rounded-sm bg-spotify-green" />
    <span class="h-3 w-0.75 animate-shrink rounded-sm bg-spotify-green" />
  </div>
</template>
