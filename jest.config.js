/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
    // Use projects for different test types
    projects: [
    // UI Tests (React components)
        {
            displayName: "UI Components",
            testMatch: ["<rootDir>/packages/ui/**/*.test.{js,jsx}"],
            testEnvironment: "jsdom",
            setupFilesAfterEnv: ["<rootDir>/src/test/setup.js"],
            extensionsToTreatAsEsm: [".jsx"],
            transform: {
                "^.+\\.(js|jsx)$": [
                    "babel-jest",
                    {
                        presets: [
                            ["@babel/preset-env", { targets: { node: "current" } }],
                            ["@babel/preset-react", { runtime: "automatic" }],
                        ],
                    },
                ],
            },
        },
        // Utils Tests (Math/Logic functions)
        {
            displayName: "Utils/Math",
            testMatch: ["<rootDir>/packages/utils/**/*.test.{js,mjs}"],
            testEnvironment: "node",
            transform: {
                "^.+\\.(js|mjs)$": [
                    "babel-jest",
                    {
                        presets: [["@babel/preset-env", { targets: { node: "current" } }]],
                    },
                ],
            },
        },
    ],

    // Global settings
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",

    // Module file extensions
    moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "mts", "cts", "tsx", "json", "node"],

    // Module name mapping for better imports
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@packages/(.*)$": "<rootDir>/packages/$1",
        "^@projects/(.*)$": "<rootDir>/projects/$1",
    },
};

export default config;
