// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

const apiEndpoint = process.env.API_ENDPOINT?.replace(/\/$/, '') || 'http://mamadou-portfolio.test/api'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiEndpoint
    }
  },

  routeRules: {
    '/api/**': { proxy: `${apiEndpoint}/**` }
  },

  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/scripts', '@nuxt/eslint', '@nuxtjs/robots'],

  css: ["~/assets/css/main.css"],

  vitePlugins: [
    tailwindcss()
  ],

  site: { indexable: process.env.INDEXABLE === 'true' },

  app: {
    head: {
      title: 'Noctem | Estudio de Fotografía Mallorca',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Estudio de fotografía de inspiración japonesa con base en Mallorca. Capturando momentos con precisión y alma.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/assets/images/RECURSOS_IG/ISOTIPO_PERFIL2.png' },
        { rel: 'apple-touch-icon', href: '/assets/images/RECURSOS_IG/ISOTIPO_PERFIL2.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400;500&family=Playfair+Display:wght@400;500;600&display=swap' }
      ]
    }
  }
})