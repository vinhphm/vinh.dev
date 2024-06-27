import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import vue from '@astrojs/vue'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'

export default defineConfig({
  site: 'https://vinh.dev',
  trailingSlash: 'never',
  build: {
    assets: '_assets',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  integrations: [
    mdx(),
    sitemap(),
    UnoCSS({
      injectReset: true,
    }),
    vue(),
  ],
  markdown: {
    smartypants: false,
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      wrap: true,
    },
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: 'noopener' }],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: 'header-anchor',
            ariaHidden: true,
          },
          content: [
            {
              type: 'text',
              value: '#',
            },
          ],
        },
      ],
    ],
  },
})
