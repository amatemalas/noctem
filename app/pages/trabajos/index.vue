<template>
  <div class="noctem-works">
    <div class="grain-overlay" />
    <NoctemNav :threshold="0" />

    <main class="noctem-works__main">
      <div class="noctem-works__hero">
        <div class="noctem-works__hero-container">
          <NuxtLink to="/" class="noctem-works__back">
            <span class="noctem-works__back-icon">←</span>
            <span class="noctem-works__back-text">Volver</span>
          </NuxtLink>

          <h1 class="noctem-works__title fade-up" style="animation-delay: 0.15s">
            Todos los <em>Trabajos</em>
          </h1>
          <div class="noctem-works__line line-draw" style="animation-delay: 0.3s" />
        </div>
      </div>

      <div v-if="pending" class="noctem-works__loading">
        <span class="noctem-works__loading-text fade-up">Cargando...</span>
      </div>

      <div v-else-if="error" class="noctem-works__error">
        <span class="noctem-works__error-text">No se pudieron cargar los trabajos</span>
      </div>

      <template v-else>
        <div class="noctem-works__filters">
          <div class="noctem-works__filters-container">
            <button
              class="noctem-works__filter"
              :class="{ 'noctem-works__filter--active': activeTag === '' }"
              @click="activeTag = ''"
            >
              Todos
              <span class="noctem-works__filter-count">{{ total }}</span>
            </button>
            <button
              v-for="tag in allTags"
              :key="tag.tag"
              class="noctem-works__filter"
              :class="{ 'noctem-works__filter--active': activeTag === tag.tag }"
              @click="activeTag = tag.tag"
            >
              {{ tag.tag }}
              <span class="noctem-works__filter-count">{{ tag.count }}</span>
            </button>
          </div>
        </div>

        <div class="noctem-works__grid-container">
          <TransitionGroup
            name="works-card"
            tag="div"
            class="noctem-works__grid"
          >
            <article
              v-for="(work, index) in displayedWorks"
              :key="work.slug"
              class="noctem-works__card"
              :style="{ transitionDelay: `${index * 0.03}s` }"
              @click="goToWork(work.slug)"
            >
              <div class="noctem-works__media">
                <span v-if="work.mediaType" class="noctem-works__media-badge">{{ work.mediaType }}</span>
                <img
                  v-if="!work.isVideoMain && work.mainVisual"
                  :src="work.mainVisual"
                  :alt="work.title"
                  class="noctem-works__img"
                  loading="lazy"
                />
                <video
                  v-if="work.isVideoMain"
                  :src="work.mainVisual"
                  class="noctem-works__video noctem-works__video--main"
                  muted
                  loop
                  playsinline
                  autoplay
                  preload="metadata"
                  tabindex="-1"
                />
                <video
                  v-else-if="work.videoThumb"
                  :src="work.videoThumb"
                  class="noctem-works__video"
                  muted
                  loop
                  playsinline
                  autoplay
                  preload="metadata"
                  tabindex="-1"
                />
              </div>
              <div class="noctem-works__info">
                <h3 class="noctem-works__name">{{ work.title }}</h3>
                <span class="noctem-works__category">{{ work.category }}</span>
              </div>
            </article>
          </TransitionGroup>

          <div class="noctem-works__load-area">
            <Transition name="works-loader">
              <button
                v-if="hasMore"
                class="noctem-works__load-more"
                :disabled="isLoadingMore"
                @click="loadMore"
              >
                <span v-if="isLoadingMore" class="noctem-works__loader">
                  <span class="noctem-works__loader-dot" />
                  <span class="noctem-works__loader-dot" />
                  <span class="noctem-works__loader-dot" />
                </span>
                <span v-else class="noctem-works__load-more-text">Cargar más</span>
              </button>
            </Transition>

            <div v-if="!hasMore && (currentPage > 1 || total > PER_PAGE)" class="noctem-works__end">
              <div class="noctem-works__end-line" />
              <span class="noctem-works__end-text">Todos los trabajos</span>
              <div class="noctem-works__end-line" />
            </div>
          </div>
        </div>
      </template>
    </main>

    <HandwrittenText />
    <NoctemFooter />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const PER_PAGE = 9

const activeTag = ref('')
const works = ref<Work[]>([])
const total = ref(0)
const lastPage = ref(1)
const currentPage = ref(0)
const isLoadingMore = ref(false)

interface Work {
  id: number
  title: string
  slug: string
  mainVisual: string
  isVideoMain: boolean
  videoThumb: string
  tags: string[]
  category: string
  mediaType: string
}

