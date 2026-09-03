<template>
  <div class="noctem-privacy">
    <div class="grain-overlay" />
    <NoctemNav :threshold="0" />

    <main class="noctem-privacy__main">
      <div class="noctem-privacy__container">
        <div class="noctem-privacy__header" data-aos="fade-up">
          <span class="noctem-privacy__label">Privacidad</span>
          <h1 class="noctem-privacy__title">Política de <strong>Privacidad</strong></h1>
          <div class="noctem-privacy__line" />
          <p class="noctem-privacy__date">Última actualización: 1 de julio de 2026</p>
        </div>

        <div class="noctem-privacy__content" data-aos="fade-up" data-aos-delay="100">
          <section class="noctem-privacy__section">
            <h2 class="noctem-privacy__section-title">1. Responsable del Tratamiento</h2>
            <p class="noctem-privacy__text">
              En cumplimiento con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y Garantía de los Derechos Digitales, te informamos que los datos personales que nos proporciones a través de este formulario de contacto serán tratados por:
            </p>
            <ul class="noctem-privacy__list">
              <li><strong>Responsable:</strong> Noctem Studio — Mamadou Sissokho</li>
              <li><strong>Correo electrónico:</strong> mamadouxph@gmail.com</li>
              <li><strong>Ubicación:</strong> Palma de Mallorca, Islas Baleares, España</li>
            </ul>
          </section>

          <section class="noctem-privacy__section">
            <h2 class="noctem-privacy__section-title">2. Finalidad del Tratamiento</h2>
            <p class="noctem-privacy__text">
              Los datos personales recogidos a través de nuestro formulario de contacto se utilizan exclusivamente para:
            </p>
            <ul class="noctem-privacy__list">
              <li>Gestionar y responder a tu solicitud de información o consulta.</li>
              <li>Contactar contigo en relación con los servicios o proyectos que hayas consultado.</li>
              <li>En ningún caso utilizaremos tus datos para fines publicitarios o comerciales no solicitados.</li>
            </ul>
          </section>

          <section class="noctem-privacy__section">
            <h2 class="noctem-privacy__section-title">3. Legitimación del Tratamiento</h2>
            <p class="noctem-privacy__text">
              La base legal para el tratamiento de tus datos es tu consentimiento explícito, manifestado mediante la marcación de la casilla de aceptación de esta política de privacidad al enviar el formulario.
            </p>
          </section>

          <section class="noctem-privacy__section">
            <h2 class="noctem-privacy__section-title">4. Datos Recogidos</h2>
            <p class="noctem-privacy__text">
              Los únicos datos personales que recogemos a través del formulario de contacto son:
            </p>
            <ul class="noctem-privacy__list">
              <li>Nombre</li>
              <li>Dirección de correo electrónico</li>
              <li>Mensaje o consulta voluntaria</li>
            </ul>
            <p class="noctem-privacy__text">
              No recogemos datos sensibles ni información de carácter personal más allá de la necesaria para atender tu consulta.
            </p>
          </section>

          <section class="noctem-privacy__section">
            <h2 class="noctem-privacy__section-title">5. Plazo de Conservación</h2>
            <p class="noctem-privacy__text">
              Tus datos personales serán conservados durante el tiempo necesario para atender tu consulta y, en su caso, durante el plazo máximo de 12 meses tras la última comunicación, salvo que exista una obligación legal que requiera su conservación por un período superior.
            </p>
          </section>

          <section class="noctem-privacy__section">
            <h2 class="noctem-privacy__section-title">6. Destinatarios de los Datos</h2>
            <p class="noctem-privacy__text">
              No cedemos ni comunicamos tus datos personales a terceros, salvo obligación legal. Los datos se almacenan en los servidores de nuestro proveedor de alojamiento web y servicios de correo electrónico, ubicados en la Unión Europea, que cumplen con la normativa vigente en materia de protección de datos.
            </p>
          </section>

          <section class="noctem-privacy__section">
            <h2 class="noctem-privacy__section-title">7. Derechos del Usuario</h2>
            <p class="noctem-privacy__text">
              De acuerdo con el RGPD, tienes derecho a:
            </p>
            <ul class="noctem-privacy__list">
              <li><strong>Acceder</strong> a tus datos personales para conocer cuáles estamos tratando.</li>
              <li><strong>Rectificar</strong> tus datos si son inexactos o incompletos.</li>
              <li><strong>Solicitar la supresión</strong> de tus datos cuando ya no sean necesarios.</li>
              <li><strong>Limitar el tratamiento</strong> de tus datos en determinadas circunstancias.</li>
              <li><strong>Oponerte</strong> al tratamiento de tus datos por motivos relacionados con tu situación particular.</li>
              <li><strong>Portar</strong> tus datos a otro responsable del tratamiento en formato estructurado.</li>
            </ul>
            <p class="noctem-privacy__text">
              Para ejercer cualquiera de estos derechos, puedes contactarnos a través del correo electrónico <a :href="`mailto:${email}`" class="noctem-privacy__link">{{ email }}</a>. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).
            </p>
          </section>

          <section class="noctem-privacy__section">
            <h2 class="noctem-privacy__section-title">8. Medidas de Seguridad</h2>
            <p class="noctem-privacy__text">
              Aplicamos las medidas técnicas y organizativas necesarias para garantizar la seguridad de tus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, de acuerdo con el estado de la tecnología y los riesgos del tratamiento.
            </p>
          </section>

          <section class="noctem-privacy__section">
            <h2 class="noctem-privacy__section-title">9. Modificaciones</h2>
            <p class="noctem-privacy__text">
              Nos reservamos el derecho de modificar la presente política de privacidad para adaptarla a novedades legislativas o cambios en nuestros servicios. Te recomendamos revisar esta página periódicamente.
            </p>
          </section>
        </div>

        <div class="noctem-privacy__back" data-aos="fade-up">
          <NuxtLink to="/#contact" class="noctem-privacy__back-link">
            Volver al contacto
          </NuxtLink>
        </div>
      </div>
    </main>

    <NoctemFooter />
  </div>
