import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const nhiApi = "https://info.nhi.gov.tw/api/inae4000/inae4001s01/SQL0002";
const outputPath = resolve("public/data/er-status.json");

const response = await fetch(nhiApi, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ AREA_NO: "01", CONT_TYPE: "" })
});

if (!response.ok) {
  throw new Error(`NHI API ${response.status}`);
}

const data = await response.json();
data.generatedAt = new Date().toISOString();

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`);

console.log(`Wrote ${outputPath}`);
