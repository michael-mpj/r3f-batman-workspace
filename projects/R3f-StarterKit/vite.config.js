/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: vite.config.js
 * Description: Configuration settings for vite.config
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@components': fileURLToPath(
                new URL('./src/components', import.meta.url)
            ),
            '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@models': fileURLToPath(new URL('./src/models', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        },
    },
    server: {
        port: 3002,
        open: true,
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
    },
});
