#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: build-workspace.mjs
 * Description: Workspace build orchestration script with parallel execution
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import fs from "fs";
import path from "path";
import { execSync, spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Workspace Build Script
 * Builds all packages and projects in the correct order
 */

class WorkspaceBuilder {
    constructor() {
        this.workspaceRoot = path.resolve(__dirname, "..");
        this.buildOrder = [];
        this.results = new Map();
    }

    log(message, level = "info") {
        const timestamp = new Date().toLocaleTimeString();
        const icons = {
            info: "ℹ️",
            success: "✅",
            warning: "⚠️",
            error: "❌",
            building: "🔨",
        };
        console.log(`[${timestamp}] ${icons[level]} ${message}`);
    }

    findBuildTargets() {
        const targets = [];

        // Add packages
        const packagesDir = path.join(this.workspaceRoot, "packages");
        if (fs.existsSync(packagesDir)) {
            const packageDirs = fs.readdirSync(packagesDir);

            for (const packageDir of packageDirs) {
                const packagePath = path.join(packagesDir, packageDir);
                const packageJsonPath = path.join(packagePath, "package.json");

                if (fs.existsSync(packageJsonPath)) {
                    try {
                        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
                        if (packageJson.scripts && packageJson.scripts.build) {
                            targets.push({
                                name: packageJson.name || packageDir,
                                path: packagePath,
                                type: "package",
                                buildCommand: "npm run build",
                            });
                        }
                    } catch (error) {
                        this.log(`Failed to parse package.json for ${packageDir}: ${error.message}`, "warning");
                    }
                }
            }
        }

        // Add projects
        const projectsDir = path.join(this.workspaceRoot, "projects");
        if (fs.existsSync(projectsDir)) {
            const projectDirs = fs.readdirSync(projectsDir);

            for (const projectDir of projectDirs) {
                const projectPath = path.join(projectsDir, projectDir);
                const packageJsonPath = path.join(projectPath, "package.json");

                if (fs.existsSync(packageJsonPath)) {
                    try {
                        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
                        if (packageJson.scripts && packageJson.scripts.build) {
                            targets.push({
                                name: packageJson.name || projectDir,
                                path: projectPath,
                                type: "project",
                                buildCommand: "npm run build",
                            });
                        }
                    } catch (error) {
                        this.log(`Failed to parse package.json for ${projectDir}: ${error.message}`, "warning");
                    }
                }
            }
        }

        return targets;
    }

    async buildTarget(target) {
        const startTime = Date.now();
        this.log(`Building ${target.name} (${target.type})...`, "building");

        return new Promise(resolve => {
            const child = spawn("npm", ["run", "build"], {
                cwd: target.path,
                stdio: ["inherit", "pipe", "pipe"],
                shell: true,
            });

            let stdout = "";
            let stderr = "";

            child.stdout.on("data", data => {
                stdout += data.toString();
            });

            child.stderr.on("data", data => {
                stderr += data.toString();
            });

            child.on("close", code => {
                const duration = Date.now() - startTime;
                const result = {
                    target,
                    success: code === 0,
                    duration,
                    stdout,
                    stderr,
                    exitCode: code,
                };

                this.results.set(target.name, result);

                if (code === 0) {
                    this.log(`Built ${target.name} successfully in ${duration}ms`, "success");
                } else {
                    this.log(`Failed to build ${target.name} (exit code: ${code})`, "error");
                    if (stderr) {
                        console.log("Error output:", stderr);
                    }
                }

                resolve(result);
            });
        });
    }

    async buildAll(targets, parallel = false) {
        if (parallel) {
            this.log("Building all targets in parallel...", "info");
            const promises = targets.map(target => this.buildTarget(target));
            await Promise.all(promises);
        } else {
            this.log("Building all targets sequentially...", "info");
            for (const target of targets) {
                await this.buildTarget(target);
            }
        }
    }

    generateReport() {
        const successful = Array.from(this.results.values()).filter(r => r.success);
        const failed = Array.from(this.results.values()).filter(r => !r.success);
        const totalTime = Array.from(this.results.values()).reduce((sum, r) => sum + r.duration, 0);

        const report = `# Build Report

Generated: ${new Date().toLocaleString()}

## Summary

- **Total targets**: ${this.results.size}
- **Successful**: ${successful.length}
- **Failed**: ${failed.length}
- **Total build time**: ${totalTime}ms

## Successful Builds

${successful
        .map(
            result => `
### ✅ ${result.target.name}

- **Type**: ${result.target.type}
- **Duration**: ${result.duration}ms
- **Path**: ${result.target.path}
`
        )
        .join("")}

${
    failed.length > 0
        ? `
## Failed Builds

${failed
        .map(
            result => `
### ❌ ${result.target.name}

- **Type**: ${result.target.type}
- **Duration**: ${result.duration}ms
- **Exit Code**: ${result.exitCode}
- **Path**: ${result.target.path}

**Error Output:**
\`\`\`
${result.stderr}
\`\`\`
`
        )
        .join("")}
`
        : ""
}

## Next Steps

${
    failed.length > 0
        ? `
### Fix Build Failures

1. Review the error messages above
2. Check dependencies are installed: \`npm install\`
3. Ensure all packages are up to date
4. Run individual builds to debug: \`cd path/to/package && npm run build\`
`
        : ""
}

### Deploy Built Packages

\`\`\`bash
# Deploy packages (example)
npm run deploy

# Or deploy individually
cd packages/package-name && npm publish
\`\`\`
`;

        return report;
    }

    printSummary() {
        const successful = Array.from(this.results.values()).filter(r => r.success);
        const failed = Array.from(this.results.values()).filter(r => !r.success);
        const totalTime = Array.from(this.results.values()).reduce((sum, r) => sum + r.duration, 0);

        this.log("\n🎯 Build Summary:", "info");
        console.log(`   Total targets: ${this.results.size}`);
        console.log(`   ✅ Successful: ${successful.length}`);
        console.log(`   ❌ Failed: ${failed.length}`);
        console.log(`   ⏱️  Total time: ${totalTime}ms`);

        if (failed.length > 0) {
            console.log("\n❌ Failed builds:");
            failed.forEach(result => {
                console.log(`   - ${result.target.name}`);
            });
        }
    }

    async run() {
        const args = process.argv.slice(2);
        const parallel = args.includes("--parallel") || args.includes("-p");
        const clean = args.includes("--clean") || args.includes("-c");

        this.log("🚀 Starting workspace build...", "info");

        // Clean build artifacts if requested
        if (clean) {
            this.log("🧹 Cleaning build artifacts...", "info");
            try {
                execSync("npm run clean --workspaces --if-present", {
                    cwd: this.workspaceRoot,
                    stdio: "inherit",
                });
            } catch (error) {
                this.log("Clean command failed, continuing...", "warning");
            }
        }

        // Find build targets
        const targets = this.findBuildTargets();

        if (targets.length === 0) {
            this.log("No build targets found", "warning");
            return;
        }

        this.log(`Found ${targets.length} build targets`, "info");

        // Build all targets
        await this.buildAll(targets, parallel);

        // Generate report
        const reportPath = path.join(this.workspaceRoot, "docs", "build-report.md");
        const report = this.generateReport();
        fs.writeFileSync(reportPath, report, "utf8");

        this.log(`📄 Build report saved to: ${reportPath}`, "info");
        this.printSummary();

        // Exit with error code if any builds failed
        const failed = Array.from(this.results.values()).filter(r => !r.success);
        if (failed.length > 0) {
            process.exit(1);
        } else {
            this.log("🎉 All builds completed successfully!", "success");
        }
    }
}

// Run the workspace builder
const builder = new WorkspaceBuilder();
builder.run().catch(console.error);
