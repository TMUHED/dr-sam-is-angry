const tmuhId = "tmuh";
const tmuhDistrict = "信義區";

const districts = [
  { id: "xinyi", name: "信義區", lat: 25.033, lng: 121.566 },
  { id: "daan", name: "大安區", lat: 25.026, lng: 121.543 },
  { id: "songshan", name: "松山區", lat: 25.053, lng: 121.563 },
  { id: "nangang", name: "南港區", lat: 25.032, lng: 121.607 },
  { id: "wenshan", name: "文山區", lat: 24.989, lng: 121.569 },
  { id: "zhongzheng", name: "中正區", lat: 25.035, lng: 121.519 },
  { id: "wanhua", name: "萬華區", lat: 25.033, lng: 121.497 },
  { id: "datong", name: "大同區", lat: 25.063, lng: 121.513 },
  { id: "zhongshan", name: "中山區", lat: 25.064, lng: 121.533 },
  { id: "neihu", name: "內湖區", lat: 25.083, lng: 121.592 },
  { id: "shilin", name: "士林區", lat: 25.096, lng: 121.525 },
  { id: "beitou", name: "北投區", lat: 25.132, lng: 121.501 },
  { id: "newtaipei", name: "新北市/其他縣市", lat: 25.017, lng: 121.463 }
];

const hospitals = [
  {
    id: "ntuh",
    name: "臺大醫院",
    aliases: ["臺大", "台大"],
    district: "中正區",
    address: "臺北市中正區中山南路7號",
    lat: 25.0408,
    lng: 121.5189,
    level: "重度級",
    validUntil: "118/12/31",
    capabilities: { chemical: "full", radiation: "full", psychiatry: "full", pediatric: "full", obstetric: "full", ecmo: "full" },
    notes: { hyperbaric: "高壓氧艙為部分時段/限制條件" }
  },
  {
    id: "ho_ping",
    name: "聯合醫院和平院區",
    aliases: ["和平", "北市聯醫"],
    district: "中正區",
    address: "臺北市中正區中華路2段33號",
    lat: 25.0358,
    lng: 121.5065,
    level: "中度級",
    validUntil: "115/12/31",
    capabilities: { chemical: "full", radiation: "none", psychiatry: "none", pediatric: "none", obstetric: "none", ecmo: "none" }
  },
  {
    id: "west_garden",
    name: "西園醫院",
    aliases: ["西園"],
    district: "萬華區",
    address: "臺北市萬華區西園路2段276號",
    lat: 25.0279,
    lng: 121.4962,
    level: "一般級",
    validUntil: "未列效期",
    capabilities: { chemical: "none", radiation: "none", psychiatry: "none", pediatric: "none", obstetric: "none", ecmo: "none" }
  },
  {
    id: "zhongxing",
    name: "聯合醫院中興院區",
    aliases: ["中興", "北市聯醫"],
    district: "大同區",
    address: "臺北市大同區鄭州路145號",
    lat: 25.0505,
    lng: 121.5154,
    level: "中度級",
    validUntil: "120/12/31",
    capabilities: { chemical: "none", radiation: "none", psychiatry: "none", pediatric: "partial", obstetric: "none", ecmo: "none" }
  },
  {
    id: "cheng_hsin",
    name: "振興醫院",
    aliases: ["振興"],
    district: "北投區",
    address: "臺北市北投區振興街45號",
    lat: 25.1172,
    lng: 121.5222,
    level: "重度級",
    validUntil: "120/12/31",
    capabilities: { chemical: "none", radiation: "none", psychiatry: "full", pediatric: "partial", obstetric: "full", ecmo: "full" },
    notes: { hyperbaric: "高壓氧艙為部分時段/限制條件" }
  },
  {
    id: "vghtpe",
    name: "臺北榮民總醫院",
    aliases: ["北榮", "臺北榮總", "台北榮總"],
    district: "北投區",
    address: "臺北市北投區石牌路2段201號",
    lat: 25.1207,
    lng: 121.5204,
    level: "重度級",
    validUntil: "118/12/31",
    capabilities: { chemical: "full", radiation: "full", psychiatry: "full", pediatric: "full", obstetric: "full", ecmo: "full" }
  },
  {
    id: "pojen",
    name: "博仁綜合醫院",
    aliases: ["博仁"],
    district: "松山區",
    address: "臺北市松山區光復北路66號",
    lat: 25.0508,
    lng: 121.5576,
    level: "一般級",
    validUntil: "未列效期",
    capabilities: { chemical: "none", radiation: "none", psychiatry: "none", pediatric: "none", obstetric: "none", ecmo: "none" }
  },
  {
    id: "tri_songshan",
    name: "三軍總醫院松山分院",
    aliases: ["三軍總醫院松山", "三總松山"],
    district: "松山區",
    address: "臺北市松山區健康路131號",
    lat: 25.0545,
    lng: 121.5572,
    level: "中度級",
    validUntil: "115/12/31",
    capabilities: { chemical: "none", radiation: "none", psychiatry: "partial", pediatric: "partial", obstetric: "partial", ecmo: "none" },
    notes: { psychiatry: "精神科不具強制住院服務，且為部分時段" }
  },
  {
    id: "tai_an",
    name: "臺安醫院",
    aliases: ["臺安", "台安"],
    district: "松山區",
    address: "臺北市松山區八德路二段424號",
    lat: 25.0483,
    lng: 121.546,
    level: "中度級",
    validUntil: "119/12/31",
    capabilities: { chemical: "none", radiation: "none", psychiatry: "none", pediatric: "full", obstetric: "full", ecmo: "none" }
  },
  {
    id: "tmuh",
    name: "臺北醫學大學附設醫院",
    shortName: "北醫附醫",
    aliases: ["北醫", "臺北醫學大學附設醫院"],
    district: "信義區",
    address: "臺北市信義區吳興街252號",
    lat: 25.0269,
    lng: 121.5622,
    level: "重度級",
    validUntil: "120/12/31",
    capabilities: { chemical: "partial", radiation: "none", psychiatry: "full", pediatric: "full", obstetric: "full", ecmo: "full" },
    notes: { chemical: "化學災害欄位為部分/限制能力標示" }
  },
  {
    id: "mackay",
    name: "馬偕紀念醫院",
    aliases: ["台北馬偕", "馬偕"],
    district: "中山區",
    address: "臺北市中山區中山北路二段92號",
    lat: 25.0579,
    lng: 121.5225,
    level: "重度級",
    validUntil: "118/12/31",
    capabilities: { chemical: "full", radiation: "partial", psychiatry: "partial", pediatric: "full", obstetric: "full", ecmo: "full" },
    notes: { psychiatry: "精神科床位註記位於淡水馬偕", radiation: "輻災床位註記位於淡水馬偕" }
  },
  {
    id: "wanfang",
    name: "臺北市立萬芳醫院",
    aliases: ["萬芳"],
    district: "文山區",
    address: "臺北市文山區興隆路3段111號",
    lat: 24.9994,
    lng: 121.5585,
    level: "重度級",
    validUntil: "118/12/31",
    capabilities: { chemical: "full", radiation: "none", psychiatry: "full", pediatric: "full", obstetric: "full", ecmo: "full" }
  },
  {
    id: "zhongxiao",
    name: "聯合醫院忠孝院區",
    aliases: ["忠孝", "聯醫忠孝"],
    district: "南港區",
    address: "臺北市南港區同德路87號",
    lat: 25.0453,
    lng: 121.5864,
    level: "中度級",
    validUntil: "119/12/31",
    capabilities: { chemical: "none", radiation: "none", psychiatry: "none", pediatric: "partial", obstetric: "none", ecmo: "none" }
  },
  {
    id: "renai",
    name: "聯合醫院仁愛院區",
    aliases: ["聯醫仁愛", "仁愛"],
    district: "大安區",
    address: "臺北市大安區仁愛路4段10號",
    lat: 25.0379,
    lng: 121.5435,
    level: "重度級",
    validUntil: "115/12/31",
    capabilities: { chemical: "none", radiation: "none", psychiatry: "none", pediatric: "full", obstetric: "full", ecmo: "full" }
  },
  {
    id: "cathay",
    name: "國泰綜合醫院",
    aliases: ["台北國泰", "國泰"],
    district: "大安區",
    address: "臺北市大安區仁愛路4段266巷6號",
    lat: 25.0377,
    lng: 121.5551,
    level: "重度級",
    validUntil: "118/12/31",
    capabilities: { chemical: "none", radiation: "none", psychiatry: "none", pediatric: "full", obstetric: "full", ecmo: "full" }
  },
  {
    id: "shin_kong",
    name: "新光吳火獅紀念醫院",
    aliases: ["新光"],
    district: "士林區",
    address: "臺北市士林區文昌路95號",
    lat: 25.0964,
    lng: 121.5206,
    level: "重度級",
    validUntil: "118/12/31",
    capabilities: { chemical: "none", radiation: "none", psychiatry: "full", pediatric: "full", obstetric: "full", ecmo: "full" },
    notes: { hyperbaric: "高壓氧艙為部分時段/限制條件" }
  },
  {
    id: "yangming",
    name: "聯合醫院陽明院區",
    aliases: ["陽明", "聯醫陽明"],
    district: "士林區",
    address: "臺北市士林區雨聲街105號",
    lat: 25.1051,
    lng: 121.5317,
    level: "中度級",
    validUntil: "118/12/31",
    capabilities: { chemical: "none", radiation: "none", psychiatry: "none", pediatric: "full", obstetric: "partial", ecmo: "none" }
  },
  {
    id: "tri_service",
    name: "三軍總醫院",
    aliases: ["三總", "三軍總醫院"],
    district: "內湖區",
    address: "臺北市內湖區成功路2段325號",
    lat: 25.0719,
    lng: 121.5906,
    level: "重度級",
    validUntil: "118/12/31",
    capabilities: { chemical: "full", radiation: "full", psychiatry: "full", pediatric: "full", obstetric: "full", ecmo: "full" }
  }
];

