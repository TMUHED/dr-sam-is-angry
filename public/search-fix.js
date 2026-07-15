(() => {
  const originalInput = document.querySelector("#addressInput");
  const searchButton = document.querySelector("#addressSearchButton");
  const suggestionBox = document.querySelector("#suggestions");
  if (!originalInput || !searchButton || !suggestionBox) return;

  const input = originalInput.cloneNode(true);
  originalInput.replaceWith(input);

  const localPlaces = [
    { label: "臺北市政府", lat: 25.0375, lng: 121.5637, district: "信義區" },
    { label: "捷運市政府站", lat: 25.0411, lng: 121.5652, district: "信義區" },
    { label: "台北101", lat: 25.0339, lng: 121.5645, district: "信義區" },
    { label: "信義威秀", lat: 25.0356, lng: 121.5671, district: "信義區" },
    { label: "國父紀念館", lat: 25.0401, lng: 121.5602, district: "信義區" },
    { label: "臺北車站", lat: 25.0478, lng: 121.517, district: "中正區" },
    { label: "忠孝復興站", lat: 25.0416, lng: 121.5438, district: "大安區" },
    { label: "公館站", lat: 25.0148, lng: 121.5342, district: "中正區" },
    { label: "臺北醫學大學附設醫院", lat: 25.0269, lng: 121.5622, district: "信義區" },
    { label: "北醫附醫", lat: 25.0269, lng: 121.5622, district: "信義區" },
    { label: "國泰綜合醫院", lat: 25.0377, lng: 121.5551, district: "大安區" },
    { label: "聯合醫院仁愛院區", lat: 25.0379, lng: 121.5435, district: "大安區" },
    { label: "臺大醫院", lat: 25.0408, lng: 121.5189, district: "中正區" },
    { label: "萬芳醫院", lat: 24.9994, lng: 121.5585, district: "文山區" }
  ];

  let activeController = null;

  function normalize(value) {
    return String(value || "")
      .replace(/[臺台]/g, "台")
      .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
      .replace(/\s+/g, "")
      .toLowerCase();
  }

  function escapeSearchHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function timeoutSignal(controller, milliseconds) {
    const timer = window.setTimeout(() => controller.abort(), milliseconds);
    return () => window.clearTimeout(timer);
  }

  function localSearch(query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return [];
    return localPlaces
      .filter((place) => {
        const label = normalize(place.label);
        return label.includes(normalizedQuery) || normalizedQuery.includes(label);
      })
      .map((place) => ({ ...place, source: "local" }));
  }

  function buildQuery(query) {
    const trimmed = query.trim();
    const hasCity = /台北|臺北|新北|基隆|桃園/.test(trimmed);
    const hasTaiwan = /台灣|臺灣|taiwan/i.test(trimmed);
    let result = hasCity ? trimmed : `臺北市 ${trimmed}`;
    if (!hasTaiwan) result += " 台灣";
    return result;
  }

  async function fetchNominatim(query, signal) {
    const params = new URLSearchParams({
      q: buildQuery(query),
      format: "jsonv2",
      addressdetails: "1",
      limit: "8",
      countrycodes: "tw",
      "accept-language": "zh-TW",
      viewbox: "121.42,25.20,121.70,24.92",
      bounded: "0"
    });
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      signal,
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`Nominatim ${response.status}`);
    const rows = await response.json();
    return rows.map((item) => ({
      label: item.display_name,
      lat: Number(item.lat),
      lng: Number(item.lon),
      district: item.address?.city_district || item.address?.suburb || item.address?.borough || "",
      source: "nominatim"
    })).filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lng));
  }

  async function fetchPhoton(query, signal) {
    const params = new URLSearchParams({
      q: buildQuery(query),
      lang: "zh",
      limit: "8",
      bbox: "121.42,24.92,121.70,25.20"
    });
    const response = await fetch(`https://photon.komoot.io/api/?${params}`, {
      signal,
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`Photon ${response.status}`);
    const data = await response.json();
    return (data.features || []).map((feature) => {
      const properties = feature.properties || {};
      const coordinates = feature.geometry?.coordinates || [];
      const lng = Number(coordinates[0]);
      const lat = Number(coordinates[1]);
      const firstLine = [properties.name, properties.street, properties.housenumber].filter(Boolean).join(" ");
      const secondLine = [properties.district, properties.city, properties.state, properties.country].filter(Boolean).join(", ");
      return {
        label: [firstLine, secondLine].filter(Boolean).join(", ") || query,
        lat,
        lng,
        district: properties.district || properties.city || "",
        source: "photon"
      };
    }).filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lng));
  }

  function uniqueResults(items) {
    const seen = new Set();
    return items.filter((item) => {
      const key = `${Math.round(item.lat * 10000)}:${Math.round(item.lng * 10000)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 8);
  }

  function chooseResult(item) {
    selectedDistrict = {
      id: "address",
      name: item.label.split(",")[0] || "地址位置",
      label: item.label,
      district: item.district,
      lat: item.lat,
      lng: item.lng,
      source: item.source
    };
    input.value = selectedDistrict.name;
    suggestionBox.hidden = true;
    updateRoutes();
  }

  function renderResults(items) {
    suggestionBox.hidden = false;
    suggestionBox.innerHTML = items.map((item, index) => `
      <button type="button" data-search-index="${index}">
        <strong>${escapeSearchHtml(item.label.split(",")[0])}</strong>
        <span>${escapeSearchHtml(item.label)}</span>
      </button>
    `).join("");
    suggestionBox.querySelectorAll("button[data-search-index]").forEach((button) => {
      button.addEventListener("click", () => chooseResult(items[Number(button.dataset.searchIndex)]));
    });
  }

  async function runSearch() {
    const query = input.value.trim();
    if (query.length < 2) {
      suggestionBox.hidden = false;
      suggestionBox.innerHTML = '<div class="suggestion-note">請輸入至少 2 個字，例如「吳興街 252 號」。</div>';
      return;
    }

    if (activeController) activeController.abort();
    activeController = new AbortController();
    const clearTimeoutSignal = timeoutSignal(activeController, 8000);
    searchButton.disabled = true;
    searchButton.textContent = "搜尋中";
    suggestionBox.hidden = false;
    suggestionBox.innerHTML = '<div class="suggestion-note">搜尋中...</div>';

    try {
      const localResults = localSearch(query);
      let remoteResults = [];
      let firstError = null;

      try {
        remoteResults = await fetchNominatim(query, activeController.signal);
      } catch (error) {
        if (error.name === "AbortError") throw error;
        firstError = error;
      }

      if (!remoteResults.length) {
        try {
          remoteResults = await fetchPhoton(query, activeController.signal);
        } catch (error) {
          if (error.name === "AbortError") throw error;
          if (!firstError) firstError = error;
        }
      }

      const items = uniqueResults([...localResults, ...remoteResults]);
      if (!items.length) {
        suggestionBox.innerHTML = `<div class="suggestion-note">找不到地址。請加上行政區、路名與門牌。${firstError ? " 外部地址服務目前可能忙碌。" : ""}</div>`;
        return;
      }
      renderResults(items);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.warn("Address search failed", error);
        suggestionBox.hidden = false;
        suggestionBox.innerHTML = '<div class="suggestion-note">地址服務暫時無法連線，請稍後重試，或輸入較完整的地址。</div>';
      }
    } finally {
      clearTimeoutSignal();
      searchButton.disabled = false;
      searchButton.textContent = "搜尋";
      activeController = null;
    }
  }

  input.addEventListener("input", () => {
    suggestionBox.hidden = true;
    suggestionBox.innerHTML = "";
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runSearch();
    }
  });
  searchButton.addEventListener("click", runSearch);
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".address-field")) suggestionBox.hidden = true;
  });
})();
