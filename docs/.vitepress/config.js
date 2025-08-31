/**
 * R3F Workspace Monorepo - Configuration
 * File: config.js
 * Description: Configuration settings for config
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { defineConfig } from "vitepress";

export default defineConfig({
  title: "🦇 Batman R3F Workspace",
  description: "Batman-powered React Three Fiber monorepo with advanced automation and terminal management",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Packages", link: "/packages/" },
      { text: "Scripts", link: "/scripts/" },
      { text: "Projects", link: "/projects/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Package Compatibility", link: "/guide/package-compatibility" },
            { text: "Development Workflow", link: "/guide/development-workflow" },
            { text: "Deployment", link: "/guide/deployment" },
          ],
        },
      ],
      "/packages/": [
        {
          text: "Packages",
          items: [
            { text: "Overview", link: "/packages/" },
            { text: "UI Components", link: "/packages/ui" },
            { text: "Utilities", link: "/packages/utils" },
          ],
        },
      ],
      "/scripts/": [
        {
          text: "Scripts",
          items: [
            { text: "Overview", link: "/scripts/" },
            { text: "Compatibility Check", link: "/scripts/compatibility" },
            { text: "Build Scripts", link: "/scripts/build" },
            { text: "Development Scripts", link: "/scripts/dev" },
          ],
        },
      ],
      "/projects/": [
        {
          text: "Projects",
          items: [
            { text: "Overview", link: "/projects/" },
            { text: "R3F StarterKit", link: "/projects/r3f-starterkit" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/michael-mpj/r3f-batman-workspace" }],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025 Batman R3F Workspace",
    },
  },

  vite: {
    server: {
      port: 5173,
    },
  },
});
