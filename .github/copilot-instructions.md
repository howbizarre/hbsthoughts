# Copilot Instructions for HB's Thoughts

## Project Overview
Multilingual blog platform built with Nuxt 4 deployed on Cloudflare Workers. Articles stored as markdown in [content/](../content/), supporting Bulgarian (bg) and English (en) with i18n routing prefix strategy.

## Architecture

### Content Management Pattern
- **Collection-based**: Define collections in [content.config.ts](../content.config.ts) with Zod schemas
- **Language separation**: Content split by locale (`bg_articles`, `en_articles`) in separate directories
- **Query pattern**: Use `queryCollection()` with collection name like `${locale}_articles`
- **SEO data**: Stored as JSON in [content/seo/](../content/seo/) with nested locale structure

### Multilingual Setup
- **Default locale**: `bg` (Bulgarian)
- **Strategy**: `prefix` - all routes prefixed with locale code (`/bg/articles`, `/en/articles`)
- **Detection**: Custom locale detector in [i18n/localeDetector.ts](../i18n/localeDetector.ts)
- **Content paths**: Always include locale in path: `/${locale.value}/articles/${slug.value}`
- **Collection naming**: Append locale prefix to collection names (`bg_articles`, `en_articles`, `bg_help`, `en_help`)

### Structured Data (JSON-LD)
Implemented via composables in [app/composables/useJsonLd.ts](../app/composables/useJsonLd.ts):
- `useJsonLdBlogListing()` - for article listing pages
- `useJsonLdBlogPost()` - for individual articles
- `useJsonLdBreadcrumbs()` - for breadcrumb navigation
All accept reactive refs/computed values and auto-inject into `<head>`.

### Data Fetching Conventions
```typescript
// Use locale-prefixed collection names
const collectionName = `${locale.value}_articles` as 'bg_articles' | 'en_articles';

// Standard article query with caching
const { data: articles } = await useLazyAsyncData(
  `${route.path}-${locale.value}`,
  () => queryCollection(collectionName)
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all(),
  { server: true }
);

// Query SEO data
const seo = await queryCollection('seo').where('stem', '=', 'seo/articles').first();
```

## Development Workflow

### Local Development
```bash
npm run dev          # Starts on port 7410 (configured in nuxt.config.ts)
npm run typecheck    # Run TypeScript checks
```

### Cloudflare Deployment
```bash
npm run preview      # Build + local Wrangler preview
npm run deploy       # Build + deploy to Cloudflare Workers
npm run cf-typegen   # Generate Cloudflare binding types
```

### Build Configuration
- **Preset**: `cloudflare_module` with D1 database binding in [wrangler.jsonc](../wrangler.jsonc)
- **Memory**: Build uses `--max-old-space-size=4096` flag
- **Chunk splitting**: Manual chunks for `vue-core`, `vue-router`, `axios`, `vendor` in [nuxt.config.ts](../nuxt.config.ts)
- **SSR**: Enabled with `payloadExtraction: false` for optimization

## Component & Page Patterns

### Article Pages
Use catch-all routes (`[...slug].vue`) with:
- `queryCollectionItemSurroundings()` for prev/next navigation
- Breadcrumb integration via computed `breadcrumbItems`
- JSON-LD structured data for SEO
Example: [app/pages/articles/[...slug].vue](../app/pages/articles/[...slug].vue)

### Component Organization
```
components/
  article/        # Article-specific UI (Excerpt, Tag, Competence)
  button/         # Navigation buttons (Articles, Tags, LangSwitcher, etc.)
  content/        # Content elements (Comments, Note)
  layout/         # Layout components (Header, Footer, Breadcrumb)
```

### SEO Meta Pattern
```typescript
useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.description,
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/articles/${slug.value}`
});
```

## Article Frontmatter Schema
Required fields (validated via Zod in [content.config.ts](../content.config.ts)):
```yaml
---
title: "Article Title"           # 3-100 chars
date: "2024-02-06T12:01:53.293Z" # ISO date
draft: false                      # Boolean
tags: ["vue", "nuxt"]            # Array of strings
slug: "article-slug"             # String
navigation: false                # Boolean (for sidebar)
competence: "frontend"           # Category string
image: "/images/..."             # Optional
excerpt:                         # Auto-generated object
  type: "..."
  children: [...]
---
```

## Key Dependencies & Modules
- **@nuxt/content**: Markdown CMS with collection queries
- **@nuxtjs/i18n**: v10+ with experimental locale detector
- **@nuxt/ui**: TailwindCSS component library (primary color: `slate`)
- **nuxt-llms**: LLM integration for site crawling
- **nuxt-studio**: Content editing at `/cms` route
- **nitro-cloudflare-dev**: Local Cloudflare Workers development
- **better-sqlite3**: D1 database binding
- **fuse.js**: Client-side search (via [server/api/sections.ts](../server/api/sections.ts))

## Styling
- **Framework**: TailwindCSS with Nuxt UI
- **Typography**: `@tailwindcss/typography` for prose content
- **Fonts**: Inter + Playfair Display (preloaded via Google Fonts)
- **Custom config**: Extended chip sizes and breadcrumb variants in [app/app.config.ts](../app/app.config.ts)
- **Dark mode**: Automatic theme switching support

## Important Constraints
- **Port**: Dev server must use `7410` (HMR configured for this port)
- **Base URL**: Hardcoded as `https://thoughts.bizarre.how` in SEO/JSON-LD
- **Date format**: ISO 8601 strings, converted to Date objects by Nuxt Content
- **Navigation**: Use `useLocalePath()` for all internal links to preserve locale
- **No client-side routing**: Articles use server-side data fetching (`server: true`)
