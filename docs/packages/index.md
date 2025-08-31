# Packages Overview

The Batman R3F Workspace includes several shared packages that provide reusable components and utilities across projects.

## 📦 Available Packages

### @r3f-workspace/ui

React UI Components package provides a comprehensive set of reusable React components optimized for modern web applications.

#### UI Package Features

- Modern React components with TypeScript support
- Optimized for performance and accessibility
- Consistent design system integration
- Comprehensive documentation and examples

[📖 Read UI Package Documentation →](./ui.md)

### @r3f-workspace/utils

Mathematical utilities and helpers for Three.js and R3F development.

#### Utils Package Features

- **Math**: Advanced mathematical functions
- **Geometry**: Geometry manipulation utilities
- **Performance**: Performance monitoring and optimization
- **Terrain**: Terrain generation and manipulation

[📖 Read Utils Package Documentation →](./utils.md)

### @r3f-workspace/r3f-components

Advanced React Three Fiber components and abstractions.

#### R3F Components Features

- **Scene Management**: Scene orchestration components
- **Effects**: Post-processing and visual effects
- **Controls**: Camera and interaction controls
- **Optimization**: Performance-optimized R3F patterns

[📖 Read R3F Components Documentation →](./r3f-components.md)

## 🛠️ Package Development

### Using Packages in Projects

```bash
# Install workspace packages
npm install @r3f-workspace/ui @r3f-workspace/utils
```

```javascript
// Import in your project
import { Button, Panel } from "@r3f-workspace/ui";
import { mathUtils, performance } from "@r3f-workspace/utils";
```

### Contributing to Packages

1. **Navigate to package directory:**

   ```bash
   cd packages/ui  # or utils, r3f-components
   ```

2. **Make your changes**

3. **Test your changes:**

   ```bash
   npm run test
   npm run build
   ```

4. **Update version and publish**

## 🔧 Package Configuration

All packages follow consistent configuration patterns:

- **Build System**: Vite with library mode
- **Testing**: Vitest with jsdom environment
- **Linting**: ESLint with shared configuration
- **Formatting**: Prettier with workspace standards

## 📊 Package Health

| Package                       | Version | Build Status | Test Coverage | Documentation |
| ----------------------------- | ------- | ------------ | ------------- | ------------- |
| @r3f-workspace/ui             | 1.0.0   | ✅           | 🟡 Partial    | 📝 Basic      |
| @r3f-workspace/utils          | 1.0.0   | ✅           | 🟡 Partial    | 📝 Basic      |
| @r3f-workspace/r3f-components | 1.0.0   | ✅           | 🟡 Partial    | 📝 Basic      |

## 🚀 Quick Commands

```bash
# Build all packages
npm run build

# Test all packages
npm run test

# Lint all packages
npm run lint

# Format all packages
npm run format
```

## 🔍 Package Dependencies

### Dependency Management

- **Peer Dependencies**: React, React-DOM for UI packages
- **External Dependencies**: Three.js for 3D utilities
- **Internal Dependencies**: Cross-package workspace references

### Version Compatibility

All packages maintain compatibility with:

- **React**: ^19.0.0
- **Three.js**: ^0.179.1
- **Node.js**: >=20.0.0

## 📖 Further Reading

- [Development Workflow](../guide/development-workflow)
- [Package Compatibility](../guide/package-compatibility)
- [Getting Started](../guide/getting-started)