const levelClass = { "重度級": "severe", "中度級": "moderate", "一般級": "general" };
const capabilityLabels = {
  chemical: "化災",
  radiation: "輻災",
  psychiatry: "精神",
  pediatric: "兒科",
  obstetric: "產科",
  ecmo: "ECMO"
};
const capabilityText = { full: "完整", partial: "部分", none: "未標示" };

let erStatus = new Map();
let selectedDistrict = null;
let selectedCapability = "all";
let routeMetrics = new Map();
let routeMode = "道路車程";
let suggestionTimer;
const sameOriginApiAvailable = shouldUseSameOriginApi();

const addressInput = document.querySelector("#addressInput");
const suggestions = document.querySelector("#suggestions");
const capabilitySelect = document.querySelector("#capabilitySelect");
const verdict = document.querySelector("#verdict");
const nearestList = document.querySelector("#nearestList");
const hospitalCards = document.querySelector("#hospitalCards");
const tmuhRank = document.querySelector("#tmuhRank");
const livePill = document.querySelector("#livePill");
const refreshButton = document.querySelector("#refreshButton");
const cuteMap = document.querySelector("#cuteMap");
const mapFocus = document.querySelector("#mapFocus");
const routeSource = document.querySelector("#routeSource");

function shouldUseSameOriginApi() {
  const host = window.location.hostname;
  const staticHosts = ["github.io", "pages.dev", "netlify.app"];
  if (window.location.protocol === "file:") return false;
  if (staticHosts.some((suffix) => host.endsWith(suffix))) return false;
  if ((host === "127.0.0.1" || host === "localhost") && window.location.port !== "5177") return false;
  return true;
}

const bounds = {
  minLat: 24.960505845000057,
  maxLat: 25.209290286000055,
  minLng: 121.45732344500004,
  maxLng: 121.66593430800003
};

const mapFrame = {
  left: 95,
  top: 78,
  width: 810,
  height: 720
};

const labelSlots = {
  cheng_hsin: [250, 340],
  vghtpe: [340, 322],
  shin_kong: [235, 430],
  yangming: [365, 390],
  tri_service: [650, 470],
  zhongxing: [250, 514],
  mackay: [342, 492],
  pojen: [508, 508],
  tri_songshan: [598, 526],
  tai_an: [420, 524],
  cathay: [508, 590],
  renai: [398, 618],
  ntuh: [300, 575],
  ho_ping: [218, 592],
  west_garden: [150, 620],
  tmuh: [505, 635],
  zhongxiao: [650, 570],
  wanfang: [440, 716]
};

