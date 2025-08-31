/**
 * R3F Workspace Monorepo - Configuration
 * File: vitest.config.js
 * Description: Unit tests for vitest.config
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    include: [
      "packages/**/*.{test,spec}.{js,jsx,ts,tsx}",
      "projects/**/*.{test,spec}.{js,jsx,ts,tsx}",
      "src/**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      exclude: ["node_modules/", "src/test/", "**/*.d.ts", "**/*.config.*", "**/dist/", "**/.turbo/", "**/coverage/"],
    },
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: false,
        minThreads: 1,
        maxThreads: 4,
      },
    },
  },
});
