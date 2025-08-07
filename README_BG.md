# HB's Thoughts

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

- Node.js (v18 или по-нова версия)
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

### Карти на Сайта

Блогът генерира карта на сайта за SEO *(Search Engine Optimization)* цели, която включва всички статии и статични страници.
Картата на сайта се актуализира автоматично, когато се добави ново съдържание, благодарение на Nuxt Sitemap модула.

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
- Back-end [Cloudflare Workers](https://workers.cloudflare.com/)
