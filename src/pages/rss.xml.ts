import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE } from '@config'
import type { APIContext } from 'astro'

export async function get(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => !data.draft)
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site?.toString() ?? 'https://vinh.dev/',
    items: articles.map(article => ({
      link: `articles/${article.slug}`,
      title: article.data.title,
      description: article.data.summary,
      pubDate: new Date(article.data.date),
    })),
  })
}
