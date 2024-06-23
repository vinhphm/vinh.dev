import path from 'node:path'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import vue from '@astrojs/vue'
import svgLoader from 'vite-svg-loader'

// https://astro.build/config
export default defineConfig({
  site: 'https://vinh.dev/',
  server: {
    port: 1977,
  },
  integrations: [
    mdx(),
    sitemap(),
    UnoCSS({
      injectReset: true,
    }),
    vue(),
  ],
  vite: {
    plugins: [
      svgLoader({
        svgo: false,
        defaultImport: 'url',
      }),
    ],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      wrap: true,
    },
  },
})
