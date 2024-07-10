<script lang="ts" setup>
import VinhDev from './icons/VinhDev.vue'
import Vitest from './icons/Vitest.vue'

defineProps<{
  list: {
    text: string
    description?: string
    icon?: string
    href: string
  }[]
}>()
</script>

<template>
  <ul grid="~ cols-1 sm:cols-2 gap-4">
    <template v-if="!list || list.length === 0">
      <div py10 text-lg opacity-50>
        nothing here yet.
      </div>
    </template>
    <li v-for="project in list" :key="project.text" w-full flex items-center rd-2 container-link>
      <a flex items-center target="_blank" :href="project.href" :aria-label="project.text">
        <div ml-2 mr-4 pt-2>
          <Vitest v-if="project.icon === 'vitest'" class="inline-block text-4xl" />
          <VinhDev v-else-if="project.icon === 'vinh-dev'" class="inline-block text-4xl" />
          <i v-else inline-block text-4xl :class="project.icon || 'i-carbon-unknown'" />
        </div>
        <div font-normal lh-tight>
          <div text-lg hover:text-main>{{ project.text }}</div>
          <div text-sm opacity-50>{{ project.description }}</div>
        </div>
      </a>
    </li>
  </ul>
</template>
