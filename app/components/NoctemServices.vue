<template>
  <section id="services" class="noctem-services">
    <div class="noctem-services__ambient" />
    
    <div class="noctem-services__container">
      <div class="noctem-services__header" data-aos="fade-up">
        <span class="noctem-services__label">Servicios</span>
        <h2 class="noctem-services__title" v-html="content?.services_title || 'Lo que <strong>ofrecemos</strong>'" />
        <div class="noctem-services__line" />
      </div>

      <div class="noctem-services__list">
        <div
          v-for="(service, index) in services"
          :key="service.name"
          class="noctem-services__item"
          :data-aos="index % 2 === 0 ? 'fade-left' : 'fade-right'"
          :data-aos-delay="(index * 100) + 200"
        >
          <span class="noctem-services__number font-jp">{{ service.number }}</span>
          <div class="noctem-services__content">
            <h3 class="noctem-services__name">{{ service.name }}</h3>
            <p class="noctem-services__description">{{ service.description }}</p>
          </div>
          <span class="noctem-services__arrow">→</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  content?: {
    service1_title?: string
    service1_description?: string
    service2_title?: string
    service2_description?: string
    service3_title?: string
    service3_description?: string
    service4_title?: string
    service4_description?: string
  }
}>()

const japaneseNumbers = ['壱', '弐', '参', '肆']

const services = computed(() => [
  {
    number: japaneseNumbers[0],
    name: props.content?.service1_title || 'Sesiones de Retrato',
    description: props.content?.service1_description || 'Retratos íntimos y dirigidos que revelan el paisaje interior del sujeto. En estudio o en localización por toda Mallorca.',
  },
  {
    number: japaneseNumbers[1],
    name: props.content?.service2_title || 'Bodas y Elopements',
    description: props.content?.service2_description || 'Documentando historias de amor con contención y poesía. Desde fugas silenciosas en la Tramuntana hasta celebraciones completas.',
  },
  {
    number: japaneseNumbers[2],
    name: props.content?.service3_title || 'Editorial y Comercial',
    description: props.content?.service3_description || 'Narrativa de marca a través de una lente con intención. Moda, producto y lifestyle con precisión editorial.',
  },
  {
    number: japaneseNumbers[3],
    name: props.content?.service4_title || 'Impresiones de Arte',
    description: props.content?.service4_description || 'Ediciones limitadas de nuestra serie personal. Cada pieza está firmada a mano y numerada en papel de archivo.',
  },
])
</script>

<style lang="scss" scoped>
.noctem-services {
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
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--color-orange-glow-xlight) 0%, transparent 70%);
    bottom: -10%;
    right: -5%;
    animation: floatSlow 12s ease-in-out infinite;
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

  &__list {
    border-top: 1px solid var(--color-black-border);
  }

  &__item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 2.5rem 0;
    border-bottom: 1px solid var(--color-black-border);
    opacity: 0;
    animation: fadeUp 0.8s var(--ease-out-expo) forwards;
    cursor: pointer;
    transition: background-color 0.5s ease, padding 0.5s ease;

    @media (min-width: 1024px) {
      align-items: center;
      gap: 3rem;
      padding: 3rem 0;
    }

    &:hover {
      padding-left: 1rem;
      background: linear-gradient(90deg, rgba(204, 151, 31, 0.03) 0%, transparent 100%);

      .noctem-services__number {
        color: var(--color-orange-bulb);
      }

      .noctem-services__name {
        color: var(--color-orange-bulb);
      }

      .noctem-services__arrow {
        color: var(--color-orange-glow-rich);
        transform: translateX(0);
      }
    }
  }

  &__number {
    font-family: var(--font-jp);
    font-size: 1.5rem;
    color: var(--color-orange-glow-strong);
    transition: color 0.5s ease;
    flex-shrink: 0;
    width: 3rem;
  }

  &__content {
    flex: 1;
  }

  &__name {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--color-cream);
    margin-bottom: 0.5rem;
    transition: color 0.5s ease;

    @media (min-width: 1024px) {
      font-size: 1.875rem;
    }
  }

  &__description {
    font-family: var(--font-body);
    font-size: 1rem;
    color: rgba(196, 189, 181, 0.6);
    line-height: 1.625;
    font-weight: 300;
    max-width: 36rem;
  }

  &__arrow {
    font-size: 1.25rem;
    color: rgba(232, 96, 28, 0);
    transition: color 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo);
    transform: translateX(-10px);
    flex-shrink: 0;
  }
}
</style>
