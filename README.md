# HB's Thoughts

<div align="center">

## 🌍 Choose Language / Изберете Език

</div>

<details open>
<summary><strong>🇬🇧 English</strong> <small>(README_EN.md)</small></summary>

---

A modern blog built with Nuxt 4, focused on articles about Vue, Nuxt, TailwindCSS, TypeScript, and front-end development.

## 🌐 Live Site

Visit the blog at: [thoughts.bizarre.how](https://thoughts.bizarre.how)

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
- **Structured Data**: JSON-LD structured data for blog posts, listings, and breadcrumbs
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
│   ├── composables/        # Vue composables (JSON-LD, utilities)
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

## 🔍 SEO & Structured Data

The blog implements comprehensive SEO optimization with JSON-LD structured data:

### JSON-LD Implementation

The application includes three types of structured data using Schema.org vocabulary:

1. **Blog Listing** (`useJsonLdBlogListing`):
   - Generates `Blog` schema for article listing pages
   - Includes all articles with their metadata
   - Automatically updates when articles are loaded

2. **Blog Posts** (`useJsonLdBlogPost`):
   - Generates `BlogPosting` schema for individual articles
   - Includes author, publisher, dates, and article metadata
   - Supports optional featured images

3. **Breadcrumbs** (`useJsonLdBreadcrumbs`):
   - Generates `BreadcrumbList` schema for navigation
   - Works with Nuxt UI breadcrumb components
   - Handles multilingual routes and dynamic content

### Usage

The JSON-LD composables are automatically imported and can be used in any page:

```vue
<script setup>
// For article listings
useJsonLdBlogListing(title, description, articles, locale);

// For individual blog posts
useJsonLdBlogPost(article, locale);

// For breadcrumb navigation
useJsonLdBreadcrumbs(breadcrumbItems);
</script>
```

All structured data is reactive and updates automatically when content changes.

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
- Website: [thoughts.bizarre.how](https://thoughts.bizarre.how)

## 🙏 Acknowledgments

- Built with [Nuxt 4](https://nuxt.com/)
- UI components from [Nuxt UI](https://ui.nuxt.com/)
- Content from [Nuxt Content](https://content.nuxt.com/)
- Multilingual support with [Nuxt i18n](https://i18n.nuxtjs.org/)
- Icons from [Heroicons](https://heroicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

</details>

<details>
<summary><strong>🇧🇬 Български</strong>  <small>(README_BG.md)</small></summary>

---

Модерен блог построен с Nuxt 4, фокусиран върху статии за Vue, Nuxt, TailwindCSS, TypeScript и фронт-енд разработка.

## 🌐 Живо Сайт

Посетете блога на: [thoughts.bizarre.how](https://thoughts.bizarre.how)

## 📖 За Проекта

HB's Thoughts е личен блог със статии главно за Vue, Nuxt, TailwindCSS и TypeScript, но не само - повече фронт-енд и по-малко бек-енд. Блогът поддържа множество езици (английски и български) и е оптимизиран за производителност и потребителско изживяване.

## ✨ Функционалности

- **Модерен Технологичен Стек**: Построен с Nuxt 4, Vue 3 и TypeScript
- **Многоезична Поддръжка**: Достъпен на английски и български с i18n
- **Управление на Съдържание**: Задвижван от Nuxt Content за статии в markdown формат
- **Модерен UI**: Стилизиран с Nuxt UI и TailwindCSS
- **Функционалност за Търсене**: Пълнотекстово търсене с Fuse.js
- **Система за Тагове**: Статиите са организирани по тагове и компетенции
- **SEO Оптимизация**: Рендериране от страна на сървъра с оптимизирани мета тагове
- **Структурирани Данни**: JSON-LD структурирани данни за блог постове, листинги и навигация
- **Облачна Инсталация**: Инсталиран на Cloudflare Workers
- **Адаптивен Дизайн**: Mobile-first адаптивен лейаут

## 🛠 Технологичен Стек

- **Фреймуърк**: [Nuxt 4](https://nuxt.com/)
- **Фронт-енд**: [Vue 3](https://vuejs.org/) с TypeScript
- **Стилизиране**: [TailwindCSS](https://tailwindcss.com/) + [Nuxt UI](https://ui.nuxt.com/)
- **Съдържание**: [Nuxt Content](https://content.nuxt.com/) за markdown статии
- **Интернационализация**: [Nuxt i18n](https://i18n.nuxtjs.org/)
- **Търсене**: [Fuse.js](https://fusejs.io/) за размито търсене
- **База данни**: Better SQLite3
- **Инсталация**: Cloudflare Workers
- **Build Tool**: Vite

## 🚀 Започване

### Изисквания

- Node.js (v18 або по-нова версия)
- npm или yarn
- Wrangler CLI (за Cloudflare инсталация)

### Инсталация

1. Клонирайте хранилището:
```bash
git clone https://github.com/hristobotev/hbsthoughts.git
cd hbsthoughts
```

2. Инсталирайте зависимостите:
```bash
npm install
```

3. Стартирайте development сървъра:
```bash
npm run dev
```

Сайтът ще бъде достъпен на `http://localhost:7410`

## 📝 Налични Скриптове

- `npm run dev` - Стартира development сървър на порт 7410
- `npm run build` - Билдва приложението за продукция
- `npm run generate` - Генерира статични файлове
- `npm run preview` - Билдва и прегледва с Wrangler
- `npm run deploy` - Билдва и инсталира на Cloudflare Workers
- `npm run cf-typegen` - Генерира Cloudflare типове

## 📁 Структура на Проекта

```
├── app/                    # Nuxt app директория
│   ├── components/         # Vue компоненти
│   ├── composables/        # Vue composables (JSON-LD, utilities)
│   ├── layouts/           # Layout компоненти
│   ├── pages/             # Page компоненти и routing
│   └── assets/            # Статични ресурси
├── content/               # Markdown съдържание
│   ├── bg/                # Български статии
│   ├── en/                # Английски статии
│   ├── seo/               # SEO конфигурации
├── i18n/                  # Интернационализация
├── public/                # Публични ресурси
└── server/                # Server-side код
```

## 🌍 Управление на Съдържанието

Статиите са написани в Markdown и съхранени в `content/` директорията:

- `/content/en/articles/` - Английски статии
- `/content/bg/articles/` - Български статии
- `/content/en/static/` - Английски статични страници (като help страници)
- `/content/bg/static/` - Български статични страници (като help страници)

### Формат на Статия

Всяка статия следва тази frontmatter структура:

```markdown
---
title: "Заглавие на Статията"
date: "2024-02-06T12:01:53.293Z"
draft: false
tags: ["vue", "nuxt"]
slug: "slug-na-statiata"
navigation: false
competence: "frontend"
---

Съдържание на статията тук...
```

## 🔍 SEO & Структурирани Данни

Блогът имплементира цялостна SEO оптимизация със JSON-LD структурирани данни:

### JSON-LD Имплементация

Приложението включва три типа структурирани данни използвайки Schema.org речника:

1. **Blog Listing** (`useJsonLdBlogListing`):
   - Генерира `Blog` схема за страници с листинг на статии
   - Включва всички статии с техните метаданни
   - Автоматично се актуализира когато статиите се заредят

2. **Blog Posts** (`useJsonLdBlogPost`):
   - Генерира `BlogPosting` схема за отделни статии
   - Включва автор, издател, дати и метаданни на статията
   - Поддържа опционални featured изображения

3. **Breadcrumbs** (`useJsonLdBreadcrumbs`):
   - Генерира `BreadcrumbList` схема за навигация
   - Работи с Nuxt UI breadcrumb компонентите
   - Обработва многоезични маршрути и динамично съдържание

### Използване

JSON-LD composables се импортират автоматично и могат да се използват в която и да е страница:

```vue
<script setup>
// За листинги на статии
useJsonLdBlogListing(title, description, articles, locale);

// За отделни блог постове
useJsonLdBlogPost(article, locale);

// За breadcrumb навигация
useJsonLdBreadcrumbs(breadcrumbItems);
</script>
```

Всички структурирани данни са реактивни и се актуализират автоматично при промяна на съдържанието.

## 🚀 Инсталация

Приложението е конфигурирано за инсталация на Cloudflare Workers:

1. Конфигурирайте Wrangler:
```bash
npm run cf-typegen
```

2. Инсталирайте:
```bash
npm run deploy
```

## 🤝 Сътрудничество

1. Направете fork на хранилището
2. Създайте feature branch: `git checkout -b feature/amazing-feature`
3. Commit-нете промените си: `git commit -m 'Add amazing feature'`
4. Push-нете към branch-а: `git push origin feature/amazing-feature`
5. Отворете Pull Request

## 📄 Лиценз

Този проект е лицензиран под MIT лиценза - вижте [LICENSE.md](LICENSE.md) файла за подробности.

## 👤 Автор

**howbizarre**
- GitHub: [@howbizarre](https://github.com/howbizarre)
- Уебсайт: [thoughts.bizarre.how](https://thoughts.bizarre.how)

## 🙏 Благодарности

- Построен с [Nuxt 4](https://nuxt.com/)
- UI компоненти от [Nuxt UI](https://ui.nuxt.com/)
- Съдържание от [Nuxt Content](https://content.nuxt.com/)
- Многоезична поддръжка с [Nuxt i18n](https://i18n.nuxtjs.org/)
- Икони от [Heroicons](https://heroicons.com/)
- Шрифтове от [Google Fonts](https://fonts.google.com/)

</details>
