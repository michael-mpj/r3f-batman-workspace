# R3F Components

Advanced 3D components for React Three Fiber applications.

## Components

### TerrainMesh

Procedural terrain generation using noise functions.

```jsx
import { TerrainMesh } from "@r3f-workspace/r3f-components";

<TerrainMesh width={100} depth={100} widthSegments={50} depthSegments={50} scale={10} color='#228B22' />;
```

### ParticleSystem

Advanced particle system with physics simulation.

```jsx
import { ParticleSystem } from "@r3f-workspace/r3f-components";

<ParticleSystem count={1000} size={2} color='#ffffff' spread={50} speed={1} />;
```

### CyberGrid

Animated cyberpunk-style grid with scanning effects.

```jsx
import { CyberGrid } from "@r3f-workspace/r3f-components";

<CyberGrid size={50} divisions={50} color='#00ffff' scanSpeed={2} scanIntensity={3} />;
```

## Installation

```bash
npm install @r3f-workspace/r3f-components
```

## Peer Dependencies

- react ^18.2.0
- @react-three/fiber ^8.13.0
- @react-three/drei ^9.109.0
- three ^0.179.0

## Development

```bash
npm run dev    # Start development server
npm run build  # Build library
npm run lint   # Run ESLint
```
