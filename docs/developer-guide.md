# Developer Guide

Welcome to the R3F Workspace! This guide will help you get started with development in our React Three Fiber monorepo.

## Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd R3fWWW

# Install all dependencies
npm install

# Check compatibility
npm run check-compatibility

# Get workspace information
npm run workspace-info
```

### Development Workflow

```bash
# Start development servers for all packages
npm run dev

# Build all packages
npm run build

# Build with detailed reporting
npm run build:workspace

# Build with clean artifacts first
npm run build:clean

# Build all packages in parallel (faster)
npm run build:parallel

# Run tests across all packages
npm run test

# Lint and fix issues
npm run lint:fix

# Format code
npm run format
```

## Project Structure

```
R3fWWW/
├── packages/           # Shared packages
│   ├── ui/            # UI components
│   └── utils/         # Utility functions
├── projects/          # Individual applications
│   └── R3F-StarterKit/# React Three Fiber starter project
├── scripts/           # Build and automation scripts
├── docs/              # Documentation
└── ...
```

## Package Development

### Creating a New Package

1. Create a new directory in `packages/`:

```bash
mkdir packages/my-new-package
cd packages/my-new-package
```

2. Initialize with `package.json`:

```json
{
  "name": "@r3f-workspace/my-new-package",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js"
    }
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

3. Create source files in `src/`
4. Add to workspace by running `npm install` in the root

### Creating a New Project

1. Create a new directory in `projects/`:

```bash
mkdir projects/my-new-project
cd projects/my-new-project
```

2. Initialize with `package.json`:

```json
{
  "name": "my-new-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@r3f-workspace/ui": "workspace:*",
    "@r3f-workspace/utils": "workspace:*",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

## Build System

Our build system provides several utilities:

### Build Scripts

| Command                   | Description                                |
| ------------------------- | ------------------------------------------ |
| `npm run build`           | Build all packages using npm workspaces    |
| `npm run build:workspace` | Build with detailed progress and reporting |
| `npm run build:clean`     | Clean build artifacts first, then build    |
| `npm run build:parallel`  | Build all packages in parallel (faster)    |

### Build Features

- **Progress Tracking**: Real-time build progress for each package
- **Error Reporting**: Detailed error messages and logs
- **Build Reports**: Markdown reports saved to `docs/build-report.md`
- **Parallel Building**: Option to build packages simultaneously
- **Clean Builds**: Remove artifacts before building

### Build Configuration

Each package should have a `build` script in its `package.json`:

```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

## React Three Fiber Development

### Key Dependencies

- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers and abstractions
- **@react-three/postprocessing**: Post-processing effects
- **leva**: Debug controls
- **three**: 3D library

### Common Patterns

#### Basic Scene Setup

```jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color='orange' />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}
```

#### Using Leva Controls

```jsx
import { useControls } from "leva";

export function RotatingCube() {
  const { speed, color } = useControls({
    speed: { value: 1, min: 0, max: 5 },
    color: "#ff6b35",
  });

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
```

#### Performance Monitoring

```jsx
import { Perf } from "r3f-perf";

export default function Scene() {
  return (
    <Canvas>
      <Perf position='top-left' />
      {/* Your scene content */}
    </Canvas>
  );
}
```

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests for a specific package
cd packages/ui && npm run test

# Run tests in watch mode
npm run test -- --watch
```

### Test Configuration

Tests are configured with Vitest. Each package can have its own test configuration:

```javascript
// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.js"],
  },
});
```

## Code Quality

### Linting

```bash
# Check for lint errors
npm run lint

# Fix lint errors automatically
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format
```

### Pre-commit Hooks

The workspace uses Husky for pre-commit hooks that:

- Run ESLint on staged files
- Format code with Prettier
- Run type checking (if applicable)

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are installed: `npm install`
   - Clear node_modules and reinstall: `npm run fresh`
   - Check the build report in `docs/build-report.md`

2. **Version Conflicts**
   - Run compatibility check: `npm run check-compatibility`
   - Update Node.js/npm if needed
   - Check for conflicting package versions

3. **Import Errors**
   - Ensure packages are built before importing
   - Check `package.json` exports configuration
   - Verify workspace dependencies are correctly specified

### Debug Information

Get detailed workspace information:

```bash
# Generate workspace report
npm run workspace-info

# Check package compatibility
npm run check-compatibility
```

## Deployment

### Building for Production

```bash
# Clean build all packages
npm run build:clean

# Build with parallel processing
npm run build:parallel
```

### Publishing Packages

```bash
# Version packages (using changesets)
npm run version-packages

# Publish to npm
npm run release
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Run linting: `npm run lint:fix`
6. Commit changes: `git commit -m "Add my feature"`
7. Push to branch: `git push origin feature/my-feature`
8. Create a Pull Request

## Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [Leva Documentation](https://github.com/pmndrs/leva)
- [Vite Documentation](https://vitejs.dev/)

## Support

- Create an issue for bug reports or feature requests
- Join our Discord community (if available)
- Check the documentation in the `docs/` directory
