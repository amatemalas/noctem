import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    
    if (isMobile) {
      return
    }

    AOS.init({
      duration: 800,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      once: true,
      offset: 120,
      delay: 0,
    })
  }
})