# AGENTS.md

## Commands
- `pnpm run dev` - Start dev server at http://localhost:3000
- `pnpm run build` - Production build
- `pnpm run preview` - Preview production build locally
- `pnpm run generate` - Static site generation

## Project Structure
- App entrypoint: `app/app.vue` (Nuxt 4 app directory)
- Config: `nuxt.config.ts`
- Components: `app/components/*.vue`
- Styles: `app/assets/css/main.css`
- Modules: @nuxt/icon, @nuxt/image, @nuxt/scripts, @nuxt/eslint, @tailwindcss/vite

## Styles
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Custom theme with Japanese-inspired colors (black, orange accent)
- Fonts: Playfair Display (display), DM Sans (body), Noto Serif JP (Japanese)

## TypeScript
- Managed via Nuxt; no need to run `nuxi prepare` manually (runs as postinstall)
- tsconfig.json uses project references to `.nuxt/tsconfig.*.json`

## Default
- Always use pnpm to avoid security breaches
- Dev server runs on port 3000
- Compatibility date: 2025-07-15
- After every task, do not run the dev server, as the agent task may be frozen by it
- You can run build to check results, or preview. Everything not involved to a watcher server
- After every task, do not run the dev server, as the agent task may be frozen by it
- You can run build to check results. Everything not involved to a watcher server