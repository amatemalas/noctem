<template>
  <section id="plans" class="noctem-plans">
    <div class="noctem-plans__ambient" />
    <div class="noctem-plans__ambient-2" />

    <div class="noctem-plans__container">
      <div class="noctem-plans__header" data-aos="fade-up">
        <span class="noctem-plans__label">{{ content?.plans_heading || 'Packs mensuales' }}</span>
        <h2 class="noctem-plans__title" v-html="content?.plans_title || 'Producción de contenido <strong>audiovisual</strong>'" />
        <div class="noctem-plans__line" />
        <p class="noctem-plans__subtitle" v-html="content?.plans_description || 'Fotografía, vídeo y reels para comunicación digital. Cada pack incluye briefing previo, producción, postproducción y entrega optimizada para redes sociales y web.'" />
      </div>

      <div class="noctem-plans__grid">
        <article
          v-for="(plan, index) in plans"
          :key="plan.name"
          class="noctem-plans__card"
          data-aos="fade-up"
          :data-aos-delay="(index * 100) + 200"
        >
          <div class="noctem-plans__card-glow" />
          <div class="noctem-plans__card-body">
            <span class="noctem-plans__card-number font-jp">{{ plan.number }}</span>
            <div class="noctem-plans__card-content">
              <h3 class="noctem-plans__card-name">{{ plan.name }}</h3>
              <div class="noctem-plans__card-description" v-html="plan.description" />
              <ul class="noctem-plans__card-features">
                <li v-for="(feature, featureIndex) in plan.features.slice(0, 4)" :key="featureIndex">{{ feature }}</li>
              </ul>
              <div
                class="noctem-plans__card-fade"
                :class="{ 'noctem-plans__card-fade--hidden': expanded[index] }"
              />
              <div
                class="noctem-plans__card-extra"
                :class="{ 'noctem-plans__card-extra--open': expanded[index] }"
              >
                <ul class="noctem-plans__card-features">
                  <li v-for="feature in plan.features.slice(4)" :key="feature">{{ feature }}</li>
                </ul>
              </div>
              <button
                v-if="plan.features.length > 4"
                class="noctem-plans__card-toggle"
                @click="toggle(index)"
              >
                {{ expanded[index] ? 'Ver menos' : 'Ver más' }}
                <span class="noctem-plans__card-toggle-icon" :class="{ 'noctem-plans__card-toggle-icon--open': expanded[index] }">↓</span>
              </button>
            </div>
          </div>
          <a href="#contact" class="noctem-plans__card-cta">
            <span>Solicitar información</span>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  content?: {
    plans_title?: string
    plans_heading?: string
    plans_description?: string
    plans_cards?: Array<{
      plan_title?: string
      plan_description?: string
      plan_features?: Array<{ feature_text?: string }>
    }>
  }
}>()

const japaneseNumbers = ['壱', '弐', '参', '肆', '伍']
const expanded = reactive<boolean[]>([])

function toggle(index: number) {
  expanded[index] = !expanded[index]
}

const plans = computed(() => {
  const cards = props.content?.plans_cards || []

  return cards.map((card, index) => ({
    number: japaneseNumbers[index] || String(index + 1),
    name: card.plan_title || '',
    description: card.plan_description || '',
    features: (card.plan_features || []).map(f => f.feature_text || ''),
  }))
})
</script>


