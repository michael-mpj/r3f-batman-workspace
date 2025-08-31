# Utils Package

Mathematical utilities and helpers for Three.js and React Three Fiber development.

## 📋 Package Information

- **Name**: `@r3f-workspace/utils`
- **Version**: 1.0.0
- **Type**: Utility Library
- **Dependencies**: Three.js ^0.179.1

## 🧮 Available Utilities

### Math Utilities

Advanced mathematical functions for 3D graphics and animations.

```javascript
import { mathUtils } from "@r3f-workspace/utils";

// Vector operations
const normalized = mathUtils.normalize([1, 2, 3]);
const distance = mathUtils.distance(pointA, pointB);
const interpolated = mathUtils.lerp(start, end, 0.5);

// Trigonometric utilities
const smoothed = mathUtils.smoothstep(0, 1, 0.7);
const eased = mathUtils.easeInOut(progress);
```

### Geometry Utilities

Geometry manipulation and generation functions.

```javascript
import { geometryUtils } from "@r3f-workspace/utils";

// Geometry generation
const sphere = geometryUtils.createSphere(radius, segments);
const plane = geometryUtils.createPlane(width, height);

// Geometry manipulation
const optimized = geometryUtils.optimize(geometry);
const bounds = geometryUtils.getBounds(geometry);
```

### Performance Utilities

Performance monitoring and optimization tools for R3F applications.

```javascript
import { performance } from "@r3f-workspace/utils";

// Performance monitoring
const monitor = performance.createMonitor();
monitor.start("sceneRender");
// ... rendering code
monitor.end("sceneRender");

// FPS tracking
const fpsTracker = performance.createFPSTracker();
console.log(`Current FPS: ${fpsTracker.getFPS()}`);

// Memory usage
const memoryInfo = performance.getMemoryUsage();
```

### Terrain Utilities

Terrain generation and manipulation for 3D landscapes.

```javascript
import { terrainUtils } from "@r3f-workspace/utils";

// Heightmap generation
const heightmap = terrainUtils.generateHeightmap(width, height, options);

// Noise functions
const perlinNoise = terrainUtils.perlinNoise(x, y, scale);
const simplexNoise = terrainUtils.simplexNoise(x, y, z);

// Terrain mesh creation
const terrainMesh = terrainUtils.createTerrainMesh(heightmap);
```

## 🛠️ Installation & Usage

### Installation

```bash
npm install @r3f-workspace/utils
```

### Basic Usage

```javascript
// Import specific utilities
import { mathUtils, performance } from "@r3f-workspace/utils";

// Or import all utilities
import * as utils from "@r3f-workspace/utils";

// Use in your R3F components
function MyComponent() {
  const normalizedVector = mathUtils.normalize([1, 2, 3]);

  useFrame(() => {
    performance.track("frameRender", () => {
      // Your render logic
    });
  });
}
```

### Advanced Usage with R3F

```javascript
import { useFrame } from "@react-three/fiber";
import { performance, mathUtils } from "@r3f-workspace/utils";

function AnimatedMesh() {
  const meshRef = useRef();
  const performanceMonitor = performance.createMonitor();

  useFrame(state => {
    performanceMonitor.start("animation");

    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const position = mathUtils.lerp([-5, 0, 0], [5, 0, 0], mathUtils.smoothstep(0, 2, time % 2));
      meshRef.current.position.set(...position);
    }

    performanceMonitor.end("animation");
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
}
```

## 📁 Package Structure

```text
packages/utils/
├── src/
│   ├── index.js          # Main exports
│   ├── math.js           # Math utilities
│   ├── geometry.js       # Geometry utilities
│   ├── performance.js    # Performance utilities
│   ├── terrain.js        # Terrain utilities
│   └── test/             # Test files
├── package.json          # Package configuration
├── vite.config.js        # Build configuration
├── vitest.config.js      # Test configuration
└── README.md             # Package documentation
```

## 🧪 Testing

### Running Tests

```bash
cd packages/utils
npm run test
```

### Test Structure

```javascript
// Example test
import { describe, it, expect } from "vitest";
import { mathUtils } from "../src/math.js";

describe("mathUtils", () => {
  it("should normalize vectors correctly", () => {
    const result = mathUtils.normalize([3, 4, 0]);
    expect(result).toEqual([0.6, 0.8, 0]);
  });
});
```

## 🔧 Configuration

### Build Configuration

