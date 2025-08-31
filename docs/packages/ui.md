# UI Components Package

React UI components designed for R3F applications with Batman-powered automation.

## 📋 Package Information

- **Name**: `@r3f-workspace/ui`
- **Version**: 1.0.0
- **Type**: React Component Library
- **Build**: Vite Library Mode

## 🎨 Available Components

### Button Component

A modern, accessible button component with multiple variants.

```jsx
import { Button } from "@r3f-workspace/ui";

function MyApp() {
  return (
    <Button variant='primary' size='large' onClick={() => console.log("Batman clicked!")}>
      Activate Batman
    </Button>
  );
}
```

**Props:**

- `variant`: "primary" | "secondary" | "danger"
- `size`: "small" | "medium" | "large"
- `disabled`: boolean
- `onClick`: function

### Panel Component

A flexible panel component for organizing UI elements.

```jsx
import { Panel } from "@r3f-workspace/ui";

function MyApp() {
  return (
    <Panel title='Batman Controls' collapsible>
      <p>Batman automation controls go here</p>
    </Panel>
  );
}
```

**Props:**

- `title`: string
- `collapsible`: boolean
- `collapsed`: boolean
- `onToggle`: function

### ControlGroup Component

Groups related controls together with consistent spacing.

```jsx
import { ControlGroup, Button } from "@r3f-workspace/ui";

function MyApp() {
  return (
    <ControlGroup direction='horizontal' spacing='medium'>
      <Button variant='primary'>Start Batman</Button>
      <Button variant='secondary'>Stop Batman</Button>
    </ControlGroup>
  );
}
```

**Props:**

- `direction`: "horizontal" | "vertical"
- `spacing`: "small" | "medium" | "large"
- `align`: "start" | "center" | "end"

## 🛠️ Development

### Setup

```bash
cd packages/ui
npm install
```

### Development Commands

```bash
# Start development mode
npm run dev

# Run tests
npm run test

# Build package
npm run build

# Lint code
npm run lint:fix

# Format code
npm run format
```

### Testing

The package uses Vitest with React Testing Library:

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test --watch

# Run tests with coverage
npm run test --coverage
```

## 📁 Package Structure

```text
packages/ui/
├── src/
│   ├── index.js          # Main exports
│   ├── components/       # Component directory
│   │   ├── Button.jsx    # Button component
│   │   ├── Panel.jsx     # Panel component
│   │   └── ControlGroup.jsx # Control group
│   ├── styles/           # Shared styles
│   └── test/             # Test utilities
├── package.json          # Package configuration
├── vite.config.js        # Build configuration
└── README.md             # Package documentation
```

## 🎯 Design Principles

### Accessibility First

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

### Performance Focused

- Tree-shakeable exports
- Minimal bundle size
- Efficient re-renders
- Proper memo usage

### Developer Experience

- TypeScript support planned
- Comprehensive prop types
- Clear error messages
- Extensive documentation

## 🔗 Integration with R3F

These UI components are designed to work seamlessly with React Three Fiber applications:

```jsx
import { Canvas } from "@react-three/fiber";
import { Panel, Button } from "@r3f-workspace/ui";

function R3FApp() {
  return (
    <div>
      <Panel title='3D Controls'>
        <Button onClick={resetCamera}>Reset Camera</Button>
        <Button onClick={toggleWireframe}>Toggle Wireframe</Button>
      </Panel>

      <Canvas>{/* Your 3D scene */}</Canvas>
    </div>
  );
}
```

## 📈 Roadmap

### Short Term

- [ ] Add more component variants
- [ ] Implement theming system
- [ ] Add animation support
- [ ] Improve test coverage

### Long Term

- [ ] TypeScript migration
- [ ] Storybook integration
- [ ] Advanced accessibility features
- [ ] Component composition patterns

## 🤝 Contributing

1. Follow the [Development Workflow](../guide/development-workflow)
2. Add tests for new components
3. Update documentation
4. Follow coding standards

## 📝 API Reference

### Component Exports

```javascript
// All available exports
export { Button } from "./components/Button.jsx";
export { Panel } from "./components/Panel.jsx";
export { ControlGroup } from "./components/ControlGroup.jsx";
```

### Styling

Components use CSS modules for styling isolation and can be customized through CSS custom properties.

For more advanced usage patterns, see the [R3F StarterKit project](/projects/r3f-starterkit) which demonstrates all UI components in action.
