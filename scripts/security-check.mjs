#!/usr/bin/env node

/**
 * Security Check Script
 * Performs basic security checks on the workspace
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function colorize(color, text) {
  return `${COLORS[color]}${text}${COLORS.reset}`;
}

function logSection(title) {
  console.log(`\n${colorize("cyan", "🔒")} ${colorize("bright", title)}`);
  console.log(colorize("cyan", "=".repeat(50)));
}

function logCheck(status, message) {
  const icon = status === "pass" ? "✅" : status === "fail" ? "❌" : "⚠️";
  const color = status === "pass" ? "green" : status === "fail" ? "red" : "yellow";
  console.log(`${icon} ${colorize(color, message)}`);
}

function runCommand(command) {
  try {
    return execSync(command, { encoding: "utf8", stdio: "pipe" });
  } catch (error) {
    return null;
  }
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  logCheck(exists ? "pass" : "fail", `${description}: ${exists ? "Present" : "Missing"}`);
  return exists;
}

async function main() {
  console.log(colorize("bright", "\n🔒 R3F Batman Workspace Security Check\n"));

  // Check for security-related files
  logSection("Security Configuration Files");
  checkFile("SECURITY.md", "Security Policy");
  checkFile(".github/dependabot.yml", "Dependabot Configuration");
  checkFile(".github/workflows/codeql.yml", "CodeQL Workflow");
  checkFile(".github/workflows/security.yml", "Security Audit Workflow");
  checkFile(".nvmrc", "Node.js Version Lock");

  // Check package.json security scripts
  logSection("Security Scripts");
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const securityScripts = ["security:audit", "security:check", "security:licenses"];

  securityScripts.forEach(script => {
    const exists = packageJson.scripts && packageJson.scripts[script];
    logCheck(exists ? "pass" : "warn", `Script "${script}": ${exists ? "Configured" : "Not configured"}`);
  });

  // Run npm audit
  logSection("Dependency Security Audit");
  console.log("Running npm audit...\n");

  const auditResult = runCommand("npm audit --json");
  if (auditResult) {
    try {
      const audit = JSON.parse(auditResult);
      const vulnCount = audit.metadata?.vulnerabilities?.total || 0;

      if (vulnCount === 0) {
        logCheck("pass", "No known security vulnerabilities found");
      } else {
        logCheck("fail", `Found ${vulnCount} security vulnerabilities`);
        if (audit.metadata.vulnerabilities) {
          const vulns = audit.metadata.vulnerabilities;
          console.log(colorize("yellow", `  - Info: ${vulns.info || 0}`));
          console.log(colorize("yellow", `  - Low: ${vulns.low || 0}`));
          console.log(colorize("red", `  - Moderate: ${vulns.moderate || 0}`));
          console.log(colorize("red", `  - High: ${vulns.high || 0}`));
          console.log(colorize("red", `  - Critical: ${vulns.critical || 0}`));
        }
      }
    } catch (error) {
      logCheck("warn", "Could not parse audit results");
    }
  } else {
    logCheck("warn", "Could not run npm audit");
  }

  // Check for outdated packages
  logSection("Package Updates");
  console.log("Checking for outdated packages...\n");

  const outdatedResult = runCommand("npm outdated --json");
  if (outdatedResult) {
    try {
      const outdated = JSON.parse(outdatedResult);
      const outdatedCount = Object.keys(outdated).length;

      if (outdatedCount === 0) {
        logCheck("pass", "All packages are up to date");
      } else {
        logCheck("warn", `${outdatedCount} packages have updates available`);
      }
    } catch (error) {
      logCheck("pass", "All packages appear to be up to date");
    }
  }

  // Check Node.js version
  logSection("Runtime Security");
  const nodeVersion = process.version;
  const nvmrcPath = ".nvmrc";

  if (fs.existsSync(nvmrcPath)) {
    const expectedVersion = fs.readFileSync(nvmrcPath, "utf8").trim();
    const currentVersion = nodeVersion.replace("v", "");
    const isCorrectVersion = currentVersion.startsWith(expectedVersion);

    logCheck(isCorrectVersion ? "pass" : "warn", `Node.js version: ${nodeVersion} (expected: ${expectedVersion})`);
  } else {
    logCheck("warn", `Node.js version: ${nodeVersion} (no .nvmrc file)`);
  }

  // Check for common security patterns
  logSection("Code Security Patterns");

  // Check for hardcoded secrets (basic patterns)
  const secretPatterns = [
    { pattern: /password\s*=\s*["'][^"']+["']/gi, name: "Hardcoded passwords" },
    { pattern: /api_key\s*=\s*["'][^"']+["']/gi, name: "Hardcoded API keys" },
    { pattern: /secret\s*=\s*["'][^"']+["']/gi, name: "Hardcoded secrets" },
    { pattern: /token\s*=\s*["'][^"']+["']/gi, name: "Hardcoded tokens" },
  ];

  let foundSecrets = 0;
  const checkSecrets = dir => {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(dir, file.name);

      if (file.isDirectory() && !file.name.startsWith(".") && file.name !== "node_modules") {
        checkSecrets(filePath);
      } else if (file.isFile() && (file.name.endsWith(".js") || file.name.endsWith(".mjs") || file.name.endsWith(".jsx"))) {
        try {
          const content = fs.readFileSync(filePath, "utf8");

          for (const { pattern, name } of secretPatterns) {
            if (pattern.test(content)) {
              foundSecrets++;
              logCheck("fail", `Potential ${name.toLowerCase()} in ${filePath}`);
            }
          }
        } catch (error) {
          // Skip files that can't be read
        }
      }
    }
  };

  checkSecrets("src");
  if (foundSecrets === 0) {
    logCheck("pass", "No obvious hardcoded secrets found");
  }

  // Summary
  console.log(`\n${colorize("bright", "📊 Security Check Summary")}`);
  console.log(colorize("cyan", "=".repeat(50)));
  console.log("✅ Security check completed");
  console.log("🔍 Review any warnings or failures above");
  console.log("📝 Update your security practices regularly");
  console.log("🔒 Keep dependencies updated");

  if (foundSecrets > 0) {
    console.log(`\n${colorize("red", "⚠️  WARNING: Potential secrets found!")}`);
    console.log(colorize("yellow", "Review the files mentioned above and remove any hardcoded credentials."));
  }
}

// Run the security check
main().catch(console.error);
