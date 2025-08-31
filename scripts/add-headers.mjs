#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: add-headers.mjs
 * Description: Automated script to add standard header comments to source files
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const currentDate = new Date().toISOString().split("T")[0];

// Configuration options
const config = {
  forceUpdate: false, // Set to true to overwrite existing headers
  author: "R3F Workspace Team", // Change this to update author name globally

  // Supported file extensions
  supportedExtensions: [".js", ".jsx", ".ts", ".tsx", ".mjs", ".css", ".scss"],

  // Directories and files to exclude
  excludePatterns: [
    "node_modules",
    "dist",
    "build",
    ".next",
    "coverage",
    ".min.js",
    ".bundle.js",
    ".d.ts", // TypeScript declaration files
    "package-lock.json",
    "package.json", // Skip package.json files
  ],
}; // Header templates for different file types
const templates = {
  js: (project, filename, description) => `/**
 * R3F Workspace Monorepo - ${project}
 * File: ${filename}
 * Description: ${description}
 * Author: ${config.author}
 * Created: ${currentDate}
 * Last Modified: ${currentDate}
 * Version: 1.0.0
 */

`,
  css: (project, filename, description) => `/**
 * R3F Workspace Monorepo - ${project}
 * File: ${filename}
 * Description: ${description}
 * Author: ${config.author}
 * Created: ${currentDate}
 * Last Modified: ${currentDate}
 * Version: 1.0.0
 */

`,
  md: (project, filename, description) => `<!--
R3F Workspace Monorepo - ${project}
File: ${filename}
Description: ${description}
Author: ${config.author}
Created: ${currentDate}
Last Modified: ${currentDate}
Version: 1.0.0
-->

`,
};

// File type mapping
const getFileType = filename => {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".js":
    case ".jsx":
    case ".mjs":
    case ".ts":
    case ".tsx":
      return "js";
    case ".css":
    case ".scss":
      return "css";
    case ".md":
      return "md";
    default:
      return null;
  }
};

// Project/package detection
const getProject = filepath => {
  if (filepath.includes("packages/ui")) return "UI Package";
  if (filepath.includes("packages/utils")) return "Utils Package";
  if (filepath.includes("projects/R3f-StarterKit")) return "StarterKit Project";
  if (filepath.includes("scripts/")) return "Build Scripts";
  if (filepath.includes(".github/")) return "GitHub Configuration";
  return "Configuration";
};

// Check if file already has header
const hasHeader = content => {
  if (config.forceUpdate) {
    return false; // Always process files when force update is enabled
  }

  return content.trim().startsWith("/**") || content.trim().startsWith("<!--") || content.trim().startsWith("#!/usr/bin/env node\n\n/**");
};

// Remove existing header from content
const removeExistingHeader = content => {
  const lines = content.split("\n");
  let startIndex = 0;
  let inHeader = false;

  // Handle shebang
  if (lines[0] && lines[0].startsWith("#!/usr/bin/env node")) {
    startIndex = 1;
    // Skip empty line after shebang if exists
    if (lines[1] === "") startIndex = 2;
  }

  // Find and remove existing header
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("/**") || line.startsWith("<!--")) {
      inHeader = true;
      continue;
    }

    if (inHeader && (line.endsWith("*/") || line.endsWith("-->"))) {
      // Skip the closing line and any empty lines after
      let nextIndex = i + 1;
      while (nextIndex < lines.length && lines[nextIndex].trim() === "") {
        nextIndex++;
      }

      // Return content without the header
      const beforeHeader = lines.slice(0, startIndex);
      const afterHeader = lines.slice(nextIndex);
      return [...beforeHeader, ...afterHeader].join("\n");
    }

    if (!inHeader) {
      // No header found, return original content
      return content;
    }
  }

  return content;
};

// Generate description based on filename and path
const generateDescription = (filepath, filename) => {
  const basename = path.basename(filename, path.extname(filename));

  if (filename.includes("test")) return `Unit tests for ${basename}`;
  if (filename.includes("config")) return `Configuration settings for ${basename}`;
  if (filename === "index.js" || filename === "index.jsx") return "Main entry point and exports";
  if (filename.includes("App.jsx")) return "Main application component";
  if (filename.includes("main.jsx")) return "Application entry point";

  // Generate based on component names
  return `${basename} component/utility`;
};

