const fetch = require("node-fetch");

const project = "r3f-batman-workspace"; // Vercel project name
const teamId = ""; // If using a Vercel team, set teamId here
const keep = 10;
const token = process.env.VERCEL_TOKEN;

if (!token) {
  console.error("Set VERCEL_TOKEN env variable");
  process.exit(1);
}

async function main() {
  let url = `https://api.vercel.com/v6/deployments?projectId=${project}&limit=100`;
  if (teamId) url += `&teamId=${teamId}`;
  const headers = { Authorization: `Bearer ${token}` };
  const res = await fetch(url, { headers });
  const { deployments } = await res.json();
  if (!deployments || deployments.length <= keep) {
    console.log("Nothing to delete.");
    return;
  }
  const toDelete = deployments.slice(keep);
  for (const dep of toDelete) {
    await fetch(`https://api.vercel.com/v13/deployments/${dep.uid}`, {
      method: "DELETE",
      headers,
    });
    console.log(`Deleted Vercel deployment ${dep.uid}`);
  }
  console.log("Done!");
}
main();
