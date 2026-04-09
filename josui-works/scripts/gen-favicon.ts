import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.resolve(__dirname, "../public/images/logo-pixelated.png");
const faviconPath = path.resolve(__dirname, "../public/favicon.svg");

async function main() {
  // Get the tiny pixelated grid (before upscale) by reading and downscaling
  const meta = await sharp(inputPath).metadata();
  // logo-pixelated is 38x38 cells upscaled to 3000x3000, so shrink back to 38x38
  const cellSize = 38;
  const png32 = await sharp(inputPath)
    .resize(cellSize, cellSize, { kernel: sharp.kernel.nearest })
    .resize(32, 32, { kernel: sharp.kernel.nearest })
    .png()
    .toBuffer();

  const b64 = png32.toString("base64");

  // Stretch vertically by 1/5
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    image { image-rendering: pixelated; }
    @media (prefers-color-scheme: dark) {
      image { filter: invert(1); }
    }
  </style>
  <image width="32" height="32" transform="scale(1, 1.143) translate(0, -3)" href="data:image/png;base64,${b64}"/>
</svg>`;

  fs.writeFileSync(faviconPath, svg);
  console.log(`Done: ${faviconPath} (${png32.length} bytes PNG)`);
}

main();
