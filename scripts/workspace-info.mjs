#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: workspace-info.mjs
 * Description: Workspace information and analysis reporting tool
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Workspace Information Script
 * Provides comprehensive information about the monorepo structure
 */

class WorkspaceInfo {
  constructor() {
    this.workspaceRoot = path.resolve(__dirname, "..");
    this.info = {
      workspace: {},
      packages: [],
      projects: [],
      dependencies: {},
      scripts: [],
      environment: {},
    };
  }

  getEnvironmentInfo() {
    this.info.environment = {
      nodeVersion: process.version,
      npmVersion: this.execCommand("npm --version"),
      platform: process.platform,
      arch: process.arch,
      cwd: process.cwd(),
      timestamp: new Date().toISOString(),
    };
  }

  execCommand(command) {
    try {
      return execSync(command, { encoding: "utf8" }).trim();
    } catch (error) {
      return "unknown";
    }
  }

  analyzePackageJson(filePath, type = "package") {
    if (!fs.existsSync(filePath)) return null;

    try {
      const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

      return {
        name: content.name || path.basename(path.dirname(filePath)),
        version: content.version || "0.0.0",
        type: content.type || "commonjs",
        private: content.private || false,
        description: content.description || "",
        main: content.main || "",
        scripts: Object.keys(content.scripts || {}),
        dependencies: Object.keys(content.dependencies || {}),
        devDependencies: Object.keys(content.devDependencies || {}),
        peerDependencies: Object.keys(content.peerDependencies || {}),
        engines: content.engines || {},
        workspaces: content.workspaces || [],
        packageType: type,
      };
    } catch (error) {
      return {
        name: path.basename(path.dirname(filePath)),
        error: error.message,
        packageType: type,
      };
    }
  }

  scanWorkspace() {
    // Analyze root package.json
    const rootPackageJson = path.join(this.workspaceRoot, "package.json");
    this.info.workspace = this.analyzePackageJson(rootPackageJson, "workspace");

    // Scan packages directory
    const packagesDir = path.join(this.workspaceRoot, "packages");
    if (fs.existsSync(packagesDir)) {
      const packageDirs = fs.readdirSync(packagesDir);

      for (const packageDir of packageDirs) {
        const packagePath = path.join(packagesDir, packageDir);
        const packageJsonPath = path.join(packagePath, "package.json");

        if (fs.existsSync(packageJsonPath)) {
          const packageInfo = this.analyzePackageJson(packageJsonPath, "package");
          if (packageInfo) {
            packageInfo.path = packagePath;
            packageInfo.relativePath = `packages/${packageDir}`;
            this.info.packages.push(packageInfo);
          }
        }
      }
    }

    // Scan projects directory
    const projectsDir = path.join(this.workspaceRoot, "projects");
    if (fs.existsSync(projectsDir)) {
      const projectDirs = fs.readdirSync(projectsDir);

      for (const projectDir of projectDirs) {
        const projectPath = path.join(projectsDir, projectDir);
        const packageJsonPath = path.join(projectPath, "package.json");

        if (fs.existsSync(packageJsonPath)) {
          const projectInfo = this.analyzePackageJson(packageJsonPath, "project");
          if (projectInfo) {
            projectInfo.path = projectPath;
            projectInfo.relativePath = `projects/${projectDir}`;
            this.info.projects.push(projectInfo);
          }
        }
      }
    }

    // Scan scripts directory
    const scriptsDir = path.join(this.workspaceRoot, "scripts");
    if (fs.existsSync(scriptsDir)) {
      const scriptFiles = fs.readdirSync(scriptsDir);
      this.info.scripts = scriptFiles.filter(file => file.endsWith(".js") || file.endsWith(".mjs") || file.endsWith(".sh"));
    }
  }

  analyzeDependencies() {
    const allDependencies = new Map();
    const allDevDependencies = new Map();
    const allPeerDependencies = new Map();

    // Collect from workspace root
    if (this.info.workspace.dependencies) {
      this.info.workspace.dependencies.forEach(dep => {
        allDependencies.set(dep, (allDependencies.get(dep) || 0) + 1);
      });
    }

    if (this.info.workspace.devDependencies) {
      this.info.workspace.devDependencies.forEach(dep => {
        allDevDependencies.set(dep, (allDevDependencies.get(dep) || 0) + 1);
      });
    }

    // Collect from packages
    [...this.info.packages, ...this.info.projects].forEach(pkg => {
      pkg.dependencies?.forEach(dep => {
        allDependencies.set(dep, (allDependencies.get(dep) || 0) + 1);
      });

      pkg.devDependencies?.forEach(dep => {
        allDevDependencies.set(dep, (allDevDependencies.get(dep) || 0) + 1);
      });

      pkg.peerDependencies?.forEach(dep => {
        allPeerDependencies.set(dep, (allPeerDependencies.get(dep) || 0) + 1);
      });
    });

    this.info.dependencies = {
      production: Array.from(allDependencies.entries())
        .sort(([, a], [, b]) => b - a)
        .map(([name, count]) => ({ name, count })),
      development: Array.from(allDevDependencies.entries())
        .sort(([, a], [, b]) => b - a)
        .map(([name, count]) => ({ name, count })),
      peer: Array.from(allPeerDependencies.entries())
        .sort(([, a], [, b]) => b - a)
        .map(([name, count]) => ({ name, count })),
    };
  }

