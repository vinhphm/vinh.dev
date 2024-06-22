<script lang="ts" setup>
import { computed } from 'vue'
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
</script>

<template>
  <header class="header z-40 relative">
    <a class="w-12 h-12 absolute lg:fixed m-5 select-none outline-none" href="/" aria-label="Logo">
      <Logo />
    </a>
    <nav class="nav">
      <div class="spacer" />
      <div class="right" print:op0>
        <a
          v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
          nav-link :href="link.href"
        >
          {{ link.text }}
        </a>
        <a
          v-for="link in socialLinks" :key="link.text" :aria-label="`${link.text}`" :class="link.icon" nav-link
          :target="getLinkTarget(link.href)" :href="link.href" class="lt-md:hidden"
        />
        <a nav-link target="_blank" href="/rss.xml" class="lt-md:hidden" i-ri-rss-line aria-label="RSS" />
        <ThemeToggle />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
