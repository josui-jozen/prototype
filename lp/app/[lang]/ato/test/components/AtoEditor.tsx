'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MoreVertical, Menu, Settings2, FolderOpen } from 'lucide-react'
import './AtoEditor.css'
import { type Settings, borderToStyle } from './settings'
import { MenuPanel } from './MenuPanel'
import { FilesPanel } from './FilesPanel'

const BUTTON_ICONS = {
  dots: MoreVertical,
  hamburger: Menu,
  text: null,
  seal: null,
  flower: null,
  upload: null,
} as const

type OgpData = { title: string | null; description: string | null; image: string | null; siteName: string | null; url: string }

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function applyRuby(text: string, ruby: Record<string, string> | undefined, keyPrefix: string): React.ReactNode {
  if (!ruby) return text
  const keys = Object.keys(ruby).sort((a, b) => b.length - a.length)
  if (keys.length === 0) return text
  const pattern = new RegExp(`(${keys.map(escapeRegex).join('|')})`, 'g')
  const parts = text.split(pattern)
  return parts.map((p, i) => {
    const reading = ruby[p]
    if (reading) return <ruby key={`${keyPrefix}-${i}`}>{p}<rt>{reading}</rt></ruby>
    return <React.Fragment key={`${keyPrefix}-${i}`}>{p}</React.Fragment>
  })
}

function renderInline(text: string, ruby: Record<string, string> | undefined, boldColor: string | null): React.ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      const style = boldColor ? { color: boldColor } : undefined
      return <strong key={i} className="ato-bold" style={style}>{applyRuby(p.slice(2, -2), ruby, `b${i}`)}</strong>
    }
    return <React.Fragment key={i}>{applyRuby(p, ruby, `p${i}`)}</React.Fragment>
  })
}

function OgpCard({ url }: { url: string }) {
  const [data, setData] = useState<OgpData | null>(null)
  useEffect(() => {
    let active = true
    fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (active && d && !d.error) setData(d) })
      .catch(() => {})
    return () => { active = false }
  }, [url])
  if (!data) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="ato-ogp">
        <div className="ato-ogp__text">
          <div className="ato-ogp__title">{url}</div>
        </div>
      </a>
    )
  }
  return (
    <a href={data.url} target="_blank" rel="noopener noreferrer" className="ato-ogp">
      <div className="ato-ogp__text">
        {data.title && <div className="ato-ogp__title">{data.title}</div>}
        {data.description && <div className="ato-ogp__description">{data.description}</div>}
        {data.siteName && <div className="ato-ogp__site">{data.siteName}</div>}
      </div>
      {data.image && (
        <div className="ato-ogp__image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image} alt="" loading="lazy" />
        </div>
      )}
    </a>
  )
}

function renderLine(line: string, i: number, imageFrame: Settings['editorImageFrame'], imageRotate: number, sectionColors: Settings['sectionColors'], ruby?: Record<string, string>): React.ReactNode {
  const urlOnly = line.trim().match(/^(https?:\/\/\S+)$/)
  if (urlOnly) return <OgpCard key={i} url={urlOnly[1]} />

  const imageMatch = line.match(/^!\[(.*?)\]\((.+?)\)$/)
  if (imageMatch) {
    const [, alt, src] = imageMatch
    const style = { transform: imageRotate ? `rotate(${imageRotate}deg)` : undefined }
    if (imageFrame === 'sns') {
      return (
        <figure key={i} className="ato-image" data-image-frame="sns" style={style}>
          <div className="ato-image__sns-header">
            <div className="ato-image__sns-avatar" />
            <div className="ato-image__sns-user">you</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt || ''} loading="lazy" />
          <div className="ato-image__sns-actions">
            <span className="ato-image__sns-heart">♥</span>
            <span className="ato-image__sns-count">128</span>
          </div>
          {alt && <figcaption className="ato-image__sns-caption">{alt}</figcaption>}
        </figure>
      )
    }
    return (
      <figure key={i} className="ato-image" data-image-frame={imageFrame} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || ''} loading="lazy" />
        {imageFrame === 'letter' && alt && <figcaption className="ato-image__letter-caption">— {alt}</figcaption>}
      </figure>
    )
  }
  const bold = sectionColors.bold
  if (line.startsWith('### ')) return <h3 key={i} style={sectionColors.h3 ? { color: sectionColors.h3 } : undefined}>{renderInline(line.slice(4), ruby, bold)}</h3>
  if (line.startsWith('## ')) return <h2 key={i} style={sectionColors.h2 ? { color: sectionColors.h2 } : undefined}>{renderInline(line.slice(3), ruby, bold)}</h2>
  if (line.startsWith('# ')) return <h1 key={i} style={sectionColors.h1 ? { color: sectionColors.h1 } : undefined}>{renderInline(line.slice(2), ruby, bold)}</h1>
  return <p key={i} style={sectionColors.normal ? { color: sectionColors.normal } : undefined}>{renderInline(line, ruby, bold)}</p>
}