  generateReport() {
    const report = `# Workspace Information Report

Generated: ${new Date(this.info.environment.timestamp).toLocaleString()}

## Environment

- **Node.js**: ${this.info.environment.nodeVersion}
- **npm**: ${this.info.environment.npmVersion}
- **Platform**: ${this.info.environment.platform} (${this.info.environment.arch})
- **Working Directory**: ${this.info.environment.cwd}

## Workspace Overview

- **Name**: ${this.info.workspace.name || "Unnamed"}
- **Version**: ${this.info.workspace.version}
- **Type**: ${this.info.workspace.type}
- **Private**: ${this.info.workspace.private ? "Yes" : "No"}
- **Packages**: ${this.info.packages.length}
- **Projects**: ${this.info.projects.length}
- **Scripts**: ${this.info.scripts.length}

## Packages (${this.info.packages.length})

${this.info.packages
  .map(
    pkg => `
### ${pkg.name}

- **Version**: ${pkg.version}
- **Type**: ${pkg.type}
- **Path**: ${pkg.relativePath}
- **Description**: ${pkg.description}
- **Scripts**: ${pkg.scripts.length} (${pkg.scripts.join(", ")})
- **Dependencies**: ${pkg.dependencies.length}
- **Dev Dependencies**: ${pkg.devDependencies.length}
`
  )
  .join("\n")}

## Projects (${this.info.projects.length})

${this.info.projects
  .map(
    project => `
### ${project.name}

- **Version**: ${project.version}
- **Type**: ${project.type}
- **Path**: ${project.relativePath}
- **Description**: ${project.description}
- **Scripts**: ${project.scripts.length} (${project.scripts.join(", ")})
- **Dependencies**: ${project.dependencies.length}
- **Dev Dependencies**: ${project.devDependencies.length}
`
  )
  .join("\n")}

## Dependencies Overview

### Most Used Production Dependencies

${this.info.dependencies.production
  .slice(0, 10)
  .map(dep => `- **${dep.name}**: Used in ${dep.count} package(s)`)
  .join("\n")}

### Most Used Development Dependencies

${this.info.dependencies.development
  .slice(0, 10)
  .map(dep => `- **${dep.name}**: Used in ${dep.count} package(s)`)
  .join("\n")}

${
  this.info.dependencies.peer.length > 0
    ? `
### Peer Dependencies

${this.info.dependencies.peer.map(dep => `- **${dep.name}**: Used in ${dep.count} package(s)`).join("\n")}
`
    : ""
}

## Available Scripts (${this.info.scripts.length})

${this.info.scripts.map(script => `- \`${script}\``).join("\n")}

## Workspace Commands

### Development
\`\`\`bash
# Install all dependencies
npm install

# Run development servers for all packages
npm run dev

# Build all packages
npm run build

# Test all packages
npm run test
\`\`\`

### Package Management
\`\`\`bash
# Add dependency to workspace root
npm install package-name

# Add dependency to specific package
npm install package-name --workspace=packages/package-name

# Check for outdated packages
npm outdated
\`\`\`

### Scripts
\`\`\`bash
# Check compatibility
node scripts/check-compatibility.mjs

# Get workspace info
node scripts/workspace-info.mjs

# Build documentation
npm run docs:build
\`\`\`
`;

    return report;
  }

  async run() {
    console.log("📊 Analyzing workspace...\n");

    this.getEnvironmentInfo();
    this.scanWorkspace();
    this.analyzeDependencies();

    // Print summary to console
    console.log("🏗️  Workspace Summary:");
    console.log(`   Name: ${this.info.workspace.name || "Unnamed"}`);
    console.log(`   Packages: ${this.info.packages.length}`);
    console.log(`   Projects: ${this.info.projects.length}`);
    console.log(`   Scripts: ${this.info.scripts.length}`);
    console.log(`   Total Dependencies: ${this.info.dependencies.production.length}`);
    console.log(`   Dev Dependencies: ${this.info.dependencies.development.length}`);

    // Save detailed report
    const reportPath = path.join(this.workspaceRoot, "docs", "workspace-info.md");
    const report = this.generateReport();
    fs.writeFileSync(reportPath, report, "utf8");

    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    console.log("\n✅ Workspace analysis complete!");
  }
}

// Run the workspace info script
const workspaceInfo = new WorkspaceInfo();
workspaceInfo.run().catch(console.error);
