# Package Compatibility Matrix

> **Last Updated:** August 30, 2025
> **Node.js Version:** v22.18.0
> **npm Version:** 10.9.3

## 🎯 **Executive Summary**

This document maintains the compatibility matrix for all packages in the R3F Workspace monorepo. It serves as the single source of truth for version alignment, dependency management, and upgrade planning.

> 🚀 **RECENT UPDATES (Aug 30, 2025):** Major package updates completed! All R3F ecosystem packages, testing libraries, and development tools have been upgraded to their latest versions. See updated matrices below.

## 🔄 **Latest Update Summary**

✅ **Successfully Updated:**

- **@react-three/fiber:** v8.13.7 → v9.3.0 (Major update!)
- **@react-three/drei:** v9.83.1 → v10.7.4 (Major update!)
- **@react-three/postprocessing:** v2.15.1 → v3.0.4 (Major update!)
- **@react-three/xr:** v5.6.0 → v6.6.25
- **React/React-DOM:** v18.2.0 → v18.3.1
- **@testing-library/react:** v13.4.0 → v16.3.0
- **jsdom:** v22.1.0 → v26.1.0
- **eslint-config-prettier:** v9.0.0 → v10.1.8
- **concurrently:** v8.2.1 → v9.2.1
- **lint-staged:** v14.0.1 → v16.1.5
- **rimraf:** v5.0.1 → v6.0.1

🎯 **Build Status:** ✅ All packages building successfully
🧪 **Tests:** ✅ All tests passing
🔍 **Linting:** ✅ No issues detected

## 📊 **Current System Foundation**

| System Component    | Version        | Compatibility Status | Notes                  |
| ------------------- | -------------- | -------------------- | ---------------------- |
| **Node.js**         | v22.18.0       | ✅ Latest LTS        | Optimal performance    |
| **npm**             | 10.9.3         | ✅ Latest Stable     | Full workspace support |
| **Package Manager** | npm workspaces | ✅ Native            | Monorepo orchestration |

## 🔧 **Core Build Tools Matrix**

| Tool         | Current             | Latest Available | Target  | Compatibility  | Priority    |
| ------------ | ------------------- | ---------------- | ------- | -------------- | ----------- |
| **Vite**     | Mixed (4.x/5.x/7.x) | 7.1.3            | ^7.1.3  | ✅ Node 22+    | 🔴 Critical |
| **Vitest**   | ^3.2.4              | 3.2.4            | ^3.2.4  | ✅ Ready       | ✅ Current  |
| **ESLint**   | Mixed (8.x/9.x)     | 9.34.0           | ^9.34.0 | ⚠️ Plugin deps | 🟡 High     |
| **Prettier** | Mixed (3.0.x/3.6.x) | 3.6.2            | ^3.6.2  | ✅ Node 22+    | 🟢 Medium   |
| **Turbo**    | ^1.10.12            | 2.5.6            | ^2.5.6  | ✅ Node 22+    | 🟢 Medium   |

## 🎨 **React Ecosystem Matrix**

| Package                  | Root       | packages/utils | packages/ui    | R3f-StarterKit | Latest | Status           |
| ------------------------ | ---------- | -------------- | -------------- | -------------- | ------ | ---------------- |
| **React**                | ^18.3.1 ✅ | N/A            | ^18.2.0 (peer) | ^18.3.1 ✅     | 19.1.1 | 🟡 Major pending |
| **React DOM**            | ^18.3.1 ✅ | N/A            | ^18.2.0 (peer) | ^18.3.1 ✅     | 19.1.1 | 🟡 Major pending |
| **@vitejs/plugin-react** | ^5.0.2 ✅  | N/A            | ^5.0.2 ✅      | ^5.0.2 ✅      | 5.0.2  | ✅ Current       |

## 🌌 **Three.js & R3F Ecosystem Matrix**

