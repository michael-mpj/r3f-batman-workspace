#!/bin/bash
# GitHub Branch Protection Setup Script
# This script sets up branch protection rules for the R3F Batman Workspace

set -e

echo "🦇 R3F Batman Workspace - Branch Protection Setup"
echo "=================================================="

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Please install it from: https://cli.github.com/"
    echo ""
    echo "Alternative: Set up branch protection manually at:"
    echo "https://github.com/michael-mpj/r3f-batman-workspace/settings/rules"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI"
    echo "Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"
echo ""

# Repository details
REPO="michael-mpj/r3f-batman-workspace"
BRANCH="main"

echo "🔧 Setting up branch protection for: $REPO"
echo "📝 Branch: $BRANCH"
echo ""

# Create branch protection rule
echo "⚙️ Creating branch protection ruleset..."

# Use GitHub CLI to create the ruleset
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "/repos/$REPO/rulesets" \
  --input .github/branch-protection-ruleset.json

if [ $? -eq 0 ]; then
    echo "✅ Branch protection ruleset created successfully!"
    echo ""
    echo "🦇 Your main branch is now protected with:"
    echo "   • Pull request reviews required (1 minimum)"
    echo "   • Status checks required (lint, test, build)"
    echo "   • Linear history enforced"
    echo "   • Force pushes disabled"
    echo "   • Branch deletion disabled"
    echo ""
    echo "🌐 View settings at:"
    echo "   https://github.com/$REPO/settings/rules"
else
    echo "❌ Failed to create branch protection ruleset"
    echo ""
    echo "Manual setup instructions:"
    echo "1. Go to: https://github.com/$REPO/settings/rules"
    echo "2. Click 'New ruleset'"
    echo "3. Use the configuration from .github/branch-protection-ruleset.json"
    exit 1
fi
