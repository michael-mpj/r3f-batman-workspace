import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(packageRoot, "../..");
const outputFile = path.join(packageRoot, "public", "landing-data.json");

async function readJsonIfExists(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function readFirstMeaningfulLine(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return (
      content
        .split(/\r?\n/)
        .map(line => line.trim())
        .find(line => line.length > 0 && !line.startsWith("#") && !line.startsWith(">")) ||
      ""
    );
  } catch {
    return "";
  }
}

async function listWorkspaceEntries(dirName) {
  const dirPath = path.join(workspaceRoot, dirName);

  let entries;
  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }

  const dirs = entries.filter(entry => entry.isDirectory() && !entry.name.startsWith("."));

  const result = [];
  for (const entry of dirs) {
    const entryPath = path.join(dirPath, entry.name);
    const pkg = await readJsonIfExists(path.join(entryPath, "package.json"));

    result.push({
      path: `${dirName}/${entry.name}`,
      name: pkg?.name || entry.name,
      version: pkg?.version || null,
      description: pkg?.description || "",
      private: Boolean(pkg?.private),
    });
  }

  return result.sort((a, b) => a.path.localeCompare(b.path));
}

function pickScripts(scripts = {}) {
  const pinned = [
    "dev",
    "build",
    "test",
    "lint",
    "batman",
    "batman:enhanced",
    "batman:vscode",
    "batman:auto",
    "batman:ultimate",
    "deploy:production",
    "check-compatibility",
  ];

  return pinned
    .filter(key => key in scripts)
    .map(key => ({ name: key, command: scripts[key] }));
}

async function main() {
  const rootPkg = (await readJsonIfExists(path.join(workspaceRoot, "package.json"))) || {};

  const [packages, projects, apps, readmeLead] = await Promise.all([
    listWorkspaceEntries("packages"),
    listWorkspaceEntries("projects"),
    listWorkspaceEntries("apps"),
    readFirstMeaningfulLine(path.join(workspaceRoot, "README.md")),
  ]);

  const data = {
    generatedAt: new Date().toISOString(),
    release: rootPkg.version || "unknown",
    workspace: {
      name: rootPkg.name || "r3f-batman-workspace",
      description:
        rootPkg.description ||
        readmeLead ||
        "Modern React Three Fiber monorepo with Batman-powered automation.",
      license: rootPkg.license || "MIT",
      packageManager: rootPkg.packageManager || "npm",
      engines: rootPkg.engines || {},
    },
    repo: {
      owner: "michael-mpj",
      name: "r3f-batman-workspace",
      url: "https://github.com/michael-mpj/r3f-batman-workspace",
      releaseUrl: `https://github.com/michael-mpj/r3f-batman-workspace/releases/tag/v${rootPkg.version || "2.0.0"}`,
    },
    architecture: {
      packages,
      projects,
      apps,
    },
    scripts: pickScripts(rootPkg.scripts),
    toolSnapshot: {
      node: rootPkg.engines?.node || "not specified",
      npm: rootPkg.engines?.npm || "not specified",
      highlights: ["ESLint 10", "Vite 8", "Vitest 3", "Turbo 2"],
    },
  };

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");

  process.stdout.write(`Generated landing data: ${outputFile}\n`);
}

main().catch(error => {
  process.stderr.write(`Failed to generate landing data: ${error.message}\n`);
  process.exitCode = 1;
});
