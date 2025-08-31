/**
 * R3F Workspace Monorepo - UI Package
 * File: eslint.config.js
 * Description: ESLint configuration for UI package
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import js from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: ["dist", "node_modules"],
    },
    {
        files: ["**/*.{js,jsx,mjs}"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                React: "readonly",
                JSX: "readonly",
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": "off", // Turn off for React imports
            "no-console": "warn",
        },
    },
    {
        files: ["**/*.test.{js,jsx}", "**/test/**/*.{js,jsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                test: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
                beforeAll: "readonly",
                afterAll: "readonly",
                window: "readonly",
                document: "readonly",
                global: "readonly",
            },
        },
    },
];
