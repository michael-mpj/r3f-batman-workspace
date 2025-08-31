# Workspace Actions

This directory contains custom GitHub Actions specifically designed for managing monorepo workspaces. These composite actions provide reusable workflows for common operations across multiple packages and applications.

## Available Actions

### 🔧 Setup Workspace (`setup-workspace`)

Sets up the Node.js environment and installs workspace dependencies with caching.

```yaml
- name: Setup Workspace
  uses: ./.github/actions/setup-workspace
  with:
    node-version: "20" # Node.js version
    cache-dependency-path: "**/package-lock.json"
    skip-install: "false" # Skip npm install
```

**Features:**

- Node.js setup with version specification
- Dependency caching for faster builds
- Workspace structure verification
- Multi-level node_modules caching

### 🏗️ Build Workspace (`build-workspace`)

Builds all packages and applications in the workspace using Turbo for optimized builds.

```yaml
- name: Build Workspace
  uses: ./.github/actions/build-workspace
  with:
    workspace: "" # Specific workspace (optional)
    skip-cache: "false" # Skip build cache
    turbo-token: ${{ secrets.TURBO_TOKEN }}
    turbo-team: ${{ secrets.TURBO_TEAM }}
```

**Features:**

- Selective workspace building
- Turbo remote caching support
- Build output caching
- Comprehensive error handling

### 🧪 Test Workspace (`test-workspace`)

Runs tests for all packages and applications with coverage reporting.

```yaml
- name: Test Workspace
  uses: ./.github/actions/test-workspace
  with:
    workspace: "" # Specific workspace (optional)
    coverage: "true" # Generate coverage
    coverage-reporter: "lcov" # Coverage format
```

**Features:**

- Selective workspace testing
- Coverage report generation
- Test result caching
- Artifact upload for coverage

### 📏 Lint Workspace (`lint-workspace`)

Runs ESLint and Prettier checks across all workspaces.

```yaml
- name: Lint Workspace
  uses: ./.github/actions/lint-workspace
  with:
    workspace: "" # Specific workspace (optional)
    fix: "false" # Auto-fix issues
    format-check: "true" # Check formatting
```

**Features:**

- ESLint validation
- Prettier formatting checks
- Auto-fixing capabilities
- Lint result artifacts

### 🚀 Deploy Workspace (`deploy-workspace`)

Deploys specific workspaces to target environments.

```yaml
- name: Deploy Workspace
  uses: ./.github/actions/deploy-workspace
  with:
    workspace: "easymap" # Required: workspace name
    environment: "production" # Target environment
    deploy-url: "" # Custom deployment URL
    build-output-dir: "dist" # Build output directory
    skip-build: "false" # Skip build step
```

**Features:**

- Environment-specific deployments
- Build verification
- Deployment artifact management
- Flexible output directory handling

### 📋 Version Workspace (`version-workspace`)

Handles workspace versioning using Changesets with automated changelog generation.

```yaml
- name: Version Workspace
  uses: ./.github/actions/version-workspace
  with:
    workspace: "" # Specific workspace (optional)
    bump-type: "patch" # Version bump type
    dry-run: "false" # Perform dry run
    create-release: "false" # Create GitHub release
```

**Features:**

- Changeset-based versioning
- Automated changelog generation
- GitHub release creation
- Dry-run capabilities

### 🔨 Workspace Utilities (`my-action`)

General workspace utility functions and health checks.

```yaml
- name: Workspace Utilities
  uses: ./.github/actions/my-action
  with:
    action: "health-check" # Action: health-check, info, clean
    workspace: "" # Specific workspace (optional)
```

**Available Actions:**

- `health-check`: Verify workspace integrity
- `info`: Gather workspace information
- `clean`: Clean workspace artifacts

## Usage Examples

### Complete CI Pipeline

```yaml
name: CI
on: [push, pull_request]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Workspace
        uses: ./.github/actions/setup-workspace

      - name: Lint Workspace
        uses: ./.github/actions/lint-workspace

      - name: Test Workspace
        uses: ./.github/actions/test-workspace
        with:
          coverage: "true"

      - name: Build Workspace
        uses: ./.github/actions/build-workspace
```

### Selective Workspace Operations

```yaml
- name: Build Specific App
  uses: ./.github/actions/build-workspace
  with:
    workspace: "@r3f-workspace/easymap"

- name: Test UI Package
  uses: ./.github/actions/test-workspace
  with:
    workspace: "@r3f-workspace/ui"
```

### Environment-Specific Deployment

```yaml
- name: Deploy to Staging
  uses: ./.github/actions/deploy-workspace
  with:
    workspace: "easymap"
    environment: "staging"

- name: Deploy to Production
  uses: ./.github/actions/deploy-workspace
  with:
    workspace: "easymap"
    environment: "production"
    create-release: "true"
```

## Action Outputs

All actions provide structured outputs that can be used in subsequent workflow steps:

```yaml
- name: Build Workspace
  id: build
  uses: ./.github/actions/build-workspace

- name: Deploy on Success
  if: steps.build.outputs.build-status == 'success'
  uses: ./.github/actions/deploy-workspace
  with:
    workspace: "easymap"
    skip-build: "true"
```

## Caching Strategy

The actions implement a comprehensive caching strategy:

1. **Dependency Cache**: `node_modules` across all workspace levels
2. **Build Cache**: Build outputs and Turbo cache
3. **Test Cache**: Test results and coverage reports

## Environment Variables

Some actions respect environment variables:

- `TURBO_TOKEN`: Turbo remote caching token
- `TURBO_TEAM`: Turbo team identifier
- `NODE_ENV`: Node environment (set automatically by deploy action)

## Best Practices

1. **Always use setup-workspace first** in your workflows
2. **Enable caching** for faster subsequent runs
3. **Use specific workspace targeting** for faster feedback
4. **Combine actions** for complete CI/CD pipelines
5. **Monitor action outputs** for conditional logic

## Troubleshooting

### Common Issues

1. **Missing node_modules**: Ensure `setup-workspace` runs successfully
2. **Build failures**: Check workspace dependencies and build scripts
3. **Test failures**: Verify test configuration and dependencies
4. **Deployment issues**: Confirm build outputs exist and permissions

### Debug Mode

Enable debug logging by setting:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
```

## Contributing

When adding new workspace actions:

1. Follow the naming convention: `<verb>-workspace`
2. Include comprehensive input validation
3. Provide meaningful outputs
4. Implement proper error handling
5. Add caching where appropriate
6. Update this README with examples
