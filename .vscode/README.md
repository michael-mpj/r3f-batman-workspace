# 🦇 Batman R3F Workspace - VS Code Setup

## 📦 Recommended Extensions

This workspace includes carefully curated VS Code extensions to enhance your R3F (React Three Fiber) development experience with Batman automation.

### 🦇 Batman Core Development Stack

| Extension           | Purpose                               | Auto-Install |
| ------------------- | ------------------------------------- | ------------ |
| **Prettier**        | Code formatting with Batman standards | ✅           |
| **ESLint**          | Code linting and error detection      | ✅           |
| **Prettier ESLint** | Integrated formatting + linting       | ✅           |

### 🎯 React & JavaScript Development

| Extension                     | Purpose                   | Features                  |
| ----------------------------- | ------------------------- | ------------------------- |
| **React Native Tools**        | React development support | IntelliSense, debugging   |
| **ES7+ React/Redux Snippets** | Code snippets for React   | `rafce`, `useState`, etc. |
| **JavaScript Snippets**       | Essential JS snippets     | `clg`, `imp`, `exp`       |
| **npm Intellisense**          | Auto-complete npm modules | Import suggestions        |
| **Path Intellisense**         | File path auto-completion | Relative/absolute paths   |

### 🧪 Testing & Debugging

| Extension           | Purpose                  | Batman Integration    |
| ------------------- | ------------------------ | --------------------- |
| **Jest**            | Unit testing support     | ✅ Batman test runner |
| **Vitest Explorer** | Vitest test runner       | ✅ Workspace tests    |
| **Console Ninja**   | Advanced console logging | ✅ Runtime debugging  |
| **Jupyter**         | Notebook support         | Data analysis         |

### 🎨 UI & Visual Enhancements

| Extension               | Purpose              | Theme       |
| ----------------------- | -------------------- | ----------- |
| **Material Icon Theme** | Beautiful file icons | ✅ Default  |
| **VS Code Icons**       | Enhanced icon set    | Alternative |

### 📝 Documentation & Markdown

| Extension                   | Purpose                   | Batman Docs       |
| --------------------------- | ------------------------- | ----------------- |
| **Markdown All in One**     | Complete markdown support | ✅ README editing |
| **Markdown Lint**           | Markdown formatting rules | ✅ Doc standards  |
| **GitHub Markdown Preview** | GitHub-style preview      | ✅ Repo docs      |

### 🔧 Code Quality & Productivity

| Extension              | Purpose                  | Automation         |
| ---------------------- | ------------------------ | ------------------ |
| **Better Comments**    | Enhanced comment styling | `// 🦇 Batman:`    |
| **Code Spell Checker** | Spelling validation      | ✅ Documentation   |
| **TODO Highlight**     | Task highlighting        | `🦇 TODO:` support |
| **Auto Close Tag**     | Automatic tag closing    | React/HTML         |
| **Auto Rename Tag**    | Synchronized tag editing | JSX support        |
| **EditorConfig**       | Consistent formatting    | ✅ Team standards  |

### 🐙 Git & GitHub Integration

| Extension                | Purpose             | Batman Automation       |
| ------------------------ | ------------------- | ----------------------- |
| **GitHub Copilot**       | AI pair programming | ✅ Enhanced prompts     |
| **Copilot Chat**         | Conversational AI   | ✅ Batman context       |
| **GitHub Pull Requests** | PR management       | ✅ Workflow integration |
| **GitHub Actions**       | CI/CD support       | ✅ Batman scripts       |
| **Git History**          | Visual git timeline | Commit tracking         |

### 🎮 Three.js & Graphics Support

| Extension          | Purpose                | R3F Development |
| ------------------ | ---------------------- | --------------- |
| **SVG**            | SVG file support       | Icons, graphics |
| **Apollo GraphQL** | GraphQL development    | Data fetching   |
| **GraphQL**        | GraphQL syntax support | Schema editing  |

### 🏗️ Build & Development Tools

| Extension               | Purpose               | Batman Scripts    |
| ----------------------- | --------------------- | ----------------- |
| **Code Runner**         | Execute code snippets | ✅ Quick testing  |
| **Search node_modules** | Fast module search    | Dependency lookup |

### 📊 Analytics & Monitoring

| Extension       | Purpose                   | Tracking             |
| --------------- | ------------------------- | -------------------- |
| **WakaTime**    | Development time tracking | Productivity metrics |
| **IntelliCode** | AI-assisted coding        | Smart suggestions    |

## 🚀 Quick Setup

### Auto-Install Extensions

When you open this workspace, VS Code will prompt to install recommended extensions:

```bash
# Manual installation (if needed)
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension github.copilot
# ... (all extensions listed above)
```

### Batman Automation Features

- **Auto-formatting on save** with Prettier + ESLint
- **Intelligent commit messages** with Batman formatter
- **Integrated testing** with Jest/Vitest
- **Real-time error detection** with ESLint
- **Smart auto-completion** with IntelliCode + Copilot

## ⚙️ Workspace Settings

Key settings optimized for Batman R3F development:

```jsonc
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
  },
  "workbench.iconTheme": "material-icon-theme",
  "consoleNinja.featureSet": "Community",
  "vitest.disableWorkspaceWarning": true,
}
```

## 🎯 Development Workflow

1. **Open workspace** → Extensions auto-install
2. **Write code** → Auto-format on save
3. **Commit changes** → Batman formats commit messages
4. **Run tests** → Integrated test runners
5. **Debug issues** → Console Ninja + DevTools
6. **Deploy** → GitHub Actions + Vercel

## 🔧 Customization

### Adding Extensions

Add to `.vscode/extensions.json`:

```jsonc
{
  "recommendations": ["your.extension-id"],
}
```

### Custom Settings

Update `.vscode/settings.json` for team preferences.

### Batman Integration

All extensions work seamlessly with Batman automation scripts for optimal R3F development! 🦇✨