<style lang="scss" scoped>
.noctem-plans {
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
    top: 15%;
    left: -8%;
    animation: floatSlow 10s ease-in-out infinite;
    pointer-events: none;
  }

  &__ambient-2 {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--color-orange-glow-soft) 0%, transparent 70%);
    bottom: -10%;
    right: -8%;
    animation: floatSlow 14s ease-in-out infinite reverse;
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
    margin-bottom: 2rem;
  }

  &__subtitle {
    font-family: var(--font-body);
    font-size: 1rem;
    color: rgba(196, 189, 181, 0.6);
    line-height: 1.625;
    font-weight: 300;
    max-width: 48rem;

    @media (min-width: 1024px) {
      font-size: 1.125rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    @media (min-width: 1024px) {
      gap: 2rem;
    }
  }

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--color-black-soft);
    border: 1px solid var(--color-black-border);
    transition: transform 0.7s var(--ease-out-expo), border-color 0.7s var(--ease-out-expo), box-shadow 0.7s var(--ease-out-expo);

    &:hover {
      transform: translateY(-6px);
      border-color: rgba(204, 151, 31, 0.25);
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5), 0 0 48px var(--color-orange-glow);

      .noctem-plans__card-glow {
        opacity: 1;
      }

      .noctem-plans__card-number {
        color: var(--color-orange-bulb);
      }

      .noctem-plans__card-name {
        color: var(--color-orange-bulb);
      }
    }
  }

  &__card-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, rgba(204, 151, 31, 0.03) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.7s var(--ease-out-expo);
    pointer-events: none;
  }

  &__card-body {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2.5rem 2rem;
    flex: 1;

    @media (min-width: 768px) {
      padding: 2.5rem 1.75rem;
    }

    @media (min-width: 1024px) {
      padding: 3rem 2.5rem;
    }
  }

  &__card-number {
    font-family: var(--font-jp);
    font-size: 2rem;
    color: rgba(204, 151, 31, 0.2);
    transition: color 0.7s var(--ease-out-expo);
    line-height: 1;
  }

  &__card-content {
    flex: 1;
  }

  &__card-name {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--color-cream);
    margin-bottom: 1rem;
    transition: color 0.7s var(--ease-out-expo);
    line-height: 1.2;

    @media (min-width: 1024px) {
      font-size: 1.75rem;
    }
  }

  &__card-description {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: rgba(196, 189, 181, 0.6);
    line-height: 1.625;
    font-weight: 300;
    margin-bottom: 1.5rem;
  }

  &__card-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;

    li {
      font-family: var(--font-body);
      font-size: 0.875rem;
      color: rgba(196, 189, 181, 0.5);
      font-weight: 300;
      padding-left: 1.25rem;
      position: relative;
      transition: color 0.4s ease;
      cursor: default;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.5em;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: var(--color-orange-glow-medium);
        transition: background-color 0.4s ease, transform 0.4s var(--ease-out-expo);
      }

      &:hover {
        color: var(--color-cream-dim);

        &::before {
          background-color: var(--color-orange-bulb);
          transform: scale(1.4);
        }
      }
    }
  }

  &__card-fade {
    height: 2.5rem;
    margin-top: -2.5rem;
    position: relative;
    z-index: 2;
    background: linear-gradient(to bottom, transparent 0%, var(--color-black-soft) 90%);
    pointer-events: none;
    transition: opacity 0.6s ease;

    &--hidden {
      opacity: 0;
    }
  }

  &__card-extra {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.6s var(--ease-out-expo);

    & > ul {
      overflow: hidden;
    }

    &--open {
      grid-template-rows: 1fr;
    }
  }

  &__card-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    margin-top: 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-orange-glow-medium);
    padding: 0.25rem 0;
    transition: color 0.4s ease;
    width: fit-content;

    &:hover {
      color: var(--color-orange-bulb);
    }

    &-icon {
      display: inline-block;
      font-size: 0.625rem;
      transition: transform 0.5s var(--ease-out-expo);

      &--open {
        transform: rotate(180deg);
      }
    }
  }

  &__card-cta {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 2rem;
    border-top: 1px solid var(--color-black-border);
    text-decoration: none;
    transition: background-color 0.5s ease, border-color 0.5s ease;

    @media (min-width: 768px) {
      padding: 1.25rem 1.75rem;
    }

    @media (min-width: 1024px) {
      padding: 1.25rem 2.5rem;
    }

    span {
      font-family: var(--font-body);
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-cream-dim);
      transition: color 0.5s ease;
      position: relative;
      z-index: 2;
    }

    &::after {
      content: "→";
      font-size: 1rem;
      color: var(--color-orange-glow-medium);
      transition: transform 0.5s var(--ease-out-expo), color 0.5s ease;
      position: relative;
      z-index: 2;
    }

    &-line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background-color: var(--color-orange-bulb);
      transition: width 0.7s var(--ease-out-expo);
    }

    &:hover {
      background-color: rgba(204, 151, 31, 0.03);
      border-color: rgba(204, 151, 31, 0.1);

      span {
        color: var(--color-orange-bulb);
      }

      &::after {
        transform: translateX(4px);
        color: var(--color-orange-bulb);
      }

      .noctem-plans__card-cta-line {
        width: 100%;
      }
    }
  }
}
</style>
