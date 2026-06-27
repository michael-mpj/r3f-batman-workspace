/**
 * R3F Workspace Monorepo - Build Scripts
 * File: create-workspace.mjs
 * Description: create-workspace component/utility
 * Author: R3F Workspace Team
 * Created: 2026-06-27
 * Last Modified: 2026-06-27
 * Version: 1.0.0
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "..");

function printUsage() {
    process.stdout.write(
        `\nUsage:\n  npm run workspace:create -- --type <app|project> --name <workspace-name> [--port <number>]\n\nExamples:\n  npm run workspace:create -- --type app --name newproject1\n  npm run workspace:create -- --type project --name physics-lab --port 3010\n\n`
    );
}

function parseArgs(argv) {
    const args = { type: "", name: "", port: "" };

    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];
        if (arg === "--type") args.type = argv[index + 1] || "";
        if (arg === "--name") args.name = argv[index + 1] || "";
        if (arg === "--port") args.port = argv[index + 1] || "";
    }

    return args;
}

function validateName(name) {
    return /^[a-z0-9][a-z0-9-]*$/.test(name);
}

async function ensureDirectory(targetDir) {
    await fs.mkdir(targetDir, { recursive: true });
}

async function createIfMissing(filePath, content) {
    try {
        await fs.access(filePath);
        throw new Error(`File already exists: ${filePath}`);
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
        await fs.writeFile(filePath, content, "utf8");
    }
}

function buildPackageJson({ name, type }) {
    const packageName = type === "app" ? name : `r3f-${name}`;

    return `${JSON.stringify(
        {
            name: packageName,
            private: true,
            version: "0.0.0",
            type: "module",
            scripts: {
                dev: "vite",
                build: "vite build",
                preview: "vite preview",
                lint: "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0",
            },
            dependencies: {
                "react": "^19.0.0",
                "react-dom": "^19.0.0",
                "three": "^0.180.0",
                "@react-three/fiber": "^9.3.0",
                "@react-three/drei": "^10.7.4",
                "@r3f-workspace/ui": "file:../../packages/ui",
                "@r3f-workspace/utils": "file:../../packages/utils",
                "@r3f-workspace/r3f-components": "file:../../packages/r3f-components",
            },
            devDependencies: {
                "vite": "^8.0.14",
                "@vitejs/plugin-react": "^5.0.2",
                "eslint": "^10.4.0",
            },
        },
        null,
        2
    )}\n`;
}

function buildViteConfig(port) {
    return `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    port: ${port},\n    host: true,\n  },\n});\n`;
}

async function main() {
    const args = parseArgs(process.argv.slice(2));

    if (!args.type || !args.name) {
        printUsage();
        throw new Error("Missing required arguments: --type and --name");
    }

    if (!["app", "project"].includes(args.type)) {
        printUsage();
        throw new Error("Invalid --type. Use 'app' or 'project'.");
    }

    if (!validateName(args.name)) {
        throw new Error("Invalid --name. Use kebab-case (lowercase letters, numbers, hyphens).");
    }

    const targetRoot = args.type === "app" ? "apps" : "projects";
    const targetDir = path.join(workspaceRoot, targetRoot, args.name);
    const targetPort = Number.parseInt(args.port || "3005", 10);

    await ensureDirectory(path.join(targetDir, "src"));

    await createIfMissing(path.join(targetDir, "package.json"), buildPackageJson({ name: args.name, type: args.type }));
    await createIfMissing(
        path.join(targetDir, "index.html"),
        `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>${args.name}</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>\n`
    );
    await createIfMissing(path.join(targetDir, "vite.config.js"), buildViteConfig(Number.isNaN(targetPort) ? 3005 : targetPort));
    await createIfMissing(
        path.join(targetDir, "src", "main.jsx"),
        `import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\n\nReactDOM.createRoot(document.getElementById("root")).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n);\n`
    );
    await createIfMissing(
        path.join(targetDir, "src", "App.jsx"),
        `export default function App() {\n  return (\n    <main style={{ fontFamily: "Inter, system-ui", padding: "2rem" }}>\n      <h1>${args.name}</h1>\n      <p>Workspace scaffold created by r3f-batman <code>workspace:create</code>.</p>\n    </main>\n  );\n}\n`
    );
    await createIfMissing(
        path.join(targetDir, "README.md"),
        `# ${args.name}\n\nScaffolded as a ${args.type} workspace using \`npm run workspace:create\`.\n\n## Run\n\n\`\`\`bash\nnpm run dev --workspace=${targetRoot}/${args.name}\n\`\`\`\n`
    );

    process.stdout.write(`✅ Created ${args.type} workspace at ${targetRoot}/${args.name}\n`);
    process.stdout.write(`Next: npm install && npm run dev --workspace=${targetRoot}/${args.name}\n`);
}

main().catch(error => {
    process.stderr.write(`❌ ${error.message}\n`);
    process.exitCode = 1;
});
