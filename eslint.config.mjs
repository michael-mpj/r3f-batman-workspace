/**
 * R3F Workspace Monorepo - Configuration
 * File: eslint.config.mjs
 * Description: ESLint configuration for workspace code quality standards
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

export default [
  {
    ignores: ["**/coverage", "**/dist", "**/linter", "**/node_modules", "**/*.md", "docs/.vitepress/cache/**", "docs/.vitepress/dist/**", "**/.vitepress/cache/**", "**/cache/**"],
  },
  {
    files: ["**/*.{js,jsx,mjs}"],
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
        window: "readonly",
        document: "readonly",
        global: "readonly",
        Buffer: "readonly",
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn", 
      "consistent-return": "off",
      "no-undef": "warn",
      "no-constant-condition": "warn",
      "no-prototype-builtins": "warn",
    },
  },
];
