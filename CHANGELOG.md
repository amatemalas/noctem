# Changelog

## 0.2.0 (2026-07-03)

### Enhancements
- **3d**: On-demand rendering via `requestRender` — no persistent animation loop, only renders when visible
- **3d**: Pre-compile shaders with `renderer.compile()` on model load to eliminate first-render jank
- **3d**: Throttled resize handler using `requestAnimationFrame` instead of direct calls
- **3d**: Reduced pixel ratio on mobile (1.0) to save GPU resources
- **3d**: Replaced `PointLight` with `DirectionalLight` for cheaper lighting
- **3d**: Disabled shadow maps on all directional lights
- **3d**: Conditional material `needsUpdate` — only flag when properties actually change
- **3d**: Intelligent caching — cloned cached scene on subsequent navigations to avoid re-parsing GLB

## 0.1.1 (2026-07-01)

### Enhancements
- **nav**: Scroll threshold for sticky nav to prevent premature sticking
- **3d**: Lens model caching for improved performance across page navigation

## 0.1.0 (2026-06-30)

### Features
- **home**: Hero section with full-screen intro and CTA
- **home**: About section with studio philosophy and brand story
- **home**: Services section highlighting photography offerings
- **home**: Gallery component for portfolio showcase
- **home**: Plans/pricing section with tiered service options
- **home**: Contact form with validation and submission
- **home**: Footer with links, social, and legal info
- **work-detail**: Dynamic page at `/trabajos/[slug]` for individual projects
- **navigation**: Sticky nav bar with smooth scroll and mobile menu
- **3d**: Interactive camera lens model rendered with Three.js
- **content**: Dynamic content management via `useNoctemContent` composable with API backend
- **error**: Custom 404 error page with Japanese-inspired design
- **seo**: Robots meta configuration and sitemap support via `@nuxtjs/robots`
- **ci**: GitHub Actions workflows for dev deploy and production deploy

### Enhancements
- **animations**: Page transitions and scroll-triggered reveals using GSAP, Anime.js, and AOS
- **styling**: Tailwind CSS v4 with Japanese-inspired dark palette (navy, amber, soft white)
- **typography**: Playfair Display (display), DM Sans (body), Noto Serif JP (Japanese text)
- **icons**: SVG icon system via `@nuxt/icon`
- **images**: Optimized image loading with `@nuxt/image`
- **performance**: Optimized 3D model binary (camera lens GLB)

### Infrastructure
- **framework**: Nuxt 4 with Vue 3 and TypeScript
- **modules**: `@nuxt/icon`, `@nuxt/image`, `@nuxt/scripts`, `@nuxt/eslint`, `@nuxtjs/robots`
- **styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **config**: Runtime config for API endpoint with environment variable support
- **i18n**: Font preloads for Latin and Japanese character support
