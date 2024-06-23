<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const { y: scroll } = useWindowScroll()
const isClient = ref(false)

onMounted(() => {
  isClient.value = true
})

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <button
    title="Scroll to top"
    class="fixed right-3 bottom-3 w-10 h-10 hover:op100 rounded-full hover-bg-hex-8883 transition duration-300 z-100 print:hidden"
    :class="isClient && scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
    @click="toTop"
  >
    <div i-ri-arrow-up-line />
  </button>
</template>
