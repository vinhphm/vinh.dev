import { getCollection } from 'astro:content'

export async function getArticles() {
  const articles = await getCollection('articles')

  return articles.sort((a, z) => z.data.date.getTime() - a.data.date.getTime())
}
