<template>
  <div class="noctem-work">
    <div class="grain-overlay" />
    <NoctemNav :threshold="0" />
    
    <main class="noctem-work__main">
      <div class="noctem-work__hero">
        <div class="noctem-work__hero-container">
          <NuxtLink to="/trabajos" class="noctem-work__back">
            <span class="noctem-work__back-icon">←</span>
            <span class="noctem-work__back-text">Volver</span>
          </NuxtLink>
          
          <div v-if="pending" class="noctem-work__loading">
            <span class="noctem-work__loading-text fade-up">Cargando...</span>
          </div>
          
          <div v-else-if="error || !work" class="noctem-work__error">
            <span class="noctem-work__error-text">Trabajo no encontrado</span>
          </div>
          
          <template v-else>
            <header class="noctem-work__header">
              <span 
                v-if="work.tags?.length" 
                class="noctem-work__category fade-up"
              >
                {{ work.tags[0] }}
              </span>
              <h1 
                class="noctem-work__title fade-up" 
                style="animation-delay: 0.15s"
              >
                {{ work.title }}
              </h1>
              <div 
                v-if="work.description" 
                v-html="work.description"
                class="noctem-work__description fade-up"
                style="animation-delay: 0.3s"
              ></div>
              <div 
                class="noctem-work__line line-draw" 
                style="animation-delay: 0.45s" 
              />
            </header>
          </template>
        </div>
      </div>
      
      <section v-if="galleryItems.length" class="noctem-work__gallery">
        <div class="noctem-work__gallery-container">
          <div 
            class="noctem-work__masonry"
            :class="{ 'noctem-work__masonry--loaded': isLoaded }"
          >
            <div
              v-for="(item, index) in galleryItems"
              :key="item.key"
              class="noctem-work__item"
              :class="getItemClass(index)"
              :style="{ animationDelay: `${0.6 + index * 0.08}s` }"
              @click="openGallery(index)"
            >
              <div class="noctem-work__image-wrap">
                <video
                  v-if="item.isVideo"
                  ref="lazyVideos"
                  :data-src="item.src"
                  class="noctem-work__video-thumb"
                  muted
                  loop
                  playsinline
                  autoplay
                  preload="none"
                  tabindex="-1"
                />
                <img
                  v-else
                  :src="item.src"
                  :alt="`${work.title} - Imagen ${index + 1}`"
                  class="noctem-work__image"
                  loading="lazy"
                />
                <div class="noctem-work__item-overlay">
                  <span v-if="item.isVideo" class="noctem-work__item-play">▶</span>
                  <span v-else class="noctem-work__item-icon">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section v-if="work?.videos?.length" class="noctem-work__videos">
        <div class="noctem-work__videos-container">
          <div class="noctem-work__videos-grid">
            <div
              v-for="(video, index) in work.videos"
              :key="index"
              class="noctem-work__video"
              :style="{ animationDelay: `${0.6 + index * 0.1}s` }"
            >
              <div class="noctem-work__video-wrap">
                <iframe
                  :src="getYouTubeEmbedUrl(video.url)"
                  title="YouTube video"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <NoctemFooter />
  </div>
</template>

<script setup lang="ts">
import type lightGallery from 'lightgallery'

const route = useRoute()
const config = useRuntimeConfig()
const slug = computed(() => route.params.slug as string)

const isLoaded = ref(false)
const lightboxInstance = ref<ReturnType<typeof lightGallery> | null>(null)
const lazyVideos = ref<HTMLVideoElement[]>([])
let videoObserver: IntersectionObserver | null = null
const isVideoSrc = (src: string): boolean => /\.(mp4|webm|mov|m4v|ogv)$/i.test(src.split('?')[0])

const { data: works, pending, error, refresh } = await useFetch(() => `${config.public.apiEndpoint}/works`, {
  transform: (response: any) => response.data || []
})

watch(slug, () => {
  refresh()
})

const work = computed(() => {
  if (!works.value) return null
  return works.value.find((w: any) => w.slug === slug.value)
})

