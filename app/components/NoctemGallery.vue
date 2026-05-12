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

      <div v-if="pending" class="noctem-gallery__loading">
        <span class="noctem-gallery__loading-text">Cargando...</span>
      </div>

      <div v-else-if="error" class="noctem-gallery__error">
        <span class="noctem-gallery__error-text">No se pudieron cargar los trabajos</span>
      </div>

      <div v-else class="noctem-gallery__grid">
        <article
          v-for="(item, index) in galleryItems"
          :key="item.id || index"
          class="noctem-gallery__item"
          :class="item.class"
          data-aos="fade-up"
          :data-aos-delay="(index % 3) * 100"
          @click="$router.push(`/trabajos/${item.slug}`)"
        >
          <div class="noctem-gallery__image-wrap">
            <img
              :src="item.image"
              :alt="item.alt"
              class="noctem-gallery__image"
            />
            <div class="noctem-gallery__overlay">
              <span class="noctem-gallery__overlay-kanji font-jp">{{ item.kanji }}</span>
            </div>
          </div>
          <div class="noctem-gallery__info">
            <h3 class="noctem-gallery__name">{{ item.name }}</h3>
            <span class="noctem-gallery__category">{{ item.category }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const { data: works, pending, error } = await useFetch(`${config.public.apiEndpoint}/works`, {
  transform: (response: any) => {
    const arr = response.data || []
    return arr.map((work: any) => ({
      id: work.id,
      image: work.image,
      images: work.images,
      alt: work.title,
      name: work.title,
      slug: work.slug,
      category: work.tags?.[0] || work.slug,
      kanji: '',
      class: ''
    }))
  }
})

interface Work {
  id: number
  image: string
  alt: string
  name: string
  category: string
  kanji?: string
  class?: string
}

const galleryItems = computed<Work[]>(() => {
  if (!works.value) return []
  return works.value as Work[]
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

    &-accent {
      font-style: italic;
      color: var(--color-orange-bulb);
      text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
    }

    strong {
      font-style: italic;
      color: var(--color-orange-bulb);
      text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
    }

    b {
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

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;

    & > .noctem-gallery__image-wrap {
      flex-shrink: 0;
    }

    & > .noctem-gallery__info {
      flex: 1;
    }

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      border: 1px solid var(--color-orange-glow-soft);
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 10;
    }

    &:hover {
      &::before {
        opacity: 1;
      }

      .noctem-gallery__image {
        transform: scale(1.05);
        filter: grayscale(0%) brightness(1);
      }

      .noctem-gallery__overlay {
        opacity: 1;
      }

      .noctem-gallery__name {
        color: var(--color-orange-bulb);
      }
    }

    &--tall {
      grid-row: span 2;

      .noctem-gallery__image-wrap {
        aspect-ratio: 3 / 4;
      }
    }

    &--wide {
      @media (min-width: 768px) {
        grid-column: span 2;

        .noctem-gallery__image-wrap {
          aspect-ratio: 16 / 9;
        }
      }
    }
  }

  &__image-wrap {
    position: relative;
    overflow: hidden;
    background-color: var(--color-black-soft);
    aspect-ratio: 4 / 3;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(30%) brightness(0.9);
    transition: transform 0.8s var(--ease-out-expo), filter 0.8s var(--ease-out-expo);
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(5, 5, 5, 0.4);
    opacity: 0;
    transition: opacity 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &-kanji {
      font-family: var(--font-jp);
      font-size: 4.5rem;
      color: var(--color-orange-glow-medium);

      @media (min-width: 1024px) {
        font-size: 6rem;
      }
    }
  }

  &__info {
    padding: 1.5rem 1.25rem;
  }

  &__name {
    font-family: var(--font-display);
    font-size: 1.25rem;
    color: var(--color-cream);
    margin-bottom: 0.25rem;
    transition: color 0.5s ease;
  }

  &__category {
    font-family: var(--font-body);
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-gray-warm);
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
</style>