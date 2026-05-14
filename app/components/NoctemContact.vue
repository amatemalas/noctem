<template>
  <section id="contact" class="noctem-contact">
    <div class="noctem-contact__bg">
      <div class="noctem-contact__glow" />
      <div class="noctem-contact__glow-2" />
    </div>

    <div class="noctem-contact__container">
      <div class="noctem-contact__grid">
        <div class="noctem-contact__info" data-aos="fade-right">
          <span class="noctem-contact__label">{{ content?.contact_title ? 'Contacto' : 'Contacto' }}</span>

          <h2 class="noctem-contact__title" v-html="content?.contact_title || 'Creemos <strong>juntos</strong>'" />

          <div class="noctem-contact__line" />

          <div class="noctem-contact__text" v-html="content?.contact_description || 'Con base en Mallorca, disponibles en todo el mundo. Aceptamos un número limitado de proyectos cada temporada para garantizar la profundidad de atención que cada historia merece.'" />

          <div class="noctem-contact__details">
            <div class="noctem-contact__detail">
              <span class="noctem-contact__detail-label">Email</span>
              <a :href="`mailto:${content?.contact_email || 'mamadouxph@gmail.com'}`" class="noctem-contact__detail-value orange-line-hover">
                {{ content?.contact_email || 'mamadouxph@gmail.com' }}
              </a>
            </div>
            <div class="noctem-contact__detail">
              <span class="noctem-contact__detail-label">Ubicación</span>
              <span class="noctem-contact__detail-value">{{ content?.contact_location || 'Palma de Mallorca, España' }}</span>
            </div>
            <div class="noctem-contact__detail">
              <span class="noctem-contact__detail-label">Social</span>
              <a :href="`https://www.instagram.com/${(content?.contact_social || '@noctem.st').replace('@', '')}`" target="_blank" class="noctem-contact__detail-value orange-line-hover">{{ content?.contact_social || '@noctem.st' }}</a>
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

<script setup lang="ts">
import { ref } from 'vue'

const config = useRuntimeConfig()

const props = defineProps<{
  content?: {
    contact_title?: string
    contact_description?: string
    contact_email?: string
    contact_location?: string
    contact_social?: string
  }
}>()

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
    await $fetch(`${config.public.apiEndpoint}/contacts`, {
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

<style lang="scss" scoped>
.noctem-contact {
  position: relative;
  padding: 8rem 0;
  background-color: var(--color-black-rich);
  overflow: hidden;

  @media (min-width: 1024px) {
    padding: 11rem 0;
  }

  &__bg {
    position: absolute;
    inset: 0;
  }

  &__glow {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--color-orange-glow-xlight) 0%, transparent 70%);
    animation: pulseGlow 8s ease-in-out infinite;

    &-2 {
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
  }

  &__container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 10;

    @media (min-width: 1024px) {
      padding: 0 3rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4rem;

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
      gap: 6rem;
    }

    @media (min-width: 1280px) {
      gap: 8rem;
    }
  }

  &__info {
    position: relative;
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
    font-size: 3rem;
    color: var(--color-cream);
    line-height: 1.05;
    margin-bottom: 2rem;

    @media (min-width: 1024px) {
      font-size: 3.75rem;
    }

    @media (min-width: 1280px) {
      font-size: 4.5rem;
    }

    &-accent {
      font-style: italic;
      color: var(--color-orange-bulb);
      text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
    }

    strong {
      font-style: italic;
      color: var(--color-orange-bulb);
      text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
    }

    b {
      font-style: italic;
      color: var(--color-orange-bulb);
      text-shadow: 0 0 40px var(--color-orange-glow-strong), 0 0 80px var(--color-orange-glow);
    }
  }

  &__line {
    height: 1px;
    background-color: var(--color-orange-glow-strong);
    margin-bottom: 2.5rem;
    max-width: 80px;
  }

  &__text {
    font-family: var(--font-body);
    font-size: 1rem;
    color: rgba(196, 189, 181, 0.7);
    line-height: 1.625;
    font-weight: 300;
    margin-bottom: 3.5rem;

    @media (min-width: 1024px) {
      font-size: 1.125rem;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__detail {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    &-label {
      font-family: var(--font-body);
      font-size: 0.75rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--color-gray-warm);
    }

    &-value {
      font-family: var(--font-display);
      font-size: 1.125rem;
      color: var(--color-cream);
      width: fit-content;
    }
  }

  &__form-wrap {
    position: relative;
  }

  &__form {
    padding: 2.5rem;
    border: 1px solid var(--color-black-border);
    background-color: rgba(17, 17, 17, 0.5);
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 1024px) {
      padding: 3rem;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__label-field {
    font-family: var(--font-body);
    font-size: 0.75rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--color-gray-warm);
  }

  &__input,
  &__textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--color-black-border);
    padding: 0.75rem 0;
    font-family: var(--font-body);
    color: var(--color-cream);
    transition: border-color 0.5s ease, box-shadow 0.5s ease;

    &::placeholder {
      color: rgba(138, 130, 121, 0.3);
    }

    &:focus {
      outline: none;
      border-color: var(--color-orange-glow-deep);
      box-shadow: 0 2px 0 var(--color-orange-glow-deep);
    }

    &--error {
      border-color: #f87171;

      &:focus {
        box-shadow: 0 2px 0 #f87171;
      }
    }
  }

  &__textarea {
    resize: none;
  }

  &__error {
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: #f87171;
    margin-top: 0.25rem;
  }

  &__submit {
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

    &-bg {
      position: absolute;
      inset: 0;
      background-color: var(--color-orange-bulb);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.7s var(--ease-out-expo);
    }

    &-text {
      position: relative;
      z-index: 10;
      font-family: var(--font-body);
      font-size: 0.875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-orange-bulb);
      transition: color 0.5s ease;
    }

    &:hover {
      .noctem-contact__submit-bg {
        transform: scaleX(1);
      }

      .noctem-contact__submit-text {
        color: var(--color-black-deep);
      }
    }
  }

  &__notification {
    padding: 1rem 1.5rem;
    font-family: var(--font-body);
    font-size: 0.875rem;
    text-align: center;
    margin-top: 1rem;

    &--success {
      background-color: rgba(34, 197, 94, 0.15);
      border: 1px solid rgba(34, 197, 94, 0.4);
      color: #4ade80;
    }

    &--error {
      background-color: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #f87171;
    }
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }
}

a.noctem-contact__detail-value {
  transition: color 0.5s ease;

  &:hover {
    color: var(--color-orange-bulb);
  }
}
</style>
