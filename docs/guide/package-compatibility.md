# Package Compatibility Report

Generated on: 6/27/2026, 5:09:22 AM

## Environment

- **Node.js**: v24.13.1
- **npm**: 11.8.0

## Summary

- **Total packages**: 5
- **Compatible**: 5 ✅
- **Warnings**: 0 ⚠️
- **Errors**: 0 ❌

## Package Details

### ✅ root

- **Version**: 2.0.0
- **Type**: module
- **Engines**: {
  "node": "^24.0.0",
  "npm": ">=10.9.3"
}

**Issues:**

- ℹ️ Node.js requirement: ^24.0.0, current: v24.13.1
- ℹ️ npm requirement: >=10.9.3, current: 11.8.0
- ℹ️ react@^19.2.7: Requires Node.js >= 16
- ℹ️ three@^0.184.0: Modern Three.js version - good compatibility
- ℹ️ vite@^8.0.14: Requires Node.js >= 18

---

### ✅ r3f-components

- **Version**: 1.0.0
- **Type**: module

**Issues:**

- ℹ️ vite@^8.1.0: Requires Node.js >= 18
- ℹ️ react@^19.2.7: Requires Node.js >= 16
- ℹ️ three@^0.184.0: Modern Three.js version - good compatibility

---

### ✅ ui

- **Version**: 1.0.0
- **Type**: module

**Issues:**

- ℹ️ vite@^8.1.0: Requires Node.js >= 18
- ℹ️ react@^19.0.0: Requires Node.js >= 16

---

### ✅ utils

- **Version**: 1.0.0
- **Type**: module

**Issues:**

- ℹ️ three@^0.184.0: Modern Three.js version - good compatibility
- ℹ️ vite@^8.1.0: Requires Node.js >= 18

---

### ✅ projects/R3f-StarterKit

- **Version**: 0.0.0
- **Type**: module

**Issues:**

- ℹ️ react@^19.2.7: Requires Node.js >= 16
- ℹ️ three@^0.184.0: Modern Three.js version - good compatibility
- ℹ️ vite@^8.1.0: Requires Node.js >= 18

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
