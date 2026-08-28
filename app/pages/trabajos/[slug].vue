<template>
  <div class="noctem-work">
    <div class="grain-overlay" />
    <NoctemNav :threshold="0" />
    
    <main class="noctem-work__main">
      <div class="noctem-work__hero">
        <div class="noctem-work__hero-container">
          <NuxtLink to="/" class="noctem-work__back">
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
      
      <section v-if="work?.images?.length" class="noctem-work__gallery">
        <div class="noctem-work__gallery-container">
          <div 
            class="noctem-work__masonry"
            :class="{ 'noctem-work__masonry--loaded': isLoaded }"
          >
            <div
              v-for="(image, index) in work.images"
              :key="index"
              class="noctem-work__item"
              :class="getItemClass(index)"
              :style="{ animationDelay: `${0.6 + index * 0.08}s` }"
              @click="openLightbox(index)"
            >
              <div class="noctem-work__image-wrap">
                <img
                  :src="image"
                  :alt="`${work.title} - Imagen ${index + 1}`"
                  class="noctem-work__image"
                  loading="lazy"
                />
                <div class="noctem-work__item-overlay">
                  <span class="noctem-work__item-icon">+</span>
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

      <section v-if="work?.images?.length > 1" class="noctem-work__lightbox">
        <div 
          class="noctem-work__lightbox-backdrop"
          :class="{ 'noctem-work__lightbox-backdrop--active': lightboxOpen }"
          @click="closeLightbox"
        />
        <div class="noctem-work__lightbox-content">
          <button 
            v-if="lightboxOpen"
            class="noctem-work__lightbox-close"
            @click="closeLightbox"
          >
            ×
          </button>
          <button 
            v-if="lightboxOpen"
            class="noctem-work__lightbox-nav noctem-work__lightbox-nav--prev"
            @click="prevImage"
          >
            ←
          </button>
          <div class="noctem-work__lightbox-image-wrap">
            <Transition name="lightbox">
              <img
                v-if="lightboxOpen"
                :src="work.images[lightboxIndex]"
                :alt="`${work.title} - Imagen ${lightboxIndex + 1}`"
                class="noctem-work__lightbox-image"
                :key="lightboxIndex"
              />
            </Transition>
          </div>
          <button 
            v-if="lightboxOpen"
            class="noctem-work__lightbox-nav noctem-work__lightbox-nav--next"
            @click="nextImage"
          >
            →
          </button>
          <div v-if="lightboxOpen" class="noctem-work__lightbox-counter">
            {{ lightboxIndex + 1 }} / {{ work.images.length }}
          </div>
        </div>
      </section>
    </main>
    
    <NoctemFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const slug = computed(() => route.params.slug as string)

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const isLoaded = ref(false)

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

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
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

const openLightbox = (index: number) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const prevImage = () => {
  if (!work.value) return
  lightboxIndex.value = lightboxIndex.value === 0 
    ? work.value.images.length - 1 
    : lightboxIndex.value - 1
}

const nextImage = () => {
  if (!work.value) return
  lightboxIndex.value = lightboxIndex.value === work.value.images.length - 1 
    ? 0 
    : lightboxIndex.value + 1
}

useHead({
  title: computed(() => work.value?.title ? `${work.value.title} | Noctem` : 'Noctem'),
  meta: [
    { name: 'description', content: () => work.value?.description || 'Trabajo de Noctem' }
  ]
})

onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!lightboxOpen.value) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'ArrowRight') nextImage()
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
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

.noctem-work__image {
  width: 100%;
  height: auto;
  display: block;
  filter: grayscale(20%) brightness(0.95);
  transition: transform 0.8s var(--ease-out-expo), filter 0.8s var(--ease-out-expo);
}

@media (min-width: 640px) {
  .noctem-work__image {
    height: 100%;
    object-fit: cover;
  }
}

.noctem-work__item:hover .noctem-work__image {
  transform: scale(1.05);
  filter: grayscale(0%) brightness(1.05);
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

.noctem-work__lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
}

.noctem-work__lightbox-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(5, 5, 5, 0.95);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s var(--ease-out-expo);
}

.noctem-work__lightbox-backdrop--active {
  opacity: 1;
  pointer-events: auto;
}

.noctem-work__lightbox-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
}

.noctem-work__lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 2rem;
  color: var(--color-cream);
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.noctem-work__lightbox-close:hover {
  opacity: 1;
  color: var(--color-orange-bulb);
}

.noctem-work__lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--color-cream);
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s ease;
  padding: 1rem;
}

.noctem-work__lightbox-nav:hover {
  opacity: 1;
  color: var(--color-orange-bulb);
}

.noctem-work__lightbox-nav--prev {
  left: 1rem;
}

.noctem-work__lightbox-nav--next {
  right: 1rem;
}

.noctem-work__lightbox-image-wrap {
  position: relative;
  max-width: 80vw;
  max-height: 80vh;
  overflow: hidden;
}

.noctem-work__lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.noctem-work__lightbox-counter {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-body);
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  color: var(--color-cream);
  opacity: 0.6;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: all 0.4s var(--ease-out-expo);
}

.lightbox-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.lightbox-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>