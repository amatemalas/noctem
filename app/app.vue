<template>
  <div class="noctem-page">
    <div class="grain-overlay" />
    <NoctemNav />
    <NoctemHero />
    <NoctemAbout />
    <NoctemGallery />
    <NoctemServices />
    <NoctemContact />
    <NoctemFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Noctem | Estudio de Fotografía Mallorca",
  meta: [
    { name: "description", content: "Estudio de fotografía de inspiración japonesa con base en Mallorca. Capturando momentos con precisión y alma." },
  ],
})
</script>

<style scoped>
.noctem-page {
  background-color: #050505;
  min-height: 100vh;
}
</style>
