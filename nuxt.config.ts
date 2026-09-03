// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

const apiEndpoint = process.env.API_ENDPOINT?.replace(/\/$/, '') || 'http://mamadou-portfolio.test/api'
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://noctem.adrianmatemalas.me'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiEndpoint
    }
  },

  site: {
    indexable: process.env.INDEXABLE === 'true',
    url: siteUrl
  },

  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/scripts', '@nuxt/eslint', '@nuxtjs/robots'],

  css: ["~/assets/css/main.css", "lightgallery/css/lightgallery-bundle.min.css"],

  vitePlugins: [
    tailwindcss()
  ],

  app: {
    head: {
      title: 'Noctem | Estudio de Fotografía Mallorca',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Noctem Studio nace para marcas, proyectos y personas que quieren comunicar mejor en redes sociales a través de contenido visual con intención.' },
        { property: 'og:title', content: 'Noctem | Estudio de Fotografía Mallorca' },
        { property: 'og:description', content: 'Noctem Studio nace para marcas, proyectos y personas que quieren comunicar mejor en redes sociales a través de contenido visual con intención.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: siteUrl },
        { property: 'og:image', content: `${siteUrl}/assets/images/og-image.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '1200' },
        { property: 'og:image:alt', content: 'Noctem - Isotipo' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Noctem | Estudio de Fotografía Mallorca' },
        { name: 'twitter:description', content: 'Noctem Studio nace para marcas, proyectos y personas que quieren comunicar mejor en redes sociales a través de contenido visual con intención.' },
        { name: 'twitter:image', content: `${siteUrl}/assets/images/og-image.png` }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/assets/images/RECURSOS_IG/ISOTIPO_PERFIL2.png' },
        { rel: 'apple-touch-icon', href: '/assets/images/RECURSOS_IG/ISOTIPO_PERFIL2.png' },
        { rel: 'stylesheet', href: '/cdn/googlefonts.css' },
        { rel: 'preload', as: 'fetch', href: '/assets/models/camera_lens.glb', crossorigin: '' }
      ]
    }
  }
})