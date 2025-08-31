# R3F StarterKit

A comprehensive React Three Fiber starter project with modern tooling, best practices, and a well-organized structure for building 3D web applications.

## 🚀 Features

- **React Three Fiber (R3F)** - React renderer for Three.js
- **JavaScript/JSX** - Modern ES6+ with JSX
- **Vite** - Lightning fast build tool
- **Leva** - GUI controls for development
- **r3f-perf** - Performance monitoring
- **Post-processing** - Visual effects pipeline
- **React Router** - Client-side routing
- **Drei** - Useful R3F helpers and abstractions

## 📦 Dependencies

### Core

- `three` - 3D library
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/uikit` - UI components for 3D scenes
- `@react-three/postprocessing` - Post-processing effects
- `@react-three/drei` - Useful helpers and abstractions

### Development & Controls

- `leva` - GUI controls and tweaking
- `r3f-perf` - Performance monitoring

### Routing

- `react-router-dom` - Client-side routing

## 🏗️ Project Structure

```txt
src/
├── components/          # Reusable React components
│   ├── Navigation.jsx   # Navigation component
│   ├── LoadingScreen.jsx
│   ├── RotatingCube.jsx
│   └── index.js        # Component exports
├── modules/            # Larger feature modules
│   ├── SceneLighting.jsx
│   └── index.js
├── utils/              # Utility functions
│   ├── math.js         # Mathematical utilities
│   ├── performance.js  # Performance monitoring
│   ├── assets.js       # Asset loading utilities
│   ├── web.js         # Web/DOM utilities
│   └── index.js
├── helpers/            # Helper components
│   ├── Grid.jsx        # 3D grid helper
│   └── index.js
├── pages/              # Page components
│   ├── Home.jsx        # Main 3D scene
│   ├── About.jsx       # About page
│   └── Terms.jsx       # Terms page
├── models/             # 3D models (GLTF/GLB)
│   └── README.md       # Model organization guide
├── assets/             # Static assets
│   ├── css/           # Stylesheets
│   ├── images/        # Image assets
│   └── js/            # JavaScript utilities
└── App.jsx            # Main application component
```

## 🎮 Getting Started

### Installation

```bash
# Navigate to the project directory
cd projects/R3f-StarterKit

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎛️ Controls & Features

### Leva GUI Controls

The project includes Leva GUI controls for real-time tweaking:

- **Scene Controls**: Performance monitoring, post-processing toggles
- **Lighting Controls**: Ambient and directional light settings
- **Object Controls**: Rotation speed, scale, colors
- **Grid Controls**: Size, divisions, colors

### Performance Monitoring

- **r3f-perf** integration for FPS and render time monitoring
- Memory usage tracking utilities
- Performance profiling helpers

### Post-Processing Effects

- Bloom effect with customizable settings
- Extensible effect composer setup
- Easy addition of new effects

## 🎨 Customization

### Adding New Components

1. Create component in appropriate directory (`components/`, `modules/`, `helpers/`)
2. Export from directory's `index.js` file
3. Import using path aliases (`@components/`, `@modules/`, etc.)

### Loading 3D Models

```javascript
import { assetLoader } from '@utils/assets'

// Load model
const gltf = await assetLoader.loadModel('/models/your-model.glb')

// Use in component
function MyModel() {
  const { scene } = useLoader(GLTFLoader, '/models/your-model.glb')
  return <primitive object={scene} />
}
```

### Custom Utilities

The project includes utility modules for:

- **Math**: Vector operations, interpolation, random functions
- **Performance**: Monitoring, debouncing, throttling
- **Assets**: Model/texture loading, optimization

## 📱 Responsive Design

- Mobile-friendly navigation
- Responsive canvas sizing
- Touch-friendly controls
- Performance optimizations for mobile devices

## 🚀 Production Build

The project is optimized for production with:

- Modern JavaScript (ES6+) compilation
- Bundle optimization via Vite
- Source maps for debugging
- Asset optimization

## 🔧 Configuration

### Path Aliases

Configured in `vite.config.js`:

```javascript
'@components/*': ['./src/components/*']
'@modules/*': ['./src/modules/*']
'@utils/*': ['./src/utils/*']
'@helpers/*': ['./src/helpers/*']
'@pages/*': ['./src/pages/*']
'@models/*': ['./src/models/*']
'@assets/*': ['./src/assets/*']
```

### Vite Configuration

- React plugin integration
- Path resolution
- Development server settings
- Build optimization

## 📚 Learning Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [Drei Components](https://github.com/pmndrs/drei)
- [Leva Controls](https://github.com/pmndrs/leva)
- [Post-processing Effects](https://github.com/pmndrs/postprocessing)

## 🤝 Contributing

1. Follow the established project structure
2. Use modern JavaScript (ES6+) features
3. Add appropriate Leva controls for tweakable parameters
4. Include performance considerations
5. Update documentation as needed

## 📄 License

This starter kit is open source and available under the MIT License.
