import { z, defineCollection } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({}),
})

const parts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      heroImage: image(),
      heroSubtitle: z.string(),
      released: z.date(),
      updated: z.date(),
    }),
})

export const collections = { posts, parts }