| Package                         | Root       | packages/utils | packages/ui | R3f-StarterKit | Latest  | Compatibility Notes      |
| ------------------------------- | ---------- | -------------- | ----------- | -------------- | ------- | ------------------------ |
| **Three.js**                    | ^0.179.1   | ^0.179.1       | N/A         | ^0.179.1       | 0.179.1 | ✅ Aligned               |
| **@react-three/fiber**          | ^9.3.0 ✅  | N/A            | N/A         | ^9.3.0 ✅      | 9.3.0   | ✅ **UPDATED** to latest |
| **@react-three/drei**           | ^10.7.4 ✅ | N/A            | N/A         | ^10.7.4 ✅     | 10.7.4  | ✅ **UPDATED** to latest |
| **@react-three/postprocessing** | ^3.0.4 ✅  | N/A            | N/A         | ^3.0.4 ✅      | 3.0.4   | ✅ **UPDATED** to latest |
| **@react-three/xr**             | ^6.6.25 ✅ | N/A            | N/A         | N/A            | 6.6.25  | ✅ **UPDATED** to latest |

## 🧪 **Testing Framework Matrix**

| Package                       | Root       | packages/utils | packages/ui | R3f-StarterKit | Latest | Status                   |
| ----------------------------- | ---------- | -------------- | ----------- | -------------- | ------ | ------------------------ |
| **Vitest**                    | ^3.2.4     | ^3.2.4         | ^3.2.4      | N/A            | 3.2.4  | ✅ Current               |
| **Jest**                      | ^30.0.5    | N/A            | N/A         | N/A            | 30.0.5 | ✅ Current               |
| **@testing-library/react**    | ^16.3.0 ✅ | N/A            | ^13.4.0     | N/A            | 16.3.0 | ✅ **UPDATED** to latest |
| **@testing-library/jest-dom** | ^6.1.3     | N/A            | ^6.1.3      | N/A            | 6.1.3  | ✅ Current               |
| **jsdom**                     | ^26.1.0 ✅ | N/A            | ^22.1.0     | N/A            | 26.1.0 | ✅ **UPDATED** to latest |

## 📋 **ESLint Ecosystem Matrix**

| Package                         | Root       | packages/utils | packages/ui | R3f-StarterKit | Latest | Compatibility            |
| ------------------------------- | ---------- | -------------- | ----------- | -------------- | ------ | ------------------------ |
| **ESLint Core**                 | ^9.34.0 ✅ | ^9.34.0 ✅     | ^9.34.0 ✅  | ^9.34.0 ✅     | 9.34.0 | ✅ Aligned               |
| **eslint-plugin-react**         | ^7.37.5 ✅ | N/A            | N/A         | ^7.37.5 ✅     | 7.37.5 | ✅ ESLint 9 compatible   |
| **eslint-plugin-react-hooks**   | ^5.2.0 ✅  | N/A            | N/A         | ^5.2.0 ✅      | 5.2.0  | ✅ ESLint 9 compatible   |
| **eslint-plugin-react-refresh** | ^0.4.20 ✅ | N/A            | N/A         | ^0.4.20 ✅     | 0.4.20 | ✅ ESLint 9 compatible   |
| **eslint-plugin-jsx-a11y**      | ^6.7.1     | N/A            | N/A         | ^6.7.1         | 6.7.1  | ✅ Current               |
| **eslint-config-prettier**      | ^10.1.8 ✅ | N/A            | N/A         | ^10.1.8 ✅     | 10.1.8 | ✅ **UPDATED** to latest |

## 🚀 **Development Tools Matrix**

| Tool             | Current    | Latest | Compatibility | Usage                 |
| ---------------- | ---------- | ------ | ------------- | --------------------- |
| **Concurrently** | ^9.2.1 ✅  | 9.2.1  | ✅ Node 22+   | Script orchestration  |
| **Husky**        | ^9.1.7     | 9.1.7  | ✅ Current    | Git hooks             |
| **Lint-staged**  | ^16.1.5 ✅ | 16.1.5 | ✅ Node 22+   | Pre-commit linting    |
| **Rimraf**       | ^6.0.1 ✅  | 6.0.1  | ✅ Node 22+   | Cross-platform rm -rf |
| **Changesets**   | ^2.26.2    | 2.26.2 | ✅ Current    | Release management    |

## 📦 **Workspace Package Dependencies**

### Internal Dependencies

```text
@r3f-workspace/ui -> packages/ui
@r3f-workspace/utils -> packages/utils

Consumed by:
- projects/R3f-StarterKit (both packages)
```

