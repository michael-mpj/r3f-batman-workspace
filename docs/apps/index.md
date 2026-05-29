# Apps Overview

This section covers **deployable applications** in the Batman R3F Workspace.

## 🌐 Current Apps

### cyber-forge

`apps/cyber-forge` is a deployable app surface built on workspace packages and shared tooling.

## 📌 Folder Convention

Use this decision rule:

- Put starter kits, references, and experiments in `projects/`
- Put deployable user-facing applications in `apps/`

This keeps development templates separate from production-oriented app surfaces.

## 🛠️ Creating a New App

1. **Create app directory:**

   ```bash
   mkdir apps/my-new-app
   cd apps/my-new-app
   ```

2. **Initialize app package:**

   ```bash
   npm init -y
   ```

3. **Use workspace packages:**

   ```json
   {
     "name": "my-new-app",
     "private": true,
     "type": "module",
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     },
     "dependencies": {
       "@r3f-workspace/ui": "workspace:*",
       "@r3f-workspace/utils": "workspace:*",
       "@r3f-workspace/r3f-components": "workspace:*"
     }
   }
   ```

4. **Run app locally:**

   ```bash
   npm run dev --workspace=apps/my-new-app
   ```

## 🚀 Deployment

Apps are expected to be deployable with the same shared workspace conventions used by existing app scripts.
