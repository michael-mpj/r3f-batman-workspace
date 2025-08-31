/**
 * R3F Workspace - R3F Components Package
 * File: vite.config.js
 * Description: Vite configuration for r3f-components package
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Version: 1.0.0
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.js"),
            name: "R3fComponents",
            fileName: format => `r3f-components.${format}.js`,
        },
        rollupOptions: {
            external: ["react", "react-dom", "@react-three/fiber", "@react-three/drei", "three"],
            output: {
                globals: {
                    "react": "React",
                    "react-dom": "ReactDOM",
                    "@react-three/fiber": "ReactThreeFiber",
                    "@react-three/drei": "ReactThreeDrei",
                    "three": "THREE",
                },
            },
        },
    },
    resolve: {
        alias: {
            "@utils": resolve(__dirname, "../utils/src"),
        },
    },
    server: {
        port: 3004,
    },
});
