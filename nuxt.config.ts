// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/eslint'
  ],

  css: ["~/assets/css/main.css"],

  vitePlugins: [
    tailwindcss()
  ],

  app: {
    head: {
      title: 'Noctem | Estudio de Fotografía Mallorca',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Estudio de fotografía de inspiración japonesa con base en Mallorca. Capturando momentos con precisión y alma.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400;500&family=Playfair+Display:wght@400;500;600&display=swap' }
      ]
    }
  }
})