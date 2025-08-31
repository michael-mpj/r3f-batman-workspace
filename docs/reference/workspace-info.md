# Workspace Information Report

Generated: 8/31/2025, 5:56:32 AM

## Environment

- **Node.js**: v22.18.0
- **npm**: 10.9.3
- **Platform**: darwin (x64)
- **Working Directory**: /Users/michaeljoseph/Public/R3fWWW

## Workspace Overview

- **Name**: @r3f-workspace/monorepo
- **Version**: 1.0.0
- **Type**: module
- **Private**: Yes
- **Packages**: 3
- **Projects**: 1
- **Scripts**: 12

## Packages (3)

### @r3f-workspace/r3f-components

- **Version**: 1.0.0
- **Type**: module
- **Path**: packages/r3f-components
- **Description**: Advanced React Three Fiber components for 3D applications
- **Scripts**: 8 (build, dev, lint, lint:fix, test, test:ci, clean, format)
- **Dependencies**: 2
- **Dev Dependencies**: 7

### @r3f-workspace/ui

- **Version**: 1.0.0
- **Type**: module
- **Path**: packages/ui
- **Description**: Shared UI components for R3F applications
- **Scripts**: 7 (build, dev, test, lint, lint:fix, format, clean)
- **Dependencies**: 0
- **Dev Dependencies**: 9

### @r3f-workspace/utils

- **Version**: 1.0.0
- **Type**: module
- **Path**: packages/utils
- **Description**: Shared utilities for R3F applications
- **Scripts**: 8 (build, dev, lint, lint:fix, test, test:ci, clean, format)
- **Dependencies**: 1
- **Dev Dependencies**: 5

## Projects (1)

### r3f-starterkit

- **Version**: 0.0.0
- **Type**: module
- **Path**: projects/R3f-StarterKit
- **Description**:
- **Scripts**: 6 (dev, build, lint, lint:fix, preview, format)
- **Dependencies**: 13
- **Dev Dependencies**: 9

## Dependencies Overview

### Most Used Production Dependencies

- **@react-three/drei**: Used in 3 package(s)
- **three**: Used in 3 package(s)
- **@react-three/fiber**: Used in 2 package(s)
- **@react-three/postprocessing**: Used in 2 package(s)
- **leva**: Used in 2 package(s)
- **react**: Used in 2 package(s)
- **react-dom**: Used in 2 package(s)
- **@r3f-workspace/utils**: Used in 2 package(s)
- **@react-three/xr**: Used in 1 package(s)
- **tsx-to-jsx**: Used in 1 package(s)

### Most Used Development Dependencies

- **eslint**: Used in 5 package(s)
- **prettier**: Used in 5 package(s)
- **vite**: Used in 5 package(s)
- **@vitejs/plugin-react**: Used in 4 package(s)
- **rimraf**: Used in 4 package(s)
- **vitest**: Used in 4 package(s)
- **@testing-library/react**: Used in 3 package(s)
- **@testing-library/jest-dom**: Used in 2 package(s)
- **eslint-config-prettier**: Used in 2 package(s)
- **eslint-plugin-jsx-a11y**: Used in 2 package(s)

### Peer Dependencies

- **react**: Used in 2 package(s)
- **react-dom**: Used in 2 package(s)
- **@react-three/fiber**: Used in 1 package(s)
- **three**: Used in 1 package(s)

## Available Scripts (12)

- `add-headers.mjs`
- `batman-auto-close.mjs`
- `batman-enhanced.mjs`
- `batman-vscode.mjs`
- `batman.mjs`
- `build-workspace.mjs`
- `check-compatibility.mjs`
- `cleanup-terminals.mjs`
- `imbatman.js`
- `pre-command.mjs`
- `update-packages.mjs`
- `workspace-info.mjs`

## Workspace Commands

### Development

```bash
# Install all dependencies
npm install

# Run development servers for all packages
npm run dev

# Build all packages
npm run build

# Test all packages
npm run test
```

### Package Management

```bash
# Add dependency to workspace root
npm install package-name

# Add dependency to specific package
npm install package-name --workspace=packages/package-name

# Check for outdated packages
npm outdated
```

### Scripts

```bash
# Check compatibility
node scripts/check-compatibility.mjs

# Get workspace info
node scripts/workspace-info.mjs

# Build documentation
npm run docs:build
```
