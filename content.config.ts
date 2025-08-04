import { defineContentConfig, defineCollection, z } from '@nuxt/content';

const articleSchema = z.object({
  title: z.string().min(3).max(100),
  date: z.date(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()),
  slug: z.string(),
  navigation: z.boolean().default(false),
  competence: z.array(z.string()),
  excerpt: z.object({
    type: z.string(),
    children: z.any()
  })
});

export default defineContentConfig({
  collections: {
    seo: defineCollection({
      type: 'data',
      source: 'seo/*.json',
      schema: z.object({
        'content': z.object({
          title: z.object({ 'bg': z.string(), 'en': z.string() }),
          description: z.object({ 'bg': z.string(), 'en': z.string() })
        })
      })
    }),
    static: defineCollection({
      type: 'page',
      source: 'static/**/*.md'
    }),
    articles_bg: defineCollection({
      type: 'page',
      source: 'articles/bg/**',
      schema: articleSchema
    }),
    articles_en: defineCollection({
      type: 'page',
      source: 'articles/en/**',
      schema: articleSchema
    })
  }
});
