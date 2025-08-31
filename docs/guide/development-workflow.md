# Development Workflow

This guide covers the development workflow for the Batman-powered R3F workspace.

## 🦇 Batman Development Modes

### Classic Batman Mode

Sequential task execution with comprehensive logging:

```bash
npm run batman
```

**Features:**

- Sequential task execution
- Detailed progress reporting
- Comprehensive error handling
- Clean terminal output

### Enhanced Batman Mode

Multi-terminal orchestration for complex workflows:

```bash
npm run batman:enhanced
```

**Features:**

- Parallel task execution
- Multi-terminal coordination
- Advanced process management
- Real-time status updates

### VS Code Batman Mode

Integrated development environment workflow:

```bash
npm run batman:vscode
```

**Features:**

- VS Code task integration
- Integrated terminal management
- Task runner compatibility
- Development server coordination

### Auto-Close Batman Mode

Clean workflow with automatic cleanup:

```bash
npm run batman:auto
```

**Features:**

- Automatic terminal cleanup
- Process lifecycle management
- Clean development environment
- Automated task orchestration

### Ultimate Batman Mode

All Batman features unified:

```bash
npm run batman:ultimate
```

**Features:**

- All Batman modes available
- Ultimate automation power
- Complete workflow coverage
- Maximum development efficiency

## 🔄 Development Cycle

### 1. Setup Phase

```bash
# Fresh start
npm run fresh

# Or quick cleanup
npm run cleanup
```

### 2. Development Phase

```bash
# Start development servers
npm run dev

# Or with Batman power
npm run batman:enhanced
```

### 3. Testing Phase

```bash
# Run all tests
npm run test

# Run specific package tests
npm run test --workspace=@r3f-workspace/ui
```

### 4. Quality Assurance

```bash
# Lint and format
npm run lint:fix
npm run format

# Check compatibility
npm run check-compatibility
```

### 5. Build Phase

```bash
# Build all packages
npm run build

# Parallel build (faster)
npm run build:parallel

# Clean build
npm run build:clean
```

## 🛠️ Package Development

### Creating New Components

1. **Navigate to appropriate package:**

   ```bash
   cd packages/ui  # For UI components
   cd packages/utils  # For utilities
   ```

2. **Create component file:**

   ```bash
   touch src/components/MyComponent.jsx
   ```

3. **Export in index.js:**

   ```javascript
   export { default as MyComponent } from "./components/MyComponent.jsx";
   ```

4. **Test the component:**

   ```bash
   npm run test
   ```

### Cross-Package Dependencies

Use workspace references for internal dependencies:

```json
{
  "dependencies": {
    "@r3f-workspace/ui": "workspace:*",
    "@r3f-workspace/utils": "workspace:*"
  }
}
```

## 🔧 Terminal Management

The Batman system includes sophisticated terminal management:

### Automatic Cleanup

```bash
# Manual cleanup
npm run cleanup-terminals

# Automatic cleanup (built into Batman commands)
npm run batman  # Includes auto-cleanup
```

### Process Management

- **Sudo Process Cleanup**: Automatically terminates hanging sudo processes
- **Port Management**: Cleans up occupied development ports
- **Environment Sanitization**: Ensures clean development environment

## 📊 Monitoring & Debugging

### Build Reports

```bash
# Generate build report
npm run build:workspace
# Check docs/build-report.md for detailed analysis
```

### Package Health

```bash
# Check outdated packages
npm outdated

# Update packages
npm run update-packages
```

### Workspace Information

```bash
# Get workspace overview
npm run workspace-info
```

## 🚀 Deployment Workflow

### Production Build

```bash
# Build for production
npm run build

# Preview build
cd projects/R3f-StarterKit
npm run preview
```

### Release Management

```bash
# Create changeset
npm run changeset

# Version packages
npm run version-packages

# Publish release
npm run release
```

## 🎯 Best Practices

### Code Quality

- Use ESLint and Prettier configurations
- Write comprehensive tests
- Follow semantic versioning
- Document all public APIs

### Batman Integration

- Always use Batman commands for complex workflows
- Leverage terminal cleanup for clean development
- Use appropriate Batman mode for your workflow
- Monitor process health with Batman tools

### Performance

- Use parallel builds when possible
- Leverage workspace caching
- Monitor bundle sizes
- Optimize Three.js imports

## 🔍 Troubleshooting

### Common Issues

1. **Terminal Cleanup Issues**

   ```bash
   npm run cleanup-terminals
   ```

2. **Port Conflicts**

   ```bash
   # Batman automatically handles port cleanup
   npm run batman:auto
   ```

3. **Build Failures**

   ```bash
   # Clean and rebuild
   npm run build:clean
   ```

4. **Dependency Issues**

   ```bash
   # Fresh install
   npm run fresh
   ```

Need more help? Check the [Package Compatibility Guide](./package-compatibility) or [Deployment Guide](./deployment).