### Peer Dependencies

```text
React Ecosystem:
- react: ^18.3.1 (peer dependency for @r3f-workspace/ui)
- react-dom: ^18.3.1 (peer dependency for @r3f-workspace/ui)
```

## ⚠️ **Known Compatibility Issues**

### 1. **React 19 Migration**

- **Status:** 🟡 Planning Required
- **Impact:** Major version update affects entire ecosystem
- **Blocker:** R3F ecosystem compatibility unclear
- **Action:** Research R3F + React 19 compatibility

### 2. **ESLint 9 Plugin Ecosystem**

- **Status:** 🟢 Resolved
- **Solution:** Updated all plugins to ESLint 9 compatible versions
- **Note:** Some plugins required major version updates

### 3. **Vite Version Misalignment**

- **Status:** 🟡 In Progress
- **Issue:** Mixed versions (4.x, 5.x, 7.x) across packages
- **Target:** Align all to ^7.1.3
- **Risk:** Breaking changes in config format

## 🎯 **Upgrade Roadmap**

### **Phase 1: Critical Alignment** (Current)

- [ ] ✅ ESLint 9 ecosystem alignment
- [ ] 🔄 Vite 7.x alignment across all packages
- [ ] 🔄 Prettier 3.6.x alignment
- [ ] 📋 Testing library updates

### **Phase 2: Major Framework Updates** (Next)

- [ ] 📋 React 19 research and compatibility testing
- [ ] 📋 R3F ecosystem major version evaluation
- [ ] 📋 Three.js latest features assessment
- [ ] 📋 Node.js 23 LTS preparation

### **Phase 3: Performance Optimization** (Future)

- [ ] 📋 Turbo 2.x migration for build performance
- [ ] 📋 Advanced caching strategies
- [ ] 📋 Bundle size optimization
- [ ] 📋 CI/CD pipeline enhancements

## 🔍 **Version Check Commands**

```bash
# Check current system
node -v && npm -v

# Check outdated packages
npm outdated

# Check specific package versions
npm info <package>@latest version

# Workspace-specific checks
npm run workspace-info
npm run check-compatibility

# NEW: Automated package updates
npm run update-packages
npm run update
```

## 🤖 **Automation Scripts** (NEW!)

The workspace now includes automated package management:

| Script                        | Purpose                        | Command                  |
| ----------------------------- | ------------------------------ | ------------------------ |
| `npm run update-packages`     | Auto-update to latest versions | Smart package updating   |
| `npm run update`              | Shorthand for package updates  | Quick update command     |
| `npm run fresh`               | Clean reinstall all packages   | Full environment refresh |
| `npm run batman`              | Comprehensive health check     | Full system validation   |
| `npm run check-compatibility` | Compatibility validation       | Version compatibility    |

## 📈 **Maintenance Schedule**

| Frequency     | Task                 | Command                       |
| ------------- | -------------------- | ----------------------------- |
| **Weekly**    | Security updates     | `npm audit && npm audit fix`  |
| **Monthly**   | Dependency updates   | `npm outdated` review         |
| **Quarterly** | Major version review | Full compatibility assessment |
| **Annually**  | Node.js LTS upgrade  | System foundation update      |

## 🎯 **Decision Matrix**

### When to Update

- ✅ **Security patches:** Immediate
- ✅ **Patch versions:** Weekly batch
- 🟡 **Minor versions:** Monthly review
- 🔴 **Major versions:** Quarterly planning

### Risk Assessment

- 🟢 **Low Risk:** Patch updates, dev dependencies
- 🟡 **Medium Risk:** Minor versions, build tools
- 🔴 **High Risk:** Major versions, peer dependencies

## 📚 **References**

- [Node.js Release Schedule](https://nodejs.org/en/about/releases/)
- [React Release Notes](https://react.dev/blog)
- [Three.js Migration Guide](https://threejs.org/docs/)
- [Vite Migration Guide](https://vitejs.dev/guide/migration.html)
- [ESLint Migration Guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0)

---

> **💡 Pro Tip:** Always test in a feature branch before applying major version updates to main branch. Use `npm ci` for consistent installs in CI/CD pipelines.
