# R3F StarterKit Project

A comprehensive demonstration application showcasing the Batman-powered R3F workspace capabilities.

## 🎯 Project Overview

The R3F StarterKit is a complete React Three Fiber application that demonstrates:

- **Modern R3F Setup**: Latest React Three Fiber with advanced features
- **Workspace Integration**: Uses all @r3f-workspace packages
- **Batman Automation**: Integrated with Batman development workflow
- **3D Interactions**: Advanced 3D scenes with user interactions
- **Performance Optimization**: Optimized for production deployment

## 🚀 Quick Start

### Development

```bash
# From workspace root
npm run dev

# Or from project directory
cd projects/R3f-StarterKit
npm run dev

# Batman-powered development
npm run batman:vscode
```

### Building

```bash
# Build the project
cd projects/R3f-StarterKit
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```text
R3f-StarterKit/
├── src/
│   ├── components/       # React components
│   │   ├── Scene.jsx     # Main 3D scene
│   │   ├── UI/           # UI components
│   │   └── 3D/           # 3D-specific components
│   ├── modules/          # Feature modules
│   │   ├── Controls/     # Camera and interaction controls
│   │   ├── Effects/      # Post-processing effects
│   │   └── Animation/    # Animation systems
│   ├── utils/            # Project utilities
│   ├── helpers/          # Helper functions
│   ├── pages/            # Page components
│   ├── models/           # 3D models and assets
│   ├── assets/           # Static assets
│   └── App.jsx           # Main application
├── public/               # Public assets
├── package.json          # Project configuration
├── vite.config.js        # Build configuration
├── eslint.config.js      # Linting configuration
└── README.md             # Project documentation
```

## 🎨 Features Showcase

### Advanced 3D Scene

The StarterKit demonstrates:

```jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5] }}>
      <Scene />
      <OrbitControls />
      <Environment preset='sunset' />

      <EffectComposer>
        <Bloom intensity={0.5} />
      </EffectComposer>
    </Canvas>
  );
}
```

### UI Integration

Seamless integration with workspace UI components:

```jsx
import { Panel, Button, ControlGroup } from "@r3f-workspace/ui";

function SceneControls() {
  return (
    <Panel title='Batman Controls'>
      <ControlGroup direction='vertical'>
        <Button onClick={activateBatman}>Activate Batman Mode</Button>
        <Button onClick={resetScene}>Reset Scene</Button>
      </ControlGroup>
    </Panel>
  );
}
```

### Utility Integration

Leveraging workspace utilities for performance and math:

```jsx
import { useFrame } from "@react-three/fiber";
import { mathUtils, performance } from "@r3f-workspace/utils";

function AnimatedObject() {
  const meshRef = useRef();
  const monitor = performance.createMonitor();

  useFrame(state => {
    monitor.track("animation", () => {
      const time = state.clock.getElapsedTime();
      const position = mathUtils.lerp([-2, 0, 0], [2, 0, 0], mathUtils.smoothstep(0, 2, time % 2));
      meshRef.current.position.set(...position);
    });
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color='gold' />
    </mesh>
  );
}
```

## 🛠️ Development Features

### Path Aliases

The project includes comprehensive path aliases:

```javascript
// vite.config.js aliases
resolve: {
  alias: {
    '@': './src',
    '@components': './src/components',
    '@modules': './src/modules',
    '@utils': './src/utils',
    '@helpers': './src/helpers',
    '@pages': './src/pages',
    '@models': './src/models',
    '@assets': './src/assets',
  },
}
```

### Hot Module Replacement

Full HMR support for rapid development:

- React component updates
- 3D scene modifications
- Shader hot reloading
- Asset updates

### Development Tools

Integrated development tools:

```jsx
import { Perf } from "r3f-perf";
import { Leva } from "leva";

function DevTools() {
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <>
          <Perf position='top-left' />
          <Leva />
        </>
      )}
    </>
  );
}
```

## 📊 Performance Optimization

### Bundle Optimization

The project is optimized for production:

- **Tree Shaking**: Eliminates unused code
- **Code Splitting**: Dynamic imports for large assets
- **Asset Optimization**: Compressed textures and models
- **Lazy Loading**: Components loaded on demand

### Three.js Optimization

- **Geometry Instancing**: Efficient rendering of repeated objects
- **Texture Optimization**: Compressed and optimized textures
- **LOD (Level of Detail)**: Distance-based quality adjustment
- **Frustum Culling**: Automatic object culling

### React Optimization

- **Memoization**: Strategic use of `useMemo` and `useCallback`
- **Component Splitting**: Logical component boundaries
- **State Management**: Efficient state updates
- **Effect Cleanup**: Proper cleanup in `useEffect`

## 🧪 Testing

### Test Structure

```bash
# Run tests
npm run test

