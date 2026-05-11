<template>
  <section id="contact" class="noctem-contact">
    <div class="noctem-contact__bg">
      <div class="noctem-contact__glow" />
      <div class="noctem-contact__glow-2" />
    </div>

    <div class="noctem-contact__container">
      <div class="noctem-contact__grid">
        <div class="noctem-contact__info" data-aos="fade-right">
          <span class="noctem-contact__label">Contacto</span>

          <h2 class="noctem-contact__title">
            <span>Creemos&nbsp;</span>
            <span class="noctem-contact__title-accent">juntos</span>
          </h2>

          <div class="noctem-contact__line" />

          <p class="noctem-contact__text">
            Con base en Mallorca, disponibles en todo el mundo. Aceptamos un número limitado de
            proyectos cada temporada para garantizar la profundidad de atención que cada historia merece.
          </p>

          <div class="noctem-contact__details">
            <div class="noctem-contact__detail">
              <span class="noctem-contact__detail-label">Email</span>
              <a href="mailto:mamadouxph@gmail.com" class="noctem-contact__detail-value orange-line-hover">
                mamadouxph@gmail.com
              </a>
            </div>
            <div class="noctem-contact__detail">
              <span class="noctem-contact__detail-label">Ubicación</span>
              <span class="noctem-contact__detail-value">Palma de Mallorca, España</span>
            </div>
            <div class="noctem-contact__detail">
              <span class="noctem-contact__detail-label">Social</span>
              <a href="https://www.instagram.com/noctem.st" target="_blank" class="noctem-contact__detail-value orange-line-hover">@noctem.st</a>
            </div>
          </div>
        </div>

        <div class="noctem-contact__form-wrap" data-aos="fade-left" data-aos-delay="200">
          <form class="noctem-contact__form" @submit.prevent="handleSubmit">
            <div class="noctem-contact__field">
              <label for="name" class="noctem-contact__label-field">Nombre</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                :class="['noctem-contact__input', { 'noctem-contact__input--error': errors.name }]"
                placeholder="Tu nombre"
                @blur="validateField('name')"
              />
              <span v-if="errors.name" class="noctem-contact__error">{{ errors.name }}</span>
            </div>

            <div class="noctem-contact__field">
              <label for="email" class="noctem-contact__label-field">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                :class="['noctem-contact__input', { 'noctem-contact__input--error': errors.email }]"
                placeholder="tu@email.com"
                @blur="validateField('email')"
              />
              <span v-if="errors.email" class="noctem-contact__error">{{ errors.email }}</span>
            </div>

            <div class="noctem-contact__field">
              <label for="message" class="noctem-contact__label-field">Mensaje</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                :class="['noctem-contact__textarea', { 'noctem-contact__textarea--error': errors.message }]"
                placeholder="Cuéntanos sobre tu proyecto..."
                @blur="validateField('message')"
              />
              <span v-if="errors.message" class="noctem-contact__error">{{ errors.message }}</span>
            </div>

            <button type="submit" class="noctem-contact__submit" :disabled="isSubmitting">
              <span class="noctem-contact__submit-text">{{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}</span>
              <span class="noctem-contact__submit-bg" />
            </button>

            <Transition name="fade">
              <div v-if="notification" :class="['noctem-contact__notification', `noctem-contact__notification--${notification.type}`]">
                {{ notification.message }}
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const errors = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const notification = ref(null)
let notificationTimer = null

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateField = (field) => {
  if (field === 'name') {
    errors.value.name = form.value.name.trim() ? '' : 'El nombre es obligatorio'
  }
  if (field === 'email') {
    if (!form.value.email.trim()) {
      errors.value.email = 'El email es obligatorio'
    } else if (!emailRegex.test(form.value.email)) {
      errors.value.email = 'Introduce un email válido'
    } else {
      errors.value.email = ''
    }
  }
  if (field === 'message') {
    errors.value.message = form.value.message.trim() ? '' : 'El mensaje es obligatorio'
  }
}

const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('message')
  return !errors.value.name && !errors.value.email && !errors.value.message
}

const showNotification = (type, message) => {
  if (notificationTimer) clearTimeout(notificationTimer)
  notification.value = { type, message }
  notificationTimer = setTimeout(() => {
    notification.value = null
  }, 5000)
}

const handleSubmit = async () => {
  if (isSubmitting.value) return

  if (!validateForm()) {
    showNotification('error', 'Por favor, completa todos los campos correctamente')
    return
  }

  isSubmitting.value = true

  const body = {
    form_id: 1,
    content: form.value
  }

  try {
    await $fetch('/api/contacts', {
      method: 'POST',
      body
    })

    showNotification('success', 'Mensaje enviado exitosamente')
    form.value = { name: '', email: '', message: '' }
    errors.value = { name: '', email: '', message: '' }
  } catch (error) {
    showNotification('error', 'Error al enviar el mensaje. Intenta de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

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
  width: fit-content;
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

.noctem-contact__input--error,
.noctem-contact__textarea--error {
  border-color: #f87171;
}

.noctem-contact__input--error:focus,
.noctem-contact__textarea--error:focus {
  box-shadow: 0 2px 0 #f87171;
}

.noctem-contact__error {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: #f87171;
  margin-top: 0.25rem;
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

.noctem-contact__notification {
  padding: 1rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
}

.noctem-contact__notification--success {
  background-color: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: #4ade80;
}

.noctem-contact__notification--error {
  background-color: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #f87171;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
