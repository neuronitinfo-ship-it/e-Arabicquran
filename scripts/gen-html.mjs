import { readdirSync, writeFileSync } from "fs";
const a = readdirSync("dist/client/assets");
const css = a.find(f => f.endsWith(".css"));
const js = a.find(f => f.startsWith("index-") && f.endsWith(".js"));
writeFileSync("dist/client/index.html", `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>
<title>e-Arabicquran</title>
<link rel="manifest" href="/manifest.webmanifest"/>
<link rel="icon" href="/icon.svg" type="image/svg+xml"/>
<link rel="stylesheet" href="/assets/${css}"/>
</head><body>
<script type="module" src="/assets/${js}"></script>
</body></html>`);
console.log("index.html generated");
