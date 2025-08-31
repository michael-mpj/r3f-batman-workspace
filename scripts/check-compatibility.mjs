#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: check-compatibility.mjs
 * Description: Dependency compatibility checker and analysis tool
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
 * Package Compatibility Checker
 * Checks compatibility of packages with current Node.js and npm versions
 */

class CompatibilityChecker {
  constructor() {
    this.nodeVersion = process.version;
    this.npmVersion = this.getNpmVersion();
    this.workspaceRoot = path.resolve(__dirname, "..");
    this.packages = this.findPackages();
    this.results = {
      nodeVersion: this.nodeVersion,
      npmVersion: this.npmVersion,
      timestamp: new Date().toISOString(),
      packages: [],
      summary: {
        total: 0,
        compatible: 0,
        warnings: 0,
        errors: 0,
      },
    };
  }

  getNpmVersion() {
    try {
      return execSync("npm --version", { encoding: "utf8" }).trim();
    } catch (error) {
      return "unknown";
    }
  }

  findPackages() {
    const packages = [];

    // Root package
    packages.push({
      name: "root",
      path: this.workspaceRoot,
      packageJsonPath: path.join(this.workspaceRoot, "package.json"),
    });

    // Find workspace packages
    const packagesDir = path.join(this.workspaceRoot, "packages");
    if (fs.existsSync(packagesDir)) {
      const packageNames = fs.readdirSync(packagesDir);
      for (const packageName of packageNames) {
        const packagePath = path.join(packagesDir, packageName);
        const packageJsonPath = path.join(packagePath, "package.json");

        if (fs.existsSync(packageJsonPath)) {
          packages.push({
            name: packageName,
            path: packagePath,
            packageJsonPath,
          });
        }
      }
    }

    // Find project packages
    const projectsDir = path.join(this.workspaceRoot, "projects");
    if (fs.existsSync(projectsDir)) {
      const projectNames = fs.readdirSync(projectsDir);
      for (const projectName of projectNames) {
        const projectPath = path.join(projectsDir, projectName);
        const packageJsonPath = path.join(projectPath, "package.json");

        if (fs.existsSync(packageJsonPath)) {
          packages.push({
            name: `projects/${projectName}`,
            path: projectPath,
            packageJsonPath,
          });
        }
      }
    }

    return packages;
  }

  checkNodeEngines(packageJson) {
    const engines = packageJson.engines;
    const issues = [];

    if (engines && engines.node) {
      const nodeRequirement = engines.node;
      const currentNodeVersion = this.nodeVersion;

      // Basic version comparison (simplified)
      issues.push({
        type: "info",
        message: `Node.js requirement: ${nodeRequirement}, current: ${currentNodeVersion}`,
      });

      // Check if current version meets minimum requirement
      const minVersion = nodeRequirement.replace(/[>=^~]/, "").split(".")[0];
      const currentMajor = currentNodeVersion.replace("v", "").split(".")[0];

      if (parseInt(currentMajor) < parseInt(minVersion)) {
        issues.push({
          type: "error",
          message: `Node.js version ${currentNodeVersion} does not meet requirement ${nodeRequirement}`,
        });
      }
    }

    if (engines && engines.npm) {
      const npmRequirement = engines.npm;
      issues.push({
        type: "info",
        message: `npm requirement: ${npmRequirement}, current: ${this.npmVersion}`,
      });
    }

    return issues;
  }

  checkDependencies(packageJson) {
    const issues = [];
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies,
    };

    // Check for known compatibility issues
    const knownIssues = {
      react: {
        ">= 18": "Requires Node.js >= 16",
      },
      vite: {
        ">= 5": "Requires Node.js >= 18",
      },
      three: {
        ">= 0.150": "Modern Three.js version - good compatibility",
      },
    };

    for (const [depName, version] of Object.entries(allDeps)) {
      if (knownIssues[depName]) {
        issues.push({
          type: "info",
          message: `${depName}@${version}: ${Object.values(knownIssues[depName])[0]}`,
        });
      }
    }

