// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  experimental: {
    payloadExtraction: false // optimize for SSR
  },

  modules: ['nitro-cloudflare-dev', '@nuxt/ui', '@nuxtjs/i18n', '@nuxt/content'],

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'cloudflare_module',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },

  vite: {
    build: {
      sourcemap: false
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
    baseUrl: 'https://photostudionana.com',
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

  compatibilityDate: '2025-07-15',
  devtools: { enabled: false }
});