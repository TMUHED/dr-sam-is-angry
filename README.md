# 反正都送北醫

Dr.Sam is Angry

臺北市急診內部快速判讀工具，用來協助查看 EMT 送北醫是否疑似跨區，並比較案發位置到臺北市急救責任醫院的估算車程、急救責任醫院等級、特殊處置能力與急診即時狀態。

## Privacy

This tool is for operational reference only. Do not enter patient names, ID numbers, phone numbers, medical record numbers, or other personally identifiable health information.

## Local

```sh
npm start
```

Open `http://127.0.0.1:5177/`.

## Static Deploy

GitHub Pages can serve the `public/` folder. The workflow in `.github/workflows/pages.yml` refreshes `public/data/er-status.json` from the NHI ER status API on a schedule before deployment.
