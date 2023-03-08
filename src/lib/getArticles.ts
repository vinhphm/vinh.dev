import { getCollection } from 'astro:content'

export const getArticles = async () => {
  const articles = await getCollection('articles')

  return articles
    .filter(({ data }) => !data.draft)
    .sort((a, z) => z.data.date.getTime() - a.data.date.getTime())
}