# Run with coverage
npm run test --coverage
```

### Testing Patterns

```javascript
// Component testing
import { render, screen } from "@testing-library/react";
import { Canvas } from "@react-three/fiber";
import MyComponent from "./MyComponent";

test("renders 3D component", () => {
  render(
    <Canvas>
      <MyComponent />
    </Canvas>
  );

  // Test 3D component behavior
});
```

## 🎮 Interactive Features

### Camera Controls

- **Orbit Controls**: Mouse/touch camera control
- **First Person**: WASD keyboard controls
- **Cinematic**: Predefined camera animations

### User Interactions

- **Object Selection**: Click to select 3D objects
- **Drag and Drop**: Interactive object manipulation
- **UI Controls**: Real-time parameter adjustment

### Visual Effects

- **Post-Processing**: Bloom, depth of field, color correction
- **Particles**: Dynamic particle systems
- **Lighting**: Dynamic lighting with shadows

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# Analyze bundle
npx vite-bundle-analyzer dist
```

### Deployment Targets

The StarterKit can be deployed to:

- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting option
- **Docker**: Containerized deployment

### Environment Configuration

```bash
# Production environment variables
VITE_APP_TITLE=R3F StarterKit
VITE_ENABLE_PERF=false
VITE_ENABLE_DEBUG=false
```

## 🔍 Code Examples

### Basic Scene Setup

```jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} castShadow />

        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color='orange' />
        </mesh>

        <OrbitControls />
        <Environment preset='sunset' />
      </Canvas>
    </div>
  );
}
```

### Advanced Animation

```jsx
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { mathUtils } from "@r3f-workspace/utils";

function AnimatedMesh() {
  const meshRef = useRef();
  const [springs, api] = useSpring(() => ({
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
  }));

  useFrame(state => {
    const time = state.clock.getElapsedTime();
    const wave = mathUtils.smoothstep(-1, 1, Math.sin(time));

    api.start({
      scale: [1 + wave * 0.2, 1 + wave * 0.2, 1 + wave * 0.2],
      rotation: [0, time, 0],
    });
  });

  return (
    <animated.mesh ref={meshRef} {...springs}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color='purple' />
    </animated.mesh>
  );
}
```

## 🔧 Customization

### Adding New Features

1. **Create feature module:**

   ```bash
   mkdir src/modules/MyFeature
   touch src/modules/MyFeature/index.jsx
   ```

2. **Implement feature:**

   ```jsx
   // src/modules/MyFeature/index.jsx
   export function MyFeature() {
     return <group>{/* Your 3D content */}</group>;
   }
   ```

3. **Integrate with main scene:**

   ```jsx
   // src/components/Scene.jsx
   import { MyFeature } from "@modules/MyFeature";

   export function Scene() {
     return (
       <group>
         <MyFeature />
         {/* Other scene content */}
       </group>
     );
   }
   ```

### Configuration Options

The StarterKit supports various configuration options through environment variables and configuration files.

## 📖 Learning Resources

### Three.js Fundamentals

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [React Three Drei Documentation](https://docs.pmnd.rs/drei)

### Advanced Topics

- **Shaders**: Custom GLSL shaders
- **Physics**: Cannon.js and Rapier integration
- **Audio**: Three.js audio and positional audio
- **VR/AR**: WebXR with @react-three/xr

The R3F StarterKit serves as both a learning resource and a production-ready template for creating amazing 3D web experiences! 🦇
