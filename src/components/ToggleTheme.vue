<script setup lang='ts'>
import { toggleDark } from '~/logics'
</script>

<template>
  <button class="select-none" title="Toggle Color Scheme" @click="toggleDark">
    <div i-ri-sun-line dark:i-ri-moon-line />
  </button>
</template>
