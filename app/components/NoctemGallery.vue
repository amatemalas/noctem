<template>
  <section id="portfolio" class="noctem-gallery">
    <div class="noctem-gallery__ambient" />
    
    <div class="noctem-gallery__container">
      <div class="noctem-gallery__header">
        <span class="noctem-gallery__label fade-up">Portfolio</span>
        <h2 class="noctem-gallery__title fade-up" style="animation-delay: 0.15s">
          Trabajos <span class="noctem-gallery__title-accent">Seleccionados</span>
        </h2>
        <div class="noctem-gallery__line line-draw" style="animation-delay: 0.3s" />
      </div>

      <div class="noctem-gallery__grid">
        <article
          v-for="(item, index) in galleryItems"
          :key="index"
          class="noctem-gallery__item"
          :class="item.class"
          :style="{ animationDelay: `${0.4 + index * 0.1}s` }"
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
const galleryItems = [
  {
    image: "/assets/images/4x/Recurso 2IDENTIDAD_NOCTEM.png",
    alt: "Retrato en sombras",
    name: "Sombras y Luz",
    category: "Retrato",
    kanji: "影",
    class: "",
  },
  {
    image: "/assets/images/4x/Recurso 3IDENTIDAD_NOCTEM.png",
    alt: "Paisaje de Mallorca",
    name: "Silencio en la Serra",
    category: "Paisaje",
    kanji: "山",
    class: "noctem-gallery__item--tall",
  },
  {
    image: "/assets/images/4x/Recurso 4IDENTIDAD_NOCTEM.png",
    alt: "Detalle arquitectónico",
    name: "Piedra y Mar",
    category: "Arquitectura",
    kanji: "石",
    class: "",
  },
  {
    image: "/assets/images/4x/Recurso 5IDENTIDAD_NOCTEM.png",
    alt: "Ambiente mediterráneo",
    name: "Atardecer Mediterráneo",
    category: "Editorial",
    kanji: "暮",
    class: "noctem-gallery__item--wide",
  },
  {
    image: "/assets/images/4x/Recurso 6IDENTIDAD_NOCTEM.png",
    alt: "Momento íntimo",
    name: "Intimidad Silenciosa",
    category: "Bodas",
    kanji: "静",
    class: "",
  },
  {
    image: "/assets/images/4x/Recurso 7IDENTIDAD_NOCTEM.png",
    alt: "Forma abstracta",
    name: "Forma y Vacío",
    category: "Arte",
    kanji: "無",
    class: "",
  },
]
</script>

<style scoped>
.noctem-gallery {
  position: relative;
  padding: 8rem 0;
  background-color: var(--color-black-rich);
  overflow: hidden;
}

.noctem-gallery__ambient {
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

@media (min-width: 1024px) {
  .noctem-gallery {
    padding: 11rem 0;
  }
}

.noctem-gallery__container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  .noctem-gallery__container {
    padding: 0 3rem;
  }
}

.noctem-gallery__header {
  margin-bottom: 5rem;
}

.noctem-gallery__label {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-orange-bulb);
  margin-bottom: 1.5rem;
}

.noctem-gallery__title {
  font-family: var(--font-display);
  font-size: 3rem;
  color: var(--color-cream);
  line-height: 1.05;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .noctem-gallery__title {
    font-size: 3.75rem;
  }
}

@media (min-width: 1280px) {
  .noctem-gallery__title {
    font-size: 4.5rem;
  }
}

.noctem-gallery__title-accent {
  font-style: italic;
  color: var(--color-orange-bulb);
  text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
}

.noctem-gallery__line {
  height: 1px;
  background-color: var(--color-orange-glow-strong);
  max-width: 80px;
}

.noctem-gallery__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .noctem-gallery__grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .noctem-gallery__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

.noctem-gallery__item {
  position: relative;
  opacity: 0;
  animation: fadeUp 1s var(--ease-out-expo) forwards;
}

.noctem-gallery__item::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid var(--color-orange-glow-soft);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 10;
}

.noctem-gallery__item:hover::before {
  opacity: 1;
}

.noctem-gallery__item--tall {
  grid-row: span 2;
}

@media (min-width: 768px) {
  .noctem-gallery__item--wide {
    grid-column: span 2;
  }
}

.noctem-gallery__image-wrap {
  position: relative;
  overflow: hidden;
  background-color: var(--color-black-soft);
}

.noctem-gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(30%) brightness(0.9);
  transition: transform 0.8s var(--ease-out-expo), filter 0.8s var(--ease-out-expo);
  animation: scaleIn 1.2s var(--ease-out-expo) forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.noctem-gallery__item:hover .noctem-gallery__image {
  transform: scale(1.05);
  filter: grayscale(0%) brightness(1);
}

.noctem-gallery__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(5, 5, 5, 0.4);
  opacity: 0;
  transition: opacity 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.noctem-gallery__item:hover .noctem-gallery__overlay {
  opacity: 1;
}

.noctem-gallery__overlay-kanji {
  font-family: var(--font-jp);
  font-size: 4.5rem;
  color: var(--color-orange-glow-medium);
}

@media (min-width: 1024px) {
  .noctem-gallery__overlay-kanji {
    font-size: 6rem;
  }
}

.noctem-gallery__item:hover .noctem-gallery__overlay-kanji {
  transform: translateY(0);
}

.noctem-gallery__info {
  padding: 1.25rem 0;
}

.noctem-gallery__name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-cream);
  margin-bottom: 0.25rem;
  transition: color 0.5s ease;
}

.noctem-gallery__item:hover .noctem-gallery__name {
  color: var(--color-orange-bulb);
}

.noctem-gallery__category {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gray-warm);
}
</style>