export function AtoEditor({
  settings: initialSettings,
  content,
  interactive = false,
}: {
  settings: Settings
  content: string[]
  interactive?: boolean
}) {
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const [open, setOpen] = useState(false)
  const [filesOpen, setFilesOpen] = useState(false)
  const [editingPositions, setEditingPositions] = useState(false)
  const safeRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef<'menu' | 'files' | null>(null)

  const editorStyle: React.CSSProperties & Record<string, string | number> = {
    '--ato-editor-bg-color': settings.editorBgColor,
    '--ato-editor-bg-image': settings.editorBgImage ? `url("${settings.editorBgImage}")` : 'none',
    '--ato-text': settings.textColor,
    '--ato-sub': settings.subColor,
    '--ato-accent': settings.accent,
    '--ato-border': settings.panelBorder.color.top,
    '--ato-font-kanji': settings.fontKanji,
    '--ato-font-kana': settings.fontKana,
    '--ato-font-alnum': settings.fontAlnum,
    '--ato-rule-color': settings.editorRuleColor,
    '--ato-ui-bg-color': settings.uiBgColor,
    '--ato-ui-fg-color': settings.panelTextColor ?? settings.textColor,
    '--ato-line-height': settings.lineHeight,
    '--ato-button-radius': `${settings.buttonBorderRadius}px`,
    '--ato-width': `${settings.editorWidth}%`,
    '--ato-letter-spacing': `${settings.letterSpacing}em`,
    '--ato-size-normal': `${settings.sectionSize.normal}px`,
    '--ato-size-h1': `${settings.sectionSize.h1}px`,
    '--ato-size-h2': `${settings.sectionSize.h2}px`,
    '--ato-size-h3': `${settings.sectionSize.h3}px`,
    '--ato-size-bold': `${settings.sectionSize.bold}px`,
    // 共通UIパーツ (components/*) が参照する汎用トークン
    '--ui-fg': settings.textColor,
    '--ui-sub': settings.subColor,
    '--ui-bg': settings.editorBgColor,
    '--ui-surface': settings.uiBgColor,
    '--ui-border': settings.panelBorder.color.top,
  }

  const Icon = BUTTON_ICONS[settings.menuButtonDesign]
  const buttonBorderStyle = borderToStyle(settings.buttonBorder)

  return (
    <div
      className="ato-editor"
      data-rule={settings.editorRule}
      style={editorStyle}
    >
      <div ref={safeRef} className="ato-editor__safe">
        <div className="ato-editor__content" data-direction={settings.direction}>
          <div className="ato-editor__text">
            {content.map((line, i) => renderLine(line, i, settings.editorImageFrame, settings.editorImageRotate, settings.sectionColors, settings.editorRuby))}
          </div>
        </div>

        {interactive && editingPositions && (
          <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: 'rgba(0,0,0,0.35)' }}>
            <div className="absolute top-4 left-0 right-0 text-center text-white text-[11px] px-4">
              ボタンをドラッグして位置を調整
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label="menu"
          onClick={() => { if (!interactive || editingPositions) return; setOpen((s) => !s) }}
          onPointerDown={(e) => {
            if (!editingPositions) return
            e.preventDefault()
            e.stopPropagation()
            draggingRef.current = 'menu'
            ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
          }}
          onPointerMove={(e) => {
            if (draggingRef.current !== 'menu') return
            const rect = safeRef.current?.getBoundingClientRect()
            if (!rect) return
            const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
            const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
            setSettings((s) => ({ ...s, menuPosition: { x, y } }))
          }}
          onPointerUp={() => { draggingRef.current = null }}
          className="ato-editor__ui-button"
          style={{
            left: `${settings.menuPosition.x}%`,
            top: `${settings.menuPosition.y}%`,
            zIndex: editingPositions ? 50 : undefined,
            cursor: editingPositions ? 'grab' : undefined,
            touchAction: editingPositions ? 'none' : undefined,
            ...buttonBorderStyle,
          }}
          disabled={!interactive}
        >
          {renderButtonIcon(settings.menuButtonDesign, Icon, settings.menuButtonImage)}
        </button>

        {settings.files && (
          <button
            type="button"
            aria-label="files"
            onClick={() => { if (!interactive || editingPositions) return; setFilesOpen((s) => !s) }}
            onPointerDown={(e) => {
              if (!editingPositions) return
              e.preventDefault()
              e.stopPropagation()
              draggingRef.current = 'files'
              ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => {
              if (draggingRef.current !== 'files') return
              const rect = safeRef.current?.getBoundingClientRect()
              if (!rect) return
              const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
              const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
              setSettings((s) => ({ ...s, filesPosition: { x, y } }))
            }}
            onPointerUp={() => { draggingRef.current = null }}
            className="ato-editor__ui-button"
            style={{
              left: `${settings.filesPosition.x}%`,
              top: `${settings.filesPosition.y}%`,
              zIndex: editingPositions ? 50 : undefined,
              cursor: editingPositions ? 'grab' : undefined,
              touchAction: editingPositions ? 'none' : undefined,
              ...buttonBorderStyle,
            }}
            disabled={!interactive}
          >
            <FolderOpen size={20} strokeWidth={1.4} />
          </button>
        )}

        {interactive && editingPositions && (
          <button
            type="button"
            onClick={() => setEditingPositions(false)}
            className="absolute bottom-6 left-1/2 px-6 py-2 rounded-full text-xs font-medium z-50"
            style={{ background: '#fff', color: '#000', transform: 'translateX(-50%)' }}
          >
            完了
          </button>
        )}

        {interactive && filesOpen && !editingPositions && (
          <>
            <button
              type="button"
              aria-label="close files"
              onClick={() => setFilesOpen(false)}
              className="absolute inset-0 z-30 bg-transparent cursor-default"
            />
            <FilesPanel settings={settings} />
          </>
        )}

        {interactive && open && !editingPositions && (
          <>
            <button
              type="button"
              aria-label="close"
              onClick={() => setOpen(false)}
              className="absolute inset-0 z-30 bg-transparent cursor-default"
            />
            <MenuPanel
              settings={settings}
              onChange={setSettings}
              onOpenPositionPicker={() => { setOpen(false); setEditingPositions(true) }}
            />
          </>
        )}
      </div>
    </div>
  )
}

function renderButtonIcon(design: Settings['menuButtonDesign'], Icon: React.ElementType | null, buttonImage: string | null) {
  if (design === 'upload') {
    // eslint-disable-next-line @next/next/no-img-element
    if (buttonImage) return <img src={buttonImage} alt="menu" style={{ width: 20, height: 20, objectFit: 'contain' }} />
    return <Settings2 size={20} strokeWidth={1.4} />
  }
  if (Icon) return <Icon size={20} strokeWidth={1.4} />
  if (design === 'seal') {
    return (
      <span style={{
        display: 'inline-flex',
        width: 20,
        height: 20,
        border: '1.5px solid currentColor',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: 'bold',
      }}>印</span>
    )
  }
  return <Settings2 size={20} strokeWidth={1.4} />
}
