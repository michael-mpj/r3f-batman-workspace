/**
 * R3F Workspace Monorepo - Utils Package
 * File: eslint.config.js
 * Description: ESLint configuration for utils package
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
        files: ["**/*.{js,mjs}"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                performance: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": "warn",
            "no-console": "warn",
        },
    },
    {
        files: ["**/*.test.{js,mjs}", "**/test/**/*.{js,mjs}"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
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
                jest: "readonly",
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": "warn",
            "no-console": "off", // Allow console in tests
            "no-undef": "off", // Jest globals are handled above
        },
    },
];
