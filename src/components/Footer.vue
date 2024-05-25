<script setup lang="ts">
import dayjs from 'dayjs'
</script>

<template>
  <div class="mt-10 mb-6 prose fw-inherit m-auto flex slide-enter animate-delay-1200!">
    <span class="text-sm op75">
      © 2021-{{ dayjs().year() }} Vinh Pham.
      <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" style="color:inherit">
        CC BY-NC-SA 4.0
      </a>
    </span>
    <div class="flex-auto" />
  </div>
</template>
