<template>
  <div class="noctem-error">
    <div class="grain-overlay" />
    <NoctemNav />
    
    <main class="noctem-error__main">
      <div class="noctem-error__content">
        <span class="noctem-error__code">404</span>
        <h1 class="noctem-error__title">Página no encontrada</h1>
        <p class="noctem-error__text">
          Lo que buscas ya no existe o nunca existió.<br>
          Quizás el silencio te membawa a otro lugar.
        </p>
        <NuxtLink to="/" class="noctem-error__link">
          Volver al inicio
        </NuxtLink>
      </div>
    </main>
    
    <NoctemFooter />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    message: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.noctem-error {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.noctem-error__main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 4rem;
}

.noctem-error__content {
  text-align: center;
  max-width: 500px;
}

.noctem-error__code {
  font-family: 'Playfair Display', serif;
  font-size: 12rem;
  font-weight: 400;
  line-height: 1;
  color: var(--color-black);
  display: block;
  margin-bottom: -1rem;
}

.noctem-error__title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 500;
  color: var(--color-black);
  margin-bottom: 1.5rem;
}

.noctem-error__text {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: var(--color-black);
  opacity: 0.7;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.noctem-error__link {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  color: var(--color-black);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding: 1rem 2rem;
  border: 1px solid var(--color-black);
  transition: all 0.3s ease;
}

.noctem-error__link:hover {
  background: var(--color-black);
  color: var(--color-white);
}
</style>