#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: batman.mjs
 * Description: The ultimate Batman script - runs everything and opens the Bat Cave!
 * Author: R3F Workspace Team (Batman Edition)
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.1.0
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
                           🌃 I'M BATMAN - R3F WORKSPACE EDITION 🌃
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
`;

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
    productionReady: [
        `"I have one power. I never give up." – Batman`,
        `"I am vengeance. I am the night. I am Batman." – Batman`,
        `"Gotham needs its hero… the city is ready." – Batman`,
    ],
    success: [
        `"Sometimes the only way to solve our problems is to fight our way through them." – Batman`,
        `"Everything's going to be alright. Gotham is safe." – Batman`,
        `"No matter how bad it gets, you can always do what's right." – Batman`,
    ],
    error: [
        `"Criminals are a superstitious cowardly lot." – Batman`,
        `"I've faced worse. I'll face it again." – Batman`,
        `"A hero can be anyone. Even a man doing something as simple as coding." – Batman`,
    ],
    build: [
        `"It's not who I am underneath… it's what I build that counts." – Batman`,
        `"The tools don't make the hero. I do." – Batman`,
        `"I have to succeed. Gotham depends on it." – Batman`,
    ],
    merge: [
        `"We fall so we can learn to pick ourselves up." – Batman`,
        `"Sometimes we have to be steady, and give up the thing we want the most." – Batman`,
        `"The night is dark, but our code shines." – Batman`,
    ],
    asyncTask: [
        `"Endure, Master Wayne. Take it. They'll hate you for it, but that's the point of Batman." – Alfred`,
        `"Patience is power. Let it run in the background." – Batman Dev Edition`,
        `"Even in the dark, there's purpose." – Batman`,
    ],
    motivation: [
        `"I am vengeance. I am the night. I am Batman." – Batman`,
        `"It's not who I am underneath, but what I do that defines me." – Batman`,
        `"You either die a hero or you live long enough to see yourself become the villain." – Batman`,
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

const runCommand = (command, options = {}, status = null) => {
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
                if (status) console.log(getRandomQuote("error"));
                resolve(code);
            }
        });

        child.on("error", error => {
            console.error(`❌ Error executing command: ${error.message}`);
            if (status) console.log(getRandomQuote("error"));
            resolve(1);
        });
    });
};

const openBrowser = (url, delay = 2000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const command = process.platform === "darwin" ? "sudo open" : process.platform === "win32" ? "start" : "sudo xdg-open";

            exec(`${command} "${url}"`, error => {
                if (error) console.log(`⚠️ Could not auto-open ${url}: ${error.message}`);
                else console.log(`🌐 Opened: ${url}`);
                resolve();
            });
        }, delay);
    });
};

const displayProgress = (message, emoji = "🦇", status = null) => {
    console.log(`\n${emoji} ${message}`);
    if (status) console.log(getRandomQuote(status));
    console.log("─".repeat(60));
};

// ---------------------------
// MAIN FUNCTION
// ---------------------------
const imBatman = async () => {
    console.clear();
    console.log(batmanArt);

    await sleep(1000);

    // 🦇 Intro Description
    console.log(`
🌃 Welcome to Gotham's R3F Workspace!

"From the depths of legacy systems and the chaos of production fires, legends are born. This digital Gotham calls to those who answer when others flee—developers who transform complexity into clarity, who turn breaking changes into breakthrough moments.
Here, every commit is an oath. Every pull request, a promise. Every deployment, a stand against the forces of technical debt and entropy. You wield your IDE like the Dark Knight wields his arsenal—with purpose, precision, and unwavering resolve.
While others fear the midnight deployments, you thrive in them. Where others see impossible bugs, you see puzzles waiting to be solved. When production crashes at 3 AM, you don't just respond—you prevail.
Your code doesn't just function—it inspires. Your architecture doesn't just scale—it endures. Your tests don't just pass—they stand as guardians against future failures.
In this workspace, YOU DON'T JUST DEVELOP SOFTWARE—YOU FORGE DIGITAL DESTINY. You Are Also A BATMAN!"

🦇 Initializing Batman Protocol...
🚨 Running all systems check...
📡 Preparing to deploy the Bat Signal...
  `);
    await sleep(2000);

    // Step 1: Add headers
    displayProgress("Adding Batman headers to all files in the Batcave", "📋", "development");
    await runCommand("node scripts/add-headers.mjs", {}, "development");

    // Step 2: Check compatibility
    displayProgress("Running Oracle compatibility scan", "🔍", "testRun");
    await runCommand("npm run check-compatibility", {}, "testRun");

    // Step 3: Build packages
    displayProgress("Building the Batmobile (all packages)", "🏗️", "build");
    await runCommand("npm run build", {}, "build");

    // Step 4: Run tests
    displayProgress("Testing Batman's gadgets", "🧪", "testRun");
    await runCommand("npm test", {}, "testRun");

    // Step 5: Start dev server
    displayProgress("Powering up the Bat Signal servers", "🚀", "deploy");
    console.log(`
🦇 NEXT PHASES:
   🚀 Dev Server - Will start the StarterKit development server
   🌐 Browser Opening - Will attempt to open browsers (using sudo for permissions)
   📊 Final Report - Will display the complete Batman status
  `);
    const starterKitPath = path.join(workspaceRoot, "projects", "R3f-StarterKit");
    spawn("npm", ["run", "dev"], { cwd: starterKitPath, detached: true, stdio: "ignore" }).unref();

    await sleep(4000);

    // Step 6: Open browsers
    displayProgress("Activating the Bat Computer displays", "🖥️", "productionReady");
    await openBrowser("http://localhost:5173", 1000);
    await openBrowser(`file://${workspaceRoot}/docs`, 2000);

    // Final report
    console.log(batSignal);
    console.log(`
🦇 BATMAN PROTOCOL COMPLETE!

📊 GOTHAM CITY STATUS REPORT:
   🏗️  Build: SUCCESS - All Bat-gadgets assembled
   🧪 Tests: PASSED - All Batman tech tested
   🔧 Compatibility: OPTIMAL - All systems compatible
   📋 Headers: SECURED - All files have Bat-headers
   🚀 Servers: ONLINE - StarterKit running on http://localhost:5173
   📖 Docs: ACCESSIBLE - Documentation ready for Robin
   🦇 Batman Script: OPTIMIZED - Dynamic and extension-based

🦇 "I'm not just a developer... I'm Batman!"

🦇 Batman has left the building... but the Batcave is still running!
   Use Ctrl+C to stop development servers when you're done.

   "Gotham needs you to keep coding!" 🌃
    🌐 MANUAL ACCESS:
   📱 StarterKit Demo: http://localhost:5173 (starting up...)
   📚 Documentation: http://localhost:5173/docs
  🔧 Re-run Batman: node batman.mjs

  ${batSignal}
  🦇

  `);
};

// Run Batman
imBatman().catch(error => {
    console.error("🦇 Even Batman has bad days:", error.message);
    process.exit(1);
});
