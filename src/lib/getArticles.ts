import { getCollection } from 'astro:content'

export async function getArticles() {
  const articles = await getCollection('articles')

  return articles
    .filter(({ data }) => import.meta.env.DEV ?? !data.draft)
    .sort((a, z) => z.data.date.getTime() - a.data.date.getTime())
}
