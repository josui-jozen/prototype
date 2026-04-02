import React, { useMemo } from "react";
import { loadDefaultJapaneseParser } from "budoux";
import { useLocale } from "../../i18n";

const parser = loadDefaultJapaneseParser();

// 助詞（1文字）
const PARTICLES = new Set("はがのをにでともやへ");
// 句読点・閉じ括弧等
const PUNCTUATION_RE = /^[、。，．！？!?）》」』】〉〕）:；・ー～]+$/;

/**
 * BudOUXの分節結果を後処理:
 * - 助詞・句読点だけのセグメントは前のセグメントに結合
 * - 「」内のセグメントは結合して改行を防ぐ
 * - 開き括弧の直前のセグメントも括弧グループに含める
 */
function mergeParticles(segments: string[]): string[] {
  // 先読み: 開き括弧を含むセグメントの位置を把握
  const openIndices = new Set<number>();
  for (let i = 0; i < segments.length; i++) {
    if (segments[i].includes("「") || segments[i].includes("『") || segments[i].includes("（")) {
      openIndices.add(i);
    }
  }

  const result: string[] = [];
  let inQuote = false;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const trimmed = seg.trim();
    const hasOpen = openIndices.has(i);
    const hasClose = seg.includes("」") || seg.includes("』") || seg.includes("）");

    // 次のセグメントが開き括弧なら、このセグメントを次と結合するため先にpush
    const nextIsOpen = openIndices.has(i + 1);

    if (hasOpen) inQuote = true;

    if (result.length > 0 && (PARTICLES.has(trimmed) || PUNCTUATION_RE.test(trimmed) || inQuote || nextIsOpen)) {
      result[result.length - 1] += seg;
    } else {
      result.push(seg);
    }

    if (hasClose) inQuote = false;
  }
  return result;
}

interface JaTextProps {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

/** {漢字|かんじ} → <ruby>漢字<rp>(</rp><rt>かんじ</rt><rp>)</rp></ruby> */
function parseRuby(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /\{([^|}]+)\|([^}]+)\}/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <ruby key={match.index}>
        {match[1]}<rp>(</rp><rt>{match[2]}</rt><rp>)</rp>
      </ruby>
    );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/**
 * rubyノードとその前後のテキストをグループ化。
 * rubyの直前のテキスト末尾・直後のテキスト先頭をrubyと同じnowrapグループにする。
 */
function groupWithRuby(nodes: React.ReactNode[]): React.ReactNode[][] {
  const groups: React.ReactNode[][] = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (typeof node === "string") {
      // 次のノードがrubyかチェック
      const nextIsRuby = i + 1 < nodes.length && typeof nodes[i + 1] !== "string";

      if (nextIsRuby) {
        // BudOUXで分節
        const segs = mergeParticles(parser.parse(node));
        // 最後のセグメント以外は通常グループ
        for (let j = 0; j < segs.length - 1; j++) {
          groups.push([segs[j]]);
        }
        // 最後のセグメント + rubyノード + 次のテキストの先頭をまとめる
        const lastSeg = segs.length > 0 ? segs[segs.length - 1] : "";
        const rubyNode = nodes[i + 1];
        i++; // rubyを消費

        // rubyの後のテキストの先頭部分も結合
        if (i + 1 < nodes.length && typeof nodes[i + 1] === "string") {
          const afterText = nodes[i + 1] as string;
          const afterSegs = mergeParticles(parser.parse(afterText));
          // 先頭セグメントをrubyグループに結合
          const firstAfter = afterSegs.length > 0 ? afterSegs[0] : "";
          groups.push([lastSeg, rubyNode, firstAfter]);
          // 残りは通常グループ
          for (let j = 1; j < afterSegs.length; j++) {
            groups.push([afterSegs[j]]);
          }
          i++; // 後続テキストを消費
        } else {
          groups.push([lastSeg, rubyNode]);
        }
      } else {
        // 通常テキスト: BudOUXで分節して各セグメントを個別グループ
        const segs = mergeParticles(parser.parse(node));
        for (const seg of segs) {
          groups.push([seg]);
        }
      }
    } else {
      // rubyノードが単独で来た場合
      groups.push([node]);
    }
  }
  return groups;
}

/** テキスト中の句読点をspanで囲んでカーニング */
const KERN_PUNCT_RE = /([、。，．])/g;
function kernPunct(text: string): React.ReactNode[] {
  const parts = text.split(KERN_PUNCT_RE);
  if (parts.length === 1) return [text];
  return parts.map((part, i) =>
    KERN_PUNCT_RE.test(part)
      ? <span key={i} className="ato-punct">{part}</span>
      : part
  ).filter(p => p !== "");
}

/** ReactNodeのテキスト部分に句読点カーニングを適用 */
function renderWithKern(item: React.ReactNode, key: number): React.ReactNode {
  if (typeof item === "string") {
    const parts = kernPunct(item);
    return parts.length === 1 && typeof parts[0] === "string"
      ? parts[0]
      : <React.Fragment key={key}>{parts}</React.Fragment>;
  }
  return <React.Fragment key={key}>{item}</React.Fragment>;
}

export function JaText({ children, as: Tag = "p", className, style }: JaTextProps) {
  const locale = useLocale();
  const useWordBreak = locale === "ja";

  const nodes = useMemo(() => parseRuby(children), [children]);

  if (!useWordBreak) {
    return <Tag className={className} style={style}>{nodes}</Tag>;
  }

  const groups = useMemo(() => groupWithRuby(nodes), [nodes]);

  return (
    <Tag className={className} style={style}>
      {groups.map((group, i) => (
        <React.Fragment key={i}>
          {i > 0 && <wbr />}
          <span style={{ whiteSpace: "nowrap" }}>
            {group.map((item, j) => renderWithKern(item, j))}
          </span>
        </React.Fragment>
      ))}
    </Tag>
  );
}
