/**
 * R3F Workspace Monorepo - Configuration
 * File: commitlint.config.js
 * Description: Configuration settings for commitlint.config
 * Author: R3F Workspace Team
 * Created: 2025-09-09
 * Last Modified: 2025-09-09
 * Version: 1.0.0
 */

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test", "wip"]],
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
  },
};
