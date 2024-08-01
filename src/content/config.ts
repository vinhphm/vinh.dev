import { defineCollection, z } from 'astro:content'

const pages = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        src: image().refine(img => img.width >= 640, {
          message: 'Cover image must be at least 640 pixels wide!',
        }),
        alt: z.string(),
      }).optional(),
  }),
})

const blog = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        src: image().refine(img => img.width >= 640, {
          message: 'Cover image must be at least 640 pixels wide!',
        }),
        alt: z.string(),
      }).optional(),
    date: z
      .string()
      .or(z.date())
      .transform((val: string | number | Date) => new Date(val).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })),
    draft: z.boolean().default(false).optional(),
    lang: z.string().default('en-US').optional(),
    tag: z.string().optional().optional(),
    redirect: z.string().optional(),
    video: z.boolean().default(false).optional(),
  }),
})

export const collections = { pages, blog }
