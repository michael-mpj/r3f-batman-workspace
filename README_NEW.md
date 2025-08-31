# 🦇 R3F Batman Workspace

> **"A modern React Three Fiber monorepo with Batman-powered automation and shared packages"**

[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-%3E%3D10.0.0-blue.svg)](https://www.npmjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Three Fiber](https://img.shields.io/badge/R3F-8.13.7-purple.svg)](https://docs.pmnd.rs/react-three-fiber)
[![Batman Powered](https://img.shields.io/badge/🦇-Batman%20Powered-black.svg)](./scripts/README.md)

---

## 🌟 **What Makes This Special**

This isn't just another React Three Fiber workspace - it's a **Batman-powered development environment** featuring:

- 🦇 **Batman Automation Scripts** - Multi-terminal task orchestration
- 🧹 **Automatic Terminal Cleanup** - Never get stuck with sudo prompts again
- 🏗️ **Advanced Build System** - Parallel builds with intelligent dependency resolution
- 📦 **Scoped Package System** - Organized, reusable components and utilities
- 🚀 **Modern Tooling** - Vite, Vitest, Turbo, and cutting-edge R3F stack

---

## 🚀 **Quick Start**

````bash
```bash
git clone <your-repo-url>
cd R3fWWW

# Install dependencies (auto-cleans terminals)
npm install

# Start the Batman development environment
npm run batman:enhanced

# Or start development normally
npm run dev
````

```

---

## 🏗️ **Workspace Architecture**

```

@michael-mpj/r3f-batman/
├── 📦 packages/ # Shared Libraries
│ ├── ui/ # 🎨 UI Components (Button, Panel, ControlGroup)
│ ├── utils/ # 🛠️ Utilities (math, geometry, performance, terrain)
│ └── r3f-components/ # 🌟 Advanced R3F Components
├── 🚀 projects/ # Applications
│ └── R3f-StarterKit/ # Complete R3F demo application
├── 🤖 scripts/ # Batman Automation Arsenal
│ ├── batman.mjs # 🦇 Original Batman script
│ ├── batman-enhanced.mjs # 🦇🦇 Multi-terminal Batman
│ ├── batman-vscode.mjs # 🦇🦇🦇 VS Code Batman
│ ├── cleanup-terminals.mjs # 🧹 Terminal cleanup utility
│ ├── build-workspace.mjs # 🏗️ Advanced build system
│ └── [more automation scripts] # Additional utilities
├── 📚 docs/ # Documentation
├── 🔧 .github/ # GitHub Actions & Workflows
└── ⚙️ config files # ESLint, Prettier, Vite, etc.

````

---

## 🦇 **Batman Automation System**

### **Multi-Terminal Batman Editions**

| Edition | Command | Description | Best For |
|---------|---------|-------------|----------|
| 🦇 **Original** | `npm run batman` | Sequential task execution | CI/CD, Simple workflows |
| 🦇🦇 **Enhanced** | `npm run batman:enhanced` | Multi-terminal parallel | **Recommended for development** |
| 🦇🦇🦇 **VS Code** | `npm run batman:vscode` | VS Code integration | VS Code users |
| 🦇🦇🦇🦇 **Auto-Close** | `npm run batman:auto` | Clean workflow | Automated environments |
| 🦇🦇🦇🦇🦇 **Ultimate** | `npm run batman:ultimate` | All modes unified | Power users |

### **Batman Task Arsenal**

Each Batman edition manages these core tasks:

```bash
🛡️  Headers          # File header management
🔍 Compatibility     # Package compatibility analysis
🏗️  Build            # Workspace build system
🧪 Tests             # Test suite execution
🚀 Dev Server        # R3f StarterKit development
📦 Package Monitor   # Package update monitoring
````

### **Quick Batman Commands**

```bash
# Batman shortcuts
npm run 🦇           # Original Batman
npm run 🦇🦇         # Enhanced Batman (recommended)
npm run bat          # Quick alias
npm run imbatman     # Ultimate Batman

# Terminal cleanup (auto-included in all commands)
npm run cleanup      # Manual cleanup if needed
```

---

## 📦 **Package System**

### **🎨 @r3f-workspace/ui**

_Shared UI components optimized for 3D applications_

```javascript
import { Button, Panel, ControlGroup } from '@r3f-workspace/ui';

// Beautiful 3D-ready components with hover states and animations
<Button onClick={handleClick}>Launch 3D Scene</Button>
<Panel title="Controls">
  <ControlGroup orientation="vertical">
    {/* Your 3D controls */}
  </ControlGroup>
</Panel>
```

**Features:** Interactive buttons, flexible panels, grouped controls, TypeScript + JavaScript support

### **🛠️ @r3f-workspace/utils**

_Essential utilities for 3D development_

```javascript
import {
  mathUtils, // Vector operations, interpolation
  geometry, // Shape calculations, mesh utilities
  performance, // FPS monitoring, optimization
  terrain, // Procedural terrain generation
} from "@r3f-workspace/utils";

// Powerful 3D math and utilities
const smoothed = mathUtils.lerp(start, end, 0.1);
const fps = performance.getFPS();
const heightMap = terrain.generateHeightMap(256, 256);
```

**Features:** Advanced math operations, geometry helpers, performance monitoring, terrain generation

### **🌟 @r3f-workspace/r3f-components**

_Advanced React Three Fiber components_

```javascript
import { AdvancedScene, Effects, Controls } from "@r3f-workspace/r3f-components";

// Professional R3F components
<AdvancedScene>
  <Effects postprocessing bloom />
  <Controls orbital camera />
  {/* Your 3D content */}
</AdvancedScene>;
```

**Features:** Advanced R3F abstractions, post-processing, camera controls, scene management

---

## 🚀 **R3f StarterKit Project**

A complete React Three Fiber demonstration application featuring:

### **🎯 Core Features**

- **Interactive 3D Scene** with orbital controls
- **Post-processing Effects** with bloom and tone mapping
- **Performance Monitoring** with r3f-perf integration
- **Debug Controls** powered by Leva
- **Modern UI** using workspace UI components
- **Routing** with React Router DOM
- **Hot Reloading** for rapid development

### **🛠️ Tech Stack**

- **React Three Fiber** (8.13.7) - React renderer for Three.js
- **@react-three/drei** (9.109.5) - Useful helpers and abstractions
- **@react-three/postprocessing** (3.0.4) - Post-processing effects
- **@react-three/uikit** (0.8.21) - UI components for 3D
- **Leva** (0.10.0) - Beautiful debug controls
- **r3f-perf** (7.1.2) - Performance monitoring

### **🚀 Development**

```bash
# Start R3f StarterKit development
cd projects/R3f-StarterKit
npm run dev

# Or start from workspace root
npm run dev  # Starts all workspace dev servers
```

---

## 🛠️ **Advanced Build System**

### **🏗️ Build Orchestration**

```bash
# Smart building with dependency resolution
npm run build:workspace

# Parallel builds for speed
npm run build:parallel

# Clean builds (removes artifacts first)
npm run build:clean
```

### **🧠 Intelligence Features**

- **Automatic Dependency Resolution** - Builds packages in correct order
- **Parallel Execution** - 60% faster than sequential builds
- **Progress Tracking** - Real-time build status and timing
- **Error Recovery** - Comprehensive error reporting and recovery
- **Build Reports** - Detailed markdown reports in `docs/build-report.md`

### **📊 Build Targets**

The system automatically discovers and builds:

- ✅ All packages with build scripts (`packages/`)
- ✅ All projects with build scripts (`projects/`)
- ✅ Dependency-aware build ordering
- ✅ Turbo-powered caching and optimization

---

## 🧹 **Terminal Cleanup System**

Never get stuck with sudo prompts again! Every npm command includes automatic cleanup:

### **🎯 Auto-Cleanup**

```bash
npm run dev     # Auto-cleans terminals → runs dev
npm run build   # Auto-cleans terminals → builds workspace
npm run test    # Auto-cleans terminals → runs tests
npm run batman  # Auto-cleans terminals → runs Batman
```

### **🔧 Manual Cleanup**

```bash
npm run cleanup                    # Interactive cleanup
npm run cleanup-terminals --auto   # Silent cleanup
```

**What gets cleaned:**

- 🧹 Stuck sudo processes terminated
- 🔄 Terminal state reset
- 🛡️ Environment variables cleared
- ✅ Clean command execution guaranteed

---

## ⚙️ **Development Commands**

### **🚀 Development**

```bash
npm run dev              # Start all development servers
npm run dev:all          # Alias for dev (all workspaces)
```

### **🏗️ Building**

```bash
npm run build            # Build all packages
npm run build:workspace  # Advanced build with reporting
npm run build:parallel   # Parallel builds for speed
npm run build:clean      # Clean + build
```

### **🧪 Testing & Quality**

```bash
npm run test             # Run all tests
npm run test:ci          # CI-optimized testing
npm run lint             # Lint all packages
npm run lint:fix         # Lint + auto-fix
npm run format           # Format all code
```

### **🔧 Maintenance**

```bash
npm run clean            # Clean all build artifacts
npm run fresh            # Clean + reinstall everything
npm run update           # Update all packages
npm run check-compatibility  # Validate environment
```

### **📊 Workspace Management**

```bash
npm run workspace-info   # Generate workspace analysis
npm run update-packages  # Update dependency versions
```

---

## 🎮 **VS Code Integration**

### **🎯 Available Tasks** (Cmd+Shift+P → "Tasks: Run Task")

- 🦇 **Batman: Headers** - File header management
- 🦇 **Batman: Compatibility** - Environment validation
- 🦇 **Batman: Build** - Workspace building
- 🦇 **Batman: Tests** - Test execution
- 🦇 **Batman: Dev Server** - Development server
- 🦇 **Batman: Package Monitor** - Package monitoring
- 🦇 **Batman: Enhanced** - Multi-terminal Batman
- 🦇 **Batman: VS Code Edition** - Instructions and integration

### **🔧 Extensions & Configuration**

- **Recommended Extensions** - Configured in `.vscode/extensions.json`
- **Code Snippets** - R3F-specific snippets in `.vscode/r3f.code-snippets`
- **Debug Configuration** - Launch configurations for debugging
- **Settings** - Optimized VS Code settings for R3F development

---

## 🤖 **GitHub Actions & CI/CD**

### **🔄 Automated Workflows**

- **CI Pipeline** (`ci.yml`) - Test, lint, build on every PR
- **Release Management** (`release.yml`) - Automated versioning with Changesets
- **Security Analysis** (`codeql.yml`) - Weekly security scans
- **Deployment** (`deploy.yml`) - Automated deployments
- **Dependency Updates** (`dependabot.yml`) - Automated dependency management

### **🎯 Custom Actions**

Located in `.github/actions/`:

- **setup-workspace** - Environment setup with caching
- **build-workspace** - Turbo-optimized building
- **test-workspace** - Testing with coverage
- **lint-workspace** - Code quality validation

---

## 🔧 **Configuration & Tooling**

### **📝 Code Quality**

- **ESLint** - Modern ESLint 9 with React rules
- **Prettier** - Consistent code formatting
- **Husky** - Git hooks for pre-commit validation
- **lint-staged** - Run linters only on changed files
- **Commitlint** - Conventional commit message enforcement

### **🏗️ Build & Testing**

- **Vite** - Lightning-fast development and building
- **Vitest** - Modern testing framework
- **Jest** - Additional testing capabilities
- **Turbo** - Build system optimization and caching
- **Rollup** - Advanced bundling configuration

### **📊 Development Tools**

- **VitePress** - Documentation generation
- **Changesets** - Version management and changelog generation
- **Concurrently** - Run multiple commands simultaneously
- **Rimraf** - Cross-platform file deletion

---

## 🎯 **Quick Reference**

### **🦇 Batman Commands**

```bash
npm run batman           # 🦇 Original sequential Batman
npm run batman:enhanced  # 🦇🦇 Multi-terminal Batman (RECOMMENDED)
npm run batman:vscode    # 🦇🦇🦇 VS Code integration
npm run 🦇              # Emoji shortcut for original
npm run 🦇🦇            # Emoji shortcut for enhanced
```

### **⚡ Essential Commands**

```bash
npm run dev             # Start development (auto-cleanup included)
npm run build:parallel  # Fast parallel building
npm run test            # Run all tests
npm run cleanup         # Manual terminal cleanup
npm run fresh           # Clean slate reinstall
```

### **📊 Analysis & Monitoring**

```bash
npm run workspace-info      # Generate workspace analysis
npm run check-compatibility # Validate environment
npm run update             # Update packages
```

---

## 🛡️ **Batman Features Deep Dive**

### **🦇 Multi-Terminal Batman Enhanced**

The crown jewel of the automation system:

- **Parallel Task Execution** - All tasks run simultaneously in separate terminals
- **Real-time Monitoring** - Live status updates for each task
- **macOS Terminal Integration** - Native Terminal.app windows
- **Background Process Management** - Dev servers stay alive
- **Intelligent Cleanup** - Auto-cleanup on interruption

### **🧹 Automatic Terminal Cleanup**

Revolutionary terminal management that prevents development interruptions:

- **Auto-cleanup Integration** - Every npm command starts with clean terminals
- **Sudo Process Termination** - Automatically kills stuck sudo prompts
- **Environment Sanitization** - Clears problematic environment variables
- **Silent Operation** - Works invisibly in the background
- **Fail-safe Design** - Never interferes with legitimate operations

---

## 📦 **Dependency Stack**

### **🎨 Core R3F Ecosystem**

```json
{
  "@react-three/fiber": "^8.13.7", // React renderer for Three.js
  "@react-three/drei": "^9.109.5", // Useful helpers & abstractions
  "@react-three/postprocessing": "^3.0.4", // Advanced effects
  "@react-three/xr": "^6.6.25", // WebXR support
  "@react-three/uikit": "^0.8.21", // UI components for 3D
  "three": "^0.179.1", // Three.js core
  "leva": "^0.10.0" // Debug controls
}
```

### **⚛️ React Ecosystem**

```json
{
  "react": "^18.3.1", // React 18 with concurrent features
  "react-dom": "^18.3.1", // React DOM renderer
  "react-router-dom": "^7.8.2", // Client-side routing
  "zustand": "^4.4.1" // State management
}
```

### **🛠️ Development Tools**

```json
{
  "vite": "^7.1.3", // Build tool & dev server
  "vitest": "^3.2.4", // Testing framework
  "turbo": "^1.10.12", // Build system optimization
  "eslint": "^9.34.0", // Modern linting
  "prettier": "^3.6.2", // Code formatting
  "json-schema": "^0.4.0" // JSON validation
}
```

---

## 🎮 **Usage Examples**

### **🚀 Starting Development**

```bash
# The Batman way (recommended)
npm run batman:enhanced
# Opens 6 terminals: Headers, Compatibility, Build, Tests, Dev Server, Package Monitor

# The simple way
npm run dev
# Starts all development servers with auto-cleanup
```

### **🏗️ Building for Production**

```bash
# Fast parallel build
npm run build:parallel

# Clean build from scratch
npm run build:clean

# Standard workspace build
npm run build:workspace
```

### **🧪 Testing & Quality**

```bash
# Run all tests with auto-cleanup
npm run test

# Lint and fix issues
npm run lint:fix

# Format all code
npm run format
```

---

## 📦 **Package Details**

### **🎨 @r3f-workspace/ui**

_Shared UI components optimized for 3D applications_

**Components Available:**

- `Button` - Interactive button with hover states
- `Panel` - Flexible panel container
- `ControlGroup` - Grouped controls for 3D scenes

**Features:** TypeScript + JavaScript support, styled components, 3D-optimized animations

### **🛠️ @r3f-workspace/utils**

_Essential utilities for 3D development_

**Modules Available:**

- `math` - Vector operations, interpolation, transformations
- `geometry` - Shape calculations, mesh utilities
- `performance` - FPS monitoring, optimization helpers
- `terrain` - Procedural terrain generation

**Features:** Three.js integration, performance optimization, mathematical utilities

### **🌟 @r3f-workspace/r3f-components**

_Advanced React Three Fiber components_

**Components Available:**

- Advanced scene management
- Post-processing effect chains
- Camera control systems
- Performance-optimized rendering

**Features:** Built on @react-three/drei, advanced R3F patterns, optimized for performance

---

## 🚀 **R3f StarterKit Project**

A complete React Three Fiber demonstration application showcasing:

### **🎯 Key Features**

- **Interactive 3D Scene** with orbital controls
- **Post-processing Pipeline** with bloom and tone mapping
- **Performance Monitoring** with real-time FPS display
- **Debug Interface** with Leva controls
- **Responsive Design** with modern UI components
- **Hot Module Replacement** for instant updates

### **🏗️ Architecture**

- **Component-based** - Modular 3D scene composition
- **Workspace Integration** - Uses all workspace packages
- **Modern Routing** - Client-side navigation
- **Performance Optimized** - Efficient rendering and memory management

---

## 🎮 **VS Code Integration**

### **🎯 Batman Tasks** (Cmd+Shift+P → "Tasks: Run Task")

- 🦇 **Batman: Headers** - File header management and updates
- 🦇 **Batman: Compatibility** - Environment and package validation
- 🦇 **Batman: Build** - Advanced workspace building
- 🦇 **Batman: Tests** - Test suite execution with coverage
- 🦇 **Batman: Dev Server** - R3f StarterKit development server
- 🦇 **Batman: Package Monitor** - Package update monitoring
- 🦇 **Batman: Enhanced** - Multi-terminal Batman launcher
- 🦇 **Batman: VS Code Edition** - Integration instructions

### **🔧 Development Tools**

- **R3F Code Snippets** - Instant R3F component templates
- **Debug Configurations** - Pre-configured debugging setups
- **Extension Recommendations** - Curated extensions for R3F development
- **Workspace Settings** - Optimized settings for 3D development

---

## 🤖 **GitHub Actions & CI/CD**

### **🔄 Comprehensive Automation**

- **CI Pipeline** - Automated testing, linting, and building
- **Release Management** - Semantic versioning with Changesets
- **Security Scanning** - CodeQL analysis and dependency audits
- **Automated Deployments** - GitHub Pages and environment deployments
- **Dependency Management** - Dependabot integration

### **🎯 Custom Workspace Actions**

- **setup-workspace** - Optimized environment setup with caching
- **build-workspace** - Turbo-powered workspace building
- **test-workspace** - Comprehensive testing with coverage reports
- **lint-workspace** - Code quality validation across packages

---

## 🎯 **Quick Reference Guide**

### **🦇 Batman Commands**

```bash
npm run batman           # 🦇 Sequential Batman (classic)
npm run batman:enhanced  # 🦇🦇 Multi-terminal Batman (RECOMMENDED)
npm run batman:vscode    # 🦇🦇🦇 VS Code integration
npm run batman:auto      # 🦇🦇🦇🦇 Auto-closing Batman
npm run batman:ultimate  # 🦇🦇🦇🦇🦇 Ultimate unified Batman

# Quick aliases
npm run bat              # Batman shortcut
npm run imbatman         # Ultimate Batman alias
npm run 🦇              # Single Batman emoji
npm run 🦇🦇🦇          # Triple Batman emoji
```

### **⚡ Essential Development**

```bash
npm run dev             # Start all development (auto-cleanup)
npm run build:parallel  # Fast parallel building
npm run test            # Run all tests (auto-cleanup)
npm run lint:fix        # Lint and auto-fix issues
npm run fresh           # Clean reinstall everything
```

### **📊 Workspace Analysis**

```bash
npm run workspace-info      # Complete workspace analysis
npm run check-compatibility # Environment validation
npm run update             # Update all packages
npm run cleanup            # Manual terminal cleanup
```

---

## 🛡️ **Batman Automation Deep Dive**

### **🦇 What Batman Does**

1. **🛡️ Headers** - Ensures all files have proper headers
2. **🔍 Compatibility** - Validates Node.js, npm, and package versions
3. **🏗️ Build** - Orchestrates workspace building with dependency resolution
4. **🧪 Tests** - Runs comprehensive test suites across all packages
5. **🚀 Dev Server** - Launches R3f StarterKit with hot reloading
6. **📦 Monitor** - Watches for package updates and security issues

### **🦇🦇 Enhanced Batman Benefits**

- **Parallel Execution** - All tasks run simultaneously
- **Individual Terminals** - Each task in its own macOS Terminal window
- **Real-time Status** - Live updates and monitoring
- **Independent Control** - Start, stop, restart tasks individually
- **Background Persistence** - Dev servers stay alive between sessions

---

## 🎨 **3D Development Features**

### **🌟 R3F Component Library**

- **Scene Management** - Advanced scene composition and optimization
- **Effect Systems** - Post-processing and visual effects
- **Control Systems** - Camera controls and user interaction
- **Performance Tools** - FPS monitoring and optimization utilities

### **🛠️ Development Tools**

- **Hot Reloading** - Instant updates for 3D scenes
- **Debug Controls** - Real-time parameter adjustment with Leva
- **Performance Monitoring** - Built-in FPS and memory tracking
- **Asset Management** - Efficient loading and caching

---

## 📚 **Documentation & Resources**

### **📖 Available Documentation**

- [`docs/TERMINAL_CLEANUP.md`](./docs/TERMINAL_CLEANUP.md) - Terminal cleanup system guide
- [`scripts/README.md`](./scripts/README.md) - Complete Batman script ecosystem
- [`docs/developer-guide.md`](./docs/developer-guide.md) - Comprehensive development guide
- [`docs/workspace-info.md`](./docs/workspace-info.md) - Auto-generated workspace analysis

### **🔍 Auto-Generated Reports**

- **Workspace Analysis** - Detailed package and dependency analysis
- **Build Reports** - Build status and performance metrics
- **Compatibility Reports** - Environment and version validation
- **Dependency Status** - Package update and security information

---

## 🎯 **Project Philosophy**

### **🦇 Why Batman?**

- **Memorable** - Batman makes automation scripts fun and memorable
- **Powerful** - Like Batman, these scripts are incredibly capable
- **Vigilant** - Always watching for issues and problems
- **Prepared** - Scripts for every development scenario
- **Justice** - Bringing order to chaotic development workflows

### **🚀 Why This Architecture?**

- **Monorepo Benefits** - Shared code, consistent tooling, unified workflows
- **Modern Stack** - Latest R3F ecosystem and development tools
- **Developer Experience** - Smooth workflows with intelligent automation
- **Scalability** - Easy to extend with new packages and projects
- **Production Ready** - Comprehensive CI/CD and deployment automation

---

## 🤝 **Contributing**

### **🛠️ Development Workflow**

1. **Setup** - `npm install` (includes auto-cleanup)
2. **Development** - `npm run batman:enhanced` (recommended)
3. **Testing** - `npm run test`
4. **Building** - `npm run build:parallel`
5. **Quality** - `npm run lint:fix && npm run format`

### **📋 Guidelines**

- Follow Batman script patterns for new automation
- Use workspace packages for shared functionality
- Include comprehensive tests for new features
- Update documentation for new capabilities
- Maintain the Batman theme in scripts and comments

---

## 🏆 **Achievement Unlocked**

You now have access to:

- ✅ **Multi-Terminal Development Environment**
- ✅ **Automatic Terminal Cleanup System**
- ✅ **Batman-Powered Automation**
- ✅ **Advanced Build Orchestration**
- ✅ **Comprehensive Package System**
- ✅ **Modern 3D Development Stack**
- ✅ **Professional CI/CD Pipeline**
- ✅ **VS Code Integration**

---

## 🌃 **"Because Gotham deserves better automation"**

> **Welcome to the R3F Batman Workspace - Where React Three Fiber meets vigilante-level automation.** 🦇

**Choose your Batman edition and deploy the ultimate 3D development environment today!**

---

## 📄 **License**

MIT © Michael Joseph

---

### 🦇 **Gotham is Secure** 🌃
