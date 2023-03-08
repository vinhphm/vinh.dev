import { z, defineCollection } from 'astro:content'

const articles = defineCollection({
  schema: z.object({
    category: z.enum(['astro']).optional(),
    date: z.date(),
    title: z.string(),
    description: z.undefined(), // Old value that shouldn't be used anymore
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    updated: z.date().optional(),
    draft: z.boolean().optional(),
  }),
})

export const collections = {
  articles,
}
