import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CELL = 80;
const MAX_SIZE = 3000;

const inputPath = path.resolve(__dirname, "../public/images/logo.png");
const outputPath = path.resolve(__dirname, "../public/images/logo-pixelated.png");

async function pixelate() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const cols = Math.ceil(w / CELL);
  const rows = Math.ceil(h / CELL);

  // 1px per cell buffer (RGBA)
  const out = Buffer.alloc(cols * rows * 4);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x0 = col * CELL,
        y0 = row * CELL;
      const x1 = Math.min(x0 + CELL, w),
        y1 = Math.min(y0 + CELL, h);
      let opaqueCount = 0,
        totalCount = 0;
      let rSum = 0,
        gSum = 0,
        bSum = 0;

      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * w + x) * 4;
          totalCount++;
          if (data[i + 3] > 128) {
            opaqueCount++;
            rSum += data[i];
            gSum += data[i + 1];
            bSum += data[i + 2];
          }
        }
      }

      const oi = (row * cols + col) * 4;
      if (opaqueCount > totalCount / 2 && opaqueCount > 0) {
        out[oi] = Math.round(rSum / opaqueCount);
        out[oi + 1] = Math.round(gSum / opaqueCount);
        out[oi + 2] = Math.round(bSum / opaqueCount);
        out[oi + 3] = 255;
      } else {
        out[oi + 3] = 0;
      }
    }
  }

  // Scale up to max 500px, nearest-neighbor
  const scale = Math.min(MAX_SIZE / cols, MAX_SIZE / rows);
  const outW = Math.round(cols * scale);
  const outH = Math.round(rows * scale);

  const pixelated = sharp(out, { raw: { width: cols, height: rows, channels: 4 } });

  await pixelated
    .clone()
    .resize(outW, outH, { kernel: sharp.kernel.nearest })
    .png()
    .toFile(outputPath);
  console.log(`Done: ${outputPath} (${outW}x${outH}, ${cols}x${rows} cells)`);

}

pixelate();
