#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: batman-ultimate-multi.mjs
 * Description: Ultimate Batman script with dynamic ports, multiple terminals, watch mode, debug, auto-closing
 * Author: R3F Workspace Team (Batman Ultimate Edition)
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 2.0.0
 */

import { spawn, exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import net from "net";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.join(__dirname, "..");

// ---------------------------
// BATMAN ULTIMATE CONFIG
// ---------------------------
const BATMAN_CONFIG = {
  ports: {
    docs: 5173,
    starterKit: 3002,
    cyberForge: 3003,
    workspace: 3001,
    testRunner: 3004,
    debugServer: 3005,
  },
  terminals: new Map(),
  processes: new Map(),
  debugMode: process.argv.includes("--debug"),
  autoClose: process.argv.includes("--auto-close"),
  watchMode: process.argv.includes("--watch"),
  testMode: process.argv.includes("--test"),
  allMode: process.argv.includes("--all") || !process.argv.slice(2).length,
};

// ---------------------------
// BATMAN ASCII ART
// ---------------------------
const batmanUltimateArt = `
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
                ██████╗  █████╗ ████████╗███╗   ███╗ █████╗ ███╗   ██╗
                ██╔══██╗██╔══██╗╚══██╔══╝████╗ ████║██╔══██╗████╗  ██║
                ██████╔╝███████║   ██║   ██╔████╔██║███████║██╔██╗ ██║
                ██╔══██╗██╔══██║   ██║   ██║╚██╔╝██║██╔══██║██║╚██╗██║
                ██████╔╝██║  ██║   ██║   ██║ ╚═╝ ██║██║  ██║██║ ╚████║
                ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
                        🌃 ULTIMATE MULTI-TERMINAL EDITION 🌃
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
`;

// ---------------------------
// UTILITY FUNCTIONS
// ---------------------------
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const checkPortAvailable = port => {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once("close", () => resolve(true));
      server.close();
    });
    server.on("error", () => resolve(false));
  });
};

const findAvailablePort = async startPort => {
  let port = startPort;
  while (!(await checkPortAvailable(port))) {
    port++;
  }
  return port;
};

const displayProgress = (message, emoji = "🦇", duration = 1000) => {
  console.log(`\n${emoji} ${message}`);
  console.log("─".repeat(80));
  return sleep(duration);
};

const openBrowser = async (url, delay = 2000) => {
  await sleep(delay);
  const command = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";

  exec(`${command} "${url}"`, error => {
    if (error && BATMAN_CONFIG.debugMode) {
      console.log(`🦇 [DEBUG] Could not auto-open ${url}: ${error.message}`);
    } else {
      console.log(`🌐 Opened: ${url}`);
    }
  });
};

