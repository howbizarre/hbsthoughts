# HB's Thoughts

A modern blog built with Nuxt 4, focused on articles about Vue, Nuxt, TailwindCSS, TypeScript, and front-end development.

## 🌐 Live Site

Visit the blog at: [v4.bizarre.how](https://v4.bizarre.how)

## 📖 About

HB's Thoughts is a personal blog featuring articles mostly about Vue, Nuxt, TailwindCSS, and TypeScript, but not limited to — more on the front-end and less on the back-end. The blog supports multiple languages (English and Bulgarian) and is optimized for performance and user experience.

## ✨ Features

- **Modern Tech Stack**: Built with Nuxt 4, Vue 3, and TypeScript
- **Multilingual Support**: Available in English and Bulgarian with i18n
- **Content Management**: Powered by Nuxt Content for markdown-based articles
- **Modern UI**: Styled with Nuxt UI and TailwindCSS
- **Search Functionality**: Full-text search with Fuse.js
- **Tag System**: Articles organized by tags and competencies
- **SEO Optimized**: Server-side rendering with optimized meta tags
- **Cloud Deployment**: Deployed on Cloudflare Workers
- **Responsive Design**: Mobile-first responsive layout

## 🛠 Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **Frontend**: [Vue 3](https://vuejs.org/) with TypeScript
- **Styling**: [TailwindCSS](https://tailwindcss.com/) + [Nuxt UI](https://ui.nuxt.com/)
- **Content**: [Nuxt Content](https://content.nuxt.com/) for markdown articles
- **Internationalization**: [Nuxt i18n](https://i18n.nuxtjs.org/)
- **Search**: [Fuse.js](https://fusejs.io/) for fuzzy search
- **Database**: Better SQLite3
- **Deployment**: Cloudflare Workers
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Wrangler CLI (for Cloudflare deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hristobotev/hbsthoughts.git
cd hbsthoughts
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:7410`

## 📝 Available Scripts

- `npm run dev` - Start development server on port 7410
- `npm run build` - Build the application for production
- `npm run generate` - Generate static files
- `npm run preview` - Build and preview with Wrangler
- `npm run deploy` - Build and deploy to Cloudflare Workers
- `npm run cf-typegen` - Generate Cloudflare types

## 📁 Project Structure

```
├── app/                    # Nuxt app directory
│   ├── components/         # Vue components
│   ├── layouts/           # Layout components
│   ├── pages/             # Page components and routing
│   └── assets/            # Static assets
├── content/               # Markdown content
│   ├── bg/                # Bulgarian articles
│   ├── en/                # English articles
│   ├── seo/               # SEO configurations
├── i18n/                  # Internationalization
├── public/                # Public assets
└── server/                # Server-side code
```

## 🌍 Content Management

Articles are written in Markdown and stored in the `content/` directory:

- `/content/en/articles/` - English articles
- `/content/bg/articles/` - Bulgarian articles
- `/content/en/static/` - English static pages (like help pages)
- `/content/bg/static/` - Bulgarian static pages (like help pages)

### Article Format

Each article follows this frontmatter structure:

```markdown
---
title: "Article Title"
date: "2024-02-06T12:01:53.293Z"
draft: false
tags: ["vue", "nuxt"]
slug: "article-slug"
navigation: false
competence: "frontend"
---

Article content here...
```

## 🚀 Deployment

The application is configured for deployment on Cloudflare Workers:

1. Configure Wrangler:
```bash
npm run cf-typegen
```

2. Deploy:
```bash
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👤 Author

**howbizarre**
- GitHub: [@howbizarre](https://github.com/howbizarre)
- Website: [v4.bizarre.how](https://v4.bizarre.how)

## 🙏 Acknowledgments

- Built with [Nuxt 4](https://nuxt.com/)
- UI components from [Nuxt UI](https://ui.nuxt.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
