import React, { useMemo } from "react";
import { loadDefaultJapaneseParser } from "budoux";
import { useLocale } from "../../i18n";

const parser = loadDefaultJapaneseParser();

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

export function JaText({ children, as: Tag = "p", className, style }: JaTextProps) {
  const locale = useLocale();
  const useWordBreak = locale === "ja";

  const nodes = useMemo(() => parseRuby(children), [children]);

  if (!useWordBreak) {
    return <Tag className={className} style={style}>{nodes}</Tag>;
  }

  return (
    <Tag className={className} style={style}>
      {nodes.map((node, i) => (
        typeof node === "string"
          ? parser.parse(node).map((seg, j) => (
              <React.Fragment key={`${i}-${j}`}>
                {j > 0 && <wbr />}
                <span style={{ whiteSpace: "nowrap" }}>{seg}</span>
              </React.Fragment>
            ))
          : <span key={i} style={{ whiteSpace: "nowrap" }}>{node}</span>
      ))}
    </Tag>
  );
}
