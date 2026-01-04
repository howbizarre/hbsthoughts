import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  ssr: true,

  experimental: {
    payloadExtraction: false // optimize for SSR
  },

  modules: ['nitro-cloudflare-dev', '@nuxt/ui', '@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxt/content', 'nuxt-llms', 'nuxt-studio'],

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://thoughts.bizarre.how',
    name: "How Bizarre's Thoughts"
  },

  app: {
    baseURL: '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preload', as: 'style', onload: "this.onload = null; this.rel = 'stylesheet';", href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap' }
      ]
    },
    pageTransition: { name: 'slide-up', mode: 'out-in' }
  },

  nitro: {
    preset: 'cloudflare_module',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },

  vite: {
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/vue/') || id.includes('node_modules/@vue/')) {
              return 'vue-core';
            }

            if (id.includes('node_modules/vue-router/')) {
              return 'vue-router';
            }

            if (id.includes('node_modules/axios/')) {
              return 'axios';
            }

            if (id.includes('node_modules')) {
              return 'vendor';
            }

            return undefined;
          }
        }
      }
    },
    server: {
      hmr: {
        clientPort: 7410,
        port: 7410
      }
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en',
        name: 'EN',
        file: 'locales/en-US.json'
      },
      {
        code: 'bg',
        language: 'bg',
        name: 'БГ',
        file: 'locales/bg-BG.json'
      }
    ],
    baseUrl: 'https://thoughts.bizarre.how',
    langDir: './',
    defaultLocale: 'bg',
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true
    },
    strategy: 'prefix',
    experimental: {
      localeDetector: 'localeDetector.ts'
    }
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          }
        }
      }
    }
  },

  sitemap: {
    zeroRuntime: true
  },

  studio: {
    route: '/cms', // default: '/_studio'
    repository: {
      provider: 'github', // 'github' or 'gitlab'
      owner: 'howbizarre',
      repo: 'hbsthoughts',
      branch: 'master'
    }
  },

  llms: {
    domain: 'https://thoughts.bizarre.how',
    title: "HB's Thoughts",
    description: 'Articles mostly about Vue, Nuxt, TailwindCSS, and TypeScript, but not limited to — more on the front-end and less on the back-end.',
    full: {
      title: "HB's Thoughts",
      description: 'Articles mostly about Vue, Nuxt, TailwindCSS, and TypeScript, but not limited to — more on the front-end and less on the back-end.'
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: false }
});