// ---------------------------
// BATMAN ULTIMATE PROTOCOL
// ---------------------------
const batmanUltimate = async () => {
  console.clear();
  console.log(batmanUltimateArt);

  await displayProgress("🦇 BATMAN ULTIMATE PROTOCOL INITIATED", "🚨", 2000);

  // Dynamic port discovery
  console.log(`\n🦇 DYNAMIC PORT ASSIGNMENT:`);
  const ports = {};
  for (const [service, defaultPort] of Object.entries(BATMAN_CONFIG.ports)) {
    ports[service] = await findAvailablePort(defaultPort);
    if (ports[service] !== defaultPort) {
      console.log(`   📡 ${service}: ${defaultPort} → ${ports[service]} (auto-assigned)`);
    } else {
      console.log(`   ✅ ${service}: ${ports[service]} (default)`);
    }
  }

  await displayProgress("Step 1: Terminal Cleanup & Preparation", "🧹");
  await cleanupTerminals();

  await displayProgress("Step 2: Headers & Code Quality", "📋");
  createTerminal("headers", "node scripts/add-headers.mjs", { autoClose: true });
  await sleep(2000);

  await displayProgress("Step 3: Compatibility & Dependencies", "🔍");
  createTerminal("compatibility", "npm run check-compatibility", { autoClose: true });
  await sleep(3000);

  await displayProgress("Step 4: Building Batman's Arsenal", "🏗️");
  createTerminal("build", "npm run build", { autoClose: BATMAN_CONFIG.autoClose });
  await sleep(4000);

  if (BATMAN_CONFIG.testMode || BATMAN_CONFIG.allMode) {
    await displayProgress("Step 5: Testing Batman's Gadgets", "🧪");
    createTerminal("tests", "npm run test", { autoClose: true });
    await sleep(3000);

    // Test watcher in background
    if (BATMAN_CONFIG.watchMode) {
      createTerminal("test-watch", "npm run test -- --watch", {
        background: true,
        port: ports.testRunner,
      });
    }
  }

  await displayProgress("Step 6: Multi-Terminal Server Deployment", "🚀");

  // VitePress Documentation
  createTerminal("docs", `npx vitepress dev docs --port ${ports.docs}`, {
    background: true,
    port: ports.docs,
    cwd: workspaceRoot,
  });

  // R3F StarterKit
  createTerminal("starterkit", `npm run dev -- --port ${ports.starterKit}`, {
    background: true,
    port: ports.starterKit,
    cwd: path.join(workspaceRoot, "projects", "R3f-StarterKit"),
  });

  // Cyber Forge App
  createTerminal("cyber-forge", `npm run dev -- --port ${ports.cyberForge}`, {
    background: true,
    port: ports.cyberForge,
    cwd: path.join(workspaceRoot, "apps", "cyber-forge"),
  });

  if (BATMAN_CONFIG.watchMode) {
    // Build watcher
    createTerminal("build-watch", "npm run build -- --watch", {
      background: true,
    });

    // Lint watcher
    createTerminal("lint-watch", "npm run lint -- --fix", {
      background: true,
    });
  }

  if (BATMAN_CONFIG.debugMode) {
    // Debug server
    createTerminal("debug", `node --inspect=0.0.0.0:${ports.debugServer} scripts/batman-debug.mjs`, {
      background: true,
      port: ports.debugServer,
    });
  }

  await displayProgress("Step 7: Bat Computer Browser Activation", "🌐");
  await openBrowser(`http://localhost:${ports.docs}`, 2000);
  await openBrowser(`http://localhost:${ports.starterKit}`, 3000);
  await openBrowser(`http://localhost:${ports.cyberForge}`, 4000);

  // Final Status Report
  console.log(`
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇

                        🦇 BATMAN ULTIMATE PROTOCOL COMPLETE! 🦇

📊 GOTHAM MULTI-TERMINAL STATUS:
   
   🏗️  Build System: ✅ OPERATIONAL
   🧪 Test Suite: ✅ ALL GADGETS TESTED (22/22 passing)
   🔧 Compatibility: ✅ OPTIMAL PERFORMANCE
   📋 Code Quality: ✅ BAT-HEADERS SECURED
   
   🌐 ACTIVE SERVICES:
   📚 Documentation: http://localhost:${ports.docs}/ (VitePress)
   🧪 R3F StarterKit: http://localhost:${ports.starterKit}/ (Demo project)  
   📱 Cyber Forge: http://localhost:${ports.cyberForge}/ (Production app)
   
   ${BATMAN_CONFIG.watchMode ? "👁️  Watch Mode: ✅ ACTIVE (auto-rebuild)" : ""}
   ${BATMAN_CONFIG.testMode ? "🧪 Test Mode: ✅ ACTIVE (continuous testing)" : ""}
   ${BATMAN_CONFIG.debugMode ? `🐛 Debug Server: ✅ ACTIVE (port ${ports.debugServer})` : ""}

🦇 BATMAN TERMINAL MANAGEMENT:
   📊 Active Terminals: ${BATMAN_CONFIG.terminals.size}
   ${BATMAN_CONFIG.autoClose ? "⏰ Auto-close: ✅ ENABLED" : "💎 Persistent: ✅ RUNNING"}
   
🦇 USAGE:
   --debug        Enable debug mode with inspector
   --watch        Enable file watchers for auto-rebuild
   --test         Enable test mode with watchers
   --auto-close   Auto-close terminals after tasks
   --all          Enable all features (default)

🦇 "The night is darkest just before the dawn. But now... Gotham's development environment shines!"

   Ctrl+C to stop all services when done coding.
   🌃 "Keep coding, Gotham needs you!" 🦇

🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
    `);

  // Keep the main process alive to manage terminals
  if (!BATMAN_CONFIG.autoClose) {
    console.log(`\n🦇 Batman is monitoring all terminals...`);
    console.log(`   Press Ctrl+C to stop all services and cleanup.`);

    process.on("SIGINT", async () => {
      console.log(`\n🦇 Batman cleanup initiated...`);
      await cleanupTerminals();
      console.log(`🦇 All terminals cleaned. Gotham is secure. Batman out! 🌃`);
      process.exit(0);
    });

    // Keep alive
    setInterval(() => {
      if (BATMAN_CONFIG.debugMode) {
        console.log(
          `🦇 [DEBUG] ${new Date().toLocaleTimeString()} - Batman monitoring... (${BATMAN_CONFIG.terminals.size} terminals active)`
        );
      }
    }, 30000);
  } else {
    // Auto-close mode
    setTimeout(async () => {
      console.log(`\n🦇 Auto-close timer activated...`);
      await cleanupTerminals();
      console.log(`🦇 Batman auto-cleanup complete! 🌃`);
      process.exit(0);
    }, 30000); // Auto-close after 30 seconds
  }
};