</template>

<script setup lang="ts">
const email = 'mamadouxph@gmail.com'

useHead({
  title: 'Política de Privacidad | Noctem Studio',
  meta: [
    { name: 'description', content: 'Política de privacidad de Noctem Studio. Conoce cómo tratamos tus datos personales en nuestro formulario de contacto.' }
  ]
})
</script>

<style lang="scss" scoped>
.noctem-privacy {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-black-rich);

  &__main {
    flex: 1;
    padding: 12rem 1.5rem 6rem;

    @media (min-width: 1024px) {
      padding: 14rem 3rem 8rem;
    }
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
    margin-bottom: 4rem;
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
    font-size: 2.5rem;
    color: var(--color-cream);
    line-height: 1.1;
    margin-bottom: 1.5rem;

    @media (min-width: 1024px) {
      font-size: 3.5rem;
    }

    strong {
      font-style: italic;
      color: var(--color-orange-bulb);
      text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
      font-weight: 600;
    }
  }

  &__line {
    width: 80px;
    height: 1px;
    background-color: var(--color-orange-glow-strong);
    margin-bottom: 1.5rem;
  }

  &__date {
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--color-gray-warm);
    font-weight: 300;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  &__section {
    &-title {
      font-family: var(--font-display);
      font-size: 1.5rem;
      color: var(--color-cream);
      margin-bottom: 1.25rem;
      font-weight: 500;
    }
  }

  &__text {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: rgba(196, 189, 181, 0.75);
    line-height: 1.7;
    font-weight: 300;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin: 1rem 0 1.5rem 1.25rem;

    li {
      font-family: var(--font-body);
      font-size: 0.9375rem;
      color: rgba(196, 189, 181, 0.75);
      line-height: 1.7;
      font-weight: 300;

      strong {
        color: var(--color-cream);
        font-weight: 500;
      }
    }
  }

  &__link {
    color: var(--color-orange-bulb);
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  &__back {
    text-align: center;
    margin-top: 5rem;
  }

  &__back-link {
    display: inline-block;
    font-family: var(--font-body);
    font-size: 0.875rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-orange-bulb);
    text-decoration: none;
    padding: 1rem 2.5rem;
    border: 1px solid var(--color-orange-glow-strong);
    transition: background-color 0.5s ease, color 0.5s ease;

    &:hover {
      background-color: var(--color-orange-bulb);
      color: var(--color-black-deep);
    }
  }
}
</style>
