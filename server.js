import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./public", import.meta.url));
const port = Number(process.env.PORT || 5177);
const nhiApi = "https://info.nhi.gov.tw/api/inae4000/inae4001s01/SQL0002";
const geocodeApi = "https://nominatim.openstreetmap.org/search";
const osrmApi = "https://router.project-osrm.org/table/v1/driving";
const localPlaces = [
  { label: "臺北市政府", lat: 25.0375, lng: 121.5637, district: "信義區", type: "local_landmark" },
  { label: "捷運市政府站", lat: 25.0411, lng: 121.5652, district: "信義區", type: "local_landmark" },
  { label: "台北101", lat: 25.0339, lng: 121.5645, district: "信義區", type: "local_landmark" },
  { label: "信義威秀", lat: 25.0356, lng: 121.5671, district: "信義區", type: "local_landmark" },
  { label: "國父紀念館", lat: 25.0401, lng: 121.5602, district: "信義區", type: "local_landmark" },
  { label: "臺北車站", lat: 25.0478, lng: 121.5170, district: "中正區", type: "local_landmark" },
  { label: "忠孝復興站", lat: 25.0416, lng: 121.5438, district: "大安區", type: "local_landmark" },
  { label: "公館站", lat: 25.0148, lng: 121.5342, district: "中正區", type: "local_landmark" },
  { label: "臺北醫學大學附設醫院", lat: 25.0269, lng: 121.5622, district: "信義區", type: "hospital" },
  { label: "北醫附醫", lat: 25.0269, lng: 121.5622, district: "信義區", type: "hospital" },
  { label: "國泰綜合醫院", lat: 25.0377, lng: 121.5551, district: "大安區", type: "hospital" },
  { label: "聯合醫院仁愛院區", lat: 25.0379, lng: 121.5435, district: "大安區", type: "hospital" },
  { label: "臺大醫院", lat: 25.0408, lng: 121.5189, district: "中正區", type: "hospital" },
  { label: "萬芳醫院", lat: 24.9994, lng: 121.5585, district: "文山區", type: "hospital" }
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store"
  });
  res.end(body);
}

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

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function searchAddress(query) {
  const normalizedQuery = normalizeAddressText(query);
  const localMatches = localPlaces
    .filter((place) => {
      const label = normalizeAddressText(place.label);
      return label.includes(normalizedQuery) || normalizedQuery.includes(label);
    })
    .map((place) => ({ ...place, importance: 1, source: "local" }));
  if (localMatches.length) return localMatches.slice(0, 8);

  const queries = buildGeocodeQueries(query);
  const remoteResults = [];
  const timeoutMs = localMatches.length ? 1200 : 3600;
  for (const q of queries) {
    try {
      const results = await fetchNominatim(q, timeoutMs);
      remoteResults.push(...results);
      if (remoteResults.length >= 5) break;
    } catch (error) {
      if (!localMatches.length && q === queries[queries.length - 1]) throw error;
    }
  }

  const seen = new Set();
  return [...localMatches, ...remoteResults].filter((item) => {
    const key = `${Math.round(item.lat * 10000)}:${Math.round(item.lng * 10000)}:${item.label.slice(0, 12)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 8);
}

function normalizeAddressText(value) {
  return String(value || "")
    .replace(/[臺台]/g, "台")
    .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, "")
    .toLowerCase();
}

function buildGeocodeQueries(query) {
  const trimmed = query.trim();
  const hasCity = /台北|臺北|新北|基隆|桃園/.test(trimmed);
  const hasTaiwan = /台灣|臺灣|taiwan/i.test(trimmed);
  const variants = [trimmed];
  if (!hasCity) variants.push(`臺北市 ${trimmed}`, `台北市 ${trimmed}`);
  if (!hasTaiwan) variants.push(`${trimmed} 台灣`, `臺北市 ${trimmed} 台灣`);
  return [...new Set(variants)].filter(Boolean);
}

async function fetchNominatim(query, timeoutMs = 3600) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    addressdetails: "1",
    limit: "8",
    countrycodes: "tw",
    "accept-language": "zh-TW",
    viewbox: "121.42,25.20,121.70,24.92",
    bounded: "0"
  });

  let results;
  try {
    const response = await fetch(`${geocodeApi}?${params}`, {
      headers: {
        "User-Agent": "angry-sam-local-tool/0.1"
      },
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`Geocode API ${response.status}`);
    results = await response.json();
  } finally {
    clearTimeout(timeout);
  }
  return results.map((item) => ({
    label: item.display_name,
    lat: Number(item.lat),
    lng: Number(item.lon),
    district: item.address?.city_district || item.address?.suburb || item.address?.borough || "",
    type: item.type,
    importance: item.importance,
    source: "osm"
  })).filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lng));
}

async function fetchRouteTable(origin, destinations) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2600);
  const coordinates = [origin, ...destinations]
    .map((point) => `${point.lng},${point.lat}`)
    .join(";");
  const params = new URLSearchParams({
    sources: "0",
    annotations: "duration,distance"
  });
  try {
    const response = await fetch(`${osrmApi}/${coordinates}?${params}`, { signal: controller.signal });
    if (!response.ok) throw new Error(`OSRM API ${response.status}`);
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";

  const requested = normalize(join(root, pathname));
  if (!requested.startsWith(root)) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }

  try {
    const body = await readFile(requested);
    send(res, 200, body, mimeTypes[extname(requested)] || "application/octet-stream");
  } catch {
    send(res, 404, "Not found", "text/plain; charset=utf-8");
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url?.startsWith("/api/er-status")) {
      const data = await fetchErStatus();
      send(res, 200, JSON.stringify(data));
      return;
    }
    if (req.url?.startsWith("/api/geocode")) {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const query = (url.searchParams.get("q") || "").trim();
      if (query.length < 2) {
        send(res, 200, JSON.stringify({ results: [] }));
        return;
      }
      const results = await searchAddress(query);
      send(res, 200, JSON.stringify({ results }));
      return;
    }
    if (req.url?.startsWith("/api/routes") && req.method === "POST") {
      const body = await readJson(req);
      const origin = body.origin;
      const destinations = body.destinations || [];
      if (!origin || !Number.isFinite(origin.lat) || !Number.isFinite(origin.lng)) {
        send(res, 400, JSON.stringify({ error: "Missing origin" }));
        return;
      }
      const table = await fetchRouteTable(origin, destinations);
      send(res, 200, JSON.stringify(table));
      return;
    }
    await serveStatic(req, res);
  } catch (error) {
    send(res, 502, JSON.stringify({ error: "外部資料讀取失敗", detail: String(error.message || error) }));
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Angry Sam: http://127.0.0.1:${port}`);
});
