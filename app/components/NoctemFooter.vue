<template>
  <footer class="noctem-footer">
    <div class="noctem-footer__container">
      <div class="noctem-footer__top">
        <div class="noctem-footer__brand">
          <span class="noctem-footer__logo font-display text-2xl text-cream">
            <img width="150" src="/assets/images/4x/Recurso 1IDENTIDAD_NOCTEM.png" alt="Noctem">
          </span>
        </div>

        <nav class="noctem-footer__nav">
          <a href="#about" class="noctem-footer__link orange-line-hover">Nosotros</a>
          <a href="#portfolio" class="noctem-footer__link orange-line-hover">Portfolio</a>
          <a href="#services" class="noctem-footer__link orange-line-hover">Servicios</a>
          <a href="#contact" class="noctem-footer__link orange-line-hover">Contacto</a>
        </nav>
      </div>

      <div class="noctem-footer__divider" />

      <div class="noctem-footer__bottom">
        <span class="noctem-footer__copy">
          © {{ currentYear }} Noctem Studio. Todos los derechos reservados.
        </span>
        <span class="noctem-footer__location">
          Palma de Mallorca
          <span class="font-jp text-orange-bulb/30 mx-2">島</span>
          Islas Baleares
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.noctem-footer {
  position: relative;
  padding: 3rem 0;
  background-color: var(--color-black-deep);
}

@media (min-width: 1024px) {
  .noctem-footer {
    padding: 4rem 0;
  }
}

.noctem-footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-black-border), transparent);
}

.noctem-footer__container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  .noctem-footer__container {
    padding: 0 3rem;
  }
}

.noctem-footer__top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 1024px) {
  .noctem-footer__top {
    flex-direction: row;
    align-items: center;
  }
}

.noctem-footer__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.noctem-footer__logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-cream);
}

.noctem-footer__kanji {
  font-family: var(--font-jp);
  color: var(--color-orange-glow-medium);
  font-size: 1.125rem;
}

.noctem-footer__nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.noctem-footer__link {
  font-family: var(--font-body);
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(196, 189, 181, 0.7);
  position: relative;
  transition: color 0.5s ease;
}

.noctem-footer__link:hover {
  color: var(--color-orange-bulb);
}

.noctem-footer__divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-black-border);
  margin-bottom: 2rem;
}

.noctem-footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

@media (min-width: 640px) {
  .noctem-footer__bottom {
    flex-direction: row;
    align-items: center;
  }
}

.noctem-footer__copy {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(138, 130, 121, 0.5);
}

.noctem-footer__location {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(138, 130, 121, 0.5);
}
</style>
