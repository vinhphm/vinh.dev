<script setup lang="ts">
import { showSearch } from '@/stores/search'

function handleSearch(event: MouseEvent | TouchEvent) {
  event.preventDefault()
  event.stopPropagation()
  showSearch.value = true
}
</script>

<template>
  <button
    type="button"
    role="button"
    aria-label="search"
    class="touch-manipulation"
    @click.prevent="handleSearch"
    @touchstart.prevent="handleSearch"
  >
    <span class="sr-only">search</span>
    <span class="i-ri-search-line" />
  </button>
</template>

<style scoped>
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
</style>