const districtRegions = [
  { name: "北投", label: [395, 225], path: "M 556.2 118.4 L 520.9 137.5 L 524.3 152.2 L 513.3 167.4 L 497 178.5 L 505.6 191.7 L 496.3 213.9 L 479.9 219 L 452.8 250.5 L 450.5 264.7 L 438.3 273.9 L 420.4 274.9 L 390.6 285.5 L 378.6 295.3 L 382.6 312.3 L 363.7 326.1 L 352.1 343.7 L 360.7 356.5 L 342.7 368.4 L 327.1 395.7 L 292.6 406.3 L 250.2 399.4 L 244.7 360.7 L 218.2 349.8 L 157.9 363 L 132.2 360.5 L 108.9 347.4 L 102.8 330.9 L 123 322.8 L 127.2 303 L 151.8 285.1 L 194.2 249 L 208.1 247.4 L 232.5 218.4 L 250.6 209.8 L 271.2 183.7 L 301.2 193.4 L 311.3 189 L 338.6 193.4 L 348.3 178.1 L 345 165.7 L 360.5 154.7 L 390.2 152.4 L 399.8 143.5 L 427 136.9 L 428.6 123.5 L 440.6 113.6 L 464.8 108.3 L 460.6 98.7 L 474.3 80.5 L 504.3 78 L 512.7 102.1 L 544.9 119.5 L 556.2 118.4 Z" },
  { name: "士林", label: [445, 365], path: "M 632.3 353.3 L 602.3 354.4 L 591.8 368.8 L 570.5 375.6 L 533.9 378.5 L 520.1 397 L 489 398 L 472.2 415.3 L 463.3 416.3 L 435.4 422.1 L 409.5 418.5 L 355 449.7 L 348.1 460.6 L 323.7 451.5 L 278.9 457.7 L 259.8 431.2 L 218.4 403.4 L 187.1 391.8 L 130.1 389.5 L 95 373.7 L 108.9 347.4 L 132.2 360.5 L 157.9 363 L 218.2 349.8 L 244.7 360.7 L 250.2 399.4 L 292.6 406.3 L 327.1 395.7 L 342.7 368.4 L 360.7 356.5 L 352.1 343.7 L 363.7 326.1 L 382.6 312.3 L 378.6 295.3 L 390.6 285.5 L 420.4 274.9 L 438.3 273.9 L 450.5 264.7 L 452.8 250.5 L 479.9 219 L 496.3 213.9 L 505.6 191.7 L 497 178.5 L 513.3 167.4 L 524.3 152.2 L 520.9 137.5 L 556.2 118.4 L 583.3 119.3 L 586.9 137.3 L 574.9 156.7 L 584 169.9 L 577.9 180.7 L 560.7 191.9 L 560 200.3 L 596 210.4 L 609.6 209.9 L 617 227.6 L 608.8 243.3 L 624.6 249.5 L 632.5 268.2 L 664.7 289.6 L 666.6 319 L 632.3 353.3 Z" },
  { name: "內湖", label: [675, 420], path: "M 632.3 353.3 L 639.1 366.8 L 679.9 374.7 L 708.9 383.2 L 739.5 403.2 L 760.1 433.4 L 743.5 451 L 732.4 482.4 L 711.6 498.7 L 698.3 497.6 L 680.1 510.2 L 634.4 514.4 L 619.9 511.1 L 602.3 523.1 L 571 530.6 L 544.2 534 L 530.8 500.7 L 540.9 476.9 L 538 468.6 L 534 460.7 L 513.1 456.5 L 498 439.7 L 468.2 423.8 L 463.3 416.3 L 472.2 415.3 L 489 398 L 520.1 397 L 533.9 378.5 L 570.5 375.6 L 591.8 368.8 L 602.3 354.4 L 632.3 353.3 Z" },
  { name: "大同", label: [311.2, 501.4], path: "M 348.1 460.6 L 340.1 472.1 L 334.4 496.6 L 340.3 510 L 339.1 535.8 L 333.2 543.7 L 302.1 543.8 L 278.7 539.7 L 284.8 528.4 L 282.5 507.8 L 288 481.4 L 278.9 457.7 L 323.7 451.5 L 348.1 460.6 Z" },
  { name: "中山", label: [388.8, 498.5], path: "M 463.3 416.3 L 468.2 423.8 L 498 439.7 L 513.1 456.5 L 534 460.7 L 538 468.6 L 529.1 463.2 L 506.2 473.7 L 465.2 464.9 L 450.1 478 L 411 477.4 L 432.8 489.9 L 430.9 553.7 L 427.6 554.1 L 424.2 554.3 L 420 554.5 L 418.1 554.5 L 408.7 554.3 L 402.6 554.2 L 397.3 553.6 L 395.4 553.3 L 389.7 552.3 L 388.5 552.1 L 333.2 543.7 L 339.1 535.8 L 340.3 510 L 334.4 496.6 L 340.1 472.1 L 348.1 460.6 L 355 449.7 L 409.5 418.5 L 435.4 422.1 L 463.3 416.3 Z" },
  { name: "松山", label: [505.3, 530.3], path: "M 538 468.6 L 540.9 476.9 L 530.8 500.7 L 544.2 534 L 571 530.6 L 571.6 540.6 L 529.7 541.2 L 484.6 552.8 L 483.5 553.1 L 476.3 554.2 L 473.2 554.8 L 471.1 555.1 L 466.5 555 L 464 554.7 L 459.3 554.3 L 455.5 554.1 L 444.2 553.1 L 435.1 553.3 L 431.8 553.7 L 430.9 553.7 L 432.8 489.9 L 411 477.4 L 450.1 478 L 465.2 464.9 L 506.2 473.7 L 529.1 463.2 L 538 468.6 Z" },
  { name: "南港", label: [676.2, 591.1], path: "M 711.6 498.7 L 733 509.1 L 730.7 528.3 L 712.9 544.4 L 734.1 567.7 L 747.3 574.7 L 776.6 580 L 819.9 597.2 L 844 603.8 L 869.5 602.9 L 885 595.5 L 905 597.2 L 897.8 616.6 L 842.8 614.4 L 831.6 620.4 L 815.9 612.6 L 787.5 616.5 L 769 612.1 L 761.6 625.9 L 736.2 633.5 L 682.8 624.4 L 665.1 628.4 L 659.5 639.9 L 638.4 642 L 634 640.4 L 633 640 L 632.6 639.6 L 631.3 638.9 L 630.5 638.8 L 626 639.9 L 624.4 641.2 L 622.5 641.7 L 618.7 641 L 616.1 641.2 L 615.7 641.8 L 615.1 642.4 L 609.8 643.6 L 608.8 643.7 L 605 644.1 L 602.1 644.8 L 601.8 645 L 596.8 645 L 593 645.1 L 591.1 645.7 L 586.7 645.8 L 579.4 647.6 L 578.1 647.6 L 575.6 647.6 L 574.9 647.7 L 574.3 648.1 L 573.1 648.4 L 572.8 648.2 L 572.4 648 L 571.2 647.6 L 568.4 646 L 566.7 645.1 L 566.1 644.7 L 563.6 643.6 L 585.3 629.2 L 591.6 613.4 L 618.2 593.1 L 597.4 563.6 L 574.3 552.7 L 571.6 540.6 L 571 530.6 L 602.3 523.1 L 619.9 511.1 L 634.4 514.4 L 680.1 510.2 L 698.3 497.6 L 711.6 498.7 Z" },
  { name: "萬華", label: [249.1, 588.2], path: "M 302.1 543.8 L 298.1 546.8 L 276.9 597.2 L 308.8 620.8 L 284.6 629.3 L 261.7 649.1 L 232.1 656.1 L 217.1 639.4 L 217.3 616.1 L 197.2 581.5 L 217.3 560.5 L 243.8 559.4 L 265.9 550.7 L 278.7 539.7 L 302.1 543.8 Z" },
  { name: "中正", label: [334, 626], path: "M 333.2 543.7 L 388.5 552.1 L 388.5 556 L 388.1 564.2 L 387.6 586.2 L 387.6 586.3 L 386.8 586.3 L 375.9 585.8 L 357.4 581.6 L 355 581.4 L 349.2 588.7 L 347.5 592.4 L 346.4 597.3 L 347.9 605.4 L 348.1 605.5 L 360.3 617.4 L 362.8 619 L 364.1 619.9 L 371.4 624.7 L 374.2 626.8 L 376.7 628.5 L 378 629.5 L 383.6 633.5 L 385.9 635.2 L 389.3 637.6 L 392.3 639.8 L 393.9 640.9 L 400 645.3 L 404 650.3 L 403 651.3 L 401.5 651.5 L 400 651.8 L 397.7 652.7 L 396.3 653.3 L 393.5 654.7 L 392.3 655.2 L 390.6 655.9 L 387 657.5 L 385.7 658 L 384.7 658.5 L 384.3 658.6 L 360.7 649.4 L 342.7 631.3 L 308.8 620.8 L 276.9 597.2 L 298.1 546.8 L 302.1 543.8 L 333.2 543.7 Z" },
  { name: "大安", label: [446, 646], path: "M 431.8 553.7 L 435.1 553.3 L 444.2 553.1 L 455.5 554.1 L 459.3 554.3 L 464 554.7 L 466.5 555 L 471.1 555.1 L 473.2 554.8 L 476.3 554.2 L 483.5 553.1 L 484.6 552.8 L 484.6 553.6 L 484.6 557.1 L 484.5 560.5 L 484.3 566.2 L 484.3 569.6 L 484.1 575.1 L 483.9 578.7 L 483.9 579.4 L 483.9 582.3 L 483.7 584.5 L 483.7 586.2 L 483.7 588 L 483.5 593 L 483.5 596 L 483.5 598.7 L 482.9 599.3 L 482 600.6 L 480.5 602.4 L 479.7 603.1 L 478 604.4 L 477.2 604.8 L 473.4 607.4 L 469.2 610.2 L 466.3 612.2 L 470 616.5 L 479.7 623.3 L 481 624.2 L 484.3 626.5 L 486.7 628.3 L 487.7 628.9 L 489.8 630.4 L 491.1 631.3 L 493.4 633.2 L 494.8 634.6 L 495.7 636.5 L 499.5 639.5 L 501.6 641 L 502.4 641.8 L 504.7 644.3 L 507 645.6 L 507 648.5 L 507 649.5 L 507.2 650.3 L 507.5 650.9 L 513.3 654.3 L 514.2 654.8 L 515.7 658.1 L 516.7 660.2 L 505.6 660.5 L 487.9 649.2 L 468.4 657 L 435.2 660.5 L 407.6 659 L 404.5 651.1 L 404 650.3 L 400 645.3 L 393.9 640.9 L 392.3 639.8 L 389.3 637.6 L 385.9 635.2 L 383.6 633.5 L 378 629.5 L 376.7 628.5 L 374.2 626.8 L 371.4 624.7 L 364.1 619.9 L 362.8 619 L 360.3 617.4 L 348.1 605.5 L 347.9 605.4 L 346.4 597.3 L 347.5 592.4 L 349.2 588.7 L 355 581.4 L 357.4 581.6 L 375.9 585.8 L 386.8 586.3 L 387.6 586.3 L 387.6 586.2 L 388.1 564.2 L 388.5 556 L 389.7 552.3 L 395.4 553.3 L 397.3 553.6 L 402.6 554.2 L 408.7 554.3 L 418.1 554.5 L 420 554.5 L 424.2 554.3 L 427.6 554.1 L 431.8 553.7 Z" },
  { name: "信義", label: [570, 583], path: "M 571.6 540.6 L 574.3 552.7 L 597.4 563.6 L 618.2 593.1 L 591.6 613.4 L 585.3 629.2 L 563.6 643.6 L 560.7 643.3 L 559.2 642.9 L 557.1 642.5 L 556.4 642.5 L 554.8 643.7 L 553.3 645 L 550.1 645.6 L 545.1 645.5 L 544.3 645.3 L 541.7 644.4 L 540.3 646.7 L 540.1 647.4 L 540.1 648 L 539.8 649.2 L 538.6 650.3 L 537.3 651 L 536.3 651.5 L 532.5 652.8 L 532.1 653 L 530 655.4 L 528.7 655.9 L 526.8 657 L 525.8 657.5 L 523.7 658.1 L 523.2 658.2 L 521.5 659.1 L 519.5 659.6 L 516.9 660.1 L 516.7 660.2 L 515.7 658.1 L 514.2 654.8 L 513.3 654.3 L 507.5 650.9 L 507.2 650.3 L 507 649.5 L 507 648.5 L 507 645.6 L 504.7 644.3 L 502.4 641.8 L 501.6 641 L 499.5 639.5 L 495.7 636.5 L 494.8 634.6 L 493.4 633.2 L 491.1 631.3 L 489.8 630.4 L 487.7 628.9 L 486.7 628.3 L 484.3 626.5 L 481 624.2 L 479.7 623.3 L 470 616.5 L 466.3 612.2 L 469.2 610.2 L 473.4 607.4 L 477.2 604.8 L 478 604.4 L 479.7 603.1 L 480.5 602.4 L 482 600.6 L 482.9 599.3 L 483.5 598.7 L 483.5 596 L 483.5 593 L 483.7 588 L 483.7 586.2 L 483.7 584.5 L 483.9 582.3 L 483.9 579.4 L 483.9 578.7 L 484.1 575.1 L 484.3 569.6 L 484.3 566.2 L 484.5 560.5 L 484.6 557.1 L 484.6 553.6 L 484.6 552.8 L 529.7 541.2 L 571.6 540.6 Z" },
  { name: "文山", label: [528.6, 715.5], path: "M 638.4 642 L 632.1 663 L 651.1 681.6 L 641.8 699.7 L 656.3 711.3 L 648.5 722.8 L 649.6 750.5 L 668.9 757.7 L 692.7 757.2 L 723.4 768.8 L 725.1 778.8 L 702.1 780.8 L 681.9 790.2 L 637.6 798 L 623.3 787.3 L 593.5 790.2 L 566.1 780.4 L 544 787.5 L 498.4 785.9 L 466.7 739.4 L 470 729 L 434.9 730.6 L 431.1 717.6 L 403.8 716.4 L 401.5 700.8 L 383.6 698.9 L 379.2 689.4 L 392.1 673.3 L 384.3 658.6 L 384.7 658.5 L 385.7 658 L 387 657.5 L 390.6 655.9 L 392.3 655.2 L 393.5 654.7 L 396.3 653.3 L 397.7 652.7 L 400 651.8 L 401.5 651.5 L 403 651.3 L 404.5 651.1 L 407.6 659 L 435.2 660.5 L 468.4 657 L 487.9 649.2 L 505.6 660.5 L 516.7 660.2 L 516.9 660.1 L 519.5 659.6 L 521.5 659.1 L 523.2 658.2 L 523.7 658.1 L 525.8 657.5 L 526.8 657 L 528.7 655.9 L 530 655.4 L 532.1 653 L 532.5 652.8 L 536.3 651.5 L 537.3 651 L 538.6 650.3 L 539.8 649.2 L 540.1 648 L 540.1 647.4 L 540.3 646.7 L 541.7 644.4 L 544.3 645.3 L 545.1 645.5 L 550.1 645.6 L 553.3 645 L 554.8 643.7 L 556.4 642.5 L 557.1 642.5 L 559.2 642.9 L 560.7 643.3 L 563.6 643.6 L 566.1 644.7 L 566.7 645.1 L 568.4 646 L 571.2 647.6 L 572.4 648 L 572.8 648.2 L 573.1 648.4 L 574.3 648.1 L 574.9 647.7 L 575.6 647.6 L 578.1 647.6 L 579.4 647.6 L 586.7 645.8 L 591.1 645.7 L 593 645.1 L 596.8 645 L 601.8 645 L 602.1 644.8 L 605 644.1 L 608.8 643.7 L 609.8 643.6 L 615.1 642.4 L 615.7 641.8 L 616.1 641.2 L 618.7 641 L 622.5 641.7 L 624.4 641.2 L 626 639.9 L 630.5 638.8 L 631.3 638.9 L 632.6 639.6 L 633 640 L 634 640.4 L 638.4 642 Z" }
];

