<template>
  <section id="services" class="noctem-services">
    <div class="noctem-services__ambient" />
    
    <div class="noctem-services__container">
      <div class="noctem-services__header">
        <span class="noctem-services__label fade-up">Servicios</span>
        <h2 class="noctem-services__title fade-up" style="animation-delay: 0.15s">
          Lo que <span class="noctem-services__title-accent">ofrecemos</span>
        </h2>
        <div class="noctem-services__line line-draw" style="animation-delay: 0.3s" />
      </div>

      <div class="noctem-services__list">
        <div
          v-for="(service, index) in services"
          :key="service.name"
          class="noctem-services__item"
          :style="{ animationDelay: `${0.4 + index * 0.12}s` }"
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
const services = [
  {
    number: "壱",
    name: "Sesiones de Retrato",
    description: "Retratos íntimos y dirigidos que revelan el paisaje interior del sujeto. En estudio o en localización por toda Mallorca.",
  },
  {
    number: "弐",
    name: "Bodas y Elopements",
    description: "Documentando historias de amor con contención y poesía. Desde fugas silenciosas en la Tramuntana hasta celebraciones completas.",
  },
  {
    number: "参",
    name: "Editorial y Comercial",
    description: "Narrativa de marca a través de una lente con intención. Moda, producto y lifestyle con precisión editorial.",
  },
  {
    number: "肆",
    name: "Impresiones de Arte",
    description: "Ediciones limitadas de nuestra serie personal. Cada pieza está firmada a mano y numerada en papel de archivo.",
  },
]
</script>

<style scoped>
.noctem-services {
  position: relative;
  padding: 8rem 0;
  background-color: var(--color-black-deep);
  overflow: hidden;
}

.noctem-services__ambient {
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

@media (min-width: 1024px) {
  .noctem-services {
    padding: 11rem 0;
  }
}

.noctem-services::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-black-border), transparent);
}

.noctem-services__container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  .noctem-services__container {
    padding: 0 3rem;
  }
}

.noctem-services__header {
  margin-bottom: 5rem;
}

.noctem-services__label {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-orange-bulb);
  margin-bottom: 1.5rem;
}

.noctem-services__title {
  font-family: var(--font-display);
  font-size: 3rem;
  color: var(--color-cream);
  line-height: 1.05;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .noctem-services__title {
    font-size: 3.75rem;
  }
}

@media (min-width: 1280px) {
  .noctem-services__title {
    font-size: 4.5rem;
  }
}

.noctem-services__title-accent {
  font-style: italic;
  color: var(--color-orange-bulb);
  text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
}

.noctem-services__line {
  height: 1px;
  background-color: var(--color-orange-glow-strong);
  max-width: 80px;
}

.noctem-services__list {
  border-top: 1px solid var(--color-black-border);
}

.noctem-services__item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--color-black-border);
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out-expo) forwards;
  cursor: pointer;
  transition: background-color 0.5s ease, padding 0.5s ease;
}

.noctem-services__item:hover {
  padding-left: 1rem;
  background: linear-gradient(90deg, rgba(204, 151, 31, 0.03) 0%, transparent 100%);
}

@media (min-width: 1024px) {
  .noctem-services__item {
    align-items: center;
    gap: 3rem;
    padding: 3rem 0;
  }
}

.noctem-services__number {
  font-family: var(--font-jp);
  font-size: 1.5rem;
  color: var(--color-orange-glow-strong);
  transition: color 0.5s ease;
  flex-shrink: 0;
  width: 3rem;
}

.noctem-services__item:hover .noctem-services__number {
  color: var(--color-orange-bulb);
}

.noctem-services__content {
  flex: 1;
}

.noctem-services__name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-cream);
  margin-bottom: 0.5rem;
  transition: color 0.5s ease;
}

@media (min-width: 1024px) {
  .noctem-services__name {
    font-size: 1.875rem;
  }
}

.noctem-services__item:hover .noctem-services__name {
  color: var(--color-orange-bulb);
}

.noctem-services__description {
  font-family: var(--font-body);
  font-size: 1rem;
  color: rgba(196, 189, 181, 0.6);
  line-height: 1.625;
  font-weight: 300;
  max-width: 36rem;
}

.noctem-services__arrow {
  font-size: 1.25rem;
  color: rgba(232, 96, 28, 0);
  transition: color 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo);
  transform: translateX(-10px);
  flex-shrink: 0;
}

.noctem-services__item:hover .noctem-services__arrow {
  color: var(--color-orange-glow-rich);
  transform: translateX(0);
}
</style>