const normalizeWork = (work: any): Work => {
  const isVideo = (src: string): boolean => /\.(mp4|webm|mov|m4v)$/i.test((src || '').split('?')[0])
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
    title: work.title,
    slug: work.slug,
    mainVisual,
    isVideoMain: !!mainVisual && isVideo(mainVisual),
    videoThumb: images.find(isVideo) || '',
    tags: work.tags || [],
    category: work.tags?.[0] || work.slug,
    mediaType
  }
}

const { data: initialPage, pending, error } = await useFetch(`${config.public.apiEndpoint}/works`, {
  query: {
    per_page: PER_PAGE,
    page: 1
  },
  transform: (response: any) => ({
    data: (response.data || []).map(normalizeWork),
    total: response.total || 0,
    lastPage: response.last_page || 1
  })
})

const displayedWorks = computed(() => works.value)

const hasMore = computed(() => currentPage.value < lastPage.value)

const allWorks = computed(() => works.value)

const allTags = computed(() => {
  const counts = new Map<string, number>()
  for (const work of works.value) {
    for (const tag of work.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag))
})

const filteredWorks = computed(() => works.value)

const fetchPage = async (page: number, tag: string): Promise<{ data: Work[]; total: number; lastPage: number } | null> => {
  try {
    const response = await $fetch(`${config.public.apiEndpoint}/works`, {
      query: {
        per_page: PER_PAGE,
        page,
        ...(tag ? { tag } : {})
      }
    })
    return {
      data: ((response as any).data || []).map(normalizeWork),
      total: (response as any).total || 0,
      lastPage: (response as any).last_page || 1
    }
  } catch {
    return null
  }
}

const applyFirstPage = (page: { data: Work[]; total: number; lastPage: number } | null | undefined) => {
  works.value = page?.data || []
  total.value = page?.total || 0
  lastPage.value = page?.lastPage || 1
  currentPage.value = page ? 1 : 0
}

applyFirstPage(initialPage.value)

let requestSeq = 0

const loadFirstPage = async () => {
  const seq = ++requestSeq
  isLoadingMore.value = true
  const page = await fetchPage(1, activeTag.value)
  if (seq === requestSeq) {
    applyFirstPage(page)
    isLoadingMore.value = false
  }
}

watch(activeTag, loadFirstPage)

let loadingInProgress = false

const loadMore = async () => {
  if (loadingInProgress) return
  if (!hasMore.value) return
  loadingInProgress = true
  isLoadingMore.value = true
  const page = await fetchPage(currentPage.value + 1, activeTag.value)
  if (page) {
    works.value = [...works.value, ...page.data]
    total.value = page.total
    lastPage.value = page.lastPage
    currentPage.value += 1
  }
  isLoadingMore.value = false
  loadingInProgress = false
}

const goToWork = (slug: string) => {
  navigateTo(`/trabajos/${slug}`)
}

useHead({
  title: 'Trabajos | Noctem',
  meta: [
    { name: 'description', content: 'Portfolio de trabajos de Noctem Studio — fotografía, vídeo y contenido audiovisual en Mallorca.' }
  ]
})
</script>

<style lang="scss" scoped>
.noctem-works {
  background-color: var(--color-black-deep);
  min-height: 100vh;
}

.noctem-works__main {
  padding-top: 6rem;
}

.noctem-works__hero {
  padding: 4rem 0 3rem;
}

@media (min-width: 768px) {
  .noctem-works__hero {
    padding: 6rem 0 3rem;
  }
}

.noctem-works__hero-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  .noctem-works__hero-container {
    padding: 0 3rem;
  }
}

.noctem-works__back {
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

.noctem-works__back:hover {
  color: var(--color-orange-bulb);
}

.noctem-works__back-icon {
  transition: transform 0.5s var(--ease-out-expo);
}

.noctem-works__back:hover .noctem-works__back-icon {
  transform: translateX(-4px);
}

.noctem-works__label {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-orange-bulb);
  margin-bottom: 1.5rem;
}

.noctem-works__title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--color-cream);
  line-height: 1.1;
  margin-bottom: 2rem;

  em {
    font-style: italic;
    color: var(--color-orange-bulb);
    text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
  }
}

@media (min-width: 768px) {
  .noctem-works__title {
    font-size: 3.5rem;
  }
}

@media (min-width: 1024px) {
  .noctem-works__title {
    font-size: 4.5rem;
  }
}

.noctem-works__line {
  height: 1px;
  background-color: var(--color-orange-glow-strong);
  max-width: 80px;
}