const districtLabelSlots = {
  "北投": [395, 225],
  "士林": [445, 365],
  "內湖": [675, 420],
  "大同": [315, 470],
  "中山": [420, 445],
  "松山": [500, 475],
  "南港": [785, 585],
  "萬華": [235, 550],
  "中正": [330, 610],
  "大安": [450, 648],
  "信義": [555, 550],
  "文山": [575, 735]
};

function districtLabelPosition(district) {
  return districtLabelSlots[district.name] || district.label;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);
}

function normalizeName(name) {
  return String(name || "")
    .replace(/[臺台]/g, "台")
    .replace(/附設民眾診療服務處/g, "")
    .replace(/臺北市立|台北市立|醫療財團法人|財團法人|委託.*辦理/g, "")
    .replace(/[（）()\s－-]/g, "")
    .replace(/綜合醫院|紀念醫院|醫院/g, "");
}

function matchHospital(liveName) {
  const live = normalizeName(liveName);
  const candidates = hospitals
    .map((hospital) => ({
      hospital,
      names: [hospital.name, hospital.shortName, ...(hospital.aliases || [])]
        .filter(Boolean)
        .map((name) => normalizeName(name))
        .filter((name) => name.length >= 2)
        .sort((a, b) => b.length - a.length)
    }))
    .sort((a, b) => (b.names[0]?.length || 0) - (a.names[0]?.length || 0));

  return candidates.find(({ names }) => {
    return names.some((name) => {
      if (live === name) return true;
      if (name.length < 3 || live.length < 3) return false;
      return live.includes(name) || name.includes(live);
    });
  })?.hospital;
}

