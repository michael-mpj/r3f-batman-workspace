# @r3f-workspace/ui

Shared UI components for React Three Fiber applications.

## Installation

```bash
npm install @r3f-workspace/ui
```

## Components

### Button

Interactive button component with hover states.

```jsx
import { Button } from "@r3f-workspace/ui";

<Button onClick={handleClick}>Click me</Button>;
```

### Panel

Flexible panel container for UI layouts.

```jsx
import { Panel } from "@r3f-workspace/ui";

<Panel>
  <h2>Panel Content</h2>
  <p>Panel description</p>
</Panel>;
```

### ControlGroup

Grouped controls for 3D scene manipulation.

```jsx
import { ControlGroup } from "@r3f-workspace/ui";

<ControlGroup>
  <Button>Option 1</Button>
  <Button>Option 2</Button>
  <Button>Option 3</Button>
</ControlGroup>;
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
