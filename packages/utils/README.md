# @r3f-workspace/utils

Utility functions for React Three Fiber applications including math operations, geometry calculations, performance monitoring, and terrain generation.

## Installation

```bash
npm install @r3f-workspace/utils
```

## Modules

### Math Utilities

Vector operations, interpolation, and mathematical transformations.

```javascript
import { lerp, clamp, degToRad } from "@r3f-workspace/utils/math";

// Linear interpolation
const interpolated = lerp(0, 10, 0.5); // 5

// Clamp values
const clamped = clamp(15, 0, 10); // 10

// Convert degrees to radians
const radians = degToRad(90); // π/2
```

### Geometry Utilities

Shape calculations and mesh utilities.

```javascript
import { calculateBoundingBox, getCenter } from "@r3f-workspace/utils/geometry";

// Calculate bounding box
const bbox = calculateBoundingBox(vertices);

// Get center point
const center = getCenter(bbox);
```

### Performance Utilities

FPS monitoring and optimization helpers.

```javascript
import { FPSMonitor, optimizeRenderer } from "@r3f-workspace/utils/performance";

// Monitor FPS
const monitor = new FPSMonitor();
monitor.begin();
// ... render loop
monitor.end();

// Optimize renderer settings
optimizeRenderer(renderer, { shadowType: "pcf" });
```

### Terrain Utilities

Procedural terrain generation.

```javascript
import { generateHeightmap, createTerrainGeometry } from "@r3f-workspace/utils/terrain";

// Generate heightmap
const heightmap = generateHeightmap(128, 128, { octaves: 4, persistence: 0.5 });

// Create terrain geometry
const geometry = createTerrainGeometry(heightmap, 100, 100);
```

## Development

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## License

MIT
