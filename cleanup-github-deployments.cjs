const fetch = require("node-fetch");

const owner = "michael-mpj";
const repo = "r3f-batman-workspace";
const keep = 10; // Number of most recent deployments to keep
const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.error("Set GITHUB_TOKEN env variable");
  process.exit(1);
}

async function main() {
  const headers = { "Authorization": `token ${token}`, "User-Agent": "cleanup-script" };
  let page = 1,
    deployments = [];
  while (true) {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/deployments?per_page=100&page=${page}`, { headers });
    const batch = await res.json();
    if (!batch.length) break;
    deployments = deployments.concat(batch);
    page++;
  }
  if (deployments.length <= keep) {
    console.log("Nothing to delete.");
    return;
  }
  const toDelete = deployments.slice(keep);
  for (const dep of toDelete) {
    await fetch(`https://api.github.com/repos/${owner}/${repo}/deployments/${dep.id}`, {
      method: "DELETE",
      headers,
    });
    console.log(`Deleted deployment ${dep.id}`);
  }
  console.log("Done!");
}
main();
