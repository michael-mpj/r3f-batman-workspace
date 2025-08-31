/**
 * R3F Workspace Monorepo - Configuration
 * File: eslint.config.js
 * Description: ESLint configuration for workspace code quality standards
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  js.configs.recommended,
  prettierConfig,
  {
    rules: {
      "consistent-return": 2,
      "indent": [1, 4],
      "no-else-return": 1,
      "semi": [1, "always"],
      "space-unary-ops": 2,
    },
  },
]);
// https://eslint.org/docs/latest/use/configure/configuration-files#using-eslintconfigjs