// Discover files based on patterns
const discoverFiles = (dir = ".", files = []) => {
  const items = fs.readdirSync(path.join(__dirname, "..", dir));

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const absolutePath = path.join(__dirname, "..", fullPath);
    const stat = fs.statSync(absolutePath);

    // Skip excluded directories
    if (stat.isDirectory()) {
      if (config.excludePatterns.some(pattern => item === pattern.replace("/**", "") || fullPath.includes(pattern.replace("/**", "")))) {
        continue;
      }
      // Recursively search directories
      discoverFiles(fullPath, files);
    } else {
      // Check if file matches include patterns
      const ext = path.extname(item).toLowerCase();
      const shouldInclude =
        config.supportedExtensions.includes(ext) &&
        !config.excludePatterns.some(pattern => fullPath.includes(pattern.replace("/**", "")) || item.includes(pattern));

      if (shouldInclude) {
        files.push(fullPath);
      }
    }
  }

  return files.sort();
}; // Add header to file
const addHeaderToFile = filepath => {
  try {
    const content = fs.readFileSync(filepath, "utf8");

    const alreadyHasHeader =
      content.trim().startsWith("/**") || content.trim().startsWith("<!--") || content.trim().startsWith("#!/usr/bin/env node\n\n/**");

    if (alreadyHasHeader && !config.forceUpdate) {
      console.log(`⏭️  Skipping ${filepath} - already has header (use forceUpdate to overwrite)`);
      return false;
    }

    const filename = path.basename(filepath);
    const fileType = getFileType(filename);

    if (!fileType || !templates[fileType]) {
      console.log(`❌ Unsupported file type: ${filepath}`);
      return false;
    }

    const project = getProject(filepath);
    const description = generateDescription(filepath, filename);
    const header = templates[fileType](project, filename, description);

    let cleanContent = content;

    // Remove existing header if force update is enabled
    if (config.forceUpdate && alreadyHasHeader) {
      cleanContent = removeExistingHeader(content);
      console.log(`🔄 Updating existing header in ${filepath}`);
    }

    let newContent;
    if (cleanContent.startsWith("#!/usr/bin/env node")) {
      // Handle shebang files
      const lines = cleanContent.split("\n");
      const shebang = lines[0];
      const restContent = lines.slice(1).join("\n");
      newContent = `${shebang}\n\n${header}${restContent.trimStart()}`;
    } else {
      newContent = header + cleanContent;
    }

    fs.writeFileSync(filepath, newContent, "utf8");

    if (alreadyHasHeader && config.forceUpdate) {
      console.log(`✅ Updated header in ${filepath}`);
      return "updated";
    } else {
      console.log(`✅ Added header to ${filepath}`);
      return "added";
    }
  } catch (error) {
    console.error(`❌ Error processing ${filepath}:`, error.message);
    return false;
  }
};

// Main execution
const main = () => {
  console.log("🔍 Discovering files by extension...");

  const targetFiles = discoverFiles();

  console.log(`📁 Found ${targetFiles.length} files to process`);
  console.log("🚀 Starting header addition process...");
  console.log(`📋 Configuration:`);
  console.log(`   Force update: ${config.forceUpdate ? "✅ Enabled (will overwrite existing headers)" : "❌ Disabled"}`);
  console.log(`   Author: ${config.author}`);
  console.log(`   Date: ${currentDate}`);
  console.log(`   Supported extensions: ${config.supportedExtensions.join(", ")}`);
  console.log(`   Excluded patterns: ${config.excludePatterns.join(", ")}\n`);

  let processed = 0;
  let added = 0;
  let updated = 0;

  for (const relativePath of targetFiles) {
    const fullPath = path.join(__dirname, "..", relativePath);

    if (fs.existsSync(fullPath)) {
      processed++;
      const result = addHeaderToFile(fullPath);
      if (result) {
        if (result === "updated") {
          updated++;
        } else {
          added++;
        }
      }
    } else {
      console.log(`⚠️  File not found: ${fullPath}`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Files discovered: ${targetFiles.length}`);
  console.log(`   Files processed: ${processed}`);
  console.log(`   Headers added: ${added}`);
  console.log(`   Headers updated: ${updated}`);
  console.log(`   Already had headers (skipped): ${processed - added - updated}`);
  console.log(`\n✨ Header ${config.forceUpdate ? "update" : "addition"} complete!`);
};

// Run the script
main();
