<template>
  <section class="noctem-hero" ref="heroRef">
    <div class="noctem-hero__bg">
      <video ref="videoRef" class="noctem-hero__video" :src="videoSrc" autoplay muted loop playsinline></video>
      <div class="noctem-hero__video-overlay" />
      <div class="noctem-hero__gradient" />
      <div class="noctem-hero__circle" />
    </div>

    <div class="noctem-hero__content">
      <h1 class="noctem-hero__title">{{ content?.hero_title || 'Noctem Studio' }}</h1>
      <p class="noctem-hero__subtitle">{{ content?.hero_subtitle || 'Estudio profesional de content creators' }}</p>
    </div>

    <ThreeLensModel :trigger-element="heroRef" />

    <div class="noctem-hero__scroll">
      <span class="noctem-hero__scroll-text">Desplazar</span>
      <span class="noctem-hero__scroll-line" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThreeLensModel from './ThreeLensModel.vue'

defineProps<{
  content?: {
    hero_title?: string
    hero_subtitle?: string
  }
}>()

const heroRef = ref<HTMLElement>(null)
const videoRef = ref<HTMLVideoElement>(null)
const videoSrc = '/assets/videos/hero-bg.mp4'
</script>

<style lang="scss" scoped>
.noctem-hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--color-black-deep);

  &__bg {
    position: absolute;
    inset: 0;
  }

  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  &__video-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: rgba(5, 5, 5, 0.6);
  }

  &__gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 40%, var(--color-orange-glow-light) 0%, transparent 70%);
  }

  &__circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--color-orange-glow-xlight) 0%, transparent 70%);
    animation: breathe 6s ease-in-out infinite;
  }

  &__content {
    position: relative;
    z-index: 10;
    text-align: center;
    margin-bottom: 8rem;
  }

  &__subtitle {
    font-family: var(--font-body);
    font-size: 0.75rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--color-gray-warm);
    margin-bottom: 2rem;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 4.5rem;
    font-weight: 500;
    color: var(--color-cream);
    line-height: 0.9;
    margin-bottom: 2rem;

    &-word {
      display: inline-block;
    }

    @media (min-width: 768px) {
      font-size: 6rem;
    }

    @media (min-width: 1024px) {
      font-size: 8rem;
    }
  }

  &__line {
    height: 1px;
    background-color: var(--color-orange-glow-deep);
    margin-bottom: 2rem;
    max-width: 120px;
  }

  &__description {
    font-family: var(--font-body);
    font-size: 1.125rem;
    color: rgba(196, 189, 181, 0.8);
    line-height: 1.625;
    font-weight: 300;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
  }

  &__cta {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &__btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0.25rem;

    &-text {
      font-family: var(--font-body);
      font-size: 0.875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-cream);
      position: relative;
      z-index: 10;
      transition: color 0.5s ease;
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

    &:hover &-line {
      width: 100%;
    }

    &:hover &-text {
      color: var(--color-orange-bulb);
    }
  }

  &__scroll {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    z-index: 20;

    &-text {
      font-family: var(--font-body);
      font-size: 0.625rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(138, 130, 121, 0.6);
    }

    &-line {
      width: 1px;
      height: 3rem;
      background: linear-gradient(to bottom, var(--color-orange-glow-rich), transparent);
    }
  }

  &__kanji {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    animation: fadeIn 2s var(--ease-out-expo) forwards;
    z-index: 20;

    @media (min-width: 1024px) {
      right: 4rem;
    }
  }
}

@keyframes breathe {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (min-width: 768px) {
  .noctem-hero__content {
    margin-bottom: 7em;
  }
}
</style>