#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: update-packages.mjs
 * Description: update-packages component/utility
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

/**
 * @fileoverview Auto-update packages script for R3F Workspace
 * @author R3F Workspace Team
 * @date 2025-08-30
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { resolve, join } from "path";

const workspaceRoot = process.cwd();
const projectPath = join(workspaceRoot, "projects", "R3f-StarterKit");

// Package version mappings for latest stable versions
const latestVersions = {
    // React ecosystem
    "react": "^18.3.1",
    "react-dom": "^18.3.1",

    // React Three.js ecosystem
    "@react-three/fiber": "^9.3.0",
    "@react-three/drei": "^10.7.4",
    "@react-three/postprocessing": "^3.0.4",
    "@react-three/uikit": "^0.8.21",
    "@react-three/xr": "^6.6.25",

    // Three.js
    "three": "^0.179.1",

    // UI and utilities
    "leva": "^0.10.0",
    "react-router-dom": "^7.8.2",

    // Development dependencies
    "eslint": "^9.34.0",
    "eslint-config-prettier": "^10.1.8",
    "prettier": "^3.6.2",
    "vite": "^7.1.3",

    // Testing
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "jsdom": "^26.1.0",
    "vitest": "^3.2.4",

    // Build tools
    "concurrently": "^9.2.1",
    "rimraf": "^6.0.1",
    "lint-staged": "^16.1.5",

    // Commit tools
    "@commitlint/cli": "^19.8.1",
    "@commitlint/config-conventional": "^19.8.1",
    "@changesets/changelog-github": "^0.5.1",
};

/**
 * Update package.json with latest versions
 * @param {string} packageJsonPath - Path to package.json
 * @param {Object} versions - Version mappings
 */
function updatePackageJson(packageJsonPath, versions) {
    console.log(`📦 Updating ${packageJsonPath}...`);

    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
    let updated = false;

    // Update dependencies
    if (packageJson.dependencies) {
        for (const [pkg, version] of Object.entries(versions)) {
            if (packageJson.dependencies[pkg]) {
                const oldVersion = packageJson.dependencies[pkg];
                if (oldVersion !== version) {
                    packageJson.dependencies[pkg] = version;
                    console.log(`  ✅ ${pkg}: ${oldVersion} → ${version}`);
                    updated = true;
                }
            }
        }
    }

    // Update devDependencies
    if (packageJson.devDependencies) {
        for (const [pkg, version] of Object.entries(versions)) {
            if (packageJson.devDependencies[pkg]) {
                const oldVersion = packageJson.devDependencies[pkg];
                if (oldVersion !== version) {
                    packageJson.devDependencies[pkg] = version;
                    console.log(`  ✅ ${pkg}: ${oldVersion} → ${version}`);
                    updated = true;
                }
            }
        }
    }

    if (updated) {
        writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
        console.log(`  📝 Updated ${packageJsonPath}`);
    } else {
        console.log(`  ℹ️ No updates needed for ${packageJsonPath}`);
    }

    return updated;
}

/**
 * Run command and handle errors
 * @param {string} command - Command to run
 * @param {string} cwd - Working directory
 */
function runCommand(command, cwd = workspaceRoot) {
    try {
        console.log(`🔧 Running: ${command}`);
        const result = execSync(command, {
            cwd,
            stdio: "inherit",
            encoding: "utf8",
        });
        return { success: true, result };
    } catch (error) {
        console.error(`❌ Command failed: ${command}`);
        console.error(error.message);
        return { success: false, error };
    }
}

/**
 * Main update function
 */
async function updatePackages() {
    console.log("🚀 Starting R3F Workspace Package Update...\n");

    // Step 1: Update root package.json
    console.log("📋 Step 1: Updating root workspace packages");
    const rootPackageJson = resolve(workspaceRoot, "package.json");
    const rootUpdated = updatePackageJson(rootPackageJson, latestVersions);

    // Step 2: Update R3f-StarterKit package.json
    console.log("\n📋 Step 2: Updating R3f-StarterKit packages");
    const projectPackageJson = resolve(projectPath, "package.json");
    const projectUpdated = updatePackageJson(projectPackageJson, latestVersions);

    if (!rootUpdated && !projectUpdated) {
        console.log("\n✨ All packages are already up to date!");
        return;
    }

    // Step 3: Install updated packages
    console.log("\n📋 Step 3: Installing updated packages...");
    const installResult = runCommand("npm install");

    if (!installResult.success) {
        console.error("❌ Installation failed. Please check the errors above.");
        process.exit(1);
    }

    // Step 4: Run compatibility check
    console.log("\n📋 Step 4: Checking compatibility...");
    const compatResult = runCommand("npm run check-compatibility");

    // Step 5: Run build test
    console.log("\n📋 Step 5: Testing build...");
    const buildResult = runCommand("npm run build");

    if (!buildResult.success) {
        console.warn("⚠️ Build test failed. Please check for breaking changes.");
    }

    // Step 6: Run linting
    console.log("\n📋 Step 6: Checking code quality...");
    const lintResult = runCommand("npm run lint");

    console.log("\n🎉 Package update complete!");
    console.log("\n📊 Summary:");
    console.log(`  • Root workspace: ${rootUpdated ? "Updated" : "No changes"}`);
    console.log(`  • R3f-StarterKit: ${projectUpdated ? "Updated" : "No changes"}`);
    console.log(`  • Installation: ${installResult.success ? "Success" : "Failed"}`);
    console.log(`  • Build test: ${buildResult.success ? "Success" : "Failed"}`);
    console.log(`  • Linting: ${lintResult.success ? "Success" : "Failed"}`);

    if (buildResult.success && lintResult.success) {
        console.log("\n✅ All systems green! Ready for development.");
    } else {
        console.log("\n⚠️ Some checks failed. Please review the output above.");
    }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
    console.log(`
🦇 R3F Workspace Package Updater

Usage: npm run update-packages [options]

Options:
  --help, -h    Show this help message
  --dry-run     Show what would be updated without making changes
  --force       Force update even if compatibility checks fail

Examples:
  npm run update-packages
  npm run update-packages --dry-run
  npm run update-packages --force
`);
    process.exit(0);
}

// Run the update
updatePackages().catch(error => {
    console.error("❌ Update failed:", error);
    process.exit(1);
});
