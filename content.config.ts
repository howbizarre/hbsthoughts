import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    static: defineCollection({
      type: 'page',
      source: 'static/**/*.md'
    }),
    seo: defineCollection({
      type: 'data',
      source: 'seo/**.json',
      schema: z.object({
        'content': z.object({
          title: z.object({ 'bg': z.string(), 'en': z.string() }),
          description: z.object({ 'bg': z.string(), 'en': z.string() })
        })
      })
    })
  }
});
