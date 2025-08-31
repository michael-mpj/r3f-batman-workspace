/**
 * R3F Workspace - R3F Components Package
 * File: eslint.config.js
 * Description: ESLint configuration for r3f-components package
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Version: 1.0.0
 */

import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx}"],
        plugins: {
            "react": reactPlugin,
            "react-hooks": reactHooksPlugin,
        },
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                console: "readonly",
                process: "readonly",
                Buffer: "readonly",
                global: "readonly",
                __dirname: "readonly",
                __filename: "readonly",
                module: "readonly",
                require: "readonly",
                exports: "readonly",
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            // Code style
            "indent": ["error", 4],
            "quotes": ["error", "single"],
            "semi": ["error", "always"],
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "no-console": "warn",

            // React rules
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            // Best practices
            "eqeqeq": ["error", "always"],
            "curly": ["error", "all"],
            "no-var": "error",
            "prefer-const": "error",
            "arrow-spacing": "error",
            "object-curly-spacing": ["error", "always"],
            "array-bracket-spacing": ["error", "never"],
        },
    },
];