function safeInt(value) {
  const number = Number.parseInt(value, 10);
  return Number.isFinite(number) ? number : null;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function project(point) {
  const x = mapFrame.left + ((point.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * mapFrame.width;
  const y = mapFrame.top + ((bounds.maxLat - point.lat) / (bounds.maxLat - bounds.minLat)) * mapFrame.height;
  return {
    x: clamp(x, 38, 962),
    y: clamp(y, 38, 810)
  };
}

function kmBetween(a, b) {
  const r = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function fallbackRouteMetric(hospital) {
  if (!selectedDistrict) return null;
  const distance = kmBetween(selectedDistrict, hospital);
  return {
    distance,
    duration: Math.round(distance / 28 * 60 + 5),
    estimated: true
  };
}

function metricFor(hospital) {
  if (!selectedDistrict) return null;
  return routeMetrics.get(hospital.id) || fallbackRouteMetric(hospital);
}

function timeText(metric) {
  if (!metric) return "-";
  const minutes = Math.max(1, Math.round(metric.duration));
  return `${minutes} 分`;
}

function distanceText(metric) {
  if (!metric) return "-";
  return `${metric.distance.toFixed(1)} km`;
}

function filteredHospitals() {
  if (selectedCapability === "all") return hospitals;
  return hospitals.filter((hospital) => ["full", "partial"].includes(hospital.capabilities[selectedCapability]));
}

function levelBadge(level) {
  return `<span class="level ${levelClass[level] || "general"}">${escapeHtml(level)}</span>`;
}

function capabilityBadges(hospital) {
  return Object.entries(capabilityLabels).map(([key, label]) => {
    const value = hospital.capabilities[key] || "none";
    return `<span class="badge ${value}" title="${escapeHtml(hospital.notes?.[key] || "")}">${label}:${capabilityText[value]}</span>`;
  }).join("");
}

function liveBadge(status) {
  if (!status) return `<span class="badge none">無即時資料</span>`;
  const full = status.full119 ? `<span class="badge full119">119滿床</span>` : `<span class="badge live">未通報滿床</span>`;
  const see = status.waitSee === null ? "-" : status.waitSee;
  const admit = status.waitAdmit === null ? "-" : status.waitAdmit;
  const icu = status.waitIcu === null ? "-" : status.waitIcu;
  return `${full}<span class="badge live">候診 ${see}</span><span class="badge live">等住院 ${admit}</span><span class="badge live">等 ICU ${icu}</span>`;
}

function mapLabel(hospital) {
  const labels = {
    ntuh: "臺大",
    ho_ping: "聯醫和平",
    west_garden: "西園",
    zhongxing: "聯醫中興",
    cheng_hsin: "振興",
    vghtpe: "北榮",
    pojen: "博仁",
    tri_songshan: "三總松山",
    tai_an: "臺安",
    tmuh: "北醫附醫",
    mackay: "馬偕",
    wanfang: "萬芳",
    zhongxiao: "聯醫忠孝",
    renai: "聯醫仁愛",
    cathay: "國泰",
    shin_kong: "新光",
    yangming: "聯醫陽明",
    tri_service: "三總"
  };
  return labels[hospital.id] || hospital.shortName || hospital.name;
}

function sortedByTravel() {
  if (!selectedDistrict) return [];
  return filteredHospitals()
    .map((hospital) => ({ hospital, metric: metricFor(hospital) }))
    .sort((a, b) => a.metric.duration - b.metric.duration || a.metric.distance - b.metric.distance);
}

function routeDeltaText(baseMetric, compareMetric) {
  if (!baseMetric || !compareMetric) return "";
  const delta = Math.round(baseMetric.duration - compareMetric.duration);
  if (delta > 0) return `比北醫快 ${delta} 分`;
  if (delta < 0) return `比北醫慢 ${Math.abs(delta)} 分`;
  return "與北醫相近";
}

function routeObstacles() {
  const hospitalBoxes = Object.values(labelSlots)
    .map(([x, y]) => ({ left: x - 12, right: x + 98, top: y - 34, bottom: y + 18 }));
  const districtBoxes = districtRegions.map((district) => {
    const [x, y] = districtLabelPosition(district);
    return { left: x - 40, right: x + 40, top: y - 22, bottom: y + 18 };
  });
  return [
    ...hospitalBoxes,
    ...districtBoxes,
    { left: 630, right: 904, top: 654, bottom: 840 }
  ];
}

function routeAroundLabels(start, target) {
  const step = 12;
  const minX = 100;
  const maxX = 900;
  const minY = 82;
  const maxY = 798;
  const cols = Math.floor((maxX - minX) / step) + 1;
  const rows = Math.floor((maxY - minY) / step) + 1;
  const obstacles = routeObstacles();
  const toGrid = (point) => ({
    col: clamp(Math.round((point.x - minX) / step), 0, cols - 1),
    row: clamp(Math.round((point.y - minY) / step), 0, rows - 1)
  });
  const toPoint = ({ col, row }) => ({ x: minX + col * step, y: minY + row * step });
  const keyFor = ({ col, row }) => `${col}:${row}`;
  const startGrid = toGrid(start);
  const targetGrid = toGrid(target);
  const startKey = keyFor(startGrid);
  const targetKey = keyFor(targetGrid);
  const blocked = ({ col, row }) => {
    const key = `${col}:${row}`;
    if (key === startKey || key === targetKey) return false;
    const point = toPoint({ col, row });
    return obstacles.some((box) => point.x >= box.left && point.x <= box.right && point.y >= box.top && point.y <= box.bottom);
  };
  const directions = [
    [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
    [1, 1, 1.414], [1, -1, 1.414], [-1, 1, 1.414], [-1, -1, 1.414]
  ];
  const open = [{ ...startGrid, f: 0 }];
  const cameFrom = new Map();
  const scores = new Map([[startKey, 0]]);
  const visited = new Set();
  const heuristic = (node) => Math.hypot(node.col - targetGrid.col, node.row - targetGrid.row);

  while (open.length) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift();
    const currentKey = keyFor(current);
    if (visited.has(currentKey)) continue;
    if (currentKey === targetKey) {
      const gridPath = [current];
      let cursorKey = currentKey;
      while (cameFrom.has(cursorKey)) {
        const previous = cameFrom.get(cursorKey);
        gridPath.push(previous);
        cursorKey = keyFor(previous);
      }
      gridPath.reverse();
      const points = [start, ...gridPath.map(toPoint), target];
      return points.filter((point, index) => {
        if (index === 0 || index === points.length - 1) return true;
        const previous = points[index - 1];
        const next = points[index + 1];
        return (point.x - previous.x) * (next.y - point.y) !== (point.y - previous.y) * (next.x - point.x);
      });
    }
    visited.add(currentKey);
    for (const [dc, dr, cost] of directions) {
      const next = { col: current.col + dc, row: current.row + dr };
      if (next.col < 0 || next.col >= cols || next.row < 0 || next.row >= rows || blocked(next)) continue;
      if (dc && dr && (blocked({ col: current.col + dc, row: current.row }) || blocked({ col: current.col, row: current.row + dr }))) continue;
      const nextKey = keyFor(next);
      const score = scores.get(currentKey) + cost;
      if (score >= (scores.get(nextKey) ?? Infinity)) continue;
      cameFrom.set(nextKey, current);
      scores.set(nextKey, score);
      open.push({ ...next, f: score + heuristic(next) });
    }
  }
  return [start, target];
}

function routePathData(points) {
  return points.map((point, index) => `${index ? "L" : "M"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
}

function drawCuteMap() {
  const tmuh = hospitals.find((hospital) => hospital.id === tmuhId);
  const [tmuhLabelX, tmuhLabelY] = labelSlots[tmuhId];
  const tmuhVisualTarget = { x: tmuhLabelX + 111, y: tmuhLabelY - 8 };
  const origin = selectedDistrict ? project(selectedDistrict) : null;
  const districtAreas = districtRegions.map((district, index) => {
    return `
      <g class="district-region tone-${index % 4}">
        <path d="${district.path}" />
      </g>
    `;
  }).join("");
  const districtNames = districtRegions.map((district) => {
    const [labelX, labelY] = districtLabelPosition(district);
    return `<text class="district-name" x="${labelX}" y="${labelY}">${escapeHtml(district.name)}區</text>`;
  }).join("");
  const districtClipShapes = districtRegions.map((district) => `<path d="${district.path}" />`).join("");
  const routePath = origin ? routePathData(routeAroundLabels(origin, tmuhVisualTarget)) : "";
  const ambulanceRoute = origin ? `
    <g class="tmuh-route-layer">
      <path class="tmuh-route-halo" d="${routePath}" />
      <path id="tmuhRoutePath" class="tmuh-route" d="${routePath}" />
      <g class="ambulance-car">
        <rect class="ambulance-body" x="-18" y="-9" width="27" height="16" rx="5" />
        <rect class="ambulance-cab" x="3" y="-13" width="15" height="20" rx="5" />
        <rect class="ambulance-window" x="8" y="-10" width="6" height="6" rx="2" />
        <path class="ambulance-cross" d="M -8 -5 L -8 1 M -11 -2 L -5 -2" />
        <circle class="ambulance-wheel" cx="-10" cy="8" r="3" />
        <circle class="ambulance-wheel" cx="9" cy="8" r="3" />
        <animateMotion dur="4.6s" repeatCount="indefinite" rotate="auto">
          <mpath href="#tmuhRoutePath" />
        </animateMotion>
      </g>
    </g>
  ` : "";

  const hospitalNodes = hospitals.map((hospital) => {
    const p = project(hospital);
    const [labelX, labelY] = labelSlots[hospital.id] || [p.x + 16, p.y - 16];
    return `
      <g class="map-hospital ${levelClass[hospital.level] || "general"} ${hospital.id === tmuhId ? "tmuh" : ""}" data-id="${hospital.id}">
        <g class="map-label">
          <rect x="${labelX}" y="${labelY - 22}" width="86" height="28" rx="8" />
          <text class="map-name" x="${labelX + 43}" y="${labelY - 3}">${escapeHtml(mapLabel(hospital))}</text>
        </g>
      </g>
    `;
  }).join("");

  cuteMap.innerHTML = `
    <defs>
      <pattern id="softGrid" width="34" height="34" patternUnits="userSpaceOnUse">
        <path d="M 34 0 L 0 0 0 34" fill="none" stroke="#e9d8c9" stroke-width="1" opacity=".55" />
      </pattern>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#9b8273" flood-opacity=".18" />
      </filter>
      <clipPath id="taipeiClip">
        ${districtClipShapes}
      </clipPath>
    </defs>
    <rect class="map-paper" x="0" y="0" width="1000" height="860" rx="28" />
    <rect x="24" y="24" width="952" height="812" rx="24" fill="url(#softGrid)" opacity=".36" />
    <g class="district-layer">
      ${districtAreas}
    </g>
    <path class="river" clip-path="url(#taipeiClip)" d="M 58 324 C 176 283, 238 386, 365 360 S 566 222, 748 296 S 906 408, 962 354" />
    ${hospitalNodes}
    ${origin ? `<g class="tmuh-destination">
      <circle cx="${tmuhVisualTarget.x}" cy="${tmuhVisualTarget.y}" r="7" />
      <path d="M ${tmuhVisualTarget.x - 8} ${tmuhVisualTarget.y} L ${tmuhLabelX + 91} ${tmuhLabelY - 8}" />
    </g>` : ""}
    ${ambulanceRoute}
    ${origin ? `<g class="origin-pin">
      <circle cx="${origin.x}" cy="${origin.y}" r="18" />
      <text x="${origin.x}" y="${origin.y + 5}">起</text>
      <text class="origin-label" x="${clamp(origin.x + 20, 34, 820)}" y="${clamp(origin.y - 18, 28, 805)}">起點</text>
    </g>` : ""}
    <g class="district-names">
      ${districtNames}
    </g>
    <g class="map-note">
      <rect x="642" y="666" width="250" height="165" rx="14" />
      <text class="note-title" x="671" y="688">圖例</text>
      <rect class="legend-box tmuh" x="671" y="705" width="34" height="18" rx="6" />
      <text x="714" y="719">北醫附醫</text>
      <rect class="legend-box severe" x="671" y="730" width="34" height="18" rx="6" />
      <text x="714" y="744">重度級急救責任醫院</text>
      <rect class="legend-box moderate" x="671" y="755" width="34" height="18" rx="6" />
      <text x="714" y="769">中度級急救責任醫院</text>
      <rect class="legend-box general" x="671" y="780" width="34" height="18" rx="6" />
      <text x="714" y="794">一般級急救責任醫院</text>
      <path class="legend-boundary" d="M 671 815 L 705 815" />
      <text x="714" y="819">淡色區塊：行政區示意</text>
    </g>
  `;

  cuteMap.querySelectorAll(".map-hospital").forEach((node) => {
    node.addEventListener("click", () => {
      const hospital = hospitals.find((item) => item.id === node.dataset.id);
      if (!hospital) return;
      selectedCapability = selectedCapability;
      showHospitalToast(hospital);
    });
  });
}

function showHospitalToast(hospital) {
  const status = erStatus.get(hospital.id);
  const metric = metricFor(hospital);
  verdict.innerHTML = `
    <div class="verdict-card">
      <strong>${escapeHtml(hospital.shortName || hospital.name)}</strong>
      <p class="sub">${escapeHtml(hospital.district)} | ${hospital.level}${metric ? ` | ${timeText(metric)} / ${distanceText(metric)}` : ""}${status ? ` | 候診 ${status.waitSee ?? "-"}、等住院 ${status.waitAdmit ?? "-"}、等 ICU ${status.waitIcu ?? "-"}` : " | 目前沒有即時急診資料"}</p>
    </div>
  `;
}

function renderVerdict() {
  mapFocus.textContent = selectedDistrict ? `${selectedDistrict.name} → 北醫附醫` : "等待地址";
  routeSource.textContent = routeMode;
  if (!selectedDistrict) {
    tmuhRank.textContent = "";
    verdict.innerHTML = `
      <div class="verdict-card quiet">
        <strong>先輸入EMT接觸地點</strong>
        <p class="sub">選定候選地址後，這裡會直接判讀送北醫是否疑似跨區，並把更近的急診醫院排在下面。</p>
      </div>
    `;
    return;
  }
  const tmuh = hospitals.find((hospital) => hospital.id === tmuhId);
  const allRanks = hospitals
    .map((hospital) => ({ hospital, metric: metricFor(hospital) }))
    .sort((a, b) => a.metric.duration - b.metric.duration || a.metric.distance - b.metric.distance);
  const ranked = sortedByTravel();
  const tmuhGlobal = allRanks.findIndex((item) => item.hospital.id === tmuhId) + 1;
  const tmuhFiltered = ranked.findIndex((item) => item.hospital.id === tmuhId) + 1;
  const tmuhMetric = metricFor(tmuh);
  const originDistrict = selectedDistrict.district || (selectedDistrict.name?.endsWith("區") ? selectedDistrict.name : "");
  const sameDistrict = originDistrict ? originDistrict === tmuhDistrict : false;
  const nearest = ranked[0]?.hospital;
  const capLabel = selectedCapability === "all" ? "不限特殊能力" : `${capabilityLabels[selectedCapability]}能力`;
  const capabilityNote = selectedCapability === "all"
    ? `以全部急診責任醫院排序，北醫為第 ${tmuhGlobal} 近。`
    : (tmuhFiltered > 0 ? `在具 ${capLabel} 的醫院中，北醫為第 ${tmuhFiltered} 近。` : `北醫未被標示為具 ${capLabel}。`);
  const nearerHospitals = allRanks
    .filter((item) => item.hospital.id !== tmuhId && item.metric.duration < tmuhMetric.duration - 1)
    .slice(0, 3);
  const sameDistrictHospitals = originDistrict
    ? allRanks.filter((item) => item.hospital.district === originDistrict && item.hospital.id !== tmuhId).slice(0, 3)
    : [];
  const verdictClass = !originDistrict ? "neutral" : (sameDistrict ? "ok" : "alert");
  const verdictTitle = !originDistrict
    ? "行政區待確認"
    : (sameDistrict ? "信義區內送北醫" : "疑似跨區送北醫");
  const districtText = originDistrict
    ? `案發行政區：${originDistrict}；北醫所在行政區：${tmuhDistrict}。`
    : "目前地址結果沒有明確行政區，請用候選清單中較完整的地址。";
  const nearerText = nearerHospitals.length
    ? `較快急診：${nearerHospitals.map(({ hospital, metric }) => `${hospital.shortName || hospital.name} ${timeText(metric)}`).join("、")}。`
    : "北醫已是目前條件下最快或相近的急診之一。";
  const sameDistrictText = sameDistrictHospitals.length
    ? `同區急診：${sameDistrictHospitals.map(({ hospital, metric }) => `${hospital.shortName || hospital.name} ${timeText(metric)}`).join("、")}。`
    : "";

  tmuhRank.textContent = capabilityNote;
  verdict.innerHTML = `
    <div class="verdict-card ${verdictClass}">
      <strong>${verdictTitle}</strong>
      <p class="sub">${districtText} 送北醫估 ${timeText(tmuhMetric)}、${distanceText(tmuhMetric)}；${capabilityNote}</p>
      <p class="sub">${nearerText}${sameDistrictText ? ` ${sameDistrictText}` : ""}</p>
    </div>
  `;
}

function renderNearest() {
  if (!selectedDistrict) {
    nearestList.innerHTML = `<div class="empty-state">輸入地址後顯示各院車程排序。</div>`;
    return;
  }
  const tmuh = hospitals.find((hospital) => hospital.id === tmuhId);
  const items = sortedByTravel().slice(0, 8);
  nearestList.innerHTML = items.map((item, index) => {
    const hospital = item.hospital;
    const status = erStatus.get(hospital.id);
    return `
      <article class="nearest-item">
        <span class="rank">${index + 1}</span>
        <div>
          <div class="name-line">${escapeHtml(hospital.shortName || hospital.name)} ${levelBadge(hospital.level)}</div>
          <div class="meta">${escapeHtml(hospital.district)}${hospital.id === tmuhId ? " | 送達目標" : ""} | ${routeDeltaText(metricFor(tmuh), item.metric)} | ${liveBadge(status)}</div>
        </div>
        <div class="distance"><b>${timeText(item.metric)}</b><span>${distanceText(item.metric)}</span></div>
      </article>
    `;
  }).join("");
}

function renderHospitalCards() {
  const ordered = [...hospitals].sort((a, b) => {
    const levelScore = { "重度級": 0, "中度級": 1, "一般級": 2 };
    return levelScore[a.level] - levelScore[b.level] || a.district.localeCompare(b.district, "zh-Hant");
  });
  hospitalCards.innerHTML = ordered.map((hospital) => {
    const status = erStatus.get(hospital.id);
    const metric = metricFor(hospital);
    return `
      <article class="hospital-card">
        <div class="name-line">${escapeHtml(hospital.shortName || hospital.name)} ${levelBadge(hospital.level)}</div>
        <div class="meta">${escapeHtml(hospital.district)} | ${escapeHtml(hospital.address)}${metric ? ` | 估 ${timeText(metric)} / ${distanceText(metric)}` : ""}</div>
        <div class="badge-row">${liveBadge(status)}</div>
        <div class="badge-row">${capabilityBadges(hospital)}</div>
      </article>
    `;
  }).join("");
}

function renderAll() {
  renderVerdict();
  renderNearest();
  renderHospitalCards();
  drawCuteMap();
}

async function updateRoutes() {
  if (!selectedDistrict) {
    routeMetrics = new Map();
    routeMode = "道路車程";
    renderAll();
    return;
  }
  routeMode = "車程估算中";
  routeMetrics = new Map(hospitals.map((hospital) => [hospital.id, fallbackRouteMetric(hospital)]));
  renderAll();
  routeSource.textContent = routeMode;
  const destinations = hospitals.map((hospital) => ({ id: hospital.id, lat: hospital.lat, lng: hospital.lng }));
  try {
    let result;
    if (sameOriginApiAvailable) {
      try {
        result = await fetch("/api/routes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin: { lat: selectedDistrict.lat, lng: selectedDistrict.lng },
            destinations
          })
        }).then((response) => {
          if (!response.ok) throw new Error(`routes ${response.status}`);
          return response.json();
        });
      } catch {
        result = null;
      }
    }
    if (!result) {
      const coordinates = [
        { lat: selectedDistrict.lat, lng: selectedDistrict.lng },
        ...destinations
      ].map((point) => `${point.lng},${point.lat}`).join(";");
      const params = new URLSearchParams({ sources: "0", annotations: "duration,distance" });
      result = await fetch(`https://router.project-osrm.org/table/v1/driving/${coordinates}?${params}`).then((response) => {
        if (!response.ok) throw new Error(`osrm ${response.status}`);
        return response.json();
      });
    }
    routeMetrics = new Map();
    destinations.forEach((destination, index) => {
      const duration = result.durations?.[0]?.[index + 1];
      const distance = result.distances?.[0]?.[index + 1];
      const hospital = hospitals.find((item) => item.id === destination.id);
      if (Number.isFinite(duration) && Number.isFinite(distance)) {
        routeMetrics.set(destination.id, {
          duration: duration / 60,
          distance: distance / 1000,
          estimated: false
        });
      } else if (hospital) {
        routeMetrics.set(destination.id, fallbackRouteMetric(hospital));
      }
    });
    routeMode = "OSRM 車程估算";
  } catch (error) {
    routeMetrics = new Map(hospitals.map((hospital) => [hospital.id, fallbackRouteMetric(hospital)]));
    routeMode = "直線距離換算";
    console.warn(error);
  } finally {
    renderAll();
  }
}

async function refreshErStatus() {
  livePill.className = "live-pill";
  livePill.textContent = "讀取即時急診";
  refreshButton.disabled = true;
  try {
    let result;
    if (sameOriginApiAvailable) {
      try {
        result = await fetch("/api/er-status").then((response) => {
          if (!response.ok) throw new Error(`status ${response.status}`);
          return response.json();
        });
      } catch {
        result = null;
      }
    }
    if (!result) {
      result = await fetch("./data/er-status.json", { cache: "no-store" }).then((response) => {
        if (!response.ok) throw new Error(`static status ${response.status}`);
        return response.json();
      });
    }
    erStatus = new Map();
    (result.data || []).forEach((item) => {
      const hasLiveCounts = [item.waiT_SEE_CNT, item.waiT_GENERAL_CNT, item.waiT_ICU_CNT].some((value) => value !== null && value !== undefined);
      if (!hasLiveCounts) return;
      const hospital = matchHospital(item.hosP_NAME);
      if (!hospital) return;
      erStatus.set(hospital.id, {
        sourceName: item.hosP_NAME,
        full119: item.inform === "Y",
        waitSee: safeInt(item.waiT_SEE_CNT),
        waitBed: safeInt(item.waiT_BED_CNT),
        waitAdmit: safeInt(item.waiT_GENERAL_CNT),
        waitIcu: safeInt(item.waiT_ICU_CNT),
        updatedAt: item.txT_DATE
      });
    });
    livePill.className = "live-pill ok";
    livePill.textContent = `即時 ${result.sysdate || "已更新"}`;
  } catch (error) {
    livePill.className = "live-pill warn";
    livePill.textContent = "即時資料失敗";
    console.error(error);
  } finally {
    refreshButton.disabled = false;
    renderAll();
  }
}

function initControls() {
  addressInput.value = "";
  addressInput.addEventListener("input", () => {
    window.clearTimeout(suggestionTimer);
    const query = addressInput.value.trim();
    if (query.length < 2) {
      suggestions.hidden = true;
      suggestions.innerHTML = "";
      return;
    }
    suggestionTimer = window.setTimeout(() => searchSuggestions(query), 260);
  });
  addressInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const first = suggestions.querySelector("button");
      if (first) first.click();
    }
  });
  capabilitySelect.addEventListener("change", () => {
    selectedCapability = capabilitySelect.value;
    renderAll();
  });
  refreshButton.addEventListener("click", refreshErStatus);
}

