import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'data',
      source: 'landing/**.json',
      schema: z.object({
        'content': z.object({
          title: z.object({ 'bg': z.string(), 'en': z.string() }),
          description: z.object({ 'bg': z.string(), 'en': z.string() })
        })
      })
    })
  }
});
