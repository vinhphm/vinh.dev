import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrettyCode from 'rehype-pretty-code'
import UnoCSS from 'unocss/astro'

export default defineConfig({
  site: 'https://vinh.dev',
  trailingSlash: 'never',
  build: {
    assets: '_assets',
    format: 'file',
  },
  experimental: {
    svg: true,
  },
  integrations: [
    mdx(),
    sitemap(),
    UnoCSS({
      injectReset: true,
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['site-search'].includes(tag),
        },
      },
    }),
  ],
  markdown: {
    // smartypants: false,
    syntaxHighlight: false,
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
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light-high-contrast',
            dark: 'github-dark-high-contrast',
          },
          transformers: [
            transformerNotationDiff(),
            transformerMetaHighlight(),
            transformerCopyButton({
              visibility: 'hover',
              feedbackDuration: 1000,
            }),
          ],
        },
      ],
    ],
  },
})
