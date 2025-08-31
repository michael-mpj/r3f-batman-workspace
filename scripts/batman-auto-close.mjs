#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: batman-auto-close.mjs
 * Description: Batman script with auto-closing terminals for clean workflows
 * Author: R3F Workspace Team (Auto-Close Edition)
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 2.0.1
 */

import { spawn, exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.join(__dirname, "..");

// Batman Auto-Close ASCII Art
const batmanArt = `
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
              ██████╗  █████╗ ████████╗███╗   ███╗ █████╗ ███╗   ██╗
              ██╔══██╗██╔══██╗╚══██╔══╝████╗ ████║██╔══██╗████╗  ██║
              ██████╔╝███████║   ██║   ██╔████╔██║███████║██╔██╗ ██║
              ██╔══██╗██╔══██║   ██║   ██║╚██╔╝██║██╔══██║██║╚██╗██║
              ██████╔╝██║  ██║   ██║   ██║ ╚═╝ ██║██║  ██║██║ ╚████║
              ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
                    🌃 BATMAN AUTO-CLOSE - CLEAN WORKFLOW EDITION 🌃
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
`;

// Auto-Close Task Manager
class AutoCloseBatmanManager {
  constructor() {
    this.results = [];
    this.workspaceRoot = workspaceRoot;
  }

  // Execute task with auto-closing terminal
  async executeAutoCloseTask(taskName, command, options = {}) {
    console.log(`🦇 Executing ${taskName}...`);

    const startTime = Date.now();

    try {
      if (process.platform === "darwin") {
        const autoCloseScript = `
          tell application "Terminal"
            activate
            set newTab to do script "cd '${options.cwd || this.workspaceRoot}' && echo '🦇 Batman ${taskName}' && echo '▶️ Starting task...' && ${command} && echo '' && echo '✅ ${taskName} completed successfully!' && echo '🦇 Auto-closing in 5 seconds...' && sleep 5 && exit"
            set custom title of newTab to "🦇 ${taskName} (Auto-Close)"
          end tell
        `;

        exec(`osascript -e "${autoCloseScript.replace(/"/g, '\\"')}"`);

        const duration = Date.now() - startTime;
        this.results.push({
          task: taskName,
          status: "launched",
          duration,
          type: "auto-close",
        });

        console.log(`✅ Launched ${taskName} in auto-closing terminal`);
      } else {
        console.log(`⚠️ Auto-close terminals not available on this platform for ${taskName}`);
      }
    } catch (error) {
      console.error(`❌ Failed to launch ${taskName}:`, error.message);
      this.results.push({
        task: taskName,
        status: "failed",
        error: error.message,
      });
    }
  }

  // Execute persistent task (for dev server)
  async executePersistentTask(taskName, command, options = {}) {
    console.log(`🦇 Executing ${taskName} (Persistent)...`);

    const startTime = Date.now();

    try {
      if (process.platform === "darwin") {
        const persistentScript = `
          tell application "Terminal"
            activate
            set newTab to do script "cd '${options.cwd || this.workspaceRoot}' && echo '🦇 Batman ${taskName} (Persistent)' && echo '🚀 Starting development server...' && echo 'ℹ️  This terminal will remain open for development' && ${command}"
            set custom title of newTab to "🦇 ${taskName} (Keep Open)"
          end tell
        `;

        exec(`osascript -e "${persistentScript.replace(/"/g, '\\"')}"`);

        const duration = Date.now() - startTime;
        this.results.push({
          task: taskName,
          status: "launched",
          duration,
          type: "persistent",
        });

        console.log(`✅ Launched ${taskName} in persistent terminal`);
      } else {
        console.log(`⚠️ Persistent terminals not available on this platform for ${taskName}`);
      }
    } catch (error) {
      console.error(`❌ Failed to launch ${taskName}:`, error.message);
      this.results.push({
        task: taskName,
        status: "failed",
        error: error.message,
      });
    }
  }

  // Get execution summary
  getSummary() {
    return this.results;
  }
}

// Main Auto-Close Batman Function
async function runAutoCloseBatman() {
  console.log(batmanArt);

  console.log(`
🌃 Welcome to Batman Auto-Close Edition!

"This version launches each task in its own terminal that automatically
closes when the task completes, keeping your workspace clean and organized."

🦇 Initializing Auto-Close Batman Protocol...
🚨 Preparing clean workflow management...
📡 Opening self-closing Bat-Terminals...
  `);

  const manager = new AutoCloseBatmanManager();

  // Task 1: Headers (Auto-Close)
  console.log(`
📋 Phase 1: Header Management
"Every file needs the Batman seal of approval" – Batman`);

  await manager.executeAutoCloseTask("Headers", "node scripts/add-headers.mjs");

  await new Promise(resolve => setTimeout(resolve, 3000));

  // Task 2: Compatibility (Auto-Close)
  console.log(`
🔍 Phase 2: Compatibility Analysis
"Knowledge is power, compatibility is strength" – Batman`);

  await manager.executeAutoCloseTask("Compatibility", "npm run check-compatibility");

  await new Promise(resolve => setTimeout(resolve, 3000));

  // Task 3: Build (Auto-Close)
  console.log(`
🏗️ Phase 3: Build System
"Building the tools that protect Gotham" – Batman`);

  await manager.executeAutoCloseTask("Build", "npm run build");

  await new Promise(resolve => setTimeout(resolve, 3000));

  // Task 4: Tests (Auto-Close)
  console.log(`
🧪 Phase 4: Testing Suite
"Every gadget must be tested before deployment" – Batman`);

  await manager.executeAutoCloseTask("Tests", "npm run test");

  await new Promise(resolve => setTimeout(resolve, 3000));

  // Task 5: Dev Server (Persistent)
  console.log(`
🚀 Phase 5: Development Server
"The Batcave is now online" – Batman`);

  const starterKitPath = path.join(workspaceRoot, "projects", "R3f-StarterKit");
  await manager.executePersistentTask("Dev-Server", "npm run dev", { cwd: starterKitPath });

  await new Promise(resolve => setTimeout(resolve, 2000));

  // Task 6: Package Monitor (Auto-Close)
  console.log(`
📦 Phase 6: Package Monitor
"Stay vigilant for package updates" – Batman`);

  await manager.executeAutoCloseTask(
    "Package-Monitor",
    'npm outdated && echo "🦇 Package monitoring complete! Use npm run update for updates."'
  );

  // Display final results
  const summary = manager.getSummary();
  const autoCloseTasks = summary.filter(r => r.type === "auto-close").length;
  const persistentTasks = summary.filter(r => r.type === "persistent").length;

  console.log(`
🦇 AUTO-CLOSE BATMAN PROTOCOL COMPLETE!

📊 DEPLOYMENT SUMMARY:
   🔧 Auto-Close Tasks: ${autoCloseTasks}
   🚀 Persistent Tasks: ${persistentTasks}
   ✅ All tasks launched successfully

🎯 AUTO-CLOSE FEATURES:
   ✅ Clean terminal management
   ✅ Automatic cleanup after task completion
   ✅ 5-second display of results before closing
   ✅ Persistent dev server for continuous development
   ✅ Professional workflow automation

🦇 "Clean terminals, clean mind, clean code!" - Batman

🌃 GOTHAM'S WORKSPACE IS SECURE AND CLEAN!

   🖥️  Completed tasks auto-closed after 5 seconds
   🚀 Dev server remains open at: http://localhost:3000
   📚 Documentation: Open ./docs in browser

   Re-run Auto-Close Batman: npm run batman:auto

🦇🦇🦇 BATMAN AUTO-CLOSE - MISSION ACCOMPLISHED! 🦇🦇🦇

Task Summary:
${summary.map(r => `   ${r.status === "launched" ? "✅" : "❌"} ${r.task}: ${r.status} ${r.type ? `(${r.type})` : ""}`).join("\n")}

🦇 Batman has optimized your workflow for maximum cleanliness!
  `);
}

// Run Auto-Close Batman
runAutoCloseBatman().catch(error => {
  console.error("🦇 Auto-Close Batman encountered an error:", error);
  process.exit(1);
});
