# Projects Overview

This section covers the applications and demo projects in the Batman R3F Workspace.

## 🚀 Available Projects

### R3F StarterKit

A comprehensive demonstration application showcasing all workspace capabilities.

**Features:**

- Modern React Three Fiber setup
- Integration with all workspace packages
- Advanced 3D scenes and interactions
- Batman automation integration
- Performance optimization examples

[View R3F StarterKit Documentation →](./r3f-starterkit)

## 🛠️ Project Development

### Creating New Projects

1. **Create project directory:**

   ```bash
   mkdir projects/my-new-project
   cd projects/my-new-project
   ```

2. **Initialize project:**

   ```bash
   npm init -y
   ```

3. **Configure as workspace member:**

   ```json
   {
     "name": "my-new-project",
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

4. **Add to workspace:**

   The project will automatically be included in the workspace workspaces configuration.

### Project Structure

All projects follow this recommended structure:

```text
projects/my-project/
├── src/
│   ├── components/       # React components
│   ├── modules/          # Feature modules
│   ├── utils/            # Project-specific utilities
│   ├── helpers/          # Helper functions
│   ├── pages/            # Page components
│   ├── models/           # 3D models and assets
│   ├── assets/           # Static assets
│   └── App.jsx           # Main application
├── public/               # Public assets
├── package.json          # Project configuration
├── vite.config.js        # Build configuration
└── README.md             # Project documentation
```

## 🎯 Development Workflow

### Starting Development

```bash
# Start all projects
npm run dev

# Start specific project
cd projects/R3f-StarterKit
npm run dev

# Use Batman power
npm run batman:enhanced
```

### Building Projects

```bash
# Build all projects
npm run build

# Build specific project
cd projects/my-project
npm run build
```

### Testing Projects

```bash
# Test all projects
npm run test

# Test specific project
cd projects/my-project
npm run test
```

## 🔧 Configuration Standards

### Vite Configuration

All projects use standardized Vite configuration:

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@modules": fileURLToPath(new URL("./src/modules", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@helpers": fileURLToPath(new URL("./src/helpers", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@models": fileURLToPath(new URL("./src/models", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
```

### ESLint Configuration

```javascript
// eslint.config.js
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default [
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      "react": require("eslint-plugin-react"),
      "react-hooks": require("eslint-plugin-react-hooks"),
      "react-refresh": require("eslint-plugin-react-refresh"),
      "jsx-a11y": require("eslint-plugin-jsx-a11y"),
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
];
```

## 🎨 UI Integration

### Using Workspace UI Components

```jsx
import { Button, Panel, ControlGroup } from "@r3f-workspace/ui";
import { Canvas } from "@react-three/fiber";

function MyProject() {
  return (
    <div>
      <Panel title='Project Controls'>
        <ControlGroup direction='horizontal'>
          <Button variant='primary'>Start</Button>
          <Button variant='secondary'>Reset</Button>
        </ControlGroup>
      </Panel>

      <Canvas>{/* Your 3D scene */}</Canvas>
    </div>
  );
}
```

### Using Workspace Utilities

```jsx
import { useFrame } from "@react-three/fiber";
import { mathUtils, performance } from "@r3f-workspace/utils";

function AnimatedScene() {
  const monitor = performance.createMonitor();

  useFrame(state => {
    monitor.track("sceneUpdate", () => {
      const time = state.clock.getElapsedTime();
      const smoothTime = mathUtils.smoothstep(0, 1, time % 1);
      // Use smoothTime for animations
    });
  });

  return <group>{/* Your animated objects */}</group>;
}
```

## 🦇 Batman Integration

All projects benefit from Batman automation:

### Development Commands

```bash
# Start project with Batman
npm run batman:vscode

# Build with Batman
npm run batman:auto

# Complete workflow
npm run batman:ultimate
```

### Project-Specific Batman Tasks

You can create project-specific Batman configurations by adding custom scripts to your project's `package.json`:

```json
{
  "scripts": {
    "batman:project": "npm run build && npm run test && npm run preview"
  }
}
```

## 📈 Project Roadmap

### Current Projects

- **R3F StarterKit**: Complete demo application ✅
- **Documentation Site**: VitePress documentation ✅

### Planned Projects

- **Component Showcase**: Interactive component gallery
- **Performance Benchmark**: Performance testing suite
- **3D Model Viewer**: Generic 3D model viewing application
- **Game Template**: Basic game framework template

## 🤝 Contributing

### Adding New Projects

1. Follow the project structure guidelines
2. Use workspace packages for shared functionality
3. Include comprehensive README documentation
4. Add appropriate tests
5. Integrate with Batman automation system

### Project Standards

- Use TypeScript where applicable
- Follow accessibility guidelines
- Implement proper error boundaries
- Include performance monitoring
- Document all public APIs

For detailed development guidelines, see the [Development Workflow](../guide/development-workflow) guide.
