'use client'

import { useState, useRef, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { Ruby } from './RubyExtension'
import { ScriptDecoration } from './ScriptDecorationExtension'
import { HeartbeatCaret } from './HeartbeatCaretExtension'
import ToolPanel from './ToolPanel'

const MenuIcon = (
  <svg width="20" height="20" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
  </svg>
)
const HelpIcon = (
  <svg width="20" height="20" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M513.5-254.5Q528-269 528-290t-14.5-35.5Q499-340 478-340t-35.5 14.5Q428-311 428-290t14.5 35.5Q457-240 478-240t35.5-14.5ZM442-394h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
  </svg>
)
const CloseIcon = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)
import './editor.css'

const unifiedFonts = [
  { label: 'しっぽり明朝', kanji: "'Shippori Mincho'", kana: "'Shippori Mincho'" },
  { label: 'Zen Old Mincho', kanji: "'Zen Old Mincho'", kana: "'Zen Old Mincho'" },
  { label: 'Yuji Mai', kanji: "'Yuji Mai'", kana: "'Yuji Mai'" },
  { label: 'Klee One', kanji: "'Klee One'", kana: "'Klee One'" },
]

const kanjiFonts = [
  { label: 'しっぽり明朝', value: "'Shippori Mincho'" },
  { label: 'Zen Old Mincho', value: "'Zen Old Mincho'" },
  { label: 'Yuji Mai', value: "'Yuji Mai'" },
  { label: 'Klee One', value: "'Klee One'" },
]

const kanaFonts = [
  { label: 'しっぽりアンチック', value: "'Shippori Antique'" },
  { label: '游明朝', value: "'游明朝', 'YuMincho'" },
  { label: 'Klee One', value: "'Klee One'" },
  { label: 'Zen Old Mincho', value: "'Zen Old Mincho'" },
]

const backgrounds = [
  { label: '白練', value: '#fcfaf2' },
  { label: '墨', value: '#373737' },
  { label: '薄藍', value: '#e8f0f8' },
]

const aligns = [
  { label: '左', value: 'left' },
  { label: '中央', value: 'center' },
]

