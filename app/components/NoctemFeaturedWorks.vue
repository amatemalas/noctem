<template>
  <section id="portfolio" class="noctem-gallery">
    <div class="noctem-gallery__ambient" />
    
    <div class="noctem-gallery__container">
      <div class="noctem-gallery__header" data-aos="fade-up">
        <span class="noctem-gallery__label">Portfolio</span>
        <h2 class="noctem-gallery__title">
          <p>Trabajos <strong>Seleccionados</strong></p>
        </h2>
        <div class="noctem-gallery__line" />
      </div>
    </div>

    <div v-if="pending" class="noctem-gallery__loading">
      <span class="noctem-gallery__loading-text">Cargando...</span>
    </div>

    <div v-else-if="error || !galleryItems.length" class="noctem-gallery__error">
      <span class="noctem-gallery__error-text">No se pudieron cargar los trabajos</span>
    </div>

    <div v-else class="noctem-gallery__carousel">
      <div
        ref="trackRef"
        class="noctem-gallery__track"
        :style="{ '--marquee-move': `${marqueeMove}px` }"
      >
        <div
          v-for="(set, s) in carouselSets"
          :key="s"
          class="noctem-gallery__set"
          aria-hidden="s > 0"
        >
          <article
            v-for="item in set"
            :key="item.slug"
            class="noctem-gallery__card"
            @click="$router.push(`/trabajos/${item.slug}`)"
          >
