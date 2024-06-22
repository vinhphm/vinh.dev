import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import vue from '@astrojs/vue'
import svgLoader from 'vite-svg-loader'
import copy from 'rollup-plugin-copy'

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
      copy({
        targets: [
          { src: 'node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2', dest: 'dist/fonts/geist-sans/' },
          { src: 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2', dest: 'dist/fonts/geist-mono/' },
        ],
        hook: 'buildStart',
      }),
    ]
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
