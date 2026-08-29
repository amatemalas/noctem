<template>
  <header
    class="noctem-nav"
    :class="{ 'noctem-nav--scrolled': isScrolled }"
  >
    <div class="noctem-nav__container">
      <a href="/" @click.prevent="$router.push('/')" class="noctem-nav__logo">
        <span class="noctem-nav__logo-text font-display">
          <img width="150" src="/assets/images/4x/Recurso 1IDENTIDAD_NOCTEM.png" alt="Noctem">
        </span>
      </a>

      <nav class="noctem-nav__links">
        <a href="#about" class="noctem-nav__link">Nosotros</a>
        <a href="#plans" class="noctem-nav__link">Planes</a>
        <a href="#portfolio" class="noctem-nav__link">Portfolio</a>
        <a href="#services" class="noctem-nav__link">Servicios</a>
        <a href="#clientes" class="noctem-nav__link">Clientes</a>
        <a href="#contact" class="noctem-nav__link noctem-nav__link--cta">Contacto</a>
      </nav>

      <button
        class="noctem-nav__toggle"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
      >
        <span class="noctem-nav__toggle-line" :class="{ 'noctem-nav__toggle-line--open': menuOpen }" />
        <span class="noctem-nav__toggle-line" :class="{ 'noctem-nav__toggle-line--open': menuOpen }" />
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="noctem-nav__mobile">
        <nav class="noctem-nav__mobile-links">
          <a href="#about" class="noctem-nav__mobile-link" @click="menuOpen = false">Nosotros</a>
          <a href="#plans" class="noctem-nav__mobile-link" @click="menuOpen = false">Planes</a>
          <a href="#portfolio" class="noctem-nav__mobile-link" @click="menuOpen = false">Portfolio</a>
          <a href="#services" class="noctem-nav__mobile-link" @click="menuOpen = false">Servicios</a>
          <a href="#clientes" class="noctem-nav__mobile-link" @click="menuOpen = false">Clientes</a>
          <a href="#contact" class="noctem-nav__mobile-link" @click="menuOpen = false">Contacto</a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { threshold = 1000 } = defineProps<{ threshold?: number }>()

const isScrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => {
  isScrolled.value = window.scrollY > threshold
}

onMounted(() => {
  onScroll()
  window.addEventListener("scroll", onScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
})
</script>

<style lang="scss" scoped>
.noctem-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  transition: all 0.7s ease;

  &--scrolled {
    background-color: rgba(5, 5, 5, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--color-black-border), transparent);
    }
  }

  &__container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

    @media (min-width: 1024px) {
      padding-left: 3rem;
      padding-right: 3rem;
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;
    z-index: 50;

    &-text {
      font-family: var(--font-display);
      font-size: 1.5rem;
      color: var(--color-cream);
    }

    &-kanji {
      font-family: var(--font-jp);
      color: var(--color-orange-glow-deep);
      font-size: 0.875rem;
    }
  }

  &__links {
    display: none;
    align-items: center;
    gap: 2.5rem;

    @media (min-width: 1024px) {
      display: flex;
    }
  }

  &__link {
    font-family: var(--font-body);
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(196, 189, 181, 0.7);
    transition: color 0.5s ease;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background-color: var(--color-orange-bulb);
      transition: width 0.5s var(--ease-out-expo);
    }

    &:hover {
      color: var(--color-orange-bulb);

      &::after {
        width: 100%;
      }
    }

    &--cta {
      color: var(--color-orange-bulb);
      border: 1px solid var(--color-orange-glow-strong);
      padding: 0.5rem 1.25rem;
      transition: background-color 0.5s var(--ease-out-expo);

      &::after {
        display: none;
      }

      &:hover {
        background-color: var(--color-orange-glow-muted);
      }
    }
  }

  &__toggle {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.375rem;
    padding: 0.5rem;
    position: relative;
    z-index: 50;
    background: transparent;
    border: none;
    cursor: pointer;

    @media (min-width: 1024px) {
      display: none;
    }

    &-line {
      width: 1.5rem;
      height: 1px;
      background-color: var(--color-cream);
      transition: all 0.5s var(--ease-out-expo);

      &--open {
        background-color: var(--color-orange-bulb);
      }

      &:first-child {
        &.noctem-nav__toggle-line--open {
          transform: translateY(3.5px) rotate(45deg);
        }
      }

      &:last-child {
        &.noctem-nav__toggle-line--open {
          transform: translateY(-3.5px) rotate(-45deg);
        }
      }
    }
  }

  &__mobile {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--color-black-deep);
    display: flex;
    align-items: center;
    justify-content: center;

    &-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    &-link {
      font-family: var(--font-display);
      font-size: 2.25rem;
      color: var(--color-cream);
      transition: color 0.5s ease;

      &:hover {
        color: var(--color-orange-bulb);
      }
    }
  }
}

.mobile-menu {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