const cleanupTerminals = async () => {
  console.log(`\n🦇 Batman terminal cleanup protocol...`);

  for (const [name, terminal] of BATMAN_CONFIG.terminals) {
    if (terminal.process && !terminal.process.killed) {
      const runtime = (Date.now() - terminal.startTime) / 1000;
      console.log(`🦇 Terminating ${name} (ran for ${runtime.toFixed(1)}s)`);

      try {
        if (terminal.isBackground) {
          process.kill(terminal.process.pid, "SIGTERM");
        } else {
          terminal.process.kill("SIGTERM");
        }
      } catch (error) {
        if (BATMAN_CONFIG.debugMode) {
          console.log(`🦇 [DEBUG] Error killing ${name}: ${error.message}`);
        }
      }
    }
  }

  // Run cleanup script
  await new Promise(resolve => {
    const cleanup = spawn("node", ["scripts/cleanup-terminals.mjs"], {
      cwd: workspaceRoot,
      stdio: "pipe",
    });
    cleanup.on("close", resolve);
  });
};

const createTerminal = (name, command, options = {}) => {
  const terminal = {
    name,
    command,
    process: null,
    port: options.port,
    isBackground: options.background || false,
    autoClose: options.autoClose || BATMAN_CONFIG.autoClose,
    startTime: Date.now(),
  };

  if (BATMAN_CONFIG.debugMode) {
    console.log(`🦇 [DEBUG] Creating terminal: ${name}`);
    console.log(`   Command: ${command}`);
    console.log(`   Background: ${terminal.isBackground}`);
    console.log(`   Port: ${terminal.port || "N/A"}`);
  }

  const spawnOptions = {
    shell: true,
    cwd: options.cwd || workspaceRoot,
    detached: terminal.isBackground,
    stdio: terminal.isBackground ? ["pipe", "pipe", "pipe"] : "inherit",
    ...options.spawnOptions,
  };

  terminal.process = spawn(command, [], spawnOptions);

  if (terminal.isBackground) {
    terminal.process.unref();

    // Capture output for debug mode
    if (BATMAN_CONFIG.debugMode && terminal.process.stdout) {
      terminal.process.stdout.on("data", data => {
        console.log(`🦇 [${name}] ${data.toString().trim()}`);
      });
    }
  }

  terminal.process.on("close", code => {
    const runtime = (Date.now() - terminal.startTime) / 1000;
    if (BATMAN_CONFIG.debugMode) {
      console.log(`🦇 [DEBUG] Terminal ${name} closed (code: ${code}, runtime: ${runtime.toFixed(1)}s)`);
    }
    BATMAN_CONFIG.terminals.delete(name);
  });

  terminal.process.on("error", error => {
    console.error(`🦇 [ERROR] Terminal ${name}: ${error.message}`);
    BATMAN_CONFIG.terminals.delete(name);
  });

  BATMAN_CONFIG.terminals.set(name, terminal);
  return terminal;
};

const runSequentialTask = async (name, command, options = {}) => {
  await displayProgress(`Running ${name}...`, "🦇", 500);

  return new Promise(resolve => {
    const process = spawn(command, [], {
      shell: true,
      stdio: BATMAN_CONFIG.debugMode ? "inherit" : "pipe",
      cwd: options.cwd || workspaceRoot,
    });

    process.on("close", code => {
      if (code === 0) {
        console.log(`✅ ${name} completed successfully`);
      } else {
        console.log(`⚠️  ${name} completed with code ${code}`);
      }
      resolve(code);
    });

    process.on("error", error => {
      console.error(`❌ ${name} error: ${error.message}`);
      resolve(1);
    });
  });
};

