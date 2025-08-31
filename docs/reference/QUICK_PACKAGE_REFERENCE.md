# Quick Package Reference

> **Node.js:** v22.18.0 | **npm:** 10.9.3 | **Updated:** Aug 29, 2025

## 🚀 **Quick Version Check**

```bash
# System check
node -v && npm -v

# Dependency check
npm outdated

# Install latest
npm install
```

## 📦 **Target Versions (Node 22.18.0 Compatible)**

| Package                  | Version | Status     |
| ------------------------ | ------- | ---------- |
| **vite**                 | ^7.1.3  | ✅ Latest  |
| **vitest**               | ^3.2.4  | ✅ Current |
| **eslint**               | ^9.34.0 | ✅ Latest  |
| **prettier**             | ^3.6.2  | ✅ Latest  |
| **@vitejs/plugin-react** | ^5.0.2  | ✅ Latest  |

## ⚠️ **Watch List**

- **React 19:** Available (major update - needs testing)
- **R3F v9:** Available (major update - breaking changes)
- **Three.js:** Stable at ^0.179.1

## 🔧 **Common Commands**

```bash
# Update specific package
npm install package@latest --workspace=packages/ui

# Check workspace status
npm run workspace-info

# Lint all
npm run lint --workspaces

# Build all
npm run build --workspaces
```

---

📋 **Full details:** [PACKAGE_COMPATIBILITY_MATRIX.md](./PACKAGE_COMPATIBILITY_MATRIX.md)
