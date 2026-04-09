import sharp from "sharp";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.resolve(__dirname, "../public/images/logo.png");
const pbmPath = path.resolve(__dirname, "../public/images/logo.pbm");
const svgPath = path.resolve(__dirname, "../public/images/logo.svg");

async function main() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;

  // Binary PBM: 1 = black (ink), 0 = white (transparent)
  const threshold = 128;
  let pbm = `P1\n${width} ${height}\n`;
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const alpha = data[i + 3];
      row.push(alpha >= threshold ? 1 : 0);
    }
    pbm += row.join(" ") + "\n";
  }

  fs.writeFileSync(pbmPath, pbm);
  console.log(`PBM written: ${width}x${height}`);

  // potrace -> SVG
  execSync(`potrace "${pbmPath}" -s -o "${svgPath}" --flat`);
  fs.unlinkSync(pbmPath);

  const size = fs.statSync(svgPath).size;
  console.log(`SVG written: ${svgPath} (${(size / 1024).toFixed(1)}KB)`);
}

main();
