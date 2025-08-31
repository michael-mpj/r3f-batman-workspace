# 📋 R3F Workspace Monorepo – Project Board

A progress tracker for enhancements & improvements to the R3F monorepo.
Organized into **To Do → In Progress → Done**.

---

## 🟢 To Do

- Monorepo setup with **Turborepo/Nx**.
- Restructure into `apps/` and `packages/`.
- Centralize configs (`eslint`, `prettier`, `tsconfig`, `vite.config`).
- Strict TypeScript with path aliases (`@core`, `@ui`, etc.).
- Enforce ESLint + Prettier + Stylelint.
- Add Husky + lint-staged + commitlint.
- Setup VSCode settings & extensions.
- Add GitHub Actions (lint + test on PR).
- Create shared `@r3f-components` package (Scene, Camera, Lighting, Loader).
- Build hooks (`useGLTFLoader`, `useAnimations`, `useScrollControls`).
- Optimize render loop (`frameloop="demand"`).
- Add Draco/glTF compression.
- Integrate **R3F Perf Monitor**.
- Lazy-load heavy assets (GLTF, textures).
- Unit tests with Vitest + React Testing Library.
- Snapshot tests for GLTF models.
- Playwright tests for 3D interactions.
- Setup **Storybook** for components.
- Generate **Typedoc** API docs.
- Add Zustand/Jotai store in `@store` package.
- Integrate Zustand Devtools.
- Add SSR/SSG support with Next.js (optional).
- Code splitting & bundle analysis.
- Deploy apps to Vercel/Netlify with preview builds.
- Auto-publish packages via **changesets + npm**.
- CI/CD automation: build + test + deploy + publish.
- Coverage reporting with Codecov.
- CDN caching for models/textures.
- Precompute lightmaps & AO.
- Add error boundaries + fallback Canvas UI.
- Live asset reload (GLTF/Textures hot reload).
- Publish VSCode snippets (Canvas, lighting, loaders).
- Introduce design tokens shared across UI + R3F.

---

## 🟡 In Progress

_(Move items here as they’re being worked on)_

---

## 🔵 Done

_(Move completed tasks here)_

---

✅ This board can be synced with GitHub Projects if desired — copy items into **issues** and track them automatically.
