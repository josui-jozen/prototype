import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname, "../public/sentences");
const OUT_DIR = path.resolve(__dirname, "../public/handwriting");

const FG = { r: 0xe4, g: 0xe5, b: 0xe6 };
const BG = { r: 0x37, g: 0x37, b: 0x37 };
const THRESHOLD = 140;

async function process(file: string) {
  const inputPath = path.join(SRC_DIR, file);
  const base = path.parse(file).name.replace(/[^\w]+/g, "_");

  const { data, info } = await sharp(inputPath)
    .grayscale()
    .normalise()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const transparent = Buffer.alloc(w * h * 4);
  const opaque = Buffer.alloc(w * h * 4);

  for (let i = 0; i < w * h; i++) {
    const v = data[i];
    const isText = v < THRESHOLD;
    const o = i * 4;
    if (isText) {
      transparent[o] = FG.r; transparent[o + 1] = FG.g; transparent[o + 2] = FG.b; transparent[o + 3] = 255;
      opaque[o] = FG.r; opaque[o + 1] = FG.g; opaque[o + 2] = FG.b; opaque[o + 3] = 255;
    } else {
      transparent[o + 3] = 0;
      opaque[o] = BG.r; opaque[o + 1] = BG.g; opaque[o + 2] = BG.b; opaque[o + 3] = 255;
    }
  }

  await sharp(transparent, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(path.join(OUT_DIR, `${base}_transparent.png`));
  await sharp(opaque, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(path.join(OUT_DIR, `${base}_onbg.png`));

  console.log(`done: ${file}`);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const files = (await fs.readdir(SRC_DIR)).filter(f => /\.(jpe?g|png)$/i.test(f));
  for (const f of files) await process(f);
}

main();
