<template>
  <div class="three-lens-model__wrapper">
    <canvas ref="threejsCanvas" class="three-lens-model__canvas" />

    <div v-if="!isLoaded" class="three-lens-model__overlay">
      <div class="three-lens-model__spinner" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  triggerElement: HTMLElement | null
}

const props = defineProps<Props>()

const threejsCanvas = ref<HTMLCanvasElement>()
const isLoaded = ref(false)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let lensModel: THREE.Group | null = null
let isVisible = ref(true)
let cachedScene: THREE.Group | null = null
let renderFrameId: number | null = null

const requestRender = () => {
  if (renderFrameId !== null) return
  renderFrameId = requestAnimationFrame(() => {
    renderFrameId = null
    if (isVisible.value && scene && camera && renderer) {
      renderer.render(scene, camera)
    }
  })
}

const setupThreeJS = () => {
  if (!threejsCanvas.value) return

  // Scene setup
  scene = new THREE.Scene()
  scene.background = null

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    threejsCanvas.value.clientWidth / threejsCanvas.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0.7, 5)

  // Renderer - optimized for low-power devices
  renderer = new THREE.WebGLRenderer({
    canvas: threejsCanvas.value,
    antialias: false,
    alpha: true,
    powerPreference: 'low-power',
    failIfMajorPerformanceCaveat: false,
  })
  renderer.setClearColor(0x000000, 0)
  renderer.setSize(threejsCanvas.value.clientWidth, threejsCanvas.value.clientHeight)
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5))
  renderer.shadowMap.enabled = false
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.info.autoReset = false

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 10, 7)
  scene.add(directionalLight)

  const accentLight = new THREE.DirectionalLight(0xff8c00, 0.4)
  accentLight.position.set(-5, 5, 5)
  scene.add(accentLight)

  // Load model — use cache if available
  if (cachedScene) {
    lensModel = cachedScene.clone(true)
    lensModel.scale.set(20, 20, 20)
    lensModel.position.set(0, 0, 0)
    lensModel.rotation.y = 0
    scene.add(lensModel)
    renderer.compile(scene, camera)
    isLoaded.value = true
    setupScrollAnimation()
  } else {
    const loader = new GLTFLoader()
    loader.load(
      '/assets/models/camera_lens.glb',
      (gltf) => {
        lensModel = gltf.scene
        lensModel.scale.set(20, 20, 20)
        lensModel.position.set(0, 0, 0)
        lensModel.rotation.y = 0

        // Fix transparency issues while preserving textures
        lensModel.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material]

        materials.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial ||
              material instanceof THREE.MeshPhysicalMaterial ||
              material instanceof THREE.MeshBasicMaterial) {

            let needsUpdate = false

            // Fix transparency issues that cause holes/missing parts
            if (material.transparent) {
              // If material is transparent but nearly opaque, make it fully opaque
              if (material.opacity > 0.95) {
                material.transparent = false
                material.opacity = 1.0
                needsUpdate = true
              }
              // If material has very low opacity creating holes, increase it
              else if (material.opacity < 0.1) {
                material.opacity = 0.9
                needsUpdate = true
              }
            }

            // Ensure proper rendering settings
            if (!material.depthWrite) {
              material.depthWrite = true
              needsUpdate = true
            }
            if (material.side !== THREE.FrontSide) {
              material.side = THREE.FrontSide
              needsUpdate = true
            }

            if (needsUpdate) {
              material.alphaTest = 0.1
              material.needsUpdate = true
            }
          }
        })
      }
    })

    cachedScene = gltf.scene.clone(true)

    scene.add(lensModel)

    // Pre-compile shaders during load to avoid first-render jank
    renderer.compile(scene, camera)

    isLoaded.value = true

    // Setup scroll animation
    setupScrollAnimation()
  },
  undefined,
  (error) => {
    console.error('Lens model failed to load', error)
  }
    )
  }

  requestRender()

  // Handle resize (throttled)
  let resizeTimer: number | null = null
  const handleResize = () => {
    if (resizeTimer) cancelAnimationFrame(resizeTimer)
    resizeTimer = requestAnimationFrame(() => {
      resizeTimer = null
      if (threejsCanvas.value) {
        const width = threejsCanvas.value.clientWidth
        const height = threejsCanvas.value.clientHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
        requestRender()
      }
    })
  }

  window.addEventListener('resize', handleResize)

  // Intersection Observer - pause rendering when not visible
  let observer: IntersectionObserver
  if (props.triggerElement) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const nowVisible = entry.isIntersecting
          isVisible.value = nowVisible
          if (nowVisible) requestRender()
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(props.triggerElement)
  }

  // Page visibility API - pause when tab hidden
  const handleVisibilityChange = () => {
    const nowVisible = !document.hidden
    isVisible.value = nowVisible
    if (nowVisible) requestRender()
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)

}

const setupScrollAnimation = () => {
  if (!lensModel || !props.triggerElement) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: props.triggerElement,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      pin: true,
      pinSpacing: true,
      markers: false,
    },
    onUpdate: requestRender,
  })

  tl.to(lensModel.rotation, {
    y: Math.PI / 2,
    z: Math.PI * 2,
    ease: 'none',
  }, 0)
    .to(lensModel.scale, {
      x: 90,
      y: 90,
      z: 90,
      ease: 'none',
    }, 0)
    .to(lensModel.position, {
      y: 0.9,
      ease: 'none',
    }, 0)
}

onMounted(() => {
  setupThreeJS()
})

onUnmounted(() => {
  if (renderFrameId !== null) cancelAnimationFrame(renderFrameId)
  if (renderer) renderer.dispose()
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<style scoped>
.three-lens-model__wrapper {
  position: absolute;
  inset: 0;
}

.three-lens-model__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}

.three-lens-model__overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(4, 4, 4, 0.18);
  backdrop-filter: blur(2px);
  z-index: 10;
}

.three-lens-model__spinner {
  width: 2.4rem;
  height: 2.4rem;
  border: 3px solid rgba(255, 255, 255, 0.18);
  border-top-color: rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
