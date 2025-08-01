// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  experimental: {
    payloadExtraction: false // optimize for SSR
  },

  modules: ['nitro-cloudflare-dev', '@nuxt/ui'],

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

  compatibilityDate: '2025-07-15',
  devtools: { enabled: false }
});
