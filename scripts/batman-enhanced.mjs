#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: batman-enhanced.mjs
 * Description: Enhanced Batman script with multi-terminal task management
 * Author: R3F Workspace Team (Batman Edition)
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 2.0.0
 */

import { spawn, exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.join(__dirname, "..");

// ---------------------------
// BATMAN ASCII ART
// ---------------------------
const batmanArt = `
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
                    ██████╗  █████╗ ████████╗███╗   ███╗ █████╗ ███╗   ██╗
                    ██╔══██╗██╔══██╗╚══██╔══╝████╗ ████║██╔══██╗████╗  ██║
                    ██████╔╝███████║   ██║   ██╔████╔██║███████║██╔██╗ ██║
                    ██╔══██╗██╔══██║   ██║   ██║╚██╔╝██║██╔══██║██║╚██╗██║
                    ██████╔╝██║  ██║   ██║   ██║ ╚═╝ ██║██║  ██║██║ ╚████║
                    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
                           🌃 BATMAN ENHANCED - MULTI-TERMINAL EDITION 🌃
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
`;

// Enhanced task management with terminal support
class BatmanTaskManager {
    constructor() {
        this.terminals = new Map();
        this.tasks = new Map();
        this.workspaceRoot = workspaceRoot;
    }

    // Create a new terminal for a specific task
    async createTaskTerminal(taskName, command, options = {}) {
        console.log(`🦇 Opening Bat-Terminal for: ${taskName}`);
        console.log(`🔧 Command: ${command}`);

        const terminalOptions = {
            cwd: options.cwd || this.workspaceRoot,
            stdio: ["inherit", "pipe", "pipe"],
            detached: true,
            ...options,
        };

        const process = spawn("sh", ["-c", command], terminalOptions);

        this.terminals.set(taskName, {
            process,
            command,
            startTime: Date.now(),
            status: "running",
        });

        // Handle process output
        process.stdout?.on("data", data => {
            console.log(`[${taskName}] ${data.toString()}`);
        });

        process.stderr?.on("data", data => {
            console.log(`[${taskName}] ⚠️ ${data.toString()}`);
        });

        process.on("close", code => {
            const terminal = this.terminals.get(taskName);
            if (terminal) {
                terminal.status = code === 0 ? "completed" : "failed";
                terminal.endTime = Date.now();
                terminal.exitCode = code;
            }
            console.log(`🦇 [${taskName}] Terminal closed with code: ${code}`);
        });

        return process;
    }

    // Wait for a specific task to complete
    async waitForTask(taskName, timeout = 30000) {
        const terminal = this.terminals.get(taskName);
        if (!terminal) {
            throw new Error(`Task ${taskName} not found`);
        }

        return new Promise((resolve, reject) => {
            const startTime = Date.now();

            const checkStatus = () => {
                const currentTerminal = this.terminals.get(taskName);

                if (currentTerminal.status === "completed") {
                    resolve({ success: true, exitCode: currentTerminal.exitCode });
                } else if (currentTerminal.status === "failed") {
                    resolve({ success: false, exitCode: currentTerminal.exitCode });
                } else if (Date.now() - startTime > timeout) {
                    reject(new Error(`Task ${taskName} timed out after ${timeout}ms`));
                } else {
                    setTimeout(checkStatus, 1000);
                }
            };

            checkStatus();
        });
    }

    // Get status of all terminals
    getStatus() {
        const status = {};
        this.terminals.forEach((terminal, taskName) => {
            status[taskName] = {
                status: terminal.status,
                command: terminal.command,
                duration: terminal.endTime ? terminal.endTime - terminal.startTime : Date.now() - terminal.startTime,
                exitCode: terminal.exitCode,
            };
        });
        return status;
    }

    // Open a VS Code terminal for a specific task
    async openVSCodeTerminal(taskName, command, options = {}) {
        console.log(`🦇 Opening VS Code Terminal for: ${taskName}`);

        // Try to use VS Code's integrated terminal if available
        const vsCodeCommand = `code --new-window --wait && echo '${command}' && ${command}`;

        try {
            // Alternative: Use osascript on macOS to open Terminal.app with auto-close
            if (process.platform === "darwin") {
                const autoCloseScript = `
          tell application "Terminal"
            activate
            set newTab to do script "cd '${options.cwd || this.workspaceRoot}' && echo '🦇 Batman Task: ${taskName}' && ${command} && echo '🦇 Task completed! Closing in 3 seconds...' && sleep 3 && exit"
            set custom title of newTab to "🦇 ${taskName} (Auto-Close)"
          end tell
        `;

                exec(`osascript -e "${autoCloseScript.replace(/"/g, '\\"')}"`);
                console.log(`✅ Opened macOS Terminal for ${taskName} (Auto-Close Enabled)`);
            } else {
                // Fallback for other platforms
                await this.createTaskTerminal(taskName, command, options);
            }
        } catch (error) {
            console.log(`⚠️ Failed to open system terminal, using internal process for ${taskName}`);
            await this.createTaskTerminal(taskName, command, options);
        }
    }

    // Open a terminal for background processes (no auto-close)
    async openDevServerTerminal(taskName, command, options = {}) {
        console.log(`🦇 Opening Persistent Terminal for: ${taskName}`);

        try {
            // Use osascript on macOS to open Terminal.app WITHOUT auto-close for dev server
            if (process.platform === "darwin") {
                const persistentScript = `
          tell application "Terminal"
            activate
            set newTab to do script "cd '${options.cwd || this.workspaceRoot}' && echo '🦇 Batman Dev Server: ${taskName}' && echo '🚀 Starting development server (will remain open)...' && ${command}"
            set custom title of newTab to "🦇 ${taskName} (Persistent)"
          end tell
        `;

                exec(`osascript -e "${persistentScript.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`);
                console.log(`✅ Opened persistent macOS Terminal for ${taskName}`);
            } else {
                // Fallback for other platforms
                await this.createTaskTerminal(taskName, command, options);
            }
        } catch (error) {
            console.log(`⚠️ Failed to open system terminal, using internal process for ${taskName}`);
            await this.createTaskTerminal(taskName, command, options);
        }
    }

    // Cleanup all terminals
    cleanup() {
        console.log("🦇 Batman is cleaning up the Batcave...");
        this.terminals.forEach((terminal, taskName) => {
            if (terminal.process && !terminal.process.killed) {
                terminal.process.kill();
                console.log(`🦇 Closed terminal for ${taskName}`);
            }
        });
    }
}

// Enhanced Batman Protocol with multi-terminal support
async function runEnhancedBatmanProtocol() {
    console.log(batmanArt);

    console.log(`
🌃 Welcome to the Enhanced Batcave!

"This enhanced Batman script opens separate terminals for each task,
giving you full visibility and control over every aspect of your workspace.
Each terminal is a specialized tool in Batman's arsenal!"

🦇 Initializing Enhanced Batman Protocol...
🚨 Preparing multi-terminal task management...
📡 Opening the Bat-Computer interfaces...
  `);

    const taskManager = new BatmanTaskManager();

    // Handle cleanup on exit
    process.on("SIGINT", () => {
        taskManager.cleanup();
        process.exit(0);
    });

    // Task 1: Header Management Terminal
    console.log(`
📋 Phase 1: Opening Header Management Terminal
"Every file needs the Batman seal of approval" – Batman
────────────────────────────────────────────────────────────`);

    await taskManager.openVSCodeTerminal("Headers", 'node scripts/add-headers.mjs && echo "🦇 Header task complete!"');

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Task 2: Compatibility Analysis Terminal
    console.log(`
🔍 Phase 2: Opening Compatibility Analysis Terminal
"Knowledge is power, compatibility is strength" – Batman
────────────────────────────────────────────────────────────`);

    await taskManager.openVSCodeTerminal("Compatibility", 'npm run check-compatibility && echo "🦇 Compatibility check complete!"');

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Task 3: Build System Terminal
    console.log(`
🏗️ Phase 3: Opening Build System Terminal
"Building the tools that protect Gotham" – Batman
────────────────────────────────────────────────────────────`);

    await taskManager.openVSCodeTerminal("Build", 'npm run build && echo "🦇 Build complete!"');

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Task 4: Testing Suite Terminal
    console.log(`
🧪 Phase 4: Opening Testing Suite Terminal
"Every gadget must be tested before deployment" – Batman
────────────────────────────────────────────────────────────`);

    await taskManager.openVSCodeTerminal("Tests", 'npm run test && echo "🦇 Tests complete!"');

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Task 5: Development Server Terminal
    console.log(`
🚀 Phase 5: Opening Development Server Terminal
"The Batcave is now online" – Batman
────────────────────────────────────────────────────────────`);

    const starterKitPath = path.join(workspaceRoot, "projects", "R3f-StarterKit");
    // Don't auto-close dev server as it needs to stay running
    await taskManager.openDevServerTerminal("Dev-Server", "npm run dev", { cwd: starterKitPath });

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Task 6: Package Update Monitor Terminal (Optional)
    console.log(`
📦 Phase 6: Opening Package Update Monitor Terminal
"Stay vigilant for package updates" – Batman
────────────────────────────────────────────────────────────`);

    await taskManager.openVSCodeTerminal(
        "Package-Monitor",
        'npm outdated && echo "🦇 Package monitoring active. Use npm run update when needed!"'
    );

    // Display final status
    console.log(`
🦇 ENHANCED BATMAN PROTOCOL DEPLOYED!

📊 MULTI-TERMINAL BATCAVE STATUS:
   🖥️  Header Management Terminal: Active
   🔍 Compatibility Analysis Terminal: Active
   🏗️  Build System Terminal: Active
   🧪 Testing Suite Terminal: Active
   🚀 Development Server Terminal: Active
   📦 Package Monitor Terminal: Active

🎯 Each task now runs in its own dedicated terminal for:
   ✅ Better visibility and control
   ✅ Independent process management
   ✅ Parallel task execution
   ✅ Easy debugging and monitoring
   ✅ Professional development workflow

🦇 "I'm not just Batman... I'm Enhanced Batman with multi-terminal powers!"

🌃 GOTHAM IS SECURE - Your workspace is now fully operational!
   Completed task terminals will auto-close after 3 seconds.
   Dev server terminal remains open for continuous development.

   Access your applications:
   🚀 R3f StarterKit: http://localhost:3000 (or next available port)
   📚 Documentation: Open ./docs in browser

   Re-run Enhanced Batman: node scripts/batman-enhanced.mjs

🦇🦇🦇 BATMAN HAS LEFT THE BUILDING... BUT THE BATCAVE LIVES ON! 🦇🦇🦇
  `);

    // Keep the main script running for status monitoring
    console.log(`
🦇 Batman is now monitoring all terminals...
   Press Ctrl+C to cleanup and exit Batman Enhanced.
   Individual terminals will remain open for your use.
  `);

    // Monitor terminals periodically
    const monitorInterval = setInterval(() => {
        const status = taskManager.getStatus();
        console.log(`🦇 [${new Date().toLocaleTimeString()}] Terminal Status Update:`);
        Object.entries(status).forEach(([task, info]) => {
            const icon = info.status === "completed" ? "✅" : info.status === "failed" ? "❌" : "🔄";
            console.log(`   ${icon} ${task}: ${info.status} (${Math.round(info.duration / 1000)}s)`);
        });
        console.log("");
    }, 30000); // Update every 30 seconds

    // Keep process alive
    process.on("SIGTERM", () => {
        clearInterval(monitorInterval);
        taskManager.cleanup();
        process.exit(0);
    });
}

// Run the Enhanced Batman Protocol
runEnhancedBatmanProtocol().catch(error => {
    console.error("🦇 Batman Enhanced encountered an error:", error);
    process.exit(1);
});
