<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref, unref } from 'vue'
import Logo from './Logo.vue'
import ThemeToggle from './ThemeToggle.vue'
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'

const navLinks = siteConfig.header.navLinks || []

const socialLinks = computed(() => {
  return siteConfig.socialLinks.filter((link: Record<string, any>) => {
    if (link.header && typeof link.header === 'boolean') {
      return link
    }
    else if (link.header && typeof link.header === 'string') {
      link.icon = link.header.includes('i-') ? link.header : link.icon
      return link
    }
    else {
      return false
    }
  })
})

const { y: scroll } = useWindowScroll()

const oldScroll = ref(unref(scroll))

onMounted(() => {
  const navMask = document.querySelector('.nav-drawer-mask') as HTMLElement

  navMask?.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

  const headerEl = document.querySelector('#header') as HTMLElement
  if (!headerEl)
    return

  if (document.documentElement.scrollTop > 100)
    headerEl.classList.add('header-bg-blur')

  window.addEventListener('scroll', () => {
    if (scroll.value < 150) {
      headerEl.classList.remove('header-hide')
      return
    }

    if (scroll.value - oldScroll.value > 150) {
      headerEl.classList.add('header-hide')
      oldScroll.value = scroll.value
    }

    if (oldScroll.value - scroll.value > 150) {
      headerEl.classList.remove('header-hide')
      oldScroll.value = scroll.value
    }
  })
})
</script>

<template>
  <header
    id="header" :class="{ 'header-bg-blur': scroll > 20 }"
    class="!fixed bg-transparent z-899 w-screen h-20 px-6 flex justify-between items-center relative"
  >
    <div class="flex items-center h-full">
      <a href="/" aria-label="Logo">
        <Logo />
      </a>
    </div>
    <div class="flex gap-x-6 items-center">
      <nav class="flex tracking-tighter flex-wrap gap-x-6 position-initial flex-row">
        <a
          v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
          nav-link :href="link.href"
        >
          {{ link.text }}
        </a>
      </nav>
      <a
        v-for="link in socialLinks" :key="link.text" :aria-label="`${link.text}`" :class="link.icon" nav-link
        :target="getLinkTarget(link.href)" :href="link.href" class="lt-md:hidden"
      />
      <a nav-link target="_blank" href="/rss.xml" class="lt-md:hidden" i-ri-rss-line aria-label="RSS" />
      <ThemeToggle />
    </div>
  </header>
</template>

<style scoped>
.header-hide {
  transform: translateY(-100%);
  transition: transform 0.4s ease;
}

.header-bg-blur {
  --at-apply: backdrop-blur-md;
}
</style>
