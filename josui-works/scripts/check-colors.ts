import sharp from "sharp";

async function main() {
  const { data, info } = await sharp("public/logo/sumi.png").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  console.log("Size:", info.width, "x", info.height);
  const colors = new Set<string>();
  for (let i = 0; i < data.length; i += 4) {
    colors.add(`${data[i]},${data[i+1]},${data[i+2]},${data[i+3]}`);
  }
  console.log("Unique colors:", colors.size);
  for (const c of colors) console.log(" ", c);
}
main();
