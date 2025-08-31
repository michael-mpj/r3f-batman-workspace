# Batman Scripts

The heart of the workspace automation system - Batman-powered scripts for ultimate development efficiency.

## 🦇 Batman Editions

### Classic Batman (`batman.mjs`)

Sequential task execution with comprehensive logging and progress tracking.

**Features:**

- Step-by-step task execution
- Detailed progress reporting
- Comprehensive error handling
- Clean terminal output
- Automatic cleanup integration

**Usage:**

```bash
npm run batman
# or use emoji
npm run 🦇
```

**What it does:**

1. Terminal cleanup and sanitization
2. Dependency installation and verification
3. Package compatibility checking
4. Workspace building (all packages)
5. Test suite execution
6. Quality assurance (linting/formatting)
7. Final status reporting

### Enhanced Batman (`batman-enhanced.mjs`)

Multi-terminal orchestration for complex development workflows.

**Features:**

- Parallel task execution
- Multi-terminal coordination
- Advanced process management
- Real-time status updates
- Terminal window management

**Usage:**

```bash
npm run batman:enhanced
# or use emoji
npm run 🦇🦇
```

**What it does:**

1. Opens multiple coordinated terminals
2. Executes tasks in parallel where possible
3. Manages terminal lifecycle
4. Provides real-time feedback
5. Coordinates complex workflows

### VS Code Batman (`batman-vscode.mjs`)

Integrated development environment workflow optimized for VS Code.

**Features:**

- VS Code task integration
- Integrated terminal management
- Task runner compatibility
- Development server coordination
- Editor integration

**Usage:**

```bash
npm run batman:vscode
# or use emoji
npm run 🦇🦇🦇
```

**What it does:**

1. Integrates with VS Code task system
2. Manages development servers
3. Coordinates with VS Code extensions
4. Provides editor-integrated feedback
5. Optimizes for VS Code workflow

### Auto-Close Batman (`batman-auto-close.mjs`)

Clean workflow with automatic terminal cleanup and process management.

**Features:**

- Automatic terminal cleanup
- Process lifecycle management
- Clean development environment
- Automated task orchestration
- Resource optimization

**Usage:**

```bash
npm run batman:auto
# or use emoji
npm run 🦇🦇🦇🦇
```

**What it does:**

1. Executes full development workflow
2. Automatically cleans up terminals
3. Manages process lifecycle
4. Ensures clean environment
5. Optimizes resource usage

### Ultimate Batman (`imbatman.js`)

All Batman features unified in the ultimate automation experience.

**Features:**

- All Batman modes available
- Ultimate automation power
- Complete workflow coverage
- Maximum development efficiency
- Advanced orchestration

**Usage:**

```bash
npm run batman:ultimate
# or use emoji
npm run 🦇🦇🦇🦇🦇
# or the classic
npm run imbatman
```

**What it does:**

1. Provides access to all Batman modes
2. Intelligent workflow selection
3. Ultimate automation capabilities
4. Maximum efficiency optimization
5. Complete development lifecycle management

## 🛠️ Batman Script Architecture

### Core Components

**Terminal Management:**

- Automatic sudo process cleanup
- Port management and cleanup
- Environment sanitization
- Process lifecycle management

**Task Orchestration:**

- Sequential and parallel execution
- Dependency resolution
- Error handling and recovery
- Progress tracking and reporting

**Development Integration:**

- VS Code task integration
- Multi-terminal coordination
- Development server management
- Build system orchestration

### Script Dependencies

```javascript
// Common imports across Batman scripts
import { execSync, spawn } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
```

## 🔧 Customization

### Environment Variables

Batman scripts respect these environment variables:

```bash
# Debug mode for detailed logging
DEBUG=true npm run batman

# Skip automatic cleanup
SKIP_CLEANUP=true npm run batman:enhanced

# Force parallel execution
PARALLEL=true npm run batman:ultimate

# Verbose output
VERBOSE=true npm run batman:vscode
```

### Configuration Options

Scripts can be configured through package.json:

```json
{
  "batmanConfig": {
    "autoCleanup": true,
    "parallelExecution": true,
    "terminalManagement": true,
    "progressReporting": true
  }
}
```

## 📊 Performance Metrics

### Execution Times

| Batman Edition | Typical Time    | Parallel Capable | Terminal Count |
| -------------- | --------------- | ---------------- | -------------- |
| Classic        | 2-3 minutes     | No               | 1              |
| Enhanced       | 1-2 minutes     | Yes              | 2-4            |
| VS Code        | 1.5-2.5 minutes | Partial          | 1-2            |
| Auto-Close     | 1-2 minutes     | Yes              | Dynamic        |
| Ultimate       | Variable        | Yes              | Adaptive       |

### Resource Usage

- **Memory**: Optimized for minimal memory footprint
- **CPU**: Intelligent load balancing across cores
- **Disk I/O**: Cached operations where possible
- **Network**: Parallel downloads and optimized requests

## 🚨 Troubleshooting

### Common Issues

1. **Script Hangs or Fails**:

   ```bash
   # Force cleanup and retry
   npm run cleanup-terminals
   npm run batman:auto
   ```

2. **Permission Errors**:

   ```bash
   # Batman automatically handles sudo cleanup
   npm run batman
   ```

3. **Port Conflicts**:

   ```bash
   # Enhanced Batman handles port management
   npm run batman:enhanced
   ```

### Debug Mode

Enable debug mode for detailed logging:

```bash
DEBUG=true npm run batman:ultimate
```

## 🎯 Batman Script Selection Guide

### Choose Classic Batman When

- Learning the system
- Need detailed step-by-step feedback
- Debugging workflow issues
- Running on resource-constrained systems

### Choose Enhanced Batman When

- Need maximum speed
- Working with multiple packages
- Running complex workflows
- Have adequate system resources

### Choose VS Code Batman When

- Working primarily in VS Code
- Need editor integration
- Using VS Code tasks and extensions
- Prefer integrated development experience

### Choose Auto-Close Batman When

- Need clean workflow execution
- Working in shared environments
- Running automated processes
- Require resource optimization

### Choose Ultimate Batman When

- Need maximum flexibility
- Working on complex projects
- Require all automation features
- Want the ultimate development experience

The Batman script system transforms your development workflow into a superhero-powered experience! 🦇
