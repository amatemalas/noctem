<template>
  <div class="noctem-mouse-pointer">
    <div ref="cursorDot" class="noctem-mouse-pointer__dot" />
    <div ref="cursorLogo" class="noctem-mouse-pointer__logo">
      <img
        src="/assets/images/RECURSOS_IG/ISOTIPO_PERFIL2.png"
        alt="Noctem"
        draggable="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const cursorDot = ref<HTMLDivElement>()
const cursorLogo = ref<HTMLDivElement>()

const mouse = reactive({ x: 0, y: 0 })
const pos = reactive({ x: 0, y: 0 })
const visible = ref(false)
const isTouch = ref(false)

let raf = 0

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const onMove = (e: MouseEvent) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
  if (!visible.value) {
    pos.x = mouse.x
    pos.y = mouse.y
    visible.value = true
  }
}

const onLeave = () => {
  visible.value = false
}

const tick = () => {
  pos.x = lerp(pos.x, mouse.x, 0.15)
  pos.y = lerp(pos.y, mouse.y, 0.15)

  if (cursorDot.value) {
    cursorDot.value.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`
  }

  if (cursorLogo.value) {
    cursorLogo.value.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${visible.value ? 1 : 0})`
    cursorLogo.value.style.opacity = visible.value ? '1' : '0'
  }

  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  isTouch.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (isTouch.value) return

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseleave', onLeave)
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (isTouch.value) return

  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseleave', onLeave)
  cancelAnimationFrame(raf)
})
</script>

<style lang="scss" scoped>
.noctem-mouse-pointer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  pointer-events: none;

  &__dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 6px;
    height: 6px;
    background-color: var(--color-orange-bulb);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    will-change: transform;
    z-index: 2;
  }

  &__logo {
    position: fixed;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    transform: translate(-50%, -50%) scale(0);
    will-change: transform, opacity;
    transition: opacity 0.3s ease, transform 0.4s var(--ease-out-expo);
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