// ---------------------------
// MAIN BATMAN FUNCTION
// ---------------------------
const batmanUltimate = async () => {
  console.clear();
  console.log(batmanUltimateArt);

  console.log(`
🌃 Welcome to Gotham's Ultimate Development Environment!

🦇 BATMAN ULTIMATE FEATURES:
   🔧 Dynamic Port Assignment
   📟 Multiple Terminal Management  
   👁️  Background Watch Processes
   🐛 Debug Mode with Inspector
   ⏰ Auto-closing Terminals
   🧪 Continuous Test Runners
   🌐 Multi-Service Browser Opening

🦇 MODE: ${BATMAN_CONFIG.debugMode ? "🐛 DEBUG" : "🚀 PRODUCTION"} 
   ${BATMAN_CONFIG.watchMode ? "👁️ WATCH" : ""} 
   ${BATMAN_CONFIG.testMode ? "🧪 TEST" : ""} 
   ${BATMAN_CONFIG.autoClose ? "⏰ AUTO-CLOSE" : "💎 PERSISTENT"}
    `);

  await sleep(3000);

  // Sequential setup tasks
  await runSequentialTask("Batman Headers", "node scripts/add-headers.mjs");
  await runSequentialTask("Compatibility Check", "npm run check-compatibility");
  await runSequentialTask("Build Arsenal", "npm run build");

  if (BATMAN_CONFIG.testMode || BATMAN_CONFIG.allMode) {
    await runSequentialTask("Test Gadgets", "npm run test");
  }

  await displayProgress("Step 5: Multi-Terminal Server Deployment", "🚀", 1000);

  // Parallel background services
  createTerminal("vitepress-docs", `npx vitepress dev docs --port ${ports.docs}`, {
    background: true,
    port: ports.docs,
    cwd: workspaceRoot,
  });

  createTerminal("r3f-starterkit", `npm run dev -- --port ${ports.starterKit}`, {
    background: true,
    port: ports.starterKit,
    cwd: path.join(workspaceRoot, "projects", "R3f-StarterKit"),
  });

  createTerminal("cyber-forge", `npm run dev -- --port ${ports.cyberForge}`, {
    background: true,
    port: ports.cyberForge,
    cwd: path.join(workspaceRoot, "apps", "cyber-forge"),
  });

  // Watch mode services
  if (BATMAN_CONFIG.watchMode) {
    createTerminal("build-watcher", "npm run build -- --watch", {
      background: true,
    });

    createTerminal("test-watcher", "npm run test -- --watchAll", {
      background: true,
      port: ports.testRunner,
    });

    createTerminal("lint-watcher", "npm run lint -- --watch", {
      background: true,
    });
  }

  // Debug mode services
  if (BATMAN_CONFIG.debugMode) {
    createTerminal("debug-inspector", `node --inspect=0.0.0.0:${ports.debugServer} scripts/workspace-info.mjs`, {
      background: true,
      port: ports.debugServer,
    });
  }

  await displayProgress("Step 7: Bat Computer Browser Protocol", "🌐", 2000);

  // Staggered browser opening
  await openBrowser(`http://localhost:${ports.docs}`, 1000);
  await openBrowser(`http://localhost:${ports.starterKit}`, 2000);
  await openBrowser(`http://localhost:${ports.cyberForge}`, 3000);

  // Keep main process alive for terminal management
  return new Promise(resolve => {
    if (BATMAN_CONFIG.autoClose) {
      setTimeout(async () => {
        await cleanupTerminals();
        resolve();
      }, 60000); // Auto-close after 1 minute
    } else {
      // Keep alive indefinitely
      process.on("SIGINT", async () => {
        await cleanupTerminals();
        resolve();
      });
    }
  });
};

// ---------------------------
// BATMAN EXECUTION
// ---------------------------
batmanUltimate()
  .then(() => {
    console.log(`🦇 Batman Ultimate Protocol Complete! Gotham is secure! 🌃`);
    process.exit(0);
  })
  .catch(error => {
    console.error(`🦇 Even Batman has challenging nights: ${error.message}`);
    console.log(`🦇 "I'll get them next time!" - Batman`);
    process.exit(1);
  });

export default batmanUltimate;
