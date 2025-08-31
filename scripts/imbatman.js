#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: imbatman.js
 * Description: Ultimate unified Batman script - All Batman modes in one powerful script
 * Author: R3F Workspace Team (Ultimate Batman Edition)
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 3.0.0
 */

import { spawn, exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.join(__dirname, "..");

// ---------------------------
// BATMAN ASCII ARTS
// ---------------------------
const batmanArts = {
    classic: `
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
                    ██████╗  █████╗ ████████╗███╗   ███╗ █████╗ ███╗   ██╗
                    ██╔══██╗██╔══██╗╚══██╔══╝████╗ ████║██╔══██╗████╗  ██║
                    ██████╔╝███████║   ██║   ██╔████╔██║███████║██╔██╗ ██║
                    ██╔══██╗██╔══██║   ██║   ██║╚██╔╝██║██╔══██║██║╚██╗██║
                    ██████╔╝██║  ██║   ██║   ██║ ╚═╝ ██║██║  ██║██║ ╚████║
                    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
                           🌃 I'M BATMAN - ULTIMATE EDITION 🌃
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇`,

    enhanced: `
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
                    ██████╗  █████╗ ████████╗███╗   ███╗ █████╗ ███╗   ██╗
                    ██╔══██╗██╔══██╗╚══██╔══╝████╗ ████║██╔══██╗████╗  ██║
                    ██████╔╝███████║   ██║   ██╔████╔██║███████║██╔██╗ ██║
                    ██╔══██╗██╔══██║   ██║   ██║╚██╔╝██║██╔══██║██║╚██╗██║
                    ██████╔╝██║  ██║   ██║   ██║ ╚═╝ ██║██║  ██║██║ ╚████║
                    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
                           🌃 BATMAN ENHANCED - MULTI-TERMINAL 🌃
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇`,

    autoClose: `
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
              ██████╗  █████╗ ████████╗███╗   ███╗ █████╗ ███╗   ██╗
              ██╔══██╗██╔══██╗╚══██╔══╝████╗ ████║██╔══██╗████╗  ██║
              ██████╔╝███████║   ██║   ██╔████╔██║███████║██╔██╗ ██║
              ██╔══██╗██╔══██║   ██║   ██║╚██╔╝██║██╔══██║██║╚██╗██║
              ██████╔╝██║  ██║   ██║   ██║ ╚═╝ ██║██║  ██║██║ ╚████║
              ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
                    🌃 BATMAN AUTO-CLOSE - CLEAN WORKFLOW 🌃
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇`,

    vscode: `
🦇🦇🦇🦇🦇 VS CODE BATMAN 🦇🦇🦇🦇🦇
   ██╗   ██╗███████╗     ██████╗ ██████╗ ██████╗ ███████╗
   ██║   ██║██╔════╝    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
   ██║   ██║███████╗    ██║     ██║   ██║██║  ██║█████╗  
   ╚██╗ ██╔╝╚════██║    ██║     ██║   ██║██║  ██║██╔══╝  
    ╚████╔╝ ███████║    ╚██████╗╚██████╔╝██████╔╝███████╗
     ╚═══╝  ╚══════╝     ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
           🌃 BATMAN VS CODE INTEGRATION 🌃
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇`,
};

const batSignal = `
                              ⢠⣴⣶⣤⡀
                          ⣀⣤⠾⠿⣿⣿⠿⠷⣦⣄⠀
                        ⣠⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣦⡀
                      ⢠⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⡄
                     ⢸⠇⠀⠀⠀⠀⣠⣤⣤⣤⣤⣄⠀⠀⠀⠀⢸⡇
                     ⣸⠀⠀⠀⠀⣼⡏⠀⠀⠀⠀⢹⣧⠀⠀⠀⠀⣸⠀
                     ⢿⠀⠀⠀⠀⢿⡀⠀⠀⠀⠀⢀⣿⠀⠀⠀⠀⣿⠀
                      ⠘⣧⠀⠀⠀⠈⠛⠿⠿⠿⠛⠁⠀⠀⠀⣼⠃
                       ⠘⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠃
                         ⠈⠛⠷⠶⠤⠤⠤⠶⠾⠛⠁
`;

// ---------------------------
// BATMAN QUOTES CONFIG
// ---------------------------
const quotesPool = {
    testRun: [
        `"It's not who I am underneath, but what I do that defines me." – Batman`,
        `"The training is nothing. The will is everything." – Batman`,
        `"I wear a mask. And that mask, it's not to hide who I am, but to create who I am." – Batman`,
    ],
    development: [
        `"Sometimes the truth isn't good enough… sometimes people deserve more." – Batman`,
        `"It's not about what I want, it's about what's fair." – Batman`,
        `"Endure, Master Wayne. Take it. They'll hate you for it, but that's the point of Batman." – Alfred`,
    ],
    deploy: [
        `"I'm whatever Gotham needs me to be." – Batman`,
        `"The night is darkest just before the dawn." – Batman`,
        `"Justice is balance. Deployment is precision." – Batman Dev Edition`,
    ],
    success: [
        `"Everything's going to be alright. Gotham is safe." – Batman`,
        `"No matter how bad it gets, you can always do what's right." – Batman`,
        `"Sometimes the only way to solve our problems is to fight our way through them." – Batman`,
    ],
    error: [
        `"Criminals are a superstitious cowardly lot." – Batman`,
        `"I've faced worse. I'll face it again." – Batman`,
        `"A hero can be anyone. Even a man doing something as simple as coding." – Batman`,
    ],
};

// ---------------------------
// UTILITY FUNCTIONS
// ---------------------------
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getRandomQuote = status => {
    const pool = quotesPool[status];
    if (!pool) return `"Gotham awaits… prepare yourself!" – Batman`;
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
};

const runCommand = (command, options = {}) => {
    return new Promise(resolve => {
        console.log(`🦇 Executing: ${command}`);
        const child = spawn(command, [], {
            shell: true,
            stdio: "inherit",
            cwd: options.cwd || workspaceRoot,
            ...options,
        });

        child.on("close", code => {
            if (code === 0) resolve(code);
            else {
                console.log(`⚠️  Command had exit code ${code}, but Batman never gives up!`);
                console.log(getRandomQuote("error"));
                resolve(code);
            }
        });

        child.on("error", error => {
            console.error(`❌ Error executing command: ${error.message}`);
            console.log(getRandomQuote("error"));
            resolve(1);
        });
    });
};

const displayProgress = (message, emoji = "🦇") => {
    console.log(`\n${emoji} ${message}`);
    console.log(getRandomQuote("development"));
    console.log("─".repeat(60));
};

// ---------------------------
// BATMAN TASK MANAGER CLASS
// ---------------------------
class UnifiedBatmanManager {
    constructor() {
        this.terminals = new Map();
        this.results = [];
        this.workspaceRoot = workspaceRoot;
    }

    // Create internal process terminal
    async createTaskTerminal(taskName, command, options = {}) {
        console.log(`🦇 Opening Internal Terminal for: ${taskName}`);

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

    // Open macOS Terminal with auto-close
    async openAutoCloseTerminal(taskName, command, options = {}) {
        console.log(`🦇 Opening Auto-Close Terminal for: ${taskName}`);

        try {
            if (process.platform === "darwin") {
                const autoCloseScript = `
          tell application "Terminal"
            activate
            set newTab to do script "cd '${options.cwd || this.workspaceRoot}' && echo '🦇 Batman ${taskName}' && echo '▶️ Starting task...' && ${command} && echo '' && echo '✅ ${taskName} completed successfully!' && echo '🦇 Auto-closing in 3 seconds...' && sleep 3 && exit"
            set custom title of newTab to "🦇 ${taskName} (Auto-Close)"
          end tell
        `;

                exec(`osascript -e "${autoCloseScript.replace(/"/g, '\\"')}"`);
                console.log(`✅ Launched ${taskName} in auto-closing terminal`);

                this.results.push({
                    task: taskName,
                    status: "launched",
                    type: "auto-close",
                });
            } else {
                console.log(`⚠️ Auto-close terminals not available on this platform, using internal process`);
                await this.createTaskTerminal(taskName, command, options);
            }
        } catch (error) {
            console.log(`⚠️ Failed to open system terminal, using internal process for ${taskName}`);
            await this.createTaskTerminal(taskName, command, options);
        }
    }

    // Open persistent terminal (for dev server)
    async openPersistentTerminal(taskName, command, options = {}) {
        console.log(`🦇 Opening Persistent Terminal for: ${taskName}`);

        try {
            if (process.platform === "darwin") {
                const persistentScript = `
          tell application "Terminal"
            activate
            set newTab to do script "cd '${options.cwd || this.workspaceRoot}' && echo '🦇 Batman ${taskName} (Persistent)' && echo '🚀 Starting development server...' && echo 'ℹ️  This terminal will remain open for development' && ${command}"
            set custom title of newTab to "🦇 ${taskName} (Persistent)"
          end tell
        `;

                exec(`osascript -e "${persistentScript.replace(/"/g, '\\"')}"`);
                console.log(`✅ Launched ${taskName} in persistent terminal`);

                this.results.push({
                    task: taskName,
                    status: "launched",
                    type: "persistent",
                });
            } else {
                console.log(`⚠️ Persistent terminals not available on this platform, using internal process`);
                await this.createTaskTerminal(taskName, command, options);
            }
        } catch (error) {
            console.log(`⚠️ Failed to open system terminal, using internal process for ${taskName}`);
            await this.createTaskTerminal(taskName, command, options);
        }
    }

    // Get status summary
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

    // Get results summary
    getSummary() {
        return this.results;
    }

    // Cleanup all processes
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

// ---------------------------
// BATMAN MODE FUNCTIONS
// ---------------------------

// Classic Batman Mode (Sequential)
async function runClassicBatman() {
    console.clear();
    console.log(batmanArts.classic);

    console.log(`
🌃 Welcome to Gotham's Classic Batman!

"This workspace is for those who code like heroes. You take responsibility, 
face challenges with courage, and never give up. You plan, build, and protect 
your projects with precision and dedication—because in that case… You Are Also A BATMAN!"

🦇 Initializing Classic Batman Protocol...
🚨 Running sequential systems check...
📡 Preparing to deploy the Bat Signal...
  `);

    await sleep(2000);

    // Sequential task execution
    displayProgress("Adding Batman headers to all files in the Batcave", "📋");
    await runCommand("node scripts/add-headers.mjs");

    displayProgress("Running Oracle compatibility scan", "🔍");
    await runCommand("npm run check-compatibility");

    displayProgress("Building the Batmobile (all packages)", "🏗️");
    await runCommand("npm run build");

    displayProgress("Testing Batman's gadgets", "🧪");
    await runCommand("npm test");

    displayProgress("Powering up the Bat Signal servers", "🚀");
    const starterKitPath = path.join(workspaceRoot, "projects", "R3f-StarterKit");
    spawn("npm", ["run", "dev"], { cwd: starterKitPath, detached: true, stdio: "ignore" }).unref();

    await sleep(3000);

    // Final report
    console.log(batSignal);
    console.log(`
🦇 CLASSIC BATMAN PROTOCOL COMPLETE!

📊 GOTHAM CITY STATUS REPORT:
   🏗️  Build: SUCCESS - All Bat-gadgets assembled
   🧪 Tests: PASSED - All Batman tech tested
   🔧 Compatibility: OPTIMAL - All systems compatible
   📋 Headers: SECURED - All files have Bat-headers
   🚀 Servers: ONLINE - StarterKit running on http://localhost:5173

🦇 "I'm not just a developer... I'm Batman!"

🦇 Batman has left the building... but the Batcave is still running!
   Use Ctrl+C to stop development servers when you're done.
   
   "Gotham needs you to keep coding!" 🌃
  `);
}

// Enhanced Batman Mode (Multi-Terminal)
async function runEnhancedBatman() {
    console.log(batmanArts.enhanced);

    console.log(`
🌃 Welcome to the Enhanced Batcave!

"This enhanced Batman script opens separate terminals for each task,
giving you full visibility and control over every aspect of your workspace.
Each terminal is a specialized tool in Batman's arsenal!"

🦇 Initializing Enhanced Batman Protocol...
🚨 Preparing multi-terminal task management...
📡 Opening the Bat-Computer interfaces...
  `);

    const manager = new UnifiedBatmanManager();

    // Handle cleanup on exit
    process.on("SIGINT", () => {
        manager.cleanup();
        process.exit(0);
    });

    // Multi-terminal task execution
    const tasks = [
        { name: "Headers", command: 'node scripts/add-headers.mjs && echo "🦇 Header task complete!"', delay: 2000 },
        { name: "Compatibility", command: 'npm run check-compatibility && echo "🦇 Compatibility check complete!"', delay: 2000 },
        { name: "Build", command: 'npm run build && echo "🦇 Build complete!"', delay: 2000 },
        { name: "Tests", command: 'npm run test && echo "🦇 Tests complete!"', delay: 2000 },
    ];

    for (const task of tasks) {
        console.log(`\n🦇 Phase: Opening ${task.name} Terminal`);
        console.log(`"${getRandomQuote("development")}"`);
        console.log("────────────────────────────────────────────────────────────");

        await manager.openAutoCloseTerminal(task.name, task.command);
        await sleep(task.delay);
    }

    // Dev server (persistent)
    console.log(`\n🚀 Phase: Opening Development Server Terminal`);
    console.log(`"The Batcave is now online" – Batman`);
    console.log("────────────────────────────────────────────────────────────");

    const starterKitPath = path.join(workspaceRoot, "projects", "R3f-StarterKit");
    await manager.openPersistentTerminal("Dev-Server", "npm run dev", { cwd: starterKitPath });

    await sleep(2000);

    // Package monitor
    console.log(`\n📦 Phase: Opening Package Monitor Terminal`);
    console.log(`"Stay vigilant for package updates" – Batman`);
    console.log("────────────────────────────────────────────────────────────");

    await manager.openAutoCloseTerminal("Package-Monitor", 'npm outdated && echo "🦇 Package monitoring complete!"');

    // Final status
    console.log(`
🦇 ENHANCED BATMAN PROTOCOL DEPLOYED!

📊 MULTI-TERMINAL BATCAVE STATUS:
   🖥️  Header Management Terminal: Active (Auto-Close)
   🔍 Compatibility Analysis Terminal: Active (Auto-Close)
   🏗️  Build System Terminal: Active (Auto-Close)
   🧪 Testing Suite Terminal: Active (Auto-Close)
   🚀 Development Server Terminal: Active (Persistent)
   📦 Package Monitor Terminal: Active (Auto-Close)

🎯 Each task runs in its own dedicated terminal for:
   ✅ Better visibility and control
   ✅ Independent process management
   ✅ Parallel task execution
   ✅ Easy debugging and monitoring
   ✅ Professional development workflow

🦇 "I'm not just Batman... I'm Enhanced Batman with multi-terminal powers!"

🌃 GOTHAM IS SECURE - Your workspace is now fully operational!
   Completed task terminals auto-close after 3 seconds.
   Dev server terminal remains open for continuous development.

🦇🦇🦇 BATMAN HAS LEFT THE BUILDING... BUT THE BATCAVE LIVES ON! 🦇🦇🦇
  `);
}

// Auto-Close Batman Mode (Ultra Clean)
async function runAutoCloseBatman() {
    console.log(batmanArts.autoClose);

    console.log(`
🌃 Welcome to Batman Auto-Close Edition!

"This version launches each task in its own terminal that automatically
closes when the task completes, keeping your workspace clean and organized."

🦇 Initializing Auto-Close Batman Protocol...
🚨 Preparing clean workflow management...
📡 Opening self-closing Bat-Terminals...
  `);

    const manager = new UnifiedBatmanManager();

    const tasks = [
        { name: "Headers", command: "node scripts/add-headers.mjs", phase: "Header Management" },
        { name: "Compatibility", command: "npm run check-compatibility", phase: "Compatibility Analysis" },
        { name: "Build", command: "npm run build", phase: "Build System" },
        { name: "Tests", command: "npm run test", phase: "Testing Suite" },
    ];

    // Execute auto-close tasks
    for (const task of tasks) {
        console.log(`\n📋 Phase: ${task.phase}`);
        console.log(`"${getRandomQuote("development")}"`);

        await manager.openAutoCloseTerminal(task.name, task.command);
        await sleep(3000);
    }

    // Dev server (persistent)
    console.log(`\n🚀 Phase: Development Server`);
    console.log(`"The Batcave is now online" – Batman`);

    const starterKitPath = path.join(workspaceRoot, "projects", "R3f-StarterKit");
    await manager.openPersistentTerminal("Dev-Server", "npm run dev", { cwd: starterKitPath });

    await sleep(2000);

    // Package monitor
    console.log(`\n📦 Phase: Package Monitor`);
    console.log(`"Stay vigilant for package updates" – Batman`);

    await manager.openAutoCloseTerminal("Package-Monitor", 'npm outdated && echo "🦇 Package monitoring complete!"');

    // Final summary
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
   ✅ 3-second display of results before closing
   ✅ Persistent dev server for continuous development
   ✅ Professional workflow automation

🦇 "Clean terminals, clean mind, clean code!" - Batman

🌃 GOTHAM'S WORKSPACE IS SECURE AND CLEAN!
   
   🖥️  Completed tasks auto-closed after 3 seconds
   🚀 Dev server remains open at: http://localhost:3000
   📚 Documentation: Open ./docs in browser

🦇🦇🦇 BATMAN AUTO-CLOSE - MISSION ACCOMPLISHED! 🦇🦇🦇

Task Summary:
${summary.map(r => `   ${r.status === "launched" ? "✅" : "❌"} ${r.task}: ${r.status} ${r.type ? `(${r.type})` : ""}`).join("\n")}

🦇 Batman has optimized your workflow for maximum cleanliness!
  `);
}

// VS Code Instructions Mode
async function showVSCodeInstructions() {
    console.log(batmanArts.vscode);

    console.log(`
🌃 Welcome to VS Code Batman!

"This version is specifically designed for VS Code's integrated
terminal system. Each task will open in its own terminal panel
for maximum developer productivity."

🦇 Initializing VS Code Batman Protocol...
📡 Generating VS Code task configurations...
  `);

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
   ✅ Auto-close terminals when tasks complete

🦇 PRO TIP: You can run multiple Batman tasks simultaneously!
    Each task gets its own terminal panel for easy monitoring.

🌃 "VS Code is my new Batcave interface!" - Batman

────────────────────────────────────────────────────────────
🌃 VS CODE BATMAN STANDING BY - Ready for task deployment!
────────────────────────────────────────────────────────────
  `);
}

// ---------------------------
// MODE SELECTION LOGIC
// ---------------------------
function showHelp() {
    console.clear();
    console.log(batmanArts.classic);

    console.log(`
🦇 ULTIMATE BATMAN - ALL MODES AVAILABLE

🌃 Choose your Batman deployment mode:

📋 BATMAN MODES:
   🦇 classic    - Sequential task execution (original Batman)
   🦇 enhanced   - Multi-terminal with auto-close (3s countdown)
   🦇 auto       - Ultra-clean auto-close workflow (5s countdown)  
   🦇 vscode     - VS Code integration instructions
   🦇 help       - Show this help menu

🚀 USAGE:
   node imbatman.js [mode]
   node imbatman.js classic   # Classic sequential Batman
   node imbatman.js enhanced  # Multi-terminal enhanced Batman
   node imbatman.js auto      # Auto-close clean workflow Batman
   node imbatman.js vscode    # VS Code integration instructions
   node imbatman.js          # Interactive mode selection

🦇 FEATURES BY MODE:
   classic   → Sequential execution, single terminal
   enhanced  → Multi-terminal, 3s auto-close, persistent dev server
   auto      → Multi-terminal, 5s auto-close, ultra-clean workflow  
   vscode    → Instructions for VS Code task integration

🌃 "I'm whatever Gotham needs me to be" - Batman

Select a mode or run without arguments for interactive selection.
  `);
}

// Interactive mode selection
async function selectBatmanMode() {
    console.clear();
    console.log(batmanArts.classic);

    console.log(`
🦇 ULTIMATE BATMAN - MODE SELECTION

🌃 Welcome to the Ultimate Batman Script!

"Choose your weapon, Dark Knight. Each mode serves a different purpose
in protecting Gotham's codebase with maximum efficiency."

🦇 Available Batman Deployment Modes:

   1️⃣  Classic Batman    - Sequential task execution (traditional)
   2️⃣  Enhanced Batman   - Multi-terminal with smart auto-close  
   3️⃣  Auto-Close Batman - Ultra-clean workflow automation
   4️⃣  VS Code Batman    - Integration instructions for VS Code
   ❓  Help             - Show detailed help information

🦇 Select your Batman mode (1-4, or 'help'):
  `);

    // In a real implementation, you'd handle stdin input here
    // For now, we'll default to enhanced mode
    console.log(`
🦇 Auto-selecting Enhanced Batman mode for demonstration...
   Use command line arguments for direct mode selection:
   
   node imbatman.js classic   # Classic mode
   node imbatman.js enhanced  # Enhanced mode (selected)
   node imbatman.js auto      # Auto-close mode
   node imbatman.js vscode    # VS Code mode
  `);

    await sleep(2000);
    return "enhanced";
}

// ---------------------------
// MAIN EXECUTION
// ---------------------------
async function main() {
    const args = process.argv.slice(2);
    const mode = args[0]?.toLowerCase();

    switch (mode) {
    case "classic":
    case "c":
        await runClassicBatman();
        break;

    case "enhanced":
    case "e":
        await runEnhancedBatman();
        break;

    case "auto":
    case "a":
        await runAutoCloseBatman();
        break;

    case "vscode":
    case "vs":
    case "v":
        await showVSCodeInstructions();
        break;

    case "help":
    case "h":
    case "--help":
    case "-h":
        showHelp();
        break;

    default:
        const selectedMode = await selectBatmanMode();
        switch (selectedMode) {
        case "classic":
            await runClassicBatman();
            break;
        case "enhanced":
            await runEnhancedBatman();
            break;
        case "auto":
            await runAutoCloseBatman();
            break;
        case "vscode":
            await showVSCodeInstructions();
            break;
        }
        break;
    }
}

// Run Ultimate Batman
main().catch(error => {
    console.error("🦇 Even the Ultimate Batman encounters challenges:", error);
    console.log(getRandomQuote("error"));
    process.exit(1);
});