async function searchSuggestions(query) {
  suggestions.hidden = false;
  suggestions.innerHTML = `<div class="suggestion-note">搜尋中...</div>`;
  try {
    let result;
    if (sameOriginApiAvailable) {
      try {
        result = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`).then((response) => {
          if (!response.ok) throw new Error(`geocode ${response.status}`);
          return response.json();
        });
      } catch {
        result = null;
      }
    }
    if (!result) {
      result = { results: await browserGeocode(query) };
    }
    const items = result.results || [];
    if (!items.length) {
      suggestions.innerHTML = `<div class="suggestion-note">找不到候選地址</div>`;
      return;
    }
    suggestions.innerHTML = items.map((item, index) => `
      <button type="button" data-index="${index}">
        <strong>${escapeHtml(item.label.split(",")[0])}</strong>
        <span>${escapeHtml(item.label)}</span>
      </button>
    `).join("");
    suggestions.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const item = items[Number(button.dataset.index)];
        selectedDistrict = {
          id: "address",
          name: item.label.split(",")[0] || "地址位置",
          label: item.label,
          district: item.district,
          lat: item.lat,
          lng: item.lng,
          source: "address"
        };
        addressInput.value = selectedDistrict.name;
        suggestions.hidden = true;
        updateRoutes();
      });
    });
  } catch (error) {
    suggestions.innerHTML = `<div class="suggestion-note">地址提示暫時失敗</div>`;
    console.warn(error);
  }
}

async function browserGeocode(query) {
  const variants = buildBrowserGeocodeQueries(query);
  const seen = new Set();
  const output = [];
  for (const q of variants) {
    const params = new URLSearchParams({
      q,
      format: "jsonv2",
      addressdetails: "1",
      limit: "6",
      countrycodes: "tw",
      "accept-language": "zh-TW",
      viewbox: "121.42,25.20,121.70,24.92",
      bounded: "0"
    });
    try {
      const rows = await fetch(`https://nominatim.openstreetmap.org/search?${params}`).then((response) => response.json());
      rows.forEach((item) => {
        const lat = Number(item.lat);
        const lng = Number(item.lon);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
        const key = `${Math.round(lat * 10000)}:${Math.round(lng * 10000)}`;
        if (seen.has(key)) return;
        seen.add(key);
        output.push({
          label: item.display_name,
          lat,
          lng,
          district: item.address?.city_district || item.address?.suburb || item.address?.borough || "",
          source: "osm"
        });
      });
    } catch {
      // Keep trying other variants.
    }
    if (output.length >= 5) break;
  }
  return output.slice(0, 8);
}

function buildBrowserGeocodeQueries(query) {
  const trimmed = query.trim();
  const hasCity = /台北|臺北|新北|基隆|桃園/.test(trimmed);
  const variants = [trimmed];
  if (!hasCity) variants.push(`臺北市 ${trimmed}`, `台北市 ${trimmed}`);
  variants.push(`${trimmed} 台灣`);
  return [...new Set(variants)].filter(Boolean);
}

initControls();
renderAll();
refreshErStatus();
