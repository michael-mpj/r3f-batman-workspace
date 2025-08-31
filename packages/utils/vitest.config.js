/**
 * R3F Workspace Monorepo - Utils Package
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
        environment: "node",
        globals: true,
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: ["node_modules/", "src/test/", "**/*.d.ts", "**/*.config.*", "**/dist/"],
        },
        include: ["src/**/*.{test,spec}.{js,ts}"],
    },
});
