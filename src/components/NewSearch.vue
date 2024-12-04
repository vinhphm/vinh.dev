<script setup lang="ts">
import { showSearch } from '@/stores/search'
</script>

<template>
  <button @click="showSearch = true">
    <span class="sr-only">search</span>
    <span class="i-ri-search-line" />
  </button>
</template>
