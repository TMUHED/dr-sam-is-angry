import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const nhiApi = "https://info.nhi.gov.tw/api/inae4000/inae4001s01/SQL0002";
const outputPath = resolve("public/data/er-status.json");

async function fetchErStatus() {
  const response = await fetch(nhiApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ AREA_NO: "01", CONT_TYPE: "" })
  });

  if (!response.ok) {
    throw new Error(`NHI API ${response.status}`);
  }

  return response.json();
}

async function hasExistingSnapshot() {
  try {
    await access(outputPath);
    return true;
  } catch {
    return false;
  }
}

let lastError;
for (let attempt = 1; attempt <= 3; attempt += 1) {
  try {
    const data = await fetchErStatus();
    data.generatedAt = new Date().toISOString();

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`);

    console.log(`Wrote ${outputPath}`);
    process.exit(0);
  } catch (error) {
    lastError = error;
    console.warn(`NHI fetch attempt ${attempt} failed: ${error.message || error}`);
    await new Promise((resolveDelay) => setTimeout(resolveDelay, attempt * 1200));
  }
}

if (await hasExistingSnapshot()) {
  console.warn(`Using existing ${outputPath} because live fetch failed.`);
  process.exit(0);
}

throw lastError;
