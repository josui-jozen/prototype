import sharp from "sharp";
import fs from "fs";
import path from "path";

const IMG = "public/essay/essay.png";
const OUT_DIR = "public/essay/seg";

const segments: Record<number, string> = {
  1: "インターネットの発展によって、",
  2: "多くの人が文字を打ち、",
  3: "発信するようになった時代。",
  4: "文字は書くものから打つものに変わり、",
  5: "言葉はデータになった。",
  6: "データをナレッジとして着積し、",
  7: "データをAIに学習させ、",
  8: "データをビジネスに活用する。",
  9: "そうして劇的に変わっていく社会を、",
  10: "僕はエンジニアとして最前線で見てきた。",
  11: "だから思う。「なんだか味気ない」と。",
  12: "言葉の価値は情報だけじゃない。",
  13: "未来の誰かにこの気持ちを伝える、",
  14: "感情としての価値だってあるはずだ。",
  15: "僕はただ、自分の言葉をデータにされたくなかった。",
  16: "苦しかった、辛かったここまでの道のりを、",
  17: "情報にして欲しくなかった。",
  18: "うれしかったことを",
  19: "つらかったことを",
  20: "かなしかったことを",
  21: "たのしかったことを",
  22: "思ったままに、",
  23: "感じたままに、",
  24: "書く。",
  25: "データとかナレッジとか",
  26: "そんな複雑な横文字じゃなくていい。",
  27: "感情としての言葉を大切にしたい。",
  28: "だから、",
  29: "他でもない自分を、",
  30: "ただ待ってくれるような、",
  31: "そんなノートが欲しいと思った。",
};

// Per-quadrant mapping of detected-line index → segment number(s).
// If a segment spans multiple detected lines, provide an array of line indices.
type QuadMap = { quadrant: "TL" | "TR" | "BL" | "BR"; assign: (number | number[])[] };
const quadrants: QuadMap[] = [
  { quadrant: "TL", assign: [1, 2, 3, 4, 5, 6, 7, 8] },
  { quadrant: "BL", assign: [18, 19, 20, 21, 22, 23, 24, 25, 26] },
  { quadrant: "TR", assign: [27, 28, 29, 30, 31] },
  { quadrant: "BR", assign: [9, 10, 11, 12, 13, 14, 15, 16, 17] },
];

async function detectLines(data: Buffer, W: number, H: number, xRange: [number, number], yRange: [number, number]) {
  const [x0, x1] = xRange;
  const [y0, y1] = yRange;
  const rowInk: number[] = [];
  for (let y = y0; y < y1; y++) {
    let c = 0;
    for (let x = x0; x < x1; x++) {
      if (data[(y * W + x) * 4 + 3] > 0) c++;
    }
    rowInk.push(c);
  }
  const inkThr = 20;
  const minLineH = 30;
  const lines: [number, number][] = [];
  let start = -1;
  for (let i = 0; i < rowInk.length; i++) {
    if (rowInk[i] > inkThr) {
      if (start < 0) start = i;
    } else {
      if (start >= 0 && i - start > minLineH) lines.push([start + y0, i + y0]);
      start = -1;
    }
  }
  if (start >= 0 && rowInk.length - start > minLineH) lines.push([start + y0, rowInk.length + y0]);

  // Expand each line outward to include small diacritics/punctuation (low ink rows)
  // Stop at midpoint between neighbouring line or when rows go blank (<2).
  const tinyThr = 2;
  for (let i = 0; i < lines.length; i++) {
    const prevEnd = i > 0 ? lines[i - 1][1] : y0;
    const nextStart = i < lines.length - 1 ? lines[i + 1][0] : y0 + rowInk.length;
    let [a, b] = lines[i];
    const upLimit = Math.floor((prevEnd + a) / 2);
    const downLimit = Math.floor((b + nextStart) / 2);
    while (a > upLimit && rowInk[a - 1 - y0] >= tinyThr) a--;
    while (b < downLimit && rowInk[b - y0] >= tinyThr) b++;
    lines[i] = [a, b];
  }
  return lines;
}

function bboxX(data: Buffer, W: number, y0: number, y1: number, xRange: [number, number]) {
  const [xMin, xMax] = xRange;
  let x0 = xMax, x1 = xMin;
  for (let y = y0; y < y1; y++) {
    for (let x = xMin; x < xMax; x++) {
      if (data[(y * W + x) * 4 + 3] > 0) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
      }
    }
  }
  return [x0, x1] as [number, number];
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const { data, info } = await sharp(IMG).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const midX = Math.floor(W / 2);
  const midY = Math.floor(H / 2);

  const quadRanges: Record<string, { x: [number, number]; y: [number, number] }> = {
    TL: { x: [0, midX], y: [0, midY] },
    TR: { x: [midX, W], y: [0, midY] },
    BL: { x: [0, midX], y: [midY, H] },
    BR: { x: [midX, W], y: [midY, H] },
  };

  // Per segment: compute y-range (possibly merged) and x-range
  type SegBox = { seg: number; y0: number; y1: number; x0: number; x1: number };
  const boxes: SegBox[] = [];

  for (const q of quadrants) {
    const r = quadRanges[q.quadrant];
    const lines = await detectLines(data, W, H, r.x, r.y);
    if (lines.length !== q.assign.length) {
      console.warn(`[${q.quadrant}] detected ${lines.length} lines, expected ${q.assign.length}`);
    }
    // Group consecutive same-seg lines
    const groups: { seg: number; idxs: number[] }[] = [];
    for (let i = 0; i < q.assign.length; i++) {
      const seg = q.assign[i] as number;
      const last = groups[groups.length - 1];
      if (last && last.seg === seg) last.idxs.push(i);
      else groups.push({ seg, idxs: [i] });
    }
    for (const g of groups) {
      const y0 = lines[g.idxs[0]][0];
      const y1 = lines[g.idxs[g.idxs.length - 1]][1];
      const [x0, x1] = bboxX(data, W, y0, y1, r.x);
      boxes.push({ seg: g.seg, y0, y1, x0, x1 });
    }
  }

  // Common height = max (y1-y0) + small padding
  const pad = 8;
  const maxH = Math.max(...boxes.map(b => b.y1 - b.y0));
  const targetH = maxH + pad * 2;

  for (const b of boxes) {
    const h = b.y1 - b.y0;
    const w = b.x1 - b.x0 + pad * 2;
    const left = Math.max(0, b.x0 - pad);
    const width = Math.min(W - left, w);

    // Extract only the tight line bbox (no neighbour bleed)
    const buf = await sharp(IMG)
      .extract({ left, top: b.y0, width, height: h })
      .toBuffer();

    // Pad vertically with transparent to reach targetH, centered
    const extraTop = Math.floor((targetH - h) / 2);
    const extraBot = targetH - h - extraTop;
    const pipeline = sharp(buf).extend({
      top: extraTop,
      bottom: extraBot,
      left: 0,
      right: 0,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
    const fname = `${String(b.seg).padStart(2, "0")}_${segments[b.seg]}.png`;
    await pipeline.png().toFile(path.join(OUT_DIR, fname));
    console.log(`${fname}  ${width}x${targetH}`);
  }
}

main();
