type Demo = { title: string; description: string; bad: React.ReactNode; good: React.ReactNode };
type Section = { heading?: string; note?: string; demos: Demo[] };

const SECTIONS: Section[] = [
  {
    demos: [
      {
        title: "天付き",
        description: "行頭の開きカッコは、前のアキを消して左端に揃える。",
        bad: (
          <p style={{ textIndent: 0 }}>
            　「ありがとう」と彼は言った。その言葉は静かに、しかし確かに届いた。
          </p>
        ),
        good: (
          <p style={{ textIndent: 0 }}>
            <span style={{ marginLeft: "-0.5em" }}>「</span>ありがとう」と彼は言った。その言葉は静かに、しかし確かに届いた。
          </p>
        ),
      },
    ],
  },
  {
    heading: "行末の句読点処理",
    note: "行末に句読点が来たとき、状況に応じて2つの処理を使い分ける。句読点の後ろのアキ（半角分の余白）を消せば行末に収まる場合は「揃え」、行が文字で埋まっていて句読点自体が入りきらない場合は「ぶら下げ」で枠外にはみ出させる。",
    demos: [
      {
        title: "揃え — 同一行内で句読点のアキを詰める",
        description: "行末の句読点や、連続する約物の余分なアキを同一行内で詰め、右端を揃える処理。行をまたぐ処理ではない。",
        bad: (
          <div>
            <div style={{ width: "176px", minWidth: "176px", maxWidth: "176px", position: "relative" as const, overflow: "visible" }}>
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "2px", background: "#e00", opacity: 0.5 }} />
              <div style={{ whiteSpace: "nowrap" }}>ああああああああああ。</div>
              <div style={{ whiteSpace: "nowrap" }}>あああああああああああ</div>
              <div style={{ whiteSpace: "nowrap" }}>あああああああああああ</div>
              <div style={{ whiteSpace: "nowrap" }}>あああああああああああ</div>
              <div style={{ whiteSpace: "nowrap" }}>ああああああああああ</div>
            </div>
            <p style={{ fontSize: 11, opacity: 0.4, marginTop: 8 }}>↑ 1行目の。の後ろに10pxのアキ</p>
          </div>
        ),
        good: (
          <div>
            <div style={{ width: "176px", minWidth: "176px", maxWidth: "176px", position: "relative" as const, overflow: "visible" }}>
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "2px", background: "#e00", opacity: 0.5 }} />
              <div style={{ display: "flex", width: "176px" }}><span style={{ flex: 1, display: "flex", justifyContent: "space-between" }}>{"ああああああああああ".split("").map((c, i) => <span key={i}>{c}</span>)}</span><span style={{ width: "6px", flexShrink: 0, overflow: "visible" }}>。</span></div>
              <div style={{ whiteSpace: "nowrap" }}>あああああああああああ</div>
              <div style={{ whiteSpace: "nowrap" }}>あああああああああああ</div>
              <div style={{ whiteSpace: "nowrap" }}>あああああああああああ</div>
              <div style={{ whiteSpace: "nowrap" }}>ああああああああああ</div>
            </div>
            <p style={{ fontSize: 11, opacity: 0.4, marginTop: 8 }}>↑ 。のアキを詰めて赤線に揃う</p>
          </div>
        ),
      },
      {
        title: "ぶら下げ — 句読点を枠外にはみ出させる",
        description: "行が文字で埋まり句読点が入りきらないとき、句読点だけ枠の外に配置する。",
        bad: (
          <div style={{ position: "relative", width: "10em", paddingRight: "2em" }}>
            <div style={{ position: "absolute", left: "10em", top: 0, bottom: 0, width: 1, background: "#e00", opacity: 0.5 }} />
            <p style={{ margin: 0, width: "10em" }}>
              あいうえおかきくけ<br />
              こ。さしすせそたち<br />
              つてとなにぬねの
            </p>
            <p style={{ fontSize: 11, opacity: 0.4, marginTop: 8 }}>↑ 。のために手前で折り返し、行末が不揃い</p>
          </div>
        ),
        good: (
          <div style={{ position: "relative", width: "10em", paddingRight: "2em", overflow: "visible" }}>
            <div style={{ position: "absolute", left: "10em", top: 0, bottom: 0, width: 1, background: "#e00", opacity: 0.5, zIndex: 1 }} />
            <p style={{ margin: 0, width: "10em", overflow: "visible" }}>
              <span style={{ position: "relative", display: "block" }}>あいうえおかきくけこ<span style={{ position: "absolute" }}>。</span></span>
              <span style={{ position: "relative", display: "block" }}>さしすせそたちつてと</span>
              <span style={{ position: "relative", display: "block" }}>なにぬねの</span>
            </p>
            <p style={{ fontSize: 11, opacity: 0.4, marginTop: 8 }}>↑ 。が赤線の右にはみ出し、文字の行末は揃う</p>
          </div>
        ),
      },
    ],
  },
  {
    demos: [
      {
        title: "追い込み・追い出し",
        description: "禁則処理後の行長を、約物のアキや字間の微調整で行末を揃える。",
        bad: (
          <div>
            <div style={{ position: "relative", width: "12em" }}>
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 1, background: "#e00", opacity: 0.5 }} />
              <p style={{ margin: 0 }}>
                あの日、彼女は静か<br />
                に言った。「もう帰り<br />
                ましょう」と。外は<br />
                すでに暗くなっていた。
              </p>
            </div>
            <p style={{ fontSize: 11, opacity: 0.4, marginTop: 8 }}>↑ 行末が赤線に届かずガタガタ</p>
          </div>
        ),
        good: (
          <div>
            <div style={{ position: "relative", width: "12em" }}>
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 1, background: "#e00", opacity: 0.5 }} />
              <p style={{ margin: 0, textAlign: "justify", textAlignLast: "left" }}>
                あの日、彼女は静かに言った。「もう帰りましょう」と。外はすでに暗くなっていた。
              </p>
            </div>
            <p style={{ fontSize: 11, opacity: 0.4, marginTop: 8 }}>↑ 各行の字間を自動調整して行末を揃える</p>
          </div>
        ),
      },
    ],
  },
  {
    demos: [
      {
        title: "ルビ（ふりがな）",
        description: "漢字の上にふりがなを表示する。日本語の基本機能。",
        bad: (
          <p>邂逅（かいこう）は突然訪れた。彼は躊躇（ちゅうちょ）なく手を差し伸べた。</p>
        ),
        good: (
          <p>
            <ruby>邂逅<rt>かいこう</rt></ruby>は突然訪れた。彼は<ruby>躊躇<rt>ちゅうちょ</rt></ruby>なく手を差し伸べた。
          </p>
        ),
      },
    ],
  },
  {
    demos: [
      {
        title: "圏点（傍点）",
        description: "日本語の強調は本来、太字ではなく文字の上に打つ点。",
        bad: (
          <p>それは<strong>絶対に</strong>許されないことだった。</p>
        ),
        good: (
          <p>
            それは<span style={{ textEmphasis: "filled sesame", WebkitTextEmphasis: "filled sesame" } as React.CSSProperties}>絶対に</span>許されないことだった。
          </p>
        ),
      },
    ],
  },
  {
    demos: [
      {
        title: "和欧混植の字間調整",
        description: "半角英数字と和文の間に適切な余白（四分アキ）を入れ、自然に馴染ませる。",
        bad: (
          <p>彼はMacBookを開き、React18の新機能を試した。速度が約3.5倍になったらしい。</p>
        ),
        good: (
          <p>
            彼は
            <span style={{ marginLeft: "0.25em", marginRight: "0.25em" }}>MacBook</span>
            を開き、
            <span style={{ marginLeft: "0.25em", marginRight: "0.25em" }}>React 18</span>
            の新機能を試した。速度が約
            <span style={{ marginLeft: "0.25em", marginRight: "0.25em" }}>3.5</span>
            倍になったらしい。
          </p>
        ),
      },
    ],
  },
];

