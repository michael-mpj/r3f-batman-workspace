/**
 * R3F Workspace Monorepo - Configuration
 * File: vite.config.js
 * Description: Vite build configuration for development and production
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3001,
        open: true,
        host: true,
    },
    resolve: {
        alias: {
            "@": "/src",
            "@ui": "/packages/ui/src",
            "@utils": "/packages/utils/src",
        },
    },
    optimizeDeps: {
        include: ["react", "react-dom", "three", "@react-three/fiber", "@react-three/drei"],
    },
});
