/**
 * Cyber Forge - Vite Configuration
 * File: vite.config.js
 * Description: Advanced cyberpunk development environment build configuration
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 1.0.0
 */

// @ts-nocheck

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@scenes": "/src/scenes",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@store": "/src/store",
      "@assets": "/src/assets",
      "@styles": "/src/styles",
    },
  },
  server: {
    port: 3003,
    open: true,
    host: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) {
            return "three";
          }

          if (id.includes("@react-three/fiber") || id.includes("@react-three/drei")) {
            return "r3f";
          }

          if (id.includes("@react-three/postprocessing")) {
            return "postprocessing";
          }

          return undefined;
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing", "leva", "zustand"],
  },
});