export default function TypesetDemo() {
  return (
    <div style={{ background: "#ffffff", color: "#1a1a1a", minHeight: "100vh", fontFamily: "'Shippori Mincho', serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          日本語組版 — 比較デモ
        </h1>
        <p style={{ fontSize: 14, opacity: 0.5, marginBottom: 48 }}>
          左: 未適用　／　右: 適用済み
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          {SECTIONS.map((section, si) => (
            <div key={si} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {section.heading && (
                <div style={{ borderLeft: "3px solid #1a1a1a", paddingLeft: 12 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{section.heading}</h2>
                  {section.note && <p style={{ fontSize: 14, opacity: 0.6, lineHeight: 1.8 }}>{section.note}</p>}
                </div>
              )}
              {section.demos.map((demo) => (
                <section key={demo.title}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{demo.title}</h3>
                  <p style={{ fontSize: 14, opacity: 0.6, marginBottom: 16 }}>{demo.description}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    <div>
                      <p style={{ fontSize: 12, opacity: 0.4, marginBottom: 8 }}>未適用</p>
                      <div style={{ fontSize: 16, lineHeight: 2, padding: 16, background: "#fafafa", borderRadius: 4, overflow: "visible" }}>
                        {demo.bad}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, opacity: 0.4, marginBottom: 8 }}>適用済み</p>
                      <div style={{ fontSize: 16, lineHeight: 2, padding: 16, background: "#fafafa", borderRadius: 4, overflow: "visible" }}>
                        {demo.good}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