<div class="noctem-gallery__media">
                <span v-if="item.mediaType" class="noctem-gallery__media-badge">{{ item.mediaType }}</span>
                <img
                  v-if="!item.isVideoMain && item.mainVisual"
                  :src="item.mainVisual"
                  :alt="item.name"
                  class="noctem-gallery__img"
                  loading="lazy"
                />
                <video
                  v-if="item.isVideoMain"
                  ref="lazyVideos"
                  :data-src="item.mainVisual"
                  class="noctem-gallery__video noctem-gallery__video--main"
                  muted
                  loop
                  playsinline
                  autoplay
                  preload="none"
                  tabindex="-1"
                />
                <video
                  v-else-if="item.videoThumb"
                  ref="lazyVideos"
                  :data-src="item.videoThumb"
                  class="noctem-gallery__video"
                  muted
                  loop
                  playsinline
                  autoplay
                  preload="none"
                  tabindex="-1"
                />
              <div class="noctem-gallery__overlay">
                <div class="noctem-gallery__info">
                  <h3 class="noctem-gallery__name">{{ item.name }}</h3>
                  <span class="noctem-gallery__category">{{ item.category }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div v-if="galleryItems.length" class="noctem-gallery__cta-wrap">
      <button type="button" class="noctem-gallery__cta" @click="$router.push('/trabajos')">
        <span class="noctem-gallery__cta-bg" />
        <span class="noctem-gallery__cta-text">Ver todos los trabajos</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const { data: works, pending, error } = await useFetch(`${config.public.apiEndpoint}/works`, {
  transform: (response: any) => {
    const isVideo = (src: string): boolean => /\.(mp4|webm|mov|m4v)$/i.test((src || '').split('?')[0])
    const arr = response.data || []
    return arr.slice(0, 9).map((work: any) => {
      const images = Array.isArray(work.images) ? work.images : []
      const mainVisual = work.image || images[0] || ''
      const hasPhoto = images.some((src: string) => !isVideo(src))
      const hasVideo = images.some(isVideo) || (Array.isArray(work.videos) && work.videos.length > 0)
      let mediaType = ''
      if (hasPhoto && hasVideo) mediaType = 'Foto / Vídeo'
      else if (hasPhoto) mediaType = 'Foto'
      else if (hasVideo) mediaType = 'Vídeo'
      return {
        id: work.id,
        mainVisual,
        isVideoMain: !!mainVisual && isVideo(mainVisual),
        videoThumb: images.find(isVideo) || '',
        alt: work.title,
        name: work.title,
        slug: work.slug,
        category: work.tags?.[0] || work.slug,
        mediaType
      }
    })
  }
})

interface Work {
  id: number
  mainVisual: string
  isVideoMain: boolean
  videoThumb: string
  name: string
  slug: string
  category: string
  mediaType: string
}

const galleryItems = computed<Work[]>(() => works.value || [])
const carouselSets = computed(() => [galleryItems.value, galleryItems.value, galleryItems.value])
const lazyVideos = ref<HTMLVideoElement[]>([])

const trackRef = ref<HTMLElement | null>(null)
const marqueeMove = ref(0)

const measureMarquee = () => {
  const track = trackRef.value
  const set = track?.querySelector<HTMLElement>('.noctem-gallery__set')
  marqueeMove.value = set ? Math.round(set.getBoundingClientRect().width) : 0
}

let videoObserver: IntersectionObserver | null = null

onMounted(() => {
  measureMarquee()
  window.addEventListener('resize', measureMarquee)

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
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measureMarquee)
  videoObserver?.disconnect()
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

<style lang="scss" scoped>
.noctem-gallery {
  position: relative;
  padding: 8rem 0;
  background-color: var(--color-black-rich);
  overflow: hidden;

  @media (min-width: 1024px) {
    padding: 11rem 0;
  }

  &__ambient {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--color-orange-glow-xlight) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: breathe 8s ease-in-out infinite;
    pointer-events: none;
  }

  &__container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (min-width: 1024px) {
      padding: 0 3rem;
    }
  }

  &__header {
    margin-bottom: 5rem;
    position: relative;
  }

  &__label {
    display: inline-block;
    font-family: var(--font-body);
    font-size: 0.75rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--color-orange-bulb);
    margin-bottom: 1.5rem;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 3rem;
    color: var(--color-cream);
    line-height: 1.05;
    margin-bottom: 2rem;

    @media (min-width: 1024px) {
      font-size: 3.75rem;
    }

    @media (min-width: 1280px) {
      font-size: 4.5rem;
    }

    strong {
      font-style: italic;
      color: var(--color-orange-bulb);
      text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
    }
  }

  &__line {
    height: 1px;
    background-color: var(--color-orange-glow-strong);
    max-width: 80px;
  }

  &__cta-wrap {
    display: flex;
    justify-content: center;
    margin-top: 4rem;

    @media (min-width: 1024px) {
      margin-top: 5rem;
    }
  }

  &__cta {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2.5rem;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid var(--color-orange-glow-strong);
    background: transparent;
    transition: border-color 0.5s ease;

    &-bg {
      position: absolute;
      inset: 0;
      background-color: var(--color-orange-bulb);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.7s var(--ease-out-expo);
    }

    &-text {
      position: relative;
      z-index: 10;
      font-family: var(--font-body);
      font-size: 0.875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-orange-bulb);
      transition: color 0.5s ease;
    }

    &:hover {
      .noctem-gallery__cta-bg {
        transform: scaleX(1);
      }

      .noctem-gallery__cta-text {
        color: var(--color-black-deep);
      }
    }
  }

  &__carousel {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    overflow: hidden;
    padding: 0 clamp(1.5rem, 4vw, 3rem);

    -webkit-mask-image: linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%);

    &:hover .noctem-gallery__track {
      animation-play-state: paused;
    }
  }

  &__track {
    display: flex;
    width: max-content;
    will-change: transform;
    animation: noctem-scroll 40s linear infinite;
  }

  &__set {
    display: flex;
    gap: 1.5rem;
    padding-right: 1.5rem;
  }

  &__card {
    position: relative;
    width: clamp(260px, 42vw, 400px);
    flex-shrink: 0;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      border: 1px solid var(--color-orange-glow-soft);
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 10;
      pointer-events: none;
    }

    &:hover {
      &::before {
        opacity: 1;
      }

      .noctem-gallery__img {
        transform: scale(1.06);
        filter: grayscale(0%) brightness(1);
      }

      .noctem-gallery__overlay {
        opacity: 1;
      }

      .noctem-gallery__name {
        color: var(--color-orange-bulb);
      }
    }
  }

  &__media {
    position: relative;
    aspect-ratio: 3 / 5;
    overflow: hidden;
    background-color: var(--color-black-soft);
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(30%) brightness(0.85);
    transition: transform 0.8s var(--ease-out-expo), filter 0.8s var(--ease-out-expo);
  }

  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(5, 5, 5, 0.85) 0%,
      rgba(5, 5, 5, 0.15) 55%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    display: flex;
    align-items: flex-end;
  }

  &__info {
    padding: 1.5rem;
    width: 100%;
  }

  &__name {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--color-cream);
    margin-bottom: 0.25rem;
    transition: color 0.5s ease;
  }

  &__category {
    font-family: var(--font-body);
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-cream-dim);
  }

  &__media-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 5;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-family: var(--font-body);
    font-size: 0.625rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-orange-bulb);
    border: 1px solid var(--color-orange-glow-soft);
    background-color: rgba(5, 5, 5, 0.55);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    padding: 0.25rem 0.5rem;

    &::before {
      content: "";
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background-color: var(--color-orange-bulb);
      box-shadow: 0 0 8px var(--color-orange-glow-strong);
    }
  }

  &__loading,
  &__error {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }

  &__loading-text,
  &__error-text {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-gray-warm);
    letter-spacing: 0.1em;
  }
}

@keyframes noctem-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(var(--marquee-move, 0px) * -1));
  }
}
</style>
