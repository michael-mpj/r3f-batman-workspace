/**
 * R3F Workspace Monorepo - Utils Package
 * File: vite.config.js
 * Description: Configuration settings for vite.config
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "R3fWorkspaceUtils",
            fileName: format => `r3f-workspace-utils.${format}.js`,
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: ["three"],
            output: {
                globals: {
                    three: "THREE",
                },
            },
        },
        sourcemap: true,
        minify: false,
    },
    test: {
        environment: "jsdom",
    },
});