    return issues;
  }

  checkPackage(pkg) {
    const result = {
      name: pkg.name,
      path: pkg.path,
      status: "compatible",
      issues: [],
      packageJson: null,
    };

    try {
      const packageJsonContent = fs.readFileSync(pkg.packageJsonPath, "utf8");
      const packageJson = JSON.parse(packageJsonContent);
      result.packageJson = {
        name: packageJson.name,
        version: packageJson.version,
        engines: packageJson.engines,
        type: packageJson.type,
      };

      // Check Node.js engines
      const engineIssues = this.checkNodeEngines(packageJson);
      result.issues.push(...engineIssues);

      // Check dependencies
      const depIssues = this.checkDependencies(packageJson);
      result.issues.push(...depIssues);

      // Determine overall status
      const hasErrors = result.issues.some(issue => issue.type === "error");
      const hasWarnings = result.issues.some(issue => issue.type === "warning");

      if (hasErrors) {
        result.status = "error";
        this.results.summary.errors++;
      } else if (hasWarnings) {
        result.status = "warning";
        this.results.summary.warnings++;
      } else {
        this.results.summary.compatible++;
      }
    } catch (error) {
      result.status = "error";
      result.issues.push({
        type: "error",
        message: `Failed to read package.json: ${error.message}`,
      });
      this.results.summary.errors++;
    }

    return result;
  }

  async run() {
    console.log("🔍 Checking package compatibility...\n");
    console.log(`Node.js: ${this.nodeVersion}`);
    console.log(`npm: ${this.npmVersion}\n`);

    for (const pkg of this.packages) {
      const result = this.checkPackage(pkg);
      this.results.packages.push(result);
      this.results.summary.total++;

      // Print results
      const statusIcon = {
        compatible: "✅",
        warning: "⚠️",
        error: "❌",
      }[result.status];

      console.log(`${statusIcon} ${result.name}`);

      if (result.issues.length > 0) {
        result.issues.forEach(issue => {
          const icon = {
            info: "ℹ️",
            warning: "⚠️",
            error: "❌",
          }[issue.type];
          console.log(`   ${icon} ${issue.message}`);
        });
      }
      console.log();
    }

    // Save detailed results
    await this.saveResults();

    // Print summary
    this.printSummary();
  }

  async saveResults() {
    const outputPath = path.join(this.workspaceRoot, "docs", "guide", "package-compatibility.md");
    const content = this.generateMarkdownReport();

    fs.writeFileSync(outputPath, content, "utf8");
    console.log(`📄 Detailed report saved to: ${outputPath}`);
  }

  generateMarkdownReport() {
    const { summary, nodeVersion, npmVersion, timestamp } = this.results;

    let content = `# Package Compatibility Report

Generated on: ${new Date(timestamp).toLocaleString()}

## Environment

- **Node.js**: ${nodeVersion}
- **npm**: ${npmVersion}

## Summary

- **Total packages**: ${summary.total}
- **Compatible**: ${summary.compatible} ✅
- **Warnings**: ${summary.warnings} ⚠️
- **Errors**: ${summary.errors} ❌

## Package Details

`;

    for (const pkg of this.results.packages) {
      const statusIcon = {
        compatible: "✅",
        warning: "⚠️",
        error: "❌",
      }[pkg.status];

      content += `### ${statusIcon} ${pkg.name}\n\n`;

      if (pkg.packageJson) {
        content += `- **Version**: ${pkg.packageJson.version}\n`;
        content += `- **Type**: ${pkg.packageJson.type || "commonjs"}\n`;

        if (pkg.packageJson.engines) {
          content += `- **Engines**: ${JSON.stringify(pkg.packageJson.engines, null, 2)}\n`;
        }
      }

      if (pkg.issues.length > 0) {
        content += `\n**Issues:**\n\n`;
        pkg.issues.forEach(issue => {
          const icon = {
            info: "ℹ️",
            warning: "⚠️",
            error: "❌",
          }[issue.type];
          content += `- ${icon} ${issue.message}\n`;
        });
      }

      content += "\n---\n\n";
    }

    content += `## Recommendations

### Node.js Version Management

We recommend using a Node.js version manager like:

- **nvm** (Node Version Manager)
- **fnm** (Fast Node Manager)
- **volta** (JavaScript Tool Manager)

### Package Updates

To update packages:

\`\`\`bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package@latest
\`\`\`

### Workspace Commands

\`\`\`bash
# Install all workspace dependencies
npm install

# Run compatibility check
npm run check:compatibility

# Build all packages
npm run build

# Test all packages
npm run test
\`\`\`
`;

    return content;
  }

  printSummary() {
    const { summary } = this.results;

    console.log("\n📊 Summary:");
    console.log(`   Total packages: ${summary.total}`);
    console.log(`   ✅ Compatible: ${summary.compatible}`);
    console.log(`   ⚠️  Warnings: ${summary.warnings}`);
    console.log(`   ❌ Errors: ${summary.errors}`);

    if (summary.errors > 0) {
      console.log("\n⚠️  Some packages have compatibility issues. Check the detailed report.");
      process.exit(1);
    } else if (summary.warnings > 0) {
      console.log("\n✅ All packages are compatible with warnings.");
    } else {
      console.log("\n🎉 All packages are fully compatible!");
    }
  }
}

// Run the compatibility checker
const checker = new CompatibilityChecker();
checker.run().catch(console.error);
