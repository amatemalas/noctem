<template>
  <section id="clientes" class="noctem-clients">
    <div class="noctem-clients__ambient" />

    <div class="noctem-clients__container">
      <div class="noctem-clients__header" data-aos="fade-up">
        <span class="noctem-clients__label">{{ content?.clients_title || 'Clientes' }}</span>
        <h2 class="noctem-clients__title" v-html="content?.clients_heading || 'Marcas que <strong>confían</strong> en nosotros'" />
        <div class="noctem-clients__line" />
      </div>

      <div class="noctem-clients__marquee" data-aos="fade-up" data-aos-delay="300">
        <div class="noctem-clients__mask">
          <div class="noctem-clients__track">
            <div v-for="group in 2" :key="group" class="noctem-clients__group">
              <div
                v-for="logo in groupItems"
                :key="logo._key"
                class="noctem-clients__item"
              >
                <img :src="logo.src" :alt="logo.alt" class="noctem-clients__logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  content?: {
    clients_title?: string
    clients_heading?: string
    clients_logos?: Array<{ url?: string; alt?: string; file_name?: string }>
  }
  logos?: Array<{ src: string; alt?: string }>
}>()

const fallbackLogos = [
  {
    src: '/assets/images/4x/Recurso 1IDENTIDAD_NOCTEM.png',
    alt: 'Noctem Studio',
  },
]

const apiLogos = computed(() =>
  (props.content?.clients_logos || [])
    .filter(logo => logo?.url)
    .map(logo => ({
      src: logo.url!,
      alt: logo.alt || logo.file_name || 'Cliente Noctem',
    }))
)

const logos = computed(() => {
  if (props.logos?.length) return props.logos
  if (apiLogos.value.length) return apiLogos.value
  return fallbackLogos
})

const FILL = 12

const groupItems = computed(() => {
  const result: Array<{ src: string; alt: string; _key: string }> = []
  let i = 0

  while (result.length < FILL) {
    const logo = logos.value[i % logos.value.length]
    result.push({
      src: logo.src,
      alt: logo.alt || 'Cliente Noctem',
      _key: `${i}-${logo.src}`,
    })
    i++
  }

  return result
})
</script>

<style lang="scss" scoped>
.noctem-clients {
  position: relative;
  padding: 8rem 0;
  background-color: var(--color-black-rich);
  overflow: hidden;

  @media (min-width: 1024px) {
    padding: 11rem 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-black-border), transparent);
  }

  &__ambient {
    position: absolute;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--color-orange-glow-xlight) 0%, transparent 70%);
    bottom: -20%;
    left: 50%;
    transform: translateX(-50%);
    animation: floatSlow 12s ease-in-out infinite;
    pointer-events: none;
  }

  &__container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 10;

    @media (min-width: 1024px) {
      padding: 0 3rem;
    }
  }

  &__header {
    margin-bottom: 5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    font-size: 2.5rem;
    color: var(--color-cream);
    line-height: 1.1;
    margin-bottom: 2rem;

    @media (min-width: 1024px) {
      font-size: 3.75rem;
    }

    strong, b {
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

  &__marquee {
    cursor: default;

    &:hover .noctem-clients__track {
      animation-play-state: paused;
    }
  }

  &__mask {
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
  }

  &__track {
    display: flex;
    width: max-content;
    gap: 5rem;
    animation: noctemClientsMarquee 40s linear infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  &__group {
    display: flex;
    align-items: center;
    gap: 5rem;
    flex-shrink: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    transition: opacity 0.6s ease;
  }

  &__logo {
    height: 3.25rem;
    width: auto;
    object-fit: contain;
    opacity: 0.4;
    filter: grayscale(1);
    transition: opacity 0.6s var(--ease-out-expo), filter 0.6s var(--ease-out-expo);

    @media (min-width: 1024px) {
      height: 4rem;
    }

    .noctem-clients__item:hover & {
      opacity: 1;
      filter: grayscale(0);
    }
  }
}

@keyframes noctemClientsMarquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>