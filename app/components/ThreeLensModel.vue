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
let animationFrameId: number
let isVisible = ref(true)

let cachedScene: THREE.Group | null = null

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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.shadowMap.enabled = false
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.info.autoReset = false

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 10, 7)
  directionalLight.castShadow = true
  scene.add(directionalLight)

  const pointLight = new THREE.PointLight(0xff8c00, 0.5)
  pointLight.position.set(-5, 5, 5)
  scene.add(pointLight)

  // Load model — use cache if available
  if (cachedScene) {
    lensModel = cachedScene.clone(true)
    lensModel.scale.set(20, 20, 20)
    lensModel.position.set(0, 0, 0)
    lensModel.rotation.y = 0
    scene.add(lensModel)
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

            // Fix transparency issues that cause holes/missing parts
            if (material.transparent) {
              // If material is transparent but nearly opaque, make it fully opaque
              if (material.opacity > 0.95) {
                material.transparent = false
                material.opacity = 1.0
              }
              // If material has very low opacity creating holes, increase it
              else if (material.opacity < 0.1) {
                material.opacity = 0.9
              }
            }

            // Ensure proper rendering settings
            material.depthWrite = true
            material.side = THREE.FrontSide
            material.alphaTest = 0.1 // Small alpha test to prevent holes
            material.needsUpdate = true
          }
        })

        child.castShadow = true
        child.receiveShadow = true
      }
    })

    cachedScene = gltf.scene.clone(true)

    scene.add(lensModel)
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

  // Animation loop - only render when visible
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)

    if (isVisible.value && scene && camera && renderer) {
      renderer.render(scene, camera)
    }
  }
  animate()

  // Handle resize
  const handleResize = () => {
    if (threejsCanvas.value) {
      const width = threejsCanvas.value.clientWidth
      const height = threejsCanvas.value.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
  }

  window.addEventListener('resize', handleResize)

  // Intersection Observer - pause rendering when not visible
  let observer: IntersectionObserver
  if (props.triggerElement) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(props.triggerElement)
  }

  // Page visibility API - pause when tab hidden
  const handleVisibilityChange = () => {
    isVisible.value = !document.hidden
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)

  return () => {
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    if (observer) observer.disconnect()
    cancelAnimationFrame(animationFrameId)
    renderer.dispose()
  }
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
  if (renderer) {
    renderer.dispose()
  }
  cancelAnimationFrame(animationFrameId)
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
