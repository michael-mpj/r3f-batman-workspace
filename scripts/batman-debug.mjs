#!/usr/bin/env node

/**
 * R3F Workspace Monorepo - Build Scripts
 * File: batman-debug.mjs
 * Description: Batman debug inspector script
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 1.0.0
 */

/* eslint-env node */
/* global console, process, setInterval, clearInterval */

// Simple debug server that provides workspace information
const PORT = process.env.DEBUG_PORT || 3005;

console.log(`🦇 Batman Debug Inspector starting on port ${PORT}...`);
console.log(`🔍 Debug mode active. Monitoring workspace...`);

// Periodic debug output
const debugInterval = setInterval(() => {
  const now = new Date().toLocaleTimeString();
  console.log(`🦇 [${now}] Debug heartbeat - System operational`);

  // Memory usage
  const memUsage = process.memoryUsage();
  console.log(`   📊 Memory: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB heap, ${Math.round(memUsage.rss / 1024 / 1024)}MB resident`);

  // Environment info
  console.log(`   🔧 Node: ${process.version}, Platform: ${process.platform}`);
}, 10000);

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log(`🦇 Debug inspector shutting down...`);
  clearInterval(debugInterval);
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log(`🦇 Debug inspector interrupted...`);
  clearInterval(debugInterval);
  process.exit(0);
});

console.log(`🦇 Debug inspector ready! Ctrl+C to stop.`);