The package uses Vite for building with library mode:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "R3fWorkspaceUtils",
      fileName: format => `r3f-workspace-utils.${format}.js`,
    },
    rollupOptions: {
      external: ["three"],
      output: {
        globals: { three: "THREE" },
      },
    },
  },
});
```

### Test Configuration

Uses Vitest with Node.js environment:

```javascript
// vitest.config.js
export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
```

## 📊 API Reference

### Math API

| Function                  | Description          | Parameters                            | Returns    |
| ------------------------- | -------------------- | ------------------------------------- | ---------- |
| `normalize(vector)`       | Normalize a vector   | `vector: number[]`                    | `number[]` |
| `distance(a, b)`          | Calculate distance   | `a: number[], b: number[]`            | `number`   |
| `lerp(a, b, t)`           | Linear interpolation | `a: number, b: number, t: number`     | `number`   |
| `smoothstep(min, max, x)` | Smooth interpolation | `min: number, max: number, x: number` | `number`   |

### Performance API

| Function             | Description                | Parameters                   | Returns      |
| -------------------- | -------------------------- | ---------------------------- | ------------ |
| `createMonitor()`    | Create performance monitor | None                         | `Monitor`    |
| `createFPSTracker()` | Create FPS tracker         | None                         | `FPSTracker` |
| `getMemoryUsage()`   | Get memory information     | None                         | `MemoryInfo` |
| `track(name, fn)`    | Track function performance | `name: string, fn: function` | `any`        |

### Geometry API

| Function                         | Description            | Parameters                         | Returns          |
| -------------------------------- | ---------------------- | ---------------------------------- | ---------------- |
| `createSphere(radius, segments)` | Create sphere geometry | `radius: number, segments: number` | `BufferGeometry` |
| `createPlane(width, height)`     | Create plane geometry  | `width: number, height: number`    | `BufferGeometry` |
| `optimize(geometry)`             | Optimize geometry      | `geometry: BufferGeometry`         | `BufferGeometry` |
| `getBounds(geometry)`            | Get geometry bounds    | `geometry: BufferGeometry`         | `Box3`           |

### Terrain API

| Function                        | Description            | Parameters                                       | Returns          |
| ------------------------------- | ---------------------- | ------------------------------------------------ | ---------------- |
| `generateHeightmap(w, h, opts)` | Generate heightmap     | `width: number, height: number, options: object` | `Float32Array`   |
| `perlinNoise(x, y, scale)`      | Generate Perlin noise  | `x: number, y: number, scale: number`            | `number`         |
| `simplexNoise(x, y, z)`         | Generate Simplex noise | `x: number, y: number, z: number`                | `number`         |
| `createTerrainMesh(heightmap)`  | Create terrain mesh    | `heightmap: Float32Array`                        | `BufferGeometry` |

## 🚀 Performance Tips

1. **Use appropriate imports:**

   ```javascript
   // Good - tree-shakeable
   import { mathUtils } from "@r3f-workspace/utils";

   // Avoid - imports everything
   import * as utils from "@r3f-workspace/utils";
   ```

2. **Cache expensive calculations:**

   ```javascript
   const memoizedResult = useMemo(() => mathUtils.complexCalculation(data), [data]);
   ```

3. **Monitor performance in development:**

   ```javascript
   if (process.env.NODE_ENV === "development") {
     performance.track("myFunction", myExpensiveFunction);
   }
   ```

For more examples, check the [R3F StarterKit project](/projects/r3f-starterkit) which demonstrates these utilities in real-world scenarios.
// ... rendering code
monitor.end("sceneRender");

// FPS tracking
const fpsTracker = performance.createFPSTracker();
console.log(`Current FPS: ${fpsTracker.getFPS()}`);

// Memory usage
const memoryInfo = performance.getMemoryUsage();

````

### Terrain Utilities

Terrain generation and manipulation for 3D landscapes.

```javascript
import { terrainUtils } from "@r3f-workspace/utils";

// Heightmap generation
const heightmap = terrainUtils.generateHeightmap(width, height, options);

// Noise functions
const perlinNoise = terrainUtils.perlinNoise(x, y, scale);
const simplexNoise = terrainUtils.simplexNoise(x, y, z);

// Terrain mesh creation
const terrainMesh = terrainUtils.createTerrainMesh(heightmap);
````

## 🛠️ Installation & Usage

### Installation

```bash
npm install @r3f-workspace/utils
```

### Basic Usage

```javascript
// Import specific utilities
import { mathUtils, performance } from "@r3f-workspace/utils";

// Or import all utilities
import * as utils from "@r3f-workspace/utils";

// Use in your R3F components
function MyComponent() {
  const normalizedVector = mathUtils.normalize([1, 2, 3]);

  useFrame(() => {
    performance.track("frameRender", () => {
      // Your render logic
    });
  });
}
```

### Advanced Usage with R3F