const galleryItems = computed(() => {
  const list = work.value?.images
  if (!list?.length) return []
  return list.map((src: string, index: number) => ({
    src,
    key: `${index}-${isVideoSrc(src) ? 'v' : 'i'}`,
    isVideo: isVideoSrc(src)
  }))
})

const dynamicItems = computed(() => {
  const list = work.value?.images
  if (!list?.length) return []
  return list.map((src: string) => {
    if (isVideoSrc(src)) {
      return {
        video: {
          source: [{ src, type: 'video/mp4' }],
          attributes: { controls: true, playsinline: true, preload: 'metadata' }
        },
        downloadUrl: src
      }
    }
    return {
      src,
      thumb: src,
      subHtml: `<h4>${work.value?.title || ''}</h4>`
    }
  })
})

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)

  setupVideoObserver()
})

const getItemClass = (index: number) => {
  const patterns = ['noctem-work__item--tall', 'noctem-work__item--wide', '', 'noctem-work__item--tall']
  return patterns[index % patterns.length]
}

const getYouTubeEmbedUrl = (url: string): string => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return `https://www.youtube.com/embed/${match[1]}`
  }
  return url
}

const setupVideoObserver = () => {
  if (!videoObserver && typeof IntersectionObserver !== 'undefined') {
    videoObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement
        if (entry.isIntersecting) {
          if (!video.src && video.dataset.src) {
            video.src = video.dataset.src
          }
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      }
    }, { rootMargin: '200px' })

    for (const video of lazyVideos.value) {
      videoObserver.observe(video)
    }
  }
}

const getLightbox = async () => {
  if (lightboxInstance.value) return lightboxInstance.value

  const [{ default: LightGallery }, { default: videoPlugin }] = await Promise.all([
    import('lightgallery'),
    import('lightgallery/plugins/video')
  ])

  const container = document.createElement('div')
  document.body.appendChild(container)

  const instance = LightGallery(container, {
    dynamic: true,
    plugins: [videoPlugin],
    dynamicEl: dynamicItems.value,
    download: false,
    autoplayFirstVideo: true,
    autoplayVideoOnSlide: true,
    actualSize: false
  })

  lightboxInstance.value = instance
  return instance
}

const openGallery = async (index: number) => {
  const gallery = await getLightbox()
  gallery.openGallery(index)
}

useHead({
  title: computed(() => work.value?.title ? `${work.value.title} | Noctem` : 'Noctem'),
  meta: [
    { name: 'description', content: () => work.value?.description || 'Trabajo de Noctem' }
  ]
})

onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && lightboxInstance.value) {
      lightboxInstance.value.closeGallery()
    }
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    lightboxInstance.value?.destroy(true)
    videoObserver?.disconnect()
  })
})

watch(lazyVideos, (newEls, oldEls) => {
  if (!videoObserver) return
  if (oldEls) {
    for (const el of oldEls) {
      videoObserver.unobserve(el)
    }
  }
  if (newEls) {
    for (const el of newEls) {
      videoObserver.observe(el)
    }
  }
})
</script>

<style scoped>
.noctem-work {
  background-color: var(--color-black-deep);
  min-height: 100vh;
}

.noctem-work__main {
  padding-top: 6rem;
}

.noctem-work__hero {
  padding: 4rem 0;
}

@media (min-width: 768px) {
  .noctem-work__hero {
    padding: 6rem 0 4rem;
  }
}

.noctem-work__hero-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  .noctem-work__hero-container {
    padding: 0 3rem;
  }
}

.noctem-work__back {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gray-warm);
  margin-bottom: 3rem;
  transition: color 0.5s var(--ease-out-expo);
}

.noctem-work__back:hover {
  color: var(--color-orange-bulb);
}

.noctem-work__back-icon {
  transition: transform 0.5s var(--ease-out-expo);
}

.noctem-work__back:hover .noctem-work__back-icon {
  transform: translateX(-4px);
}

.noctem-work__header {
  margin-bottom: 2rem;
}

.noctem-work__category {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-orange-bulb);
  margin-bottom: 1.5rem;
}

