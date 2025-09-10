#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Local Production Deployment
 * File: deploy-local.mjs
 * Description: Interactive production deployment to Vercel
 * Author: R3F Workspace Team
 * Created: 2025-09-09
 * Last Modified: 2025-09-09
 * Version: 1.0.0
 */

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.join(__dirname, "..");

const deployLocalArt = `
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
                🚀 BATMAN LOCAL DEPLOYMENT HELPER 🚀
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
`;

const runCommand = (command, cwd, interactive = false) => {
    return new Promise((resolve, reject) => {
        console.log(`🦇 Executing: ${command}`);
        console.log(`📁 Directory: ${cwd}`);

        const stdio = interactive ? "inherit" : ["inherit", "inherit", "inherit"];

        const child = spawn(command, {
            shell: true,
            stdio,
            cwd,
        });

        child.on("close", code => {
            if (code === 0) {
                console.log(`✅ Command completed successfully`);
                resolve();
            } else {
                console.log(`❌ Command failed with code ${code}`);
                reject(new Error(`Command failed: ${command}`));
            }
        });
    });
};

const deployLocal = async () => {
    console.clear();
    console.log(deployLocalArt);

    console.log(`
🌃 Batman's Local Deployment Helper

🦇 This will help you deploy your R3F applications step by step.

📋 STEPS:
   1. Build production assets
   2. Login to Vercel (if needed)
   3. Deploy R3F StarterKit
   4. Deploy Cyber Forge
   
🎯 Let's get Gotham's apps online!
  `);

    try {
    // Step 1: Build
        console.log("\n🏗️ Step 1: Building Production Assets");
        console.log("────────────────────────────────────────────────────────────────────────────────");
        await runCommand("npm run build:production", workspaceRoot);

        // Step 2: Check login status
        console.log("\n🔐 Step 2: Vercel Authentication");
        console.log("────────────────────────────────────────────────────────────────────────────────");

        try {
            await runCommand("vercel whoami", workspaceRoot);
            console.log("✅ Already logged in to Vercel!");
        } catch (error) {
            console.log("🔑 Need to login to Vercel...");
            console.log("🦇 Please follow the prompts to authenticate:");
            await runCommand("vercel login", workspaceRoot, true);
        }

        // Step 3: Deploy StarterKit
        console.log("\n🚀 Step 3: Deploying R3F StarterKit");
        console.log("────────────────────────────────────────────────────────────────────────────────");
        await runCommand("vercel --prod", path.join(workspaceRoot, "projects", "R3f-StarterKit"), true);

        // Step 4: Deploy Cyber Forge
        console.log("\n⚡ Step 4: Deploying Cyber Forge");
        console.log("────────────────────────────────────────────────────────────────────────────────");
        await runCommand("vercel --prod", path.join(workspaceRoot, "apps", "cyber-forge"), true);

        // Success
        console.log(`
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇

                        🦇 DEPLOYMENT SUCCESSFUL! 🦇

📊 GOTHAM STATUS:
   ✅ Production builds completed
   ✅ R3F StarterKit deployed to Vercel
   ✅ Cyber Forge deployed to Vercel

🌐 Your applications are now live on Vercel!
   📱 Check your Vercel dashboard for the live URLs
   🔗 Share your amazing R3F creations with the world!

🦇 "Gotham's digital skyline just got brighter!"

🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
    `);
    } catch (error) {
        console.error(`
❌ DEPLOYMENT ENCOUNTERED AN ISSUE!

🦇 Error: ${error.message}

🔧 TROUBLESHOOTING STEPS:
   1. Check if you're logged in: vercel whoami
   2. Login manually: vercel login  
   3. Try deploying individually:
      cd projects/R3f-StarterKit && vercel --prod
      cd apps/cyber-forge && vercel --prod

🦇 "Every hero faces setbacks. Let's fix this!"
    `);
        process.exit(1);
    }
};

deployLocal().catch(error => {
    console.error("🦇 Deployment helper error:", error.message);
    process.exit(1);
});
