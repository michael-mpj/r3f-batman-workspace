#!/usr/bin/env node

/**
 * 🦇 Batman Extension Installer
 * Automatically installs all recommended VS Code extensions for the R3F workspace
 */

/* eslint-disable */

import { readFileSync } from "fs";
import { spawn } from "child_process";

const EXTENSIONS_FILE = ".vscode/extensions.json";

/**
 * Install a VS Code extension
 */
function installExtension(extensionId) {
  return new Promise((resolve, reject) => {
    const install = spawn("code", ["--install-extension", extensionId], {
      stdio: "pipe",
    });

    let output = "";
    install.stdout.on("data", data => {
      output += data.toString();
    });

    install.stderr.on("data", data => {
      output += data.toString();
    });

    install.on("close", code => {
      if (code === 0) {
        console.log(`✅ Installed: ${extensionId}`);
        resolve({ extensionId, success: true, output });
      } else {
        console.log(`❌ Failed: ${extensionId} - ${output}`);
        resolve({ extensionId, success: false, output });
      }
    });

    install.on("error", error => {
      console.log(`🚫 Error installing ${extensionId}:`, error.message);
      reject({ extensionId, error: error.message });
    });
  });
}

/**
 * Main installation function
 */
async function installAllExtensions() {
  try {
    console.log("🦇 Batman Extension Installer");
    console.log("================================");

    // Read extensions.json
    const extensionsData = readFileSync(EXTENSIONS_FILE, "utf8");
    const extensionsConfig = JSON.parse(extensionsData);
    const recommendations = extensionsConfig.recommendations || [];

    console.log(`📦 Found ${recommendations.length} recommended extensions`);
    console.log("🚀 Starting installation...\n");

    const results = [];
    let installed = 0;
    let failed = 0;

    // Install extensions sequentially to avoid conflicts
    for (const extension of recommendations) {
      try {
        const result = await installExtension(extension);
        results.push(result);

        if (result.success) {
          installed++;
        } else {
          failed++;
        }
      } catch (error) {
        console.error(`💥 Critical error installing ${extension}:`, error);
        failed++;
      }

      // Small delay to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log("\n🦇 Batman Extension Installation Complete!");
    console.log("==========================================");
    console.log(`✅ Successfully installed: ${installed}`);
    console.log(`❌ Failed installations: ${failed}`);
    console.log(`📦 Total processed: ${recommendations.length}`);

    if (failed > 0) {
      console.log("\n⚠️  Some extensions failed to install:");
      results.filter(r => !r.success).forEach(r => console.log(`   - ${r.extensionId}`));

      console.log("\n💡 Try running this script again or install manually:");
      console.log("   code --install-extension <extension-id>");
    }

    if (installed > 0) {
      console.log("\n🔄 Please reload VS Code to activate all extensions:");
      console.log("   Ctrl+Shift+P → 'Developer: Reload Window'");
    }
  } catch (error) {
    console.error("💥 Fatal error:", error.message);
    process.exit(1);
  }
}

// Check if extensions.json exists
try {
  readFileSync(EXTENSIONS_FILE, "utf8");
} catch (error) {
  console.error(`❌ Could not find ${EXTENSIONS_FILE}`);
  console.error("Make sure you're running this from the workspace root directory.");
  process.exit(1);
}

// Run the installer
installAllExtensions().catch(error => {
  console.error("💥 Unexpected error:", error);
  process.exit(1);
});
