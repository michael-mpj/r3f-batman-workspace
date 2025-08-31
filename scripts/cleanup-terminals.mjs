#!/usr/bin/env node

/**
 * Pre-command Script
 * Runs before any npm command to ensure clean terminal state
 */

/* eslint-env node */

import { exec } from "child_process";
import { promisify } from "util";
import process from "process";

const execAsync = promisify(exec);

/**
 * Clean terminal state silently
 */
async function preCommandCleanup() {
    try {
    // Kill any stuck sudo processes
        await execAsync("pkill -TERM -f sudo 2>/dev/null || true");

        // Clear potentially problematic environment variables
        const problematicVars = ["SUDO_ASKPASS", "SUDO_COMMAND", "SUDO_USER"];
        problematicVars.forEach(varName => {
            if (process.env[varName]) {
                delete process.env[varName];
            }
        });

        return true;
    } catch {
        return false;
    }
}

/**
 * Main cleanup function
 */
async function cleanup() {
    const isAuto = process.argv.includes("--auto");

    await preCommandCleanup();

    if (!isAuto) {
        process.stdout.write("✅ Terminal cleanup complete!\n");
    }
}

// Run cleanup
cleanup().catch(() => {
    if (!process.argv.includes("--auto")) {
        process.stderr.write("❌ Cleanup failed\n");
    }
});
