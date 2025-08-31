#!/usr/bin/env node

/**
 * 🦇 Batman R3F Components Fixer
 * Automated script to fix ESLint violations in R3F components
 */

/* global console */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

const R3F_COMPONENTS_DIR = "/Users/michaeljoseph/Public/R3fWWW/packages/r3f-components/src";

function fixIndentation(content) {
    // Convert all 2-space indentation to 4-space
    const lines = content.split("\n");
    const fixedLines = lines.map(line => {
        if (line.startsWith("  ") && !line.startsWith("    ")) {
            // Count leading spaces
            const leadingSpaces = line.match(/^ */)[0].length;
            if (leadingSpaces % 2 === 0) {
                // Double the spaces for 2-space to 4-space conversion
                const newSpaces = " ".repeat(leadingSpaces * 2);
                return newSpaces + line.trim();
            }
        }
        return line;
    });
    return fixedLines.join("\n");
}

function fixQuotes(content) {
    // Convert double quotes to single quotes (excluding JSX attributes)
    return (
        content
        // Fix import statements
            .replace(/from\s+"([^"]+)"/g, "from '$1'")
        // Fix simple string literals (not in JSX)
            .replace(/(?<![\w=])"([^"]*)"(?!\s*[>:])/g, "'$1'")
        // Fix object property strings
            .replace(/:\s*"([^"]*)"(?=\s*[,}])/g, ": '$1'")
    );
}

function fixSpacing(content) {
    // Fix object-curly-spacing
    return content
        .replace(/\{\s*([^}])/g, "{ $1") // Add space after {
        .replace(/([^{])\s*\}/g, "$1 }"); // Add space before }
}

function processFile(filePath) {
    console.log(`🦇 Fixing: ${filePath}`);

    try {
        let content = readFileSync(filePath, "utf8");

        // Apply fixes
        content = fixIndentation(content);
        content = fixQuotes(content);
        content = fixSpacing(content);

        writeFileSync(filePath, content, "utf8");
        console.log(`✅ Fixed: ${filePath}`);
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
    }
}

function processDirectory(dir) {
    const items = readdirSync(dir);

    for (const item of items) {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if ([".js", ".jsx", ".ts", ".tsx"].includes(extname(item))) {
            processFile(fullPath);
        }
    }
}

console.log("🦇 Batman R3F Components Fixer Starting...");
processDirectory(R3F_COMPONENTS_DIR);
console.log("🦇 Batman R3F Components Fixer Complete!");
