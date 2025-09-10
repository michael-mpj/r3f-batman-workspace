/**
 * R3F Workspace Monorepo - Configuration
 * File: vitest.config.js
 * Description: Maximum Vitest configuration with advanced features
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-09-09
 * Version: 1.2.0
 */

import { defineConfig } from "vitest/config";
import { resolve } from "path";
import { cpus } from "os";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/test/setup.js"],

        // Test file patterns - maximum coverage
        include: [
            "packages/**/*.{test,spec}.{js,jsx,ts,tsx}",
            "projects/**/*.{test,spec}.{js,jsx,ts,tsx}",
            "apps/**/*.{test,spec}.{js,jsx,ts,tsx}",
            "src/**/*.{test,spec}.{js,jsx,ts,tsx}",
            "scripts/**/*.{test,spec}.{js,mjs}",
            "docs/**/*.{test,spec}.{js,jsx,ts,tsx}",
        ],

        exclude: [
            "node_modules/",
            "dist/",
            ".turbo/",
            "coverage/",
            "**/build/**",
            "**/public/**",
            "**/.next/**",
            "**/.vercel/**",
            "**/storybook-static/**",
        ],

        // Enhanced coverage configuration
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html", "lcov", "json-summary", "text-summary"],
            reportsDirectory: "./coverage",
            all: true,
            include: ["src/**/*.{js,jsx,ts,tsx}", "packages/**/*.{js,jsx,ts,tsx}", "projects/**/*.{js,jsx,ts,tsx}", "apps/**/*.{js,jsx,ts,tsx}"],
            exclude: [
                "node_modules/",
                "src/test/",
                "**/*.d.ts",
                "**/*.config.*",
                "**/dist/",
                "**/.turbo/",
                "**/coverage/",
                "**/*.stories.{js,jsx,ts,tsx}",
                "**/*.test.{js,jsx,ts,tsx}",
                "**/*.spec.{js,jsx,ts,tsx}",
                "**/vite.config.*",
                "**/vitest.config.*",
            ],
            thresholds: {
                "global": {
                    branches: 80,
                    functions: 80,
                    lines: 80,
                    statements: 80,
                },
                // Per-file thresholds
                "src/components/": {
                    branches: 90,
                    functions: 90,
                    lines: 90,
                    statements: 90,
                },
            },
            watermarks: {
                statements: [80, 95],
                functions: [80, 95],
                branches: [80, 95],
                lines: [80, 95],
            },
        },

        // Performance optimization
        pool: "threads",
        poolOptions: {
            threads: {
                singleThread: false,
                minThreads: 1,
                maxThreads: Math.max(1, Math.floor(cpus().length / 2)),
                useAtomics: true,
                isolate: true,
            },
        },

        // Browser testing configuration - maximum features
        browser: {
            enabled: false, // Toggle to true for browser tests
            name: "chromium",
            provider: "playwright",
            headless: true,
            screenshotOnFailure: true,
            screenshotDirectory: "./test-results/screenshots",
            viewport: {
                width: 1280,
                height: 720,
            },
            // Multiple browser support
            instances: [
                {
                    browser: "chromium",
                },
                {
                    browser: "firefox",
                },
                {
                    browser: "webkit",
                },
            ],
            // Browser-specific options
            chromium: {
                launch: {
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                },
            },
        },

        // Timeouts and performance
        testTimeout: 10000,
        hookTimeout: 10000,
        teardownTimeout: 10000,
        slowTestThreshold: 5000,

        // Watch mode configuration
        watch: true,
        watchExclude: ["**/node_modules/**", "**/dist/**", "**/.turbo/**", "**/coverage/**"],

        // Reporter configuration
        reporters: ["verbose", "junit", "json", "html"],
        outputFile: {
            junit: "./test-results/junit.xml",
            json: "./test-results/results.json",
            html: "./test-results/index.html",
        },

        // Mock configuration
        mockReset: true,
        clearMocks: true,
        restoreMocks: true,

        // Snapshot configuration
        resolveSnapshotPath: (testPath, snapExtension) => {
            return testPath.replace(/\.test\.([jt]sx?)/, `.test.${snapExtension}.$1`);
        },

        // Environment variables
        env: {
            NODE_ENV: "test",
            VITEST: "true",
        },

        // Retry configuration
        retry: 2,

        // Parallel execution
        maxConcurrency: 5,
        minWorkers: 1,
        maxWorkers: Math.max(1, Math.floor(cpus().length / 2)),

        // File watching
        watchIgnore: ["**/node_modules/**", "**/dist/**", "**/.turbo/**"],
    },

    // Enhanced resolve configuration
    resolve: {
        alias: {
            "@": resolve(process.cwd(), "./src"),
            "@packages": resolve(process.cwd(), "./packages"),
            "@projects": resolve(process.cwd(), "./projects"),
            "@apps": resolve(process.cwd(), "./apps"),
            "@components": resolve(process.cwd(), "./src/components"),
            "@utils": resolve(process.cwd(), "./src/utils"),
            "@hooks": resolve(process.cwd(), "./src/hooks"),
            "@styles": resolve(process.cwd(), "./src/styles"),
            "@test": resolve(process.cwd(), "./src/test"),
        },
        extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    },

    // ESBuild configuration
    esbuild: {
        target: "node16",
        sourcemap: true,
        minify: false,
    },

    // Define configuration for environment variables
    define: {
        "__TEST__": true,
        "__DEV__": true,
        "process.env.NODE_ENV": '"test"',
    },

    // CSS handling
    css: {
        modules: {
            classNameStrategy: "stable",
        },
    },

    // Plugin configuration for enhanced testing
    plugins: [],
});
