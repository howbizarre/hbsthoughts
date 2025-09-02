import { defineContentConfig, defineCollection, z } from '@nuxt/content';
import { asSitemapCollection } from '@nuxtjs/sitemap/content';

const articleSchema = z.object({
  title: z.string().min(3).max(100),
  date: z.date(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()),
  slug: z.string(),
  navigation: z.boolean().default(false),
  competence: z.array(z.string()),
  image: z.string().optional(),
  imageDark: z.string().optional(),
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

    bg_static: defineCollection({
      type: 'page',
      source: 'bg/static/*.md'
    }),
    en_static: defineCollection({
      type: 'page',
      source: 'en/static/*.md'
    }),

    bg_articles: defineCollection({
      type: 'page',
      source: 'bg/articles/*.md',
      schema: articleSchema
    }),
    en_articles: defineCollection({
      type: 'page',
      source: 'en/articles/*.md',
      schema: articleSchema
    }),

    sitemap: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: '**/*.md'
      })
    )
  }
});
