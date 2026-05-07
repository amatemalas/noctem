<template>
  <canvas ref="threejsCanvas" class="three-lens-model__canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let lensModel: THREE.Group | null = null
let animationFrameId: number

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
  camera.position.set(0, -1.2, 5)

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: threejsCanvas.value,
    antialias: true,
    alpha: true,
  })
  renderer.setClearColor(0x000000, 0)
  renderer.setSize(threejsCanvas.value.clientWidth, threejsCanvas.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true

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

  // Load model
  const loader = new GLTFLoader()
  loader.load('/assets/models/camera_lens.glb', (gltf) => {
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

    scene.add(lensModel)

    // Setup scroll animation
    setupScrollAnimation()
  })

  // Animation loop
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)

    // Gentle auto-rotation when not scrolling
    // if (lensModel) {
    //   lensModel.rotation.z += 0.001
    // }

    renderer.render(scene, camera)
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

  return () => {
    window.removeEventListener('resize', handleResize)
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
      y: -1.1,
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
.three-lens-model__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>
