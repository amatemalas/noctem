<template>
  <header
    class="noctem-nav"
    :class="{ 'noctem-nav--scrolled': isScrolled }"
  >
    <div class="noctem-nav__container">
      <a href="#" class="noctem-nav__logo">
        <span class="noctem-nav__logo-text font-display">
          <img width="150" src="/assets/images/4x/Recurso 1IDENTIDAD_NOCTEM.png" alt="Noctem">
        </span>
      </a>

      <nav class="noctem-nav__links">
        <a href="#about" class="noctem-nav__link">Nosotros</a>
        <a href="#portfolio" class="noctem-nav__link">Portfolio</a>
        <a href="#services" class="noctem-nav__link">Servicios</a>
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
          <a href="#portfolio" class="noctem-nav__mobile-link" @click="menuOpen = false">Portfolio</a>
          <a href="#services" class="noctem-nav__mobile-link" @click="menuOpen = false">Servicios</a>
          <a href="#contact" class="noctem-nav__mobile-link" @click="menuOpen = false">Contacto</a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const isScrolled = ref(false)
const menuOpen = ref(false)

onMounted(() => {
  window.addEventListener("scroll", () => {
    isScrolled.value = window.scrollY > 80
  })
})
</script>

<style scoped>
.noctem-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  transition: all 0.7s ease;
}

.noctem-nav--scrolled {
  background-color: rgba(5, 5, 5, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.noctem-nav--scrolled::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-black-border), transparent);
}

.noctem-nav__container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

@media (min-width: 1024px) {
  .noctem-nav__container {
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

.noctem-nav__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  z-index: 50;
}

.noctem-nav__logo-text {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-cream);
}

.noctem-nav__logo-kanji {
  font-family: var(--font-jp);
  color: var(--color-orange-glow-deep);
  font-size: 0.875rem;
}

.noctem-nav__links {
  display: none;
  align-items: center;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .noctem-nav__links {
    display: flex;
  }
}

.noctem-nav__link {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(196, 189, 181, 0.7);
  transition: color 0.5s ease;
  position: relative;
}

.noctem-nav__link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-orange-bulb);
  transition: width 0.5s var(--ease-out-expo);
}

.noctem-nav__link:hover {
  color: var(--color-orange-bulb);
}

.noctem-nav__link:hover::after {
  width: 100%;
}

.noctem-nav__link--cta {
  color: var(--color-orange-bulb);
  border: 1px solid var(--color-orange-glow-strong);
  padding: 0.5rem 1.25rem;
  transition: background-color 0.5s var(--ease-out-expo);
}

.noctem-nav__link--cta::after {
  display: none;
}

.noctem-nav__link--cta:hover {
  background-color: var(--color-orange-glow-muted);
}

.noctem-nav__toggle {
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
}

@media (min-width: 768px) {
  .noctem-nav__toggle {
    display: none;
  }
}

.noctem-nav__toggle-line {
  width: 1.5rem;
  height: 1px;
  background-color: var(--color-cream);
  transition: all 0.5s var(--ease-out-expo);
}

.noctem-nav__toggle-line--open {
  background-color: var(--color-orange-bulb);
}

.noctem-nav__toggle-line:first-child.noctem-nav__toggle-line--open {
  transform: translateY(3.5px) rotate(45deg);
}

.noctem-nav__toggle-line:last-child.noctem-nav__toggle-line--open {
  transform: translateY(-3.5px) rotate(-45deg);
}

.noctem-nav__mobile {
  position: fixed;
  inset: 0;
  background-color: var(--color-black-deep);
  display: flex;
  align-items: center;
  justify-content: center;
}

.noctem-nav__mobile-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.noctem-nav__mobile-link {
  font-family: var(--font-display);
  font-size: 2.25rem;
  color: var(--color-cream);
  transition: color 0.5s ease;
}

.noctem-nav__mobile-link:hover {
  color: var(--color-orange-bulb);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.5s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
</style>
