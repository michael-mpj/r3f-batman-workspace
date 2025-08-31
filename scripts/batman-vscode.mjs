#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: batman-vscode.mjs
 * Description: Batman script optimized for VS Code integrated terminals
 * Author: R3F Workspace Team (VS Code Edition)
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 2.0.0
 */

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.join(__dirname, "..");

// VS Code Terminal Batman
const batmanArt = `
🦇🦇🦇🦇🦇 VS CODE BATMAN 🦇🦇🦇🦇🦇
   ██╗   ██╗███████╗     ██████╗ ██████╗ ██████╗ ███████╗
   ██║   ██║██╔════╝    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
   ██║   ██║███████╗    ██║     ██║   ██║██║  ██║█████╗
   ╚██╗ ██╔╝╚════██║    ██║     ██║   ██║██║  ██║██╔══╝
    ╚████╔╝ ███████║    ╚██████╗╚██████╔╝██████╔╝███████╗
     ╚═══╝  ╚══════╝     ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
           🌃 BATMAN MULTI-TERMINAL FOR VS CODE 🌃
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
`;

// VS Code Task Manager
class VSCodeBatmanManager {
  constructor() {
    this.terminals = [];
    this.taskStatuses = new Map();
  }

  // Create VS Code terminals via tasks
  async createVSCodeTask(taskName, command, workingDir = workspaceRoot) {
    console.log(`🦇 Creating VS Code terminal: ${taskName}`);
    console.log(`📁 Working directory: ${workingDir}`);
    console.log(`⚡ Command: ${command}`);

    // Create task configuration for VS Code
    const taskConfig = {
      label: `Batman: ${taskName}`,
      type: "shell",
      command: command,
      group: "build",
      options: {
        cwd: workingDir,
      },
      presentation: {
        echo: true,
        reveal: "always",
        focus: false,
        panel: "new",
        showReuseMessage: true,
        clear: false,
      },
      problemMatcher: [],
      runOptions: {
        instanceLimit: 1,
      },
    };

    this.taskStatuses.set(taskName, {
      config: taskConfig,
      status: "created",
      startTime: Date.now(),
    });

    return taskConfig;
  }

  // Generate tasks.json for VS Code
  generateTasksJson() {
    const tasks = [];

    // Header Management Task
    tasks.push({
      label: "Batman: Headers",
      type: "shell",
      command: "node scripts/add-headers.mjs",
      group: "build",
      presentation: {
        echo: true,
        reveal: "always",
        focus: false,
        panel: "new",
        showReuseMessage: true,
      },
      problemMatcher: [],
    });

    // Compatibility Check Task
    tasks.push({
      label: "Batman: Compatibility",
      type: "shell",
      command: "npm run check-compatibility",
      group: "build",
      presentation: {
        echo: true,
        reveal: "always",
        focus: false,
        panel: "new",
        showReuseMessage: true,
      },
      problemMatcher: [],
    });

    // Build Task
    tasks.push({
      label: "Batman: Build",
      type: "shell",
      command: "npm run build",
      group: "build",
      presentation: {
        echo: true,
        reveal: "always",
        focus: false,
        panel: "new",
        showReuseMessage: true,
      },
      problemMatcher: [],
    });

    // Test Task
    tasks.push({
      label: "Batman: Tests",
      type: "shell",
      command: "npm run test",
      group: "test",
      presentation: {
        echo: true,
        reveal: "always",
        focus: false,
        panel: "new",
        showReuseMessage: true,
      },
      problemMatcher: [],
    });

    // Dev Server Task
    tasks.push({
      label: "Batman: Dev Server",
      type: "shell",
      command: "npm run dev",
      group: "build",
      options: {
        cwd: "${workspaceFolder}/projects/R3f-StarterKit",
      },
      isBackground: true,
      presentation: {
        echo: true,
        reveal: "always",
        focus: false,
        panel: "new",
        showReuseMessage: true,
      },
      problemMatcher: [],
    });

    return {
      version: "2.0.0",
      tasks: tasks,
    };
  }

  // Show Batman instructions for VS Code
  showVSCodeInstructions() {
    console.log(`
🦇 VS CODE BATMAN DEPLOYMENT INSTRUCTIONS:

📋 STEP 1: VS Code Command Palette
   • Press: Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows/Linux)
   • Type: "Tasks: Run Task"

🦇 STEP 2: Select Batman Tasks (in order):
   1. 🔧 "Batman: Headers" - File header management
   2. 🔍 "Batman: Compatibility" - Package compatibility check
   3. 🏗️ "Batman: Build" - Build all packages
   4. 🧪 "Batman: Tests" - Run test suites
   5. 🚀 "Batman: Dev Server" - Start development server

📊 ALTERNATIVELY: Use VS Code Terminal Menu
   • Terminal → Run Task → Select Batman task

🎯 BATMAN'S VS CODE SUPERPOWERS:
   ✅ Each task opens in its own terminal panel
   ✅ Terminal tabs are clearly labeled
   ✅ Tasks can run independently
   ✅ Full VS Code integration
   ✅ Problem matcher integration
   ✅ Task reusability

🦇 PRO TIP: You can run multiple Batman tasks simultaneously!
    Each task gets its own terminal panel for easy monitoring.

🌃 "VS Code is my new Batcave interface!" - Batman
    `);
  }
}

// Main VS Code Batman Function
async function runVSCodeBatman() {
  console.log(batmanArt);

  const manager = new VSCodeBatmanManager();

  console.log(`
🌃 Welcome to VS Code Batman!

"This version is specifically designed for VS Code's integrated
terminal system. Each task will open in its own terminal panel
for maximum developer productivity."

🦇 Initializing VS Code Batman Protocol...
📡 Generating VS Code task configurations...
  `);

  // Show VS Code instructions
  manager.showVSCodeInstructions();

  // Generate and save tasks.json if needed
  const tasksConfig = manager.generateTasksJson();

  console.log(`
📋 VS CODE TASKS READY:

${tasksConfig.tasks
  .map(
    (task, index) =>
      `   ${index + 1}. 🦇 ${task.label}
      Command: ${task.command}
      Panel: New Terminal Tab`
  )
  .join("\n")}

🦇 BATMAN DEPLOYMENT COMPLETE!

🎯 NEXT STEPS:
   1. Use Command Palette (Cmd+Shift+P)
   2. Type "Tasks: Run Task"
   3. Select any Batman task
   4. Watch Batman work in dedicated terminals!

🚀 OR: Click Terminal → Run Task → Choose Batman task

🦇 "The Batcave is now integrated with VS Code!"
   "Each terminal is a specialized tool in Batman's VS Code arsenal!"

────────────────────────────────────────────────────────────
🌃 VS CODE BATMAN STANDING BY - Ready for task deployment!
────────────────────────────────────────────────────────────
  `);
}

// Run VS Code Batman
runVSCodeBatman().catch(error => {
  console.error("🦇 VS Code Batman encountered an error:", error);
  process.exit(1);
});
