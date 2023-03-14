import { z, defineCollection } from 'astro:content'

const articles = defineCollection({
  schema: z.object({
    category: z.enum(['astro']).optional(),
    date: z.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    title: z.string(),
    updated: z.date().optional(),
    draft: z.boolean().optional(),
  }),
})

export const collections = {
  articles,
}
