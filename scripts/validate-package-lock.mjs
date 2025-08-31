#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Schema Validation
 * File: validate-package-lock.mjs
 * Description: Validates package-lock.json against schema
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 1.0.0
 */

/* eslint-env node */
/* global console, process */

import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath, URL } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");

/**
 * Validate package-lock.json structure
 */
function validatePackageLock() {
    console.log("🔍 Validating package-lock.json structure...\n");

    try {
    // Read package-lock.json
        const packageLockPath = resolve(rootDir, "package-lock.json");
        const packageLock = JSON.parse(readFileSync(packageLockPath, "utf8"));

        // Read schema for future validation (currently informational)
        const schemaPath = resolve(rootDir, "schema/package-lock-schema.json");
        const packageLockSchema = JSON.parse(readFileSync(schemaPath, "utf8"));
        console.log(`📄 Using schema: ${packageLockSchema.title || "Package Lock Schema"}`);

        console.log("📋 Package Lock Information:");
        console.log(`   Name: ${packageLock.name}`);
        console.log(`   Version: ${packageLock.version}`);
        console.log(`   Lockfile Version: ${packageLock.lockfileVersion}`);
        console.log(`   Total Packages: ${Object.keys(packageLock.packages || {}).length}`);

        // Basic validation checks
        const validations = [
            {
                name: "Package Name",
                check: () => packageLock.name === "@michael-mpj/r3f-batman",
                expected: "@michael-mpj/r3f-batman",
            },
            {
                name: "Version Format",
                check: () => /^\d+\.\d+\.\d+$/.test(packageLock.version),
                expected: "Semantic version format",
            },
            {
                name: "Lockfile Version",
                check: () => packageLock.lockfileVersion >= 2,
                expected: "Version 2 or higher",
            },
            {
                name: "Packages Object",
                check: () => typeof packageLock.packages === "object",
                expected: "Object containing package information",
            },
            {
                name: "Root Package",
                check: () => packageLock.packages[""] && packageLock.packages[""].name === "@michael-mpj/r3f-batman",
                expected: "Root package entry exists",
            },
            {
                name: "Workspaces Configuration",
                check: () => Array.isArray(packageLock.packages[""]?.workspaces),
                expected: "Workspaces array in root package",
            },
            {
                name: "React 19 Dependency",
                check: () => packageLock.packages[""]?.dependencies?.react?.includes("19"),
                expected: "React 19.x.x",
            },
            {
                name: "R3F v9 Dependency",
                check: () => packageLock.packages[""]?.dependencies?.["@react-three/fiber"]?.includes("9"),
                expected: "@react-three/fiber 9.x.x",
            },
            {
                name: "VitePress Dependency",
                check: () => packageLock.packages[""]?.devDependencies?.vitepress,
                expected: "VitePress in devDependencies",
            },
        ];

        console.log("\n✅ Validation Results:");
        let allPassed = true;

        validations.forEach(({ name, check, expected }) => {
            try {
                const passed = check();
                console.log(`   ${passed ? "✅" : "❌"} ${name}: ${passed ? "PASS" : "FAIL"}`);
                if (!passed) {
                    console.log(`      Expected: ${expected}`);
                    allPassed = false;
                }
            } catch (error) {
                console.log(`   ❌ ${name}: ERROR - ${error.message}`);
                allPassed = false;
            }
        });

        // Check workspace packages
        console.log("\n📦 Workspace Packages:");
        const workspacePackages = Object.keys(packageLock.packages).filter(
            key => key.startsWith("node_modules/@r3f-workspace/") || key.includes("r3f-starterkit")
        );

        if (workspacePackages.length > 0) {
            workspacePackages.forEach(pkg => {
                const pkgName = pkg.replace("node_modules/", "");
                console.log(`   📁 ${pkgName}`);
            });
        } else {
            console.log("   ℹ️ No workspace packages found in lock file (this is normal for fresh installs)");
        }

        // Summary
        console.log(`\n🎯 Overall Status: ${allPassed ? "✅ PASS" : "❌ FAIL"}`);

        if (allPassed) {
            console.log("\n🦇 Batman says: Package lock is ready for action! 🦇");
        } else {
            console.log("\n🚨 Batman says: Package lock needs attention before deployment!");
        }

        return allPassed;
    } catch (error) {
        console.error("❌ Error validating package-lock.json:", error.message);
        return false;
    }
}

// Run validation
const isValid = validatePackageLock();
process.exit(isValid ? 0 : 1);
