#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Auto Merge Helper
 * File: auto-merge.mjs
 * Description: Helper script for automatic merging operations
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Version: 1.0.0
 */

import { execSync } from "child_process";

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function colorize(color, text) {
  return `${COLORS[color]}${text}${COLORS.reset}`;
}

function runCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      encoding: "utf8",
      stdio: options.silent ? "pipe" : "inherit",
      ...options,
    });
    return { success: true, output: result };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      output: error.stdout || error.stderr,
    };
  }
}

function logStep(message) {
  console.log(`${colorize("cyan", "🔄")} ${message}`);
}

function logSuccess(message) {
  console.log(`${colorize("green", "✅")} ${message}`);
}

function logError(message) {
  console.log(`${colorize("red", "❌")} ${message}`);
}

function logWarning(message) {
  console.log(`${colorize("yellow", "⚠️")} ${message}`);
}

async function setupAutoMerge() {
  console.log(colorize("bright", "\n🤖 R3F Batman Auto Merge Setup\n"));

  // Configure git for better auto merge behavior
  logStep("Configuring git auto merge settings...");

  const configs = [
    ["pull.rebase", "false"],
    ["merge.ff", "false"], // Always create merge commit
    ["merge.commit", "no"], // Don't open editor for merge commits
    ["core.mergeoptions", "--no-edit"], // Skip merge message editing
    ["merge.tool", "vimdiff"], // Set merge tool
    ["mergetool.prompt", "false"], // Don't prompt for merge tool
  ];

  for (const [key, value] of configs) {
    const result = runCommand(`git config ${key} ${value}`, { silent: true });
    if (result.success) {
      logSuccess(`Set ${key} = ${value}`);
    } else {
      logWarning(`Failed to set ${key}`);
    }
  }

  // Check current branch and remote status
  logStep("Checking repository status...");

  const statusResult = runCommand("git status --porcelain", { silent: true });
  if (!statusResult.success) {
    logError("Failed to check git status");
    return;
  }

  if (statusResult.output.trim()) {
    logWarning("Working directory is not clean. Please commit or stash changes first.");
    return;
  }

  // Check for remote changes
  logStep("Fetching latest changes...");
  const fetchResult = runCommand("git fetch origin", { silent: true });
  if (fetchResult.success) {
    logSuccess("Fetched latest changes from remote");
  } else {
    logWarning("Failed to fetch from remote");
  }

  // Check if we need to pull
  const behindResult = runCommand("git rev-list --count HEAD..origin/main", { silent: true });
  if (behindResult.success) {
    const commitsBehind = parseInt(behindResult.output.trim());
    if (commitsBehind > 0) {
      logStep(`Local branch is ${commitsBehind} commits behind. Attempting auto merge...`);

      const pullResult = runCommand("git pull origin main --no-edit");
      if (pullResult.success) {
        logSuccess("Successfully merged remote changes");
      } else {
        logError("Auto merge failed. Manual intervention may be required.");
        console.log("\nTo resolve conflicts manually:");
        console.log("1. Run: git status");
        console.log("2. Edit conflicted files");
        console.log("3. Run: git add <resolved-files>");
        console.log("4. Run: git commit");
        return;
      }
    } else {
      logSuccess("Local branch is up to date");
    }
  }

  // Check if we have commits to push
  const aheadResult = runCommand("git rev-list --count origin/main..HEAD", { silent: true });
  if (aheadResult.success) {
    const commitsAhead = parseInt(aheadResult.output.trim());
    if (commitsAhead > 0) {
      logStep(`Local branch has ${commitsAhead} commits to push.`);

      // Ask if user wants to push
      const readline = await import("readline");
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await new Promise(resolve => {
        rl.question("Push local commits? (y/N): ", resolve);
      });
      rl.close();

      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        const pushResult = runCommand("git push origin main");
        if (pushResult.success) {
          logSuccess("Successfully pushed local commits");
        } else {
          logError("Failed to push commits");
        }
      }
    } else {
      logSuccess("No local commits to push");
    }
  }

  console.log(colorize("bright", "\n🎉 Auto merge setup complete!"));
  console.log("\nAuto merge features enabled:");
  console.log("• GitHub Actions auto merge for Dependabot PRs");
  console.log("• Auto merge for PRs with 'auto-merge' label and approval");
  console.log("• Local git configured for easier merging");

  console.log("\nTo use auto merge:");
  console.log("• Add 'auto-merge' label to PRs for automatic merging");
  console.log("• Dependabot PRs will merge automatically when checks pass");
  console.log("• Run this script anytime to sync with remote");
}

// Run the setup
setupAutoMerge().catch(console.error);
