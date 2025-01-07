import siteConfig from '@/site-config'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const posts = await getCollection('posts')
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: posts.map(post => ({
      ...post.data,
      link: `/posts/${post.slug}`,
    })),
  })
}
