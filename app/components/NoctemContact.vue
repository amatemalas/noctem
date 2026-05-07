<template>
  <section id="contact" class="noctem-contact">
    <div class="noctem-contact__bg">
      <div class="noctem-contact__glow" />
      <div class="noctem-contact__glow-2" />
    </div>

    <div class="noctem-contact__container">
      <div class="noctem-contact__grid">
        <div class="noctem-contact__info">
          <span class="noctem-contact__label fade-up">Contacto</span>

          <h2 class="noctem-contact__title">
            <span class="fade-up" style="animation-delay: 0.15s">Creemos</span>
            <span class="noctem-contact__title-accent fade-up" style="animation-delay: 0.25s">juntos</span>
          </h2>

          <div class="noctem-contact__line line-draw" style="animation-delay: 0.4s" />

          <p class="noctem-contact__text fade-up" style="animation-delay: 0.5s">
            Con base en Mallorca, disponibles en todo el mundo. Aceptamos un número limitado de
            proyectos cada temporada para garantizar la profundidad de atención que cada historia merece.
          </p>

          <div class="noctem-contact__details fade-up" style="animation-delay: 0.65s">
            <div class="noctem-contact__detail">
              <span class="noctem-contact__detail-label">Email</span>
              <a href="mailto:hello@noctem.studio" class="noctem-contact__detail-value orange-line-hover">
                hello@noctem.studio
              </a>
            </div>
            <div class="noctem-contact__detail">
              <span class="noctem-contact__detail-label">Ubicación</span>
              <span class="noctem-contact__detail-value">Palma de Mallorca, España</span>
            </div>
            <div class="noctem-contact__detail">
              <span class="noctem-contact__detail-label">Social</span>
              <a href="#" class="noctem-contact__detail-value orange-line-hover">@noctem.studio</a>
            </div>
          </div>
        </div>

        <div class="noctem-contact__form-wrap">
          <form class="noctem-contact__form fade-up" style="animation-delay: 0.6s">
            <div class="noctem-contact__field">
              <label for="name" class="noctem-contact__label-field">Nombre</label>
              <input
                id="name"
                type="text"
                class="noctem-contact__input"
                placeholder="Tu nombre"
              />
            </div>

            <div class="noctem-contact__field">
              <label for="email" class="noctem-contact__label-field">Email</label>
              <input
                id="email"
                type="email"
                class="noctem-contact__input"
                placeholder="tu@email.com"
              />
            </div>

            <div class="noctem-contact__field">
              <label for="message" class="noctem-contact__label-field">Mensaje</label>
              <textarea
                id="message"
                rows="5"
                class="noctem-contact__textarea"
                placeholder="Cuéntanos sobre tu proyecto..."
              />
            </div>

            <button type="submit" class="noctem-contact__submit">
              <span class="noctem-contact__submit-text">Enviar Mensaje</span>
              <span class="noctem-contact__submit-bg" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.noctem-contact {
  position: relative;
  padding: 8rem 0;
  background-color: var(--color-black-rich);
  overflow: hidden;
}

@media (min-width: 1024px) {
  .noctem-contact {
    padding: 11rem 0;
  }
}

.noctem-contact__bg {
  position: absolute;
  inset: 0;
}

.noctem-contact__glow {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-orange-glow-xlight) 0%, transparent 70%);
  animation: pulseGlow 8s ease-in-out infinite;
}

.noctem-contact__glow-2 {
  position: absolute;
  top: -20%;
  left: 0;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-orange-glow-soft) 0%, transparent 70%);
  animation: floatSlow 10s ease-in-out infinite;
  pointer-events: none;
}

.noctem-contact__container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 10;
}

@media (min-width: 1024px) {
  .noctem-contact__container {
    padding: 0 3rem;
  }
}

.noctem-contact__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

@media (min-width: 1024px) {
  .noctem-contact__grid {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
  }
}

@media (min-width: 1280px) {
  .noctem-contact__grid {
    gap: 8rem;
  }
}

.noctem-contact__info {
  position: relative;
}

.noctem-contact__label {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-orange-bulb);
  margin-bottom: 1.5rem;
}

.noctem-contact__title {
  font-family: var(--font-display);
  font-size: 3rem;
  color: var(--color-cream);
  line-height: 1.05;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .noctem-contact__title {
    font-size: 3.75rem;
  }
}

@media (min-width: 1280px) {
  .noctem-contact__title {
    font-size: 4.5rem;
  }
}

.noctem-contact__title-accent {
  font-style: italic;
  color: var(--color-orange-bulb);
  text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
}

.noctem-contact__line {
  height: 1px;
  background-color: var(--color-orange-glow-strong);
  margin-bottom: 2.5rem;
  max-width: 80px;
}

.noctem-contact__text {
  font-family: var(--font-body);
  font-size: 1rem;
  color: rgba(196, 189, 181, 0.7);
  line-height: 1.625;
  font-weight: 300;
  margin-bottom: 3.5rem;
}

@media (min-width: 1024px) {
  .noctem-contact__text {
    font-size: 1.125rem;
  }
}

.noctem-contact__details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.noctem-contact__detail {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.noctem-contact__detail-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-gray-warm);
}

.noctem-contact__detail-value {
  font-family: var(--font-display);
  font-size: 1.125rem;
  color: var(--color-cream);
}

a.noctem-contact__detail-value {
  transition: color 0.5s ease;
}

a.noctem-contact__detail-value:hover {
  color: var(--color-orange-bulb);
}

.noctem-contact__form-wrap {
  position: relative;
}

.noctem-contact__form {
  padding: 2.5rem;
  border: 1px solid var(--color-black-border);
  background-color: rgba(17, 17, 17, 0.5);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .noctem-contact__form {
    padding: 3rem;
  }
}

.noctem-contact__field {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.noctem-contact__label-field {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-gray-warm);
}

.noctem-contact__input,
.noctem-contact__textarea {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-black-border);
  padding: 0.75rem 0;
  font-family: var(--font-body);
  color: var(--color-cream);
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
}

.noctem-contact__input::placeholder,
.noctem-contact__textarea::placeholder {
  color: rgba(138, 130, 121, 0.3);
}

.noctem-contact__input:focus,
.noctem-contact__textarea:focus {
  outline: none;
  border-color: var(--color-orange-glow-deep);
  box-shadow: 0 2px 0 var(--color-orange-glow-deep);
}

.noctem-contact__textarea {
  resize: none;
}

.noctem-contact__submit {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  margin-top: 1rem;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--color-orange-glow-strong);
  background: transparent;
  transition: border-color 0.5s ease;
}

.noctem-contact__submit-bg {
  position: absolute;
  inset: 0;
  background-color: var(--color-orange-bulb);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.7s var(--ease-out-expo);
}

.noctem-contact__submit:hover .noctem-contact__submit-bg {
  transform: scaleX(1);
}

.noctem-contact__submit-text {
  position: relative;
  z-index: 10;
  font-family: var(--font-body);
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-orange-bulb);
  transition: color 0.5s ease;
}

.noctem-contact__submit:hover .noctem-contact__submit-text {
  color: var(--color-black-deep);
}
</style>
