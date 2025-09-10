#!/bin/bash

# Script to update all project packages to the latest version

echo "Starting package update..."

if [ -f package-lock.json ]; then
    echo "Detected npm package manager."
    echo "Updating packages using npm..."
    npm install -g npm-check-updates
    ncu -u
    npm install
    echo "All packages have been updated using npm."
elif [ -f yarn.lock ]; then
    echo "Detected Yarn package manager."
    echo "Updating packages using Yarn..."
    yarn upgrade --latest
    echo "All packages have been updated using Yarn."
else
    echo "No package manager lockfile found. Please ensure you are in a valid Node.js project."
    exit 1
fi

echo "Package update completed!"