import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(packageRoot, "../..");
const outputFile = path.join(packageRoot, "public", "landing-data.json");
const fallbackFile = path.join(packageRoot, "config", "landing-fallback.json");

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
        .find(line => line.length > 0 && !line.startsWith("#") && !line.startsWith(">")) || ""
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

  return pinned.filter(key => key in scripts).map(key => ({ name: key, command: scripts[key] }));
}

function pickWorkflowGroups(scripts = {}) {
  const groups = [
    {
      id: "build",
      title: "Build",
      keys: ["dev", "build"],
    },
    {
      id: "quality",
      title: "Quality",
      keys: ["test", "lint", "check-compatibility"],
    },
    {
      id: "batman",
      title: "Batman",
      keys: ["batman", "batman:enhanced", "batman:ultimate", "batman:vscode", "batman:auto"],
    },
    {
      id: "deploy",
      title: "Deploy",
      keys: ["deploy:production", "deploy:all", "deploy:starterkit", "deploy:cyber-forge"],
    },
  ];

  return groups
    .map(group => ({
      id: group.id,
      title: group.title,
      items: group.keys.filter(key => key in scripts).map(key => ({ name: key, command: scripts[key] })),
    }))
    .filter(group => group.items.length > 0);
}

function pickFeaturedWorkspaces({ projects = [], apps = [] }) {
  const starterKit = projects.find(item => item.path === "projects/R3f-StarterKit") || projects[0];
  const cyberForge = apps.find(item => item.path === "apps/cyber-forge") || apps[0];

  const featured = [];

  if (starterKit) {
    featured.push({
      key: "starterkit",
      title: "R3f-StarterKit",
      type: "project",
      path: starterKit.path,
      description: starterKit.description || "Canonical starter/reference project for workspace patterns.",
    });
  }

  if (cyberForge) {
    featured.push({
      key: "cyber-forge",
      title: "cyber-forge",
      type: "app",
      path: cyberForge.path,
      description: cyberForge.description || "Deployable app surface built on shared workspace packages.",
    });
  }

  return featured;
}

async function main() {
  const fallback = (await readJsonIfExists(fallbackFile)) || {};
  const rootPkg = (await readJsonIfExists(path.join(workspaceRoot, "package.json"))) || {};

  const [packages, projects, apps, readmeLead] = await Promise.all([
    listWorkspaceEntries("packages"),
    listWorkspaceEntries("projects"),
    listWorkspaceEntries("apps"),
    readFirstMeaningfulLine(path.join(workspaceRoot, "README.md")),
  ]);

  const hasDiscoveredWorkspace = packages.length > 0 || projects.length > 0 || apps.length > 0;
  const scripts = pickScripts(rootPkg.scripts);
  const workflowGroups = pickWorkflowGroups(rootPkg.scripts);
  const featuredWorkspaces = pickFeaturedWorkspaces({
    projects: hasDiscoveredWorkspace ? projects : fallback.architecture?.projects || [],
    apps: hasDiscoveredWorkspace ? apps : fallback.architecture?.apps || [],
  });

  const data = {
    generatedAt: new Date().toISOString(),
    release: rootPkg.version || fallback.release || "unknown",
    workspace: {
      name: rootPkg.name || fallback.workspace?.name || "r3f-batman-workspace",
      description:
        rootPkg.description ||
        fallback.workspace?.description ||
        readmeLead ||
        "Modern React Three Fiber monorepo with Batman-powered automation.",
      license: rootPkg.license || fallback.workspace?.license || "MIT",
      packageManager: rootPkg.packageManager || fallback.workspace?.packageManager || "npm",
      engines: Object.keys(rootPkg.engines || {}).length > 0 ? rootPkg.engines : fallback.workspace?.engines || {},
    },
    repo: {
      owner: fallback.repo?.owner || "michael-mpj",
      name: fallback.repo?.name || "r3f-batman-workspace",
      url: fallback.repo?.url || "https://github.com/michael-mpj/r3f-batman-workspace",
      releaseUrl:
        fallback.repo?.releaseUrl ||
        `https://github.com/michael-mpj/r3f-batman-workspace/releases/tag/v${rootPkg.version || fallback.release || "2.0.0"}`,
    },
    architecture: {
      packages: hasDiscoveredWorkspace ? packages : fallback.architecture?.packages || [],
      projects: hasDiscoveredWorkspace ? projects : fallback.architecture?.projects || [],
      apps: hasDiscoveredWorkspace ? apps : fallback.architecture?.apps || [],
    },
    scripts: scripts.length > 0 ? scripts : fallback.scripts || [],
    workflowGroups: workflowGroups.length > 0 ? workflowGroups : fallback.workflowGroups || [],
    featuredWorkspaces: featuredWorkspaces.length > 0 ? featuredWorkspaces : fallback.featuredWorkspaces || [],
    toolSnapshot: {
      node: rootPkg.engines?.node || fallback.toolSnapshot?.node || "not specified",
      npm: rootPkg.engines?.npm || fallback.toolSnapshot?.npm || "not specified",
      highlights: fallback.toolSnapshot?.highlights || ["ESLint 10", "Vite 8", "Vitest 3", "Turbo 2"],
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
