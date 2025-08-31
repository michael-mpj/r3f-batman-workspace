# Build Report

Generated: 8/29/2025, 1:44:09 PM

## Summary

- **Total targets**: 3
- **Successful**: 2
- **Failed**: 1
- **Total build time**: 14691ms

## Successful Builds

### ✅ @r3f-workspace/ui

- **Type**: package
- **Duration**: 2360ms
- **Path**: /Users/michaeljoseph/Public/R3fWWW/packages/ui

### ✅ r3f-starterkit

- **Type**: project
- **Duration**: 10723ms
- **Path**: /Users/michaeljoseph/Public/R3fWWW/projects/R3f-StarterKit

## Failed Builds

### ❌ @r3f-workspace/utils

- **Type**: package
- **Duration**: 1608ms
- **Exit Code**: 1
- **Path**: /Users/michaeljoseph/Public/R3fWWW/packages/utils

**Error Output:**

```
Could not resolve entry module "index.html".
error during build:
RollupError: Could not resolve entry module "index.html".
    at error (file:///Users/michaeljoseph/Public/R3fWWW/packages/utils/node_modules/rollup/dist/es/shared/node-entry.js:2287:30)
    at ModuleLoader.loadEntryModule (file:///Users/michaeljoseph/Public/R3fWWW/packages/utils/node_modules/rollup/dist/es/shared/node-entry.js:24881:20)
    at async Promise.all (index 0)
npm error Lifecycle script `build` failed with error:
npm error code 1
npm error path /Users/michaeljoseph/Public/R3fWWW/packages/utils
npm error workspace @r3f-workspace/utils@1.0.0
npm error location /Users/michaeljoseph/Public/R3fWWW/packages/utils
npm error command failed
npm error command sh -c vite build

```

## Next Steps

### Fix Build Failures

1. Review the error messages above
2. Check dependencies are installed: `npm install`
3. Ensure all packages are up to date
4. Run individual builds to debug: `cd path/to/package && npm run build`

### Deploy Built Packages

```bash
# Deploy packages (example)
npm run deploy

# Or deploy individually
cd packages/package-name && npm publish
```
