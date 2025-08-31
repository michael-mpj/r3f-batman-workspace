# Build Scripts

Advanced building system for the Batman R3F Workspace with intelligent orchestration and optimization.

## 🏗️ Build System Overview

The workspace uses a sophisticated build system that combines npm workspaces with custom Batman automation for optimal performance and developer experience.

### Core Build Script

**build-workspace.mjs** - Advanced workspace building with progress tracking

## 🚀 Build Commands

### Standard Building

```bash
# Build all packages and projects
npm run build

# Advanced workspace build with reporting
npm run build:workspace

# Clean build (removes artifacts first)
npm run build:clean

# Parallel build (faster execution)
npm run build:parallel
```

### Batman-Enhanced Building

```bash
# Build with Batman cleanup
npm run batman

# Enhanced multi-terminal build
npm run batman:enhanced

# Ultimate build workflow
npm run batman:ultimate
```

## 🔧 Build Configuration

### Workspace Build Process

1. **Cleanup Phase**
   - Terminal cleanup and sanitization
   - Artifact removal (if clean build)
   - Environment preparation

2. **Dependency Resolution**
   - Package dependency analysis
   - Build order determination
   - Cross-package dependency handling

3. **Build Execution**
   - Individual package building
   - Progress tracking and reporting
   - Error handling and recovery

4. **Validation Phase**
   - Build artifact verification
   - Output validation
   - Report generation

### Build Options

**Clean Build:**

```bash
npm run build:clean
# or
npm run build:workspace --clean
```

Removes all build artifacts before building:

- `dist/` directories in all packages
- `coverage/` directories
- Node modules cache
- Temporary files

**Parallel Build:**

```bash
npm run build:parallel
# or
npm run build:workspace --parallel
```

Builds packages in parallel where dependencies allow:

- Faster execution time
- Better resource utilization
- Intelligent dependency ordering
- Progress coordination

**Verbose Build:**

```bash
npm run build:workspace --verbose
```

Provides detailed build information:

- Command execution details
- File processing information
- Timing information
- Debug output

## 📊 Build Reporting

### Build Reports

After each build, a detailed report is generated at `docs/build-report.md`:

**Report Contents:**

- Build execution time
- Package build status
- Error summaries
- Performance metrics
- Optimization suggestions

### Progress Tracking

Real-time progress tracking during builds:

```text
🏗️  Building @r3f-workspace/utils...
    ✅ Compilation successful (1.2s)
    ✅ Type checking passed
    ✅ Bundle optimization complete

🏗️  Building @r3f-workspace/ui...
    ✅ React components compiled (0.8s)
    ✅ CSS processing complete
    ✅ Bundle generation successful
```

## 🎯 Package-Specific Builds

### UI Package Building

```bash
cd packages/ui
npm run build
```

**Output:**

- ES modules for modern bundlers
- CSS stylesheets
- Type declarations (if TypeScript)
- Source maps for debugging

### Utils Package Building

```bash
cd packages/utils
npm run build
```

**Output:**

- ES and CommonJS formats
- Minified production bundles
- Three.js external dependency handling
- Source maps for debugging

### R3F Components Building

```bash
cd packages/r3f-components
npm run build
```

**Output:**

- Optimized R3F components
- Three.js integration
- Performance-optimized bundles
- Development and production builds

## ⚡ Performance Optimization

### Build Performance

**Caching Strategies:**

- NPM cache utilization
- Build artifact caching
- Dependency resolution caching
- Parallel processing optimization

**Bundle Optimization:**

- Tree shaking for unused code elimination
- Code splitting for dynamic imports
- Asset optimization and compression
- Source map generation

### Development vs Production

**Development Builds:**

- Fast compilation times
- Source maps enabled
- Hot module replacement
- Debug information included

**Production Builds:**

- Minification and compression
- Optimized bundle sizes
- Asset optimization
- Performance monitoring integration

## 🔍 Build Analysis

### Bundle Analysis

```bash
# Analyze bundle sizes
cd projects/R3f-StarterKit
npm run build
npx vite-bundle-analyzer dist
```

### Build Metrics

The build system tracks:

- **Build Time**: Total and per-package execution time
- **Bundle Size**: Output bundle size analysis
- **Dependencies**: Dependency graph and optimization
- **Performance**: Build performance metrics

## 🚨 Error Handling

### Build Error Recovery

**Automatic Recovery:**

- Retry failed builds
- Dependency resolution
- Cache clearing
- Environment reset

**Manual Recovery:**

```bash
# Clean and rebuild everything
npm run fresh

# Force clean build
npm run build:clean

# Batman ultimate recovery
npm run batman:ultimate
```

### Common Build Issues

1. **Dependency Conflicts:**

   ```bash
   npm run check-compatibility
   npm run update-packages
   ```

2. **Build Cache Issues:**

   ```bash
   npm run build:clean
   ```

3. **Permission Problems:**

   ```bash
   npm run cleanup-terminals
   npm run batman:auto
   ```

## 🎮 Advanced Build Features

### Custom Build Hooks

Add custom build hooks in package.json:

```json
{
  "scripts": {
    "prebuild": "echo 'Starting build...'",
    "build": "vite build",
    "postbuild": "echo 'Build complete!'"
  }
}
```

### Build Validation

Automatic build validation includes:

- Output file verification
- Bundle size analysis
- Dependency checking
- Performance validation

### Continuous Integration

Build scripts integrate with CI/CD:

```yaml
# GitHub Actions example
- name: Build with Batman
  run: npm run batman:ultimate

- name: Validate Build
  run: npm run build:workspace --validate
```

## 📈 Build Optimization Tips

### Faster Builds

1. **Use Parallel Building:**

   ```bash
   npm run build:parallel
   ```

2. **Leverage Caching:**

   ```bash
   # npm ci uses lockfile for faster installs
   npm ci
   ```

3. **Optimize Dependencies:**

   ```bash
   npm run check-compatibility
   npm run update-packages
   ```

### Smaller Bundles

1. **Tree Shaking:**
   - Use ES modules
   - Import only what you need
   - Configure bundler for tree shaking

2. **Code Splitting:**
   - Dynamic imports for large components
   - Route-based splitting
   - Vendor chunk optimization

3. **Asset Optimization:**
   - Compress images and models
   - Use appropriate formats (WebP, glTF)
   - Implement progressive loading

The Batman build system ensures your workspace is always ready for action with optimized, efficient builds! 🦇
