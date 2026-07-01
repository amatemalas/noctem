# Noctem — Estudio de Fotografía Mallorca

Web corporativa de **Noctem**, un estudio de fotografía premium con sede en Palma de Mallorca. Especializado en retrato, bodas, editorial y producción de contenido mensual para marcas.

Construida con **Nuxt 4**, **Tailwind CSS v4** y animaciones con **GSAP** / **Three.js**.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Nuxt 4.4 (Vue 3, TypeScript) |
| Estilos | Tailwind CSS v4 + SCSS |
| Animación | GSAP (ScrollTrigger), AnimeJS, AOS |
| 3D | Three.js con modelo GLTF de lente de cámara |
| SEO | @nuxt/image, @nuxt/scripts, @nuxtjs/robots |
| Linting | @nuxt/eslint |

## Contenido

- **Hero** con modelo 3D interactivo de lente de cámara
- **Sobre nosotros** — filosofía *wabi-sabi*, estadísticas del estudio
- **Galería** — portafolio dinámico conectado a API REST
- **Servicios** — retrato, bodas, editorial, impresiones de arte
- **Planes** — packs mensuales de contenido (foto, vídeo, reels)
- **Contacto** — formulario con validación + envío a API

El contenido se obtiene desde una API externa con fallback a contenido estático en español.

## Scripts

```bash
pnpm run dev          # Servidor de desarrollo → localhost:3000
pnpm run build        # Build de producción
pnpm run generate     # Generación estática
pnpm run preview      # Preview del build
```

## Estilo

Paleta oscura con acento en dorado/anaranjado (#CC971F), tipografía *Playfair Display* para títulos, *DM Sans* para texto y *Noto Serif JP* para acentos japoneses. Textura de grano SVG superpuesta, scroll suave y animaciones de entrada con fade-up.
