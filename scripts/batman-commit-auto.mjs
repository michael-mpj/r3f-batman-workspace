#!/usr/bin/env node

/**
 * 🦇 Batman Commit Message Formatter
 * Automatically formats commit messages to comply with conventional commits
 */

/* eslint-disable */

import { readFileSync, writeFileSync } from "fs";

const TYPE_KEYWORDS = {
  feat: ["add", "create", "new", "feature", "implement", "introduce"],
  fix: ["fix", "resolve", "correct", "repair", "patch", "solve"],
  docs: ["doc", "readme", "documentation", "comment", "guide"],
  style: ["format", "lint", "prettier", "style", "whitespace"],
  refactor: ["refactor", "restructure", "reorganize", "cleanup"],
  test: ["test", "spec", "testing", "jest", "vitest"],
  chore: ["update", "upgrade", "maintain", "dependency", "deps", "config"],
  build: ["build", "webpack", "vite", "rollup", "babel", "compile"],
  ci: ["ci", "workflow", "github", "action", "pipeline", "deploy"],
  perf: ["perf", "performance", "optimize", "speed", "faster"],
};

function detectCommitType(message) {
  const lowerMessage = message.toLowerCase();
  for (const [type, keywords] of Object.entries(TYPE_KEYWORDS)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return type;
    }
  }
  return "chore";
}

function formatCommitMessage(originalMessage) {
  const lines = originalMessage.trim().split("\n");
  let subject = lines[0].trim();
  let body = lines.slice(1).join("\n").trim();

  const conventionalRegex = /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|wip)(\(.+\))?:\s*.+/;
  if (conventionalRegex.test(subject)) {
    return originalMessage;
  }

  const detectedType = detectCommitType(subject);

  subject = subject
    .replace(/^(fix|add|update|create|remove|feat|feature):\s*/i, "")
    .replace(/^\w+/, match => match.toLowerCase())
    .replace(/\.$/, "");

  if (!/^[A-Z][a-z]+(?: [A-Z][a-z]+)*/.test(subject)) {
    subject = subject.charAt(0).toLowerCase() + subject.slice(1);
  }

  let formattedMessage = `${detectedType}: ${subject}`;

  if (body) {
    formattedMessage += "\n\n" + body;
  }

  return formattedMessage;
}

function main() {
  try {
    const commitMsgFile = process.argv[2];
    if (!commitMsgFile) {
      console.error("❌ No commit message file provided");
      process.exit(1);
    }

    const originalMessage = readFileSync(commitMsgFile, "utf8");
    const formattedMessage = formatCommitMessage(originalMessage);
    writeFileSync(commitMsgFile, formattedMessage);

    if (originalMessage !== formattedMessage) {
      console.log("🦇 Batman auto-formatted commit message:");
      console.log("📝 Original:", originalMessage.split("\n")[0]);
      console.log("✨ Formatted:", formattedMessage.split("\n")[0]);
    }
  } catch (error) {
    console.error("❌ Batman commit formatter error:", error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { formatCommitMessage, detectCommitType };
