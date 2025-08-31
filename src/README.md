# Workspace Testing Utilities

This folder contains shared testing utilities and configurations for the entire R3F workspace.

## Purpose

The `src/` folder at the workspace root provides:

- **Shared Test Setup**: Common Vitest configuration and global mocks
- **Test Utilities**: Reusable testing helpers for React Three Fiber components
- **Mock Providers**: Standard mock implementations for 3D contexts
- **Test Fixtures**: Common test data and scenarios

## Structure

```
src/
├── test/
│   ├── setup.js           # Global test configuration
│   ├── helpers.js         # Shared test utilities
│   ├── mocks/            # Common mocks
│   └── fixtures/         # Test fixtures
└── utils/                # Testing utility functions
    ├── renderWithProviders.js  # React Three Fiber test renderer
    ├── mockData.js            # Test data generators
    └── testUtils.js           # Additional test utilities
```

## Usage

### In Package Tests

```javascript
// Import shared test setup
import "../../../src/test/setup.js";

// Use shared utilities
import { renderWithR3F } from "../../../src/utils/renderWithProviders.js";
import { createMockScene } from "../../../src/utils/mockData.js";
```

### In Project Tests

```javascript
// Import workspace test utilities
import { renderWithR3F } from "../../src/utils/renderWithProviders.js";
import { mockGeometry } from "../../src/test/fixtures/geometry.js";
```

## Guidelines

- **DRY Principle**: Avoid duplicating test setup across packages
- **R3F Focused**: Utilities should be optimized for React Three Fiber testing
- **Consistent**: Maintain consistent testing patterns across the workspace
- **Well Documented**: Each utility should have clear documentation and examples

## Contributing

When adding new test utilities:

1. Add comprehensive JSDoc documentation
2. Include usage examples
3. Add unit tests for the utilities themselves
4. Update this README with new utilities
