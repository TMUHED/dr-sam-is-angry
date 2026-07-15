(() => {
  const oldInput = document.querySelector("#addressInput");
  const searchButton = document.querySelector("#addressSearchButton");
  const box = document.querySelector("#suggestions");

  if (!oldInput || !searchButton || !box) return;

  // 移除原本「輸入文字就自動搜尋」的監聽器
  const input = oldInput.cloneNode(true);
  oldInput.replaceWith(input);

  const localPlaces = [
    ["台北101", 25.0339, 121.5645, "信義區"],
    ["北醫附醫", 25.0269, 121.5622, "信義區"],
    ["臺北醫學大學附設醫院", 25.0269, 121.5622, "信義區"],
    ["臺北車站", 25.0478, 121.517, "中正區"],
    ["臺大醫院", 25.0408, 121.5189, "中正區"],
    ["國泰綜合醫院", 25.0377, 121.5551, "大安區"],
    ["萬芳醫院", 24.9994, 121.5585, "文山區"]
  ];

  let controller = null;
  let searchId = 0;

  const normalize = (text) =>
    String(text || "")
      .replace(/[臺台]/g, "台")
      .replace(/\s+/g, "")
      .toLowerCase();

  const escapeHtml = (text) =>
    String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  function choose(item) {
    selectedDistrict = {
      id: "address",
      name: item.label.split(",")[0] || "地址位置",
      label: item.label,
      district: item.district || "",
      lat: item.lat,
      lng: item.lng,
      source: item.source
    };

    input.value = selectedDistrict.name;
    box.hidden = true;
    updateRoutes();
  }

  function render(items) {
    box.hidden = false;

    box.innerHTML = items
      .map(
        (item, index) => `
          <button type="button" data-index="${index}">
            <strong>${escapeHtml(item.label.split(",")[0])}</strong>
            <span>${escapeHtml(item.label)}</span>
          </button>
        `
      )
      .join("");

    box.querySelectorAll("button[data-index]").forEach((button) => {
      button.addEventListener("click", () => {
        choose(items[Number(button.dataset.index)]);
      });
    });
  }

  async function runSearch() {
    const query = input.value.trim();

    if (query.length < 2) {
      box.hidden = false;
      box.innerHTML =
        '<div class="suggestion-note">請輸入至少 2 個字。</div>';
      return;
    }

    // 常用地標直接搜尋，不連外部服務
    const normalized = normalize(query);

    const local = localPlaces
      .filter(([label]) => {
        return (
          normalize(label).includes(normalized) ||
          normalized.includes(normalize(label))
        );
      })
      .map(([label, lat, lng, district]) => ({
        label,
        lat,
        lng,
        district,
        source: "local"
      }));

    if (local.length) {
      render(local);
      return;
    }

    // 取消前一次尚未完成的搜尋
    if (controller) controller.abort();

    controller = new AbortController();
    const mySearchId = ++searchId;

    // 最多等 7 秒
    const timer = setTimeout(() => controller.abort(), 7000);

    searchButton.disabled = true;
    searchButton.textContent = "搜尋中";

    box.hidden = false;
    box.innerHTML =
      '<div class="suggestion-note">搜尋中...</div>';

    try {
      const params = new URLSearchParams({
        q: /台北|臺北|新北/.test(query)
          ? query
          : `臺北市 ${query}`,
        lang: "default",
        limit: "8",
        bbox: "121.42,24.92,121.70,25.20"
      });

      const response = await fetch(
        `https://photon.komoot.io/api/?${params}`,
        {
          signal: controller.signal,
          headers: {
            Accept: "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      // 已有新的搜尋時，忽略舊結果
      if (mySearchId !== searchId) return;

      const items = (data.features || [])
        .map((feature) => {
          const p = feature.properties || {};
          const coordinates = feature.geometry?.coordinates || [];

          return {
            label:
              [
                p.name,
                p.street,
                p.housenumber,
                p.district,
                p.city
              ]
                .filter(Boolean)
                .join(", ") || query,
            lat: Number(coordinates[1]),
            lng: Number(coordinates[0]),
            district: p.district || p.city || "",
            source: "photon"
          };
        })
        .filter(
          (item) =>
            Number.isFinite(item.lat) &&
            Number.isFinite(item.lng)
        );

      if (!items.length) {
        box.innerHTML =
          '<div class="suggestion-note">找不到地址，請加上行政區、路名與門牌。</div>';
        return;
      }

      render(items);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.warn(error);
      }

      if (mySearchId === searchId) {
        box.hidden = false;
        box.innerHTML =
          '<div class="suggestion-note">地址服務暫時忙碌，請再按一次搜尋。</div>';
      }
    } finally {
      clearTimeout(timer);

      if (mySearchId === searchId) {
        searchButton.disabled = false;
        searchButton.textContent = "搜尋";
        controller = null;
      }
    }
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runSearch();
    }
  });

  input.addEventListener("input", () => {
    box.hidden = true;
    box.innerHTML = "";
  });

  searchButton.addEventListener("click", runSearch);
})();
