import { z, defineCollection } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({}),
})

const parts = defineCollection({
  type: 'content',
  schema: z.object({
    heroImage: z.string(),
    heroSubtitle: z.string(),
    released: z.date(),
    updated: z.date(),
  }),
})

export const collections = { posts, parts }