```javascript
import { useFrame } from "@react-three/fiber";
import { performance, mathUtils } from "@r3f-workspace/utils";

function AnimatedMesh() {
  const meshRef = useRef();
  const performanceMonitor = performance.createMonitor();

  useFrame(state => {
    performanceMonitor.start("animation");

    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const position = mathUtils.lerp([-5, 0, 0], [5, 0, 0], mathUtils.smoothstep(0, 2, time % 2));
      meshRef.current.position.set(...position);
    }

    performanceMonitor.end("animation");
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
}
```

## 📁 Package Structure

```text
packages/utils/
├── src/
│   ├── index.js          # Main exports
│   ├── math.js           # Math utilities
│   ├── geometry.js       # Geometry utilities
│   ├── performance.js    # Performance utilities
│   ├── terrain.js        # Terrain utilities
│   └── test/             # Test files
├── package.json          # Package configuration
├── vite.config.js        # Build configuration
├── vitest.config.js      # Test configuration
└── README.md             # Package documentation
```

## 🧪 Testing

### Running Tests

```bash
cd packages/utils
npm run test
```

### Test Structure

```javascript
// Example test
import { describe, it, expect } from "vitest";
import { mathUtils } from "../src/math.js";

describe("mathUtils", () => {
  it("should normalize vectors correctly", () => {
    const result = mathUtils.normalize([3, 4, 0]);
    expect(result).toEqual([0.6, 0.8, 0]);
  });
});
```

## 🔧 Configuration

### Build Configuration

The package uses Vite for building with library mode:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "R3fWorkspaceUtils",
      fileName: format => `r3f-workspace-utils.${format}.js`,
    },
    rollupOptions: {
      external: ["three"],
      output: {
        globals: { three: "THREE" },
      },
    },
  },
});
```

### Test Configuration

Uses Vitest with Node.js environment:

```javascript
// vitest.config.js
export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
```

## 📊 API Reference

### Math API

| Function                  | Description          | Parameters                            | Returns    |
| ------------------------- | -------------------- | ------------------------------------- | ---------- |
| `normalize(vector)`       | Normalize a vector   | `vector: number[]`                    | `number[]` |
| `distance(a, b)`          | Calculate distance   | `a: number[], b: number[]`            | `number`   |
| `lerp(a, b, t)`           | Linear interpolation | `a: number, b: number, t: number`     | `number`   |
| `smoothstep(min, max, x)` | Smooth interpolation | `min: number, max: number, x: number` | `number`   |

### Performance API

| Function             | Description                | Parameters                   | Returns      |
| -------------------- | -------------------------- | ---------------------------- | ------------ |
| `createMonitor()`    | Create performance monitor | None                         | `Monitor`    |
| `createFPSTracker()` | Create FPS tracker         | None                         | `FPSTracker` |
| `getMemoryUsage()`   | Get memory information     | None                         | `MemoryInfo` |
| `track(name, fn)`    | Track function performance | `name: string, fn: function` | `any`        |

### Geometry API

| Function                         | Description            | Parameters                         | Returns          |
| -------------------------------- | ---------------------- | ---------------------------------- | ---------------- |
| `createSphere(radius, segments)` | Create sphere geometry | `radius: number, segments: number` | `BufferGeometry` |
| `createPlane(width, height)`     | Create plane geometry  | `width: number, height: number`    | `BufferGeometry` |
| `optimize(geometry)`             | Optimize geometry      | `geometry: BufferGeometry`         | `BufferGeometry` |
| `getBounds(geometry)`            | Get geometry bounds    | `geometry: BufferGeometry`         | `Box3`           |

### Terrain API

| Function                        | Description            | Parameters                                       | Returns          |
| ------------------------------- | ---------------------- | ------------------------------------------------ | ---------------- |
| `generateHeightmap(w, h, opts)` | Generate heightmap     | `width: number, height: number, options: object` | `Float32Array`   |
| `perlinNoise(x, y, scale)`      | Generate Perlin noise  | `x: number, y: number, scale: number`            | `number`         |
| `simplexNoise(x, y, z)`         | Generate Simplex noise | `x: number, y: number, z: number`                | `number`         |
| `createTerrainMesh(heightmap)`  | Create terrain mesh    | `heightmap: Float32Array`                        | `BufferGeometry` |

## 🚀 Performance Tips

1. **Use appropriate imports:**

   ```javascript
   // Good - tree-shakeable
   import { mathUtils } from "@r3f-workspace/utils";

   // Avoid - imports everything
   import * as utils from "@r3f-workspace/utils";
   ```

2. **Cache expensive calculations:**

   ```javascript
   const memoizedResult = useMemo(() => mathUtils.complexCalculation(data), [data]);
   ```

3. **Monitor performance in development:**

   ```javascript
   if (process.env.NODE_ENV === "development") {
     performance.track("myFunction", myExpensiveFunction);
   }
   ```

For more examples, check the [R3F StarterKit project](/projects/r3f-starterkit) which demonstrates these utilities in real-world scenarios.