.noctem-work__title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--color-cream);
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .noctem-work__title {
    font-size: 3.5rem;
  }
}

@media (min-width: 1024px) {
  .noctem-work__title {
    font-size: 4.5rem;
  }
}

.noctem-work__description {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-gray-warm);
  line-height: 1.7;
  max-width: 48rem;
}

@media (min-width: 1024px) {
  .noctem-work__description {
    font-size: 1.125rem;
  }
}

.noctem-work__line {
  height: 1px;
  background-color: var(--color-orange-glow-strong);
  max-width: 80px;
  margin-top: 2rem;
}

.noctem-work__loading,
.noctem-work__error {
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.noctem-work__loading-text,
.noctem-work__error-text {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-gray-warm);
  letter-spacing: 0.1em;
}

.noctem-work__gallery {
  padding: 2rem 0 6rem;
}

.noctem-work__gallery-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  .noctem-work__gallery-container {
    padding: 0 3rem;
  }
}

.noctem-work__masonry {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  opacity: 0;
  transition: opacity 0.8s var(--ease-out-expo);
}

.noctem-work__masonry--loaded {
  opacity: 1;
}

@media (min-width: 640px) {
  .noctem-work__masonry {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .noctem-work__masonry {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

.noctem-work__item {
  position: relative;
  cursor: pointer;
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out-expo) forwards;
}

.noctem-work__item--wide {
  grid-column: span 1;
}

@media (min-width: 640px) {
  .noctem-work__item--tall {
    grid-row: span 2;
  }
}

@media (min-width: 1024px) {
  .noctem-work__item--wide {
    grid-column: span 2;
  }
}

.noctem-work__image-wrap {
  position: relative;
  overflow: hidden;
  background-color: var(--color-black-soft);
}

@media (min-width: 640px) {
  .noctem-work__item--tall .noctem-work__image-wrap {
    aspect-ratio: auto;
    height: 100%;
    min-height: 400px;
  }

  .noctem-work__item--wide .noctem-work__image-wrap {
    aspect-ratio: 16/9;
  }

  .noctem-work__item:not(.noctem-work__item--tall):not(.noctem-work__item--wide) .noctem-work__image-wrap {
    aspect-ratio: 1;
  }
}

.noctem-work__image,
.noctem-work__video-thumb {
  width: 100%;
  height: auto;
  display: block;
  filter: grayscale(20%) brightness(0.8);
  transition: transform 0.8s var(--ease-out-expo), filter 0.8s var(--ease-out-expo);
}

@media (min-width: 640px) {
  .noctem-work__image,
  .noctem-work__video-thumb {
    height: 100%;
    object-fit: cover;
  }
}

.noctem-work__item:hover .noctem-work__image,
.noctem-work__item:hover .noctem-work__video-thumb {
  transform: scale(1.05);
  filter: grayscale(0%) brightness(1);
}

.noctem-work__item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5, 5, 5, 0.5) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.noctem-work__item:hover .noctem-work__item-overlay {
  opacity: 1;
}

.noctem-work__item-play {
  font-size: 1.5rem;
  color: var(--color-cream);
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.5s var(--ease-out-expo);
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--color-orange-glow-strong);
  background-color: rgba(5, 5, 5, 0.3);
}

.noctem-work__item:hover .noctem-work__item-play {
  opacity: 0.9;
  transform: scale(1);
}

.noctem-work__item-icon {
  font-size: 2rem;
  color: var(--color-cream);
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.5s var(--ease-out-expo);
}

.noctem-work__item:hover .noctem-work__item-icon {
  opacity: 0.8;
  transform: scale(1);
}

.noctem-work__videos {
  padding: 0 0 6rem;
}

.noctem-work__videos-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  .noctem-work__videos-container {
    padding: 0 3rem;
  }
}

.noctem-work__videos-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .noctem-work__videos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .noctem-work__videos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

.noctem-work__video {
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out-expo) forwards;
}

.noctem-work__video-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: var(--color-black-soft);
  border-radius: 2px;
}

.noctem-work__video-wrap iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>