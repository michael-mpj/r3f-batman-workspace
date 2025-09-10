# Package Compatibility Report

Generated on: 9/10/2025, 6:20:08 AM

## Environment

- **Node.js**: v22.19.0
- **npm**: 10.9.3

## Summary

- **Total packages**: 5
- **Compatible**: 5 ✅
- **Warnings**: 0 ⚠️
- **Errors**: 0 ❌

## Package Details

### ✅ root

- **Version**: 1.0.0
- **Type**: module
- **Engines**: {
  "node": ">=18.0.0",
  "npm": ">=9.0.0"
}

**Issues:**

- ℹ️ Node.js requirement: >=18.0.0, current: v22.19.0
- ℹ️ npm requirement: >=9.0.0, current: 10.9.3
- ℹ️ react@^19.0.0: Requires Node.js >= 16
- ℹ️ three@^0.180.0: Modern Three.js version - good compatibility
- ℹ️ vite@^6.3.6: Requires Node.js >= 18

---

### ✅ r3f-components

- **Version**: 1.0.0
- **Type**: module

**Issues:**

- ℹ️ vite@^6.3.6: Requires Node.js >= 18
- ℹ️ react@^18.3.1: Requires Node.js >= 16
- ℹ️ three@^0.179.1: Modern Three.js version - good compatibility

---

### ✅ ui

- **Version**: 1.0.0
- **Type**: module

**Issues:**

- ℹ️ vite@^6.3.6: Requires Node.js >= 18
- ℹ️ react@^19.0.0: Requires Node.js >= 16

---

### ✅ utils

- **Version**: 1.0.0
- **Type**: module

**Issues:**

- ℹ️ three@^0.180.0: Modern Three.js version - good compatibility
- ℹ️ vite@^6.3.6: Requires Node.js >= 18

---

### ✅ projects/R3f-StarterKit

- **Version**: 0.0.0
- **Type**: module

**Issues:**

- ℹ️ react@^19.0.0: Requires Node.js >= 16
- ℹ️ three@^0.180.0: Modern Three.js version - good compatibility
- ℹ️ vite@^6.3.6: Requires Node.js >= 18

---

## Recommendations

### Node.js Version Management

We recommend using a Node.js version manager like:

- **nvm** (Node Version Manager)
- **fnm** (Fast Node Manager)
- **volta** (JavaScript Tool Manager)

### Package Updates

To update packages:

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package@latest
```

### Workspace Commands

```bash
# Install all workspace dependencies
npm install

# Run compatibility check
npm run check:compatibility

# Build all packages
npm run build

# Test all packages
npm run test
```
