<template>
  <section id="about" class="noctem-about">
    <div class="noctem-about__ambient" />
    <div class="noctem-about__ambient-2" />
    
    <div class="noctem-about__container">
      <div class="noctem-about__grid">
        <div class="noctem-about__visual" data-aos="fade-up" data-aos-delay="100">
          <div class="noctem-about__image-wrapper">
            <div class="noctem-about__image-border" />
            <img
              src="/assets/images/4x/Recurso 1IDENTIDAD_NOCTEM.png"
              alt="Estudio Noctem"
              class="noctem-about__image"
            />
          </div>
          <div class="noctem-about__accent">
            <span class="font-jp text-orange-bulb/30 text-6xl">光</span>
          </div>
        </div>

        <div class="noctem-about__content" data-aos="fade-up" data-aos-delay="200">
          <span class="noctem-about__label" data-aos="fade-up">{{ content?.about_title || 'Nosotros' }}</span>

          <h2 class="noctem-about__title" data-aos="fade-up" v-html="content?.about_heading || 'El arte de <strong>ver</strong>'" />

          <div class="noctem-about__line" data-aos="fade-up" data-aos-delay="400" />

          <div class="noctem-about__text" data-aos="fade-up" data-aos-delay="500">
            <div v-for="(paragraph, i) in aboutParagraphs" :key="i" v-html="paragraph" />
          </div>

          <div class="noctem-about__stats" data-aos="fade-up" data-aos-delay="600">
            <div class="noctem-about__stat">
              <span class="noctem-about__stat-number">{{ content?.stats_years || '8+' }}</span>
              <span class="noctem-about__stat-label">Años</span>
            </div>
            <div class="noctem-about__stat-divider" />
            <div class="noctem-about__stat">
              <span class="noctem-about__stat-number">{{ content?.stats_projects || '200+' }}</span>
              <span class="noctem-about__stat-label">Proyectos</span>
            </div>
            <div class="noctem-about__stat-divider" />
            <div class="noctem-about__stat">
              <span class="noctem-about__stat-number">{{ content?.stats_island || '島' }}</span>
              <span class="noctem-about__stat-label">Nacido en la isla</span>
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
    about_title?: string
    about_heading?: string
    about_description?: string
    stats_years?: string
    stats_projects?: string
    stats_island?: string
  }
}>()

const aboutParagraphs = computed(() => {
  const desc = props.content?.about_description || 'Nacido en las horas silenciosas entre el atardecer y el amanecer, Noctem es un estudio de fotografía enraizado en la belleza salvaje de Mallorca. Nos inspiramos en la filosofía japonesa del <em>wabi-sabi</em> — encontrar la perfección en la imperfección, la belleza en lo efímero.\n\nCada encuadre es una meditación. Cada sombra, una historia. No solo capturamos momentos — honramos el espacio que ocupan.'
  return desc.split('\n\n').filter(Boolean)
})
</script>

<style lang="scss" scoped>
.noctem-about {
  position: relative;
  padding: 8rem 0;
  background-color: var(--color-black-deep);
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
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--color-orange-glow-xlight) 0%, transparent 70%);
    top: 20%;
    right: -10%;
    animation: floatSlow 8s ease-in-out infinite;
    pointer-events: none;
  }

  &__ambient-2 {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--color-orange-glow-soft) 0%, transparent 70%);
    bottom: 10%;
    left: -5%;
    animation: floatSlow 10s ease-in-out infinite reverse;
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

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4rem;
    align-items: center;

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
      gap: 6rem;
    }

    @media (min-width: 1280px) {
      gap: 8rem;
    }
  }

  &__visual {
    position: relative;
  }

  &__image-wrapper {
    position: relative;
    overflow: hidden;
    opacity: 0;
    animation: blurReveal 1.5s var(--ease-out-expo) forwards;
    animation-delay: 0.3s;

    &:hover .noctem-about__image-border {
      transform: translate(0.75rem, 0.75rem);
    }

    &:hover .noctem-about__image {
      filter: grayscale(0%) contrast(1.05);
    }
  }

  &__image-border {
    position: absolute;
    inset: 0;
    border: 1px solid var(--color-orange-glow-soft);
    transform: translate(1rem, 1rem);
    transition: transform 0.7s var(--ease-out-expo);
  }

  &__image {
    position: relative;
    z-index: 10;
    width: 100%;
    height: auto;
    object-fit: cover;
    background-color: var(--color-black-soft);
    filter: grayscale(20%) contrast(1.1);
    transition: filter 0.7s var(--ease-out-expo);
  }

  &__accent {
    position: absolute;
    bottom: -2rem;
    right: -1rem;
    z-index: 20;
    font-family: var(--font-jp);
    color: var(--color-orange-glow-strong);
    font-size: 3.75rem;
    user-select: none;
    animation: floatSlow 5s ease-in-out infinite;

    @media (min-width: 1024px) {
      right: -2rem;
    }
  }

  &__content {
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

    b {
      font-style: italic;
      color: var(--color-orange-bulb);
      text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
    }
  }

  &__line {
    height: 1px;
    background-color: var(--color-orange-glow-strong);
    margin-bottom: 2.5rem;
    max-width: 80px;
  }

  &__text {
    margin-bottom: 3.5rem;

    > * + * {
      margin-top: 1.5rem;
    }

    p {
      font-family: var(--font-body);
      font-size: 1rem;
      color: rgba(196, 189, 181, 0.7);
      line-height: 1.625;
      font-weight: 300;

      @media (min-width: 1024px) {
        font-size: 1.125rem;
      }
    }

    em {
      font-style: normal;
      color: var(--color-orange-bulb-light);
      font-weight: 400;
    }
  }

  &__stats {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    &-number {
      font-family: var(--font-display);
      font-size: 1.875rem;
      color: var(--color-cream);
      font-weight: 500;

      @media (min-width: 1024px) {
        font-size: 2.25rem;
      }
    }

    &-label {
      font-family: var(--font-body);
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-gray-warm);
    }
  }

  &__stat-divider {
    width: 1px;
    height: 3rem;
    background-color: var(--color-black-border);
  }
}
</style>
