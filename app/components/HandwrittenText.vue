<template>
  <div class="handwritten">
    <span
      :key="`left-${activeText}`"
      class="handwritten__text handwritten__text--left"
    >
      <span
        v-for="(char, i) in currentChars"
        :key="`left-${activeText}-${i}`"
        class="handwritten__char"
        :style="{ animationDelay: `${0.2 + i * 0.08}s` }"
      >{{ char === ' ' ? '\u00A0' : char }}</span>
    </span>
    <span
      :key="`right-${activeText}`"
      class="handwritten__text handwritten__text--right"
    >
      <span
        v-for="(char, i) in currentChars"
        :key="`right-${activeText}-${i}`"
        class="handwritten__char"
        :style="{ animationDelay: `${0.4 + i * 0.08}s` }"
      >{{ char === ' ' ? '\u00A0' : char }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
const activeText = ref<'always' | 'soon'>('always')
const isTransitioning = ref(false)

const alwaysText = 'Always Us'
const soonText = 'See you soon'

const currentChars = computed(() =>
  activeText.value === 'always' ? alwaysText : soonText
)

const AT_BOTTOM_THRESHOLD = 100

const handleScroll = () => {
  const scrollY = window.scrollY + window.innerHeight
  const docHeight = document.body.scrollHeight

  if (scrollY >= docHeight - AT_BOTTOM_THRESHOLD) {
    if (activeText.value === 'always' && !isTransitioning.value) {
      isTransitioning.value = true
      setTimeout(() => {
        activeText.value = 'soon'
        isTransitioning.value = false
      }, 400)
    }
  } else {
    if (activeText.value === 'soon' && !isTransitioning.value) {
      isTransitioning.value = true
      setTimeout(() => {
        activeText.value = 'always'
        isTransitioning.value = false
      }, 400)
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.handwritten {
  display: none;
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 30;
}

@media (min-width: 1920px) and (min-height: 1080px) {
  .handwritten {
    display: block;
  }
}

.handwritten__text {
  position: absolute;
  top: 50%;
  font-family: italic;
  font-style: italic;
  font-size: 14vh;
  font-weight: 400;
  color: var(--color-orange-bulb);
  /* letter-spacing: 0.04em; */
  white-space: nowrap;
  text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
}

.handwritten__text--left {
  left: 1.5rem;
  writing-mode: vertical-lr;
  transform: translateY(-50%);
}

@media (min-width: 768px) {
  .handwritten__text--left {
    left: 2rem;
  }
}

.handwritten__text--right {
  right: 1.5rem;
  writing-mode: vertical-rl;
  transform: translateY(-50%) rotate(180deg);
}

@media (min-width: 768px) {
  .handwritten__text--right {
    right: 2rem;
  }
}

.handwritten__char {
  display: inline-block;
  opacity: 0;
  animation: inkDrop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes inkDrop {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(1.4);
    filter: blur(8px);
    text-shadow: 0 0 20px var(--color-orange-glow-deep);
  }
  60% {
    opacity: 1;
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
    text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
  }
}
</style>
