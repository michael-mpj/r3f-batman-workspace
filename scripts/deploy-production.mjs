#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Production Deployment Script
 * File: deploy-production.mjs
 * Description: Automated production deployment to Vercel
 * Author: R3F Workspace Team
 * Created: 2025-09-09
 * Last Modified: 2025-09-09
 * Version: 1.0.0
 */

import { spawn, exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.join(__dirname, "..");

// Batman ASCII Art for Production Deployment
const productionBatmanArt = `
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
                ██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
                ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
                ██████╔╝██████╔╝██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██╔██╗ ██║
                ██╔═══╝ ██╔══██╗██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██║╚██╗██║
                ██║     ██║  ██║╚██████╔╝██████╔╝╚██████╔╝╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
                ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                           🌐 BATMAN PRODUCTION DEPLOYMENT PROTOCOL 🌐
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
`;

// Utility Functions
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const runCommand = (command, cwd = workspaceRoot) => {
    return new Promise((resolve, reject) => {
        console.log(`🦇 Executing: ${command}`);
        console.log(`📁 Directory: ${cwd}`);

        const child = spawn(command, {
            shell: true,
            stdio: "inherit",
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

const checkVercelCli = async () => {
    try {
        await runCommand("vercel --version");
        return true;
    } catch (error) {
        console.log("⚠️  Vercel CLI not found. Installing...");
        try {
            await runCommand("npm install -g vercel");
            return true;
        } catch (installError) {
            console.error("❌ Failed to install Vercel CLI");
            return false;
        }
    }
};

// Main Deployment Function
const deployProduction = async () => {
    console.clear();
    console.log(productionBatmanArt);

    await sleep(1000);

    console.log(`
🌃 Welcome to Batman's Production Deployment Protocol!

🦇 DEPLOYMENT FEATURES:
   🏗️  Automated Production Builds
   🌐 Vercel Deployment Integration  
   🔍 Pre-deployment Validation
   📊 Build Status Monitoring
   🚀 Multi-project Deployment
   
🦇 TARGETS:
   📱 R3F StarterKit (Demo Project)
   ⚡ Cyber Forge (Production App)
   
🌟 Gotham's applications are ready for the world!
  `);

    try {
    // Step 1: Check Vercel CLI
        console.log("\n🔍 Step 1: Vercel CLI Check");
        console.log("────────────────────────────────────────────────────────────────────────────────");
        const hasVercel = await checkVercelCli();
        if (!hasVercel) {
            throw new Error("Vercel CLI is required for deployment");
        }

        // Step 2: Build Projects
        console.log("\n🏗️ Step 2: Building Production Assets");
        console.log("────────────────────────────────────────────────────────────────────────────────");
        console.log("🦇 Building R3F StarterKit...");
        await runCommand("npm run build:starterkit");

        console.log("🦇 Building Cyber Forge...");
        await runCommand("npm run build:cyber-forge");

        // Step 3: Deploy to Vercel
        console.log("\n🚀 Step 3: Production Deployment");
        console.log("────────────────────────────────────────────────────────────────────────────────");

        console.log("🦇 Deploying R3F StarterKit to Vercel...");
        await runCommand("vercel --prod", path.join(workspaceRoot, "projects", "R3f-StarterKit"));

        console.log("🦇 Deploying Cyber Forge to Vercel...");
        await runCommand("vercel --prod", path.join(workspaceRoot, "apps", "cyber-forge"));

        // Success
        console.log(`
🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇

                        🦇 PRODUCTION DEPLOYMENT COMPLETE! 🦇

📊 GOTHAM DEPLOYMENT STATUS:

   🏗️  Build System: ✅ PRODUCTION READY
   🌐 R3F StarterKit: ✅ DEPLOYED TO VERCEL
   ⚡ Cyber Forge: ✅ DEPLOYED TO VERCEL
   🔧 Optimization: ✅ ASSETS OPTIMIZED

🌐 YOUR APPLICATIONS ARE LIVE:
   📱 R3F StarterKit: Check Vercel dashboard for URL
   ⚡ Cyber Forge: Check Vercel dashboard for URL

🦇 "Gotham's applications now serve the world. The Dark Knight's work here is done."

🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇
    `);
    } catch (error) {
        console.error(`
❌ DEPLOYMENT FAILED!

🦇 Error: ${error.message}

🔧 TROUBLESHOOTING:
   1. Ensure you're logged into Vercel: vercel login
   2. Check build errors in the output above
   3. Verify package.json scripts are working
   4. Run 'npm run build:production' locally first

🦇 "Even Batman encounters obstacles. Regroup and try again!"
    `);
        process.exit(1);
    }
};

// Run Deployment
deployProduction().catch(error => {
    console.error("🦇 Even Batman has deployment failures:", error.message);
    process.exit(1);
});