.noctem-works__filters {
  padding: 1rem 0 2.5rem;
  position: sticky;
  top: 5.5rem;
  z-index: 20;
  background-color: rgba(5, 5, 5, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.noctem-works__filters-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (min-width: 1024px) {
  .noctem-works__filters-container {
    padding: 0 3rem;
  }
}

.noctem-works__filter {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  gap: 0.375rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gray-warm);
  background: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  padding: 0.375rem 0.125rem 0.625rem;
  cursor: pointer;
  transition: color 0.5s ease, border-color 0.5s ease;

  &-count {
    font-size: 0.625rem;
    letter-spacing: 0.05em;
    line-height: 1;
    color: var(--color-gray-warm);
    opacity: 0.55;
    transition: color 0.5s ease, opacity 0.5s ease;
  }

  &:hover {
    color: var(--color-orange-bulb);
    border-bottom-color: var(--color-orange-glow-soft);

    .noctem-works__filter-count {
      color: var(--color-orange-bulb);
      opacity: 0.8;
    }
  }

  &--active {
    color: var(--color-orange-bulb);
    border-bottom-color: var(--color-orange-bulb);

    .noctem-works__filter-count {
      color: var(--color-orange-bulb);
      opacity: 1;
    }
  }
}

.noctem-works__grid-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem 6rem;
}

@media (min-width: 1024px) {
  .noctem-works__grid-container {
    padding: 0 3rem 8rem;
  }
}

.noctem-works__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .noctem-works__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .noctem-works__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

.noctem-works__card {
  cursor: pointer;
  position: relative;
  transition: opacity 0.4s var(--ease-out-expo), transform 0.4s var(--ease-out-expo);

  &:hover {
    .noctem-works__img {
      transform: scale(1.06);
      filter: grayscale(0%) brightness(1);
    }

    .noctem-works__arrow {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    .noctem-works__name {
      color: var(--color-orange-bulb);
    }
  }
}

.noctem-works__media {
  position: relative;
  aspect-ratio: 3 / 5;
  overflow: hidden;
  background-color: var(--color-black-soft);
}

.noctem-works__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(25%) brightness(0.85);
  transition: transform 0.8s var(--ease-out-expo), filter 0.8s var(--ease-out-expo);
}

.noctem-works__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.noctem-works__arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid var(--color-orange-glow-strong);
  background-color: rgba(5, 5, 5, 0.4);
  color: var(--color-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  opacity: 0;
  transition: all 0.5s var(--ease-out-expo);
  pointer-events: none;
}

.noctem-works__info {
  padding: 1.25rem 0.5rem 0;
}

.noctem-works__name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-cream);
  margin-bottom: 0.25rem;
  transition: color 0.5s ease;
}

.noctem-works__category {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gray-warm);
}

.noctem-works__media-badge {
  position: absolute;
  top: 0.875rem;
  right: 0.875rem;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-orange-bulb);
  border: 1px solid var(--color-orange-glow-soft);
  background-color: rgba(5, 5, 5, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  padding: 0.4rem 0.75rem;

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: var(--color-orange-bulb);
    box-shadow: 0 0 8px var(--color-orange-glow-strong);
  }
}

.noctem-works__loading,
.noctem-works__error {
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.noctem-works__loading-text,
.noctem-works__error-text {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-gray-warm);
  letter-spacing: 0.1em;
}

.works-card-enter-active,
.works-card-leave-active,
.works-card-move {
  transition: all 0.4s var(--ease-out-expo);
}

.works-card-enter-from,
.works-card-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.noctem-works__load-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 0 1rem;
}

.noctem-works__load-more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0 2rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-cream);
  background-color: transparent;
  border: 1px solid var(--color-orange-glow-soft);
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.5s ease, border-color 0.5s ease, background-color 0.5s ease;

  &:hover:not(:disabled) {
    color: var(--color-orange-bulb);
    border-color: var(--color-orange-bulb);
    background-color: var(--color-orange-glow-xlight);
  }

  &:disabled {
    cursor: default;
    opacity: 0.85;
  }
}

.noctem-works__load-more-text {
  white-space: nowrap;
}

.noctem-works__loader {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.noctem-works__loader-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background-color: var(--color-orange-bulb);
  box-shadow: 0 0 8px var(--color-orange-glow-strong);
  animation: loaderDot 1.2s var(--ease-in-out-quart) infinite;

  &:nth-child(2) {
    animation-delay: 0.15s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }
}

@keyframes loaderDot {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.35;
  }
  30% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

.noctem-works__end {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 0.5rem 0 1rem;
}

.noctem-works__end-line {
  width: 2.5rem;
  height: 1px;
  background-color: var(--color-orange-glow-soft);
}

.noctem-works__end-text {
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gray-warm);
  opacity: 0.7;
  white-space: nowrap;
}

.works-loader-enter-active,
.works-loader-leave-active {
  transition: opacity 0.4s var(--ease-out-expo), transform 0.4s var(--ease-out-expo);
}

.works-loader-enter-from,
.works-loader-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
