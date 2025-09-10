/**
 * R3F Workspace Monorepo - ESLint Configuration
 * File: eslint.config.mjs
 * Description: Comprehensive ESLint configuration for all workspace environments
 * Author: R3F Workspace Team
 * Created: 2025-09-09
 * Last Modified: 2025-09-09
 * Version: 1.2.0
 */

import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // Node.js scripts configuration
  {
    files: ["scripts/**/*.{js,mjs}", "*.config.{js,mjs}", "vitest.config.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        console: "readonly",
        process: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        global: "readonly",
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-console": "off",
      "no-process-exit": "off",
    },
  },

  // React/JSX configuration
  {
    files: ["**/*.{jsx,tsx}", "src/**/*.{js,jsx}", "projects/**/*.{js,jsx}", "apps/**/*.{js,jsx}", "packages/**/*.{js,jsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2022,
        React: "readonly",
        JSX: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // Test files configuration
  {
    files: ["**/*.{test,spec}.{js,jsx,ts,tsx}", "**/test/**/*.{js,jsx}", "**/tests/**/*.{js,jsx}", "src/test/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        // Vitest globals
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        vi: "readonly",
        vitest: "readonly",
        // Browser globals for tests
        window: "readonly",
        document: "readonly",
        global: "readonly",
        performance: "readonly",
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // Browser environment files
  {
    files: ["src/**/*.js", "projects/**/src/**/*.js", "apps/**/src/**/*.js", "packages/**/src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2022,
        performance: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // Hook files (browser + React)
  {
    files: ["**/hooks/**/*.js", "**/ui/hooks/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        document: "readonly",
        window: "readonly",
      },
    },
  },

  // Performance utility files
  {
    files: ["**/utils/performance.js", "**/performance/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        performance: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
  },

  // Global ignores
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      ".turbo/**",
      "**/.next/**",
      "**/.vercel/**",
      "**/storybook-static/**",
    ],
  },
];
