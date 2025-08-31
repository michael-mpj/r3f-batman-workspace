# Models Directory

This directory contains 3D models (GLTF/GLB files) for your R3F project.

## Structure

- Place your `.gltf` and `.glb` files here
- Organize by categories if needed (e.g. `characters/`, `props/`, `environments/`)

## Usage

```typescript
import { assetLoader } from '@utils/assets'

// Load a model
const gltf = await assetLoader.loadModel('/models/your-model.glb')

// Use in component
function MyModel() {
  const { scene } = useLoader(GLTFLoader, '/models/your-model.glb')
  return <primitive object={scene} />
}
```

## Recommended Tools

- Blender (free, open-source)
- Sketchfab (online marketplace)
- Ready Player Me (avatars)
- Mixamo (animations)

## Optimization Tips

- Use DRACO compression for smaller file sizes
- Keep polygon count reasonable for web
- Optimize textures (power of 2 dimensions)
- Use instancing for repeated objects
