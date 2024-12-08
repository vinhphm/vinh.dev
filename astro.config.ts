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
import pagefind from 'vite-plugin-pagefind'
import siteConfig from './src/site-config'

export default defineConfig({
  site: siteConfig.site,
  trailingSlash: 'never',
  build: {
    assets: '_assets',
    format: 'file',
  },
  experimental: {
    svg: true,
  },
  vite: {
    ssr: {
      noExternal: [`${siteConfig.site}/pagefind/pagefind.js`],
    },
    plugins: [pagefind()],
    build: {
      rollupOptions: {
        external: [`${siteConfig.site}/pagefind/pagefind.js`],
      },
    },
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
