# Scripts Overview

The Batman R3F Workspace includes powerful automation scripts for development, building, and maintenance.

## 🦇 Batman Scripts

### Core Batman Scripts

**batman.mjs** - Classic Batman with sequential execution

```bash
npm run batman
# or
npm run 🦇
```

**batman-enhanced.mjs** - Multi-terminal orchestration

```bash
npm run batman:enhanced
# or
npm run 🦇🦇
```

**batman-vscode.mjs** - VS Code integration

```bash
npm run batman:vscode
# or
npm run 🦇🦇🦇
```

**batman-auto-close.mjs** - Auto-cleanup workflow

```bash
npm run batman:auto
# or
npm run 🦇🦇🦇🦇
```

**imbatman.js** - Ultimate Batman edition

```bash
npm run batman:ultimate
# or
npm run 🦇🦇🦇🦇🦇
```

[View Batman Script Details →](./batman)

## 🛠️ Build Scripts

### Workspace Building

**build-workspace.mjs** - Advanced workspace building with progress tracking

```bash
npm run build:workspace    # Standard build
npm run build:clean       # Clean then build
npm run build:parallel    # Parallel building
```

Features:

- Progress tracking for each package
- Error reporting and logging
- Build reports saved to `docs/build-report.md`
- Parallel build optimization
- Clean build options

[View Build Script Details →](./build)

## 🔧 Maintenance Scripts

### Terminal Cleanup

**cleanup-terminals.mjs** - Advanced terminal and process cleanup

```bash
npm run cleanup-terminals
npm run cleanup  # Short alias
```

Features:

- Sudo process termination
- Port cleanup and management
- Environment sanitization
- Background process cleanup

### Package Management

**update-packages.mjs** - Intelligent package updating

```bash
npm run update-packages
npm run update  # Short alias
```

Features:

- Version compatibility checking
- Selective package updates
- Dependency conflict resolution
- Update reporting

**check-compatibility.mjs** - Package compatibility analysis

```bash
npm run check-compatibility
```

Features:

- Cross-package version checking
- Dependency conflict detection
- Compatibility matrix generation
- Automated fix suggestions

[View Maintenance Script Details →](./maintenance)

## 📊 Information Scripts

### Workspace Analysis

**workspace-info.mjs** - Comprehensive workspace analysis

```bash
npm run workspace-info
```

Generates:

- Package dependency maps
- Build configuration analysis
- Script inventory
- Health metrics

### Header Management

**add-headers.mjs** - Automated file header management

```bash
node scripts/add-headers.mjs
```

Features:

- Consistent file headers
- Author and date tracking
- Version information
- Automated updates

## 🎯 Development Scripts

### Development Workflow

All development scripts include Batman terminal cleanup:

```bash
# Development with cleanup
npm run dev        # All workspaces
npm run dev:all    # Explicit all workspaces

# Testing with cleanup
npm run test       # All tests
npm run test:ci    # CI mode

# Quality assurance
npm run lint       # Lint all
npm run lint:fix   # Lint and fix
npm run format     # Format all
```

### Compatibility Scripts

```bash
# Check package compatibility
npm run check-compatibility

# Update outdated packages
npm run update-packages

# Fresh workspace setup
npm run fresh
```

## 🔄 Script Workflow Integration

### Batman Integration

All major scripts integrate with the Batman automation system:

1. **Automatic Cleanup**: Every script starts with terminal cleanup
2. **Progress Tracking**: Real-time progress reporting
3. **Error Handling**: Comprehensive error management
4. **Multi-Terminal**: Coordinated multi-terminal execution

### VS Code Integration

Scripts are designed to work with VS Code tasks:

```json
{
  "label": "Batman: Ultimate Edition",
  "type": "shell",
  "command": "npm run batman:ultimate",
  "group": "build",
  "detail": "🦇 All Batman modes unified"
}
```

## 📋 Script Configuration

### Environment Variables

Scripts respect these environment variables:

```bash
# Debug mode
DEBUG=true npm run batman

# Skip cleanup
SKIP_CLEANUP=true npm run build

# Parallel execution
PARALLEL=true npm run build:workspace
```

### Script Options

Many scripts accept command-line options:

```bash
# Build scripts
npm run build:workspace --clean
npm run build:workspace --parallel
npm run build:workspace --verbose

# Batman scripts
npm run batman:enhanced --verbose
npm run batman:auto --skip-cleanup
```

## 🔍 Script Details

### batman.mjs - Classic Batman

**Purpose**: Sequential task execution with comprehensive logging

**Features**:

- Step-by-step execution
- Detailed progress reporting
- Error handling and recovery
- Clean terminal output

**Usage**:

```bash
npm run batman
```

### batman-enhanced.mjs - Enhanced Batman

**Purpose**: Multi-terminal orchestration for complex workflows

**Features**:

- Parallel task execution
- Multi-terminal coordination
- Advanced process management
- Real-time status updates

**Usage**:

```bash
npm run batman:enhanced
```

### build-workspace.mjs - Advanced Building

**Purpose**: Workspace-wide building with optimization

**Features**:

- Progress tracking
- Error reporting
- Build reports
- Parallel execution options

**Usage**:

```bash
npm run build:workspace [--clean] [--parallel] [--verbose]
```

## 🚨 Error Handling

### Script Error Recovery

All scripts include comprehensive error handling:

1. **Cleanup on Error**: Automatic cleanup if scripts fail
2. **Error Reporting**: Detailed error messages and logs
3. **Recovery Suggestions**: Automated fix suggestions
4. **Rollback Options**: Safe rollback for failed operations

### Common Script Issues

1. **Permission Errors**:

   ```bash
   # Fix with Batman cleanup
   npm run cleanup-terminals
   ```

2. **Port Conflicts**:

   ```bash
   # Batman handles port cleanup automatically
   npm run batman:auto
   ```

3. **Build Failures**:

   ```bash
   # Clean build
   npm run build:clean
   ```

## 🎯 Script Best Practices

### Writing New Scripts

1. **Include header comments** with file information
2. **Add terminal cleanup** integration
3. **Implement progress tracking** for long operations
4. **Add error handling** and recovery
5. **Document script options** and usage

### Script Organization

- **batman\*.mjs**: Batman automation scripts
- **build-\*.mjs**: Build-related scripts
- **check-\*.mjs**: Validation and checking scripts
- **update-\*.mjs**: Maintenance and updating scripts

### Integration Guidelines

- Use Batman cleanup in all development scripts
- Integrate with VS Code tasks where appropriate
- Include progress reporting for user feedback
- Implement proper error handling and recovery

The Batman script system provides a powerful foundation for workspace automation, ensuring efficient and reliable development workflows! 🦇