export default function Editor() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)
  const [active, setActive] = useState(false)

  // フォント
  const [fontUnified, setFontUnified] = useState(true)
  const [unifiedFontIndex, setUnifiedFontIndex] = useState(0)
  const [kanjiFontIndex, setKanjiFontIndex] = useState(0)
  const [kanaFontIndex, setKanaFontIndex] = useState(0)
  // サイズ
  const [h1Size, setH1Size] = useState(24)
  const [h2Size, setH2Size] = useState(20)
  const [h3Size, setH3Size] = useState(18)
  const [bodySize, setBodySize] = useState(16)
  const [boldSize, setBoldSize] = useState(16)
  // アキ
  const [h1LineHeight, setH1LineHeight] = useState(1.6)
  const [h2LineHeight, setH2LineHeight] = useState(1.7)
  const [h3LineHeight, setH3LineHeight] = useState(1.8)
  const [bodyLineHeight, setBodyLineHeight] = useState(2.0)
  const [letterSpacing, setLetterSpacing] = useState(0.04)
  const [paragraphSpacing, setParagraphSpacing] = useState(1.0)
  // 背景
  const [bgIndex, setBgIndex] = useState(0)
  // レイアウト
  const [editorWidth, setEditorWidth] = useState(80)
  const [alignIndex, setAlignIndex] = useState(0)
  const [vertical, setVerticalState] = useState(true)
  const setVertical = (v: boolean) => { verticalRef.current = v; setVerticalState(v) }

  const wrapperRef = useRef<HTMLDivElement>(null)
  const verticalRef = useRef(true)

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node
      if (wrapperRef.current?.contains(target)) {
        setActive(true)
      } else {
        setActive(false)
        setMenuOpen(false)
        setGuideOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [])

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Ruby, ScriptDecoration, HeartbeatCaret],
    content: '<h2>僕を書くためのノート</h2><p>いつしか<ruby>文字<rt>もじ</rt></ruby>は、書くものから、打つものに変わった。<ruby>言葉<rt>ことば</rt></ruby>は、データになった。</p><p>なんだか<strong>味気ない</strong>、と思った。</p><p>うれしかったことを、つらかったことを、かなしかったことを、たのしかったことを。ただ思ったままに、ただ感じたままに、書く。</p><blockquote><p><ruby>感情<rt>かんじょう</rt></ruby>としての言葉を、大切にしたい。</p></blockquote>',
    editorProps: {
      attributes: {
        class: 'ato-editor-area',
      },
    },
  })

  const isDark = backgrounds[bgIndex].value === '#373737'

  const effectiveKanjiFont = fontUnified ? unifiedFonts[unifiedFontIndex].kanji : kanjiFonts[kanjiFontIndex].value
  const effectiveKanaFont = fontUnified ? unifiedFonts[unifiedFontIndex].kana : kanaFonts[kanaFontIndex].value

  return (
    <div ref={wrapperRef} className={`ato-editor-wrapper${active ? ' is-active' : ''}`}>
      <div
        className="ato-editor-canvas"
        onMouseDown={() => { setMenuOpen(false); setGuideOpen(false) }}
        style={{
          fontFamily: `${effectiveKanjiFont}, serif`,
          ['--ato-kanji-font' as string]: `${effectiveKanjiFont}, serif`,
          ['--ato-kana-font' as string]: `${effectiveKanaFont}, serif`,
          fontSize: `${bodySize}px`,
          lineHeight: bodyLineHeight,
          ['--ato-h1-line' as string]: String(h1LineHeight),
          ['--ato-h2-line' as string]: String(h2LineHeight),
          ['--ato-h3-line' as string]: String(h3LineHeight),
          ['--ato-body-line' as string]: String(bodyLineHeight),
          ['--ato-h1-size' as string]: `${h1Size}px`,
          ['--ato-h2-size' as string]: `${h2Size}px`,
          ['--ato-h3-size' as string]: `${h3Size}px`,
          ['--ato-body-size' as string]: `${bodySize}px`,
          ['--ato-bold-size' as string]: `${boldSize}px`,
          letterSpacing: `${letterSpacing}em`,
          background: backgrounds[bgIndex].value,
          color: isDark ? '#fcfaf2' : '#373737',
          textAlign: aligns[alignIndex].value as 'left' | 'center' | 'justify',
          writingMode: vertical ? 'vertical-rl' : 'horizontal-tb',
          ['--ato-paragraph-spacing' as string]: `${paragraphSpacing}em`,
          ['--ato-content-width' as string]: `${editorWidth}%`,
        }}
      >
        <ToolPanel
          open={menuOpen}
          onOpen={() => setMenuOpen(true)}
          onClose={() => setMenuOpen(false)}
          isDark={isDark}
          position="top-right"
          size="full"
          icon={MenuIcon}
          closeIcon={CloseIcon}
          ariaLabel="メニュー"
        >
            {/* フォント */}
            <div className="ato-editor-category">
              <span className="ato-editor-category-label">フォント</span>
              <div className="ato-editor-group">
                <span className="ato-editor-group-label">統一</span>
                <div className="ato-editor-group-options">
                  {unifiedFonts.map((f, i) => (
                    <button
                      key={f.label}
                      type="button"
                      className={`ato-editor-option${fontUnified && i === unifiedFontIndex ? ' is-active' : ''}`}
                      style={{ fontFamily: `${f.kanji}, serif` }}
                      onClick={() => { setFontUnified(true); setUnifiedFontIndex(i) }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ato-editor-group">
                <span className="ato-editor-group-label">漢字</span>
                <div className="ato-editor-group-options">
                  {kanjiFonts.map((f, i) => (
                    <button
                      key={f.value}
                      type="button"
                      className={`ato-editor-option${!fontUnified && i === kanjiFontIndex ? ' is-active' : ''}`}
                      style={{ fontFamily: `${f.value}, serif` }}
                      onClick={() => {
                        if (fontUnified) {
                          const current = unifiedFonts[unifiedFontIndex]
                          const ni = kanaFonts.findIndex((k) => k.value === current.kana)
                          if (ni >= 0) setKanaFontIndex(ni)
                        }
                        setFontUnified(false)
                        setKanjiFontIndex(i)
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ato-editor-group">
                <span className="ato-editor-group-label">かな</span>
                <div className="ato-editor-group-options">
                  {kanaFonts.map((f, i) => (
                    <button
                      key={f.value}
                      type="button"
                      className={`ato-editor-option${!fontUnified && i === kanaFontIndex ? ' is-active' : ''}`}
                      style={{ fontFamily: `${f.value}, serif` }}
                      onClick={() => {
                        if (fontUnified) {
                          const current = unifiedFonts[unifiedFontIndex]
                          const ki = kanjiFonts.findIndex((k) => k.value === current.kanji)
                          if (ki >= 0) setKanjiFontIndex(ki)
                        }
                        setFontUnified(false)
                        setKanaFontIndex(i)
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* サイズ */}
            <div className="ato-editor-category">
              <span className="ato-editor-category-label">サイズ</span>
              {[
                { label: '見出し1', value: h1Size, set: setH1Size, min: 18, max: 40 },
                { label: '見出し2', value: h2Size, set: setH2Size, min: 16, max: 32 },
                { label: '見出し3', value: h3Size, set: setH3Size, min: 14, max: 28 },
                { label: '通常', value: bodySize, set: setBodySize, min: 12, max: 24 },
                { label: '太字', value: boldSize, set: setBoldSize, min: 12, max: 28 },
              ].map((s) => (
                <div key={s.label} className="ato-editor-group">
                  <span className="ato-editor-group-label">{s.label}</span>
                  <div className="ato-editor-group-options">
                    <input
                      type="range"
                      className="ato-editor-range"
                      min={s.min}
                      max={s.max}
                      value={s.value}
                      onChange={(e) => s.set(Number(e.target.value))}
                    />
                    <span className="ato-editor-range-value">{s.value}px</span>
                  </div>
                </div>
              ))}
            </div>

            {/* アキ */}
            <div className="ato-editor-category">
              <span className="ato-editor-category-label">アキ</span>
              {[
                { label: '見出し1行間', value: h1LineHeight, set: setH1LineHeight },
                { label: '見出し2行間', value: h2LineHeight, set: setH2LineHeight },
                { label: '見出し3行間', value: h3LineHeight, set: setH3LineHeight },
                { label: '通常行間', value: bodyLineHeight, set: setBodyLineHeight },
              ].map((r) => (
                <div key={r.label} className="ato-editor-group">
                  <span className="ato-editor-group-label">{r.label}</span>
                  <div className="ato-editor-group-options">
                    <input
                      type="range"
                      className="ato-editor-range"
                      min={0.5}
                      max={3.0}
                      step={0.1}
                      value={r.value}
                      onChange={(e) => r.set(Number(e.target.value))}
                    />
                    <span className="ato-editor-range-value">{r.value.toFixed(1)}</span>
                  </div>
                </div>
              ))}
              <div className="ato-editor-group">
                <span className="ato-editor-group-label">字間</span>
                <div className="ato-editor-group-options">
                  <input
                    type="range"
                    className="ato-editor-range"
                    min={-0.05}
                    max={0.2}
                    step={0.01}
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  />
                  <span className="ato-editor-range-value">{letterSpacing.toFixed(2)}</span>
                </div>
              </div>
              <div className="ato-editor-group">
                <span className="ato-editor-group-label">段落間</span>
                <div className="ato-editor-group-options">
                  <input
                    type="range"
                    className="ato-editor-range"
                    min={0.5}
                    max={3.0}
                    step={0.1}
                    value={paragraphSpacing}
                    onChange={(e) => setParagraphSpacing(Number(e.target.value))}
                  />
                  <span className="ato-editor-range-value">{paragraphSpacing.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* 背景 */}
            <div className="ato-editor-category">
              <span className="ato-editor-category-label">背景</span>
              <div className="ato-editor-group-options">
                {backgrounds.map((b, i) => (
                  <button
                    key={b.value}
                    type="button"
                    className={`ato-editor-swatch${i === bgIndex ? ' is-active' : ''}`}
                    style={{ background: b.value }}
                    onClick={() => setBgIndex(i)}
                    aria-label={b.label}
                  />
                ))}
              </div>
            </div>

            {/* レイアウト */}
            <div className="ato-editor-category">
              <span className="ato-editor-category-label">レイアウト</span>
              <div className="ato-editor-group">
                <span className="ato-editor-group-label">幅</span>
                <div className="ato-editor-group-options">
                  <input
                    type="range"
                    className="ato-editor-range"
                    min={40}
                    max={100}
                    step={5}
                    value={editorWidth}
                    onChange={(e) => setEditorWidth(Number(e.target.value))}
                  />
                  <span className="ato-editor-range-value">{editorWidth}%</span>
                </div>
              </div>
              <div className="ato-editor-group">
                <span className="ato-editor-group-label">揃え</span>
                <div className="ato-editor-group-options">
                  {aligns.map((a, i) => (
                    <button
                      key={a.value}
                      type="button"
                      className={`ato-editor-option${i === alignIndex ? ' is-active' : ''}`}
                      onClick={() => setAlignIndex(i)}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ato-editor-group">
                <span className="ato-editor-group-label">縦書き</span>
                <div className="ato-editor-group-options">
                  <button
                    type="button"
                    className={`ato-editor-option${!vertical ? ' is-active' : ''}`}
                    onClick={() => setVertical(false)}
                  >
                    横
                  </button>
                  <button
                    type="button"
                    className={`ato-editor-option${vertical ? ' is-active' : ''}`}
                    onClick={() => setVertical(true)}
                  >
                    縦
                  </button>
                </div>
              </div>
            </div>
        </ToolPanel>

        <ToolPanel
          open={guideOpen}
          onOpen={() => setGuideOpen(true)}
          onClose={() => setGuideOpen(false)}
          isDark={isDark}
          position="bottom-left"
          size="half"
          icon={HelpIcon}
          closeIcon={CloseIcon}
          ariaLabel="ガイド"
        >
          <ul className="ato-editor-guide-list">
            <li><code>#</code> 見出し</li>
            <li><code>**</code> 太字</li>
            <li><code>*</code> 斜体</li>
            <li><code>-</code> リスト</li>
            <li><code>{'>'}</code> 引用</li>
            <li><code>---</code> 区切り線</li>
            <li><code>{'{漢字|かんじ}'}</code> ルビ</li>
          </ul>
        </ToolPanel>

        {editor && (
          <BubbleMenu editor={editor} className="ato-bubble-menu">
            <button
              type="button"
              className={`ato-bubble-btn${editor.isActive('bold') ? ' is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              className={`ato-bubble-btn${editor.isActive('italic') ? ' is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <em>I</em>
            </button>
            <button
              type="button"
              className={`ato-bubble-btn${editor.isActive('heading') ? ' is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              H
            </button>
            <button
              type="button"
              className={`ato-bubble-btn${editor.isActive('blockquote') ? ' is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              &ldquo;
            </button>
            <button
              type="button"
              className="ato-bubble-btn"
              onClick={() => {
                const reading = window.prompt('ルビ（読み仮名）を入力')
                if (!reading) return
                editor.chain().focus().setMark('ruby', { reading }).run()
              }}
            >
              ルビ
            </button>
          </BubbleMenu>
        )}
        <div className="ato-editor-scroll">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
