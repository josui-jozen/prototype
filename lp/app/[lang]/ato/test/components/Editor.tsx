'use client'

import React, { useEffect, useRef, useState } from 'react'
import './Editor.css'
import { type Settings } from './settings'

export type EditorBlock = string | React.ReactNode

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

function renderBlock(block: EditorBlock, i: number, settings: Settings): React.ReactNode {
  if (typeof block === 'string') {
    return renderLine(block, i, settings.editorImageFrame, settings.editorImageRotate, settings.sectionColors, settings.editorRuby)
  }
  return <React.Fragment key={i}>{block}</React.Fragment>
}

const PUNCT_END_REGEX = /[、。，．」）]/
const PUNCT_START_REGEX = /[「（]/
const PUNCT_ANY_REGEX = /[、。，．「」（）]/

function wrapPunctuation(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => {
      const parent = n.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      if (parent.classList.contains('ato-punct-end') || parent.classList.contains('ato-punct-start')) return NodeFilter.FILTER_REJECT
      if (parent.closest('code, pre')) return NodeFilter.FILTER_REJECT
      return PUNCT_ANY_REGEX.test(n.textContent ?? '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })
  const targets: Text[] = []
  let node: Node | null
  while ((node = walker.nextNode())) targets.push(node as Text)
  for (const textNode of targets) {
    const text = textNode.textContent ?? ''
    const parent = textNode.parentNode
    if (!parent) continue
    const frag = document.createDocumentFragment()
    let buf = ''
    for (const ch of text) {
      const isEnd = PUNCT_END_REGEX.test(ch)
      const isStart = PUNCT_START_REGEX.test(ch)
      if (isEnd || isStart) {
        if (buf) { frag.appendChild(document.createTextNode(buf)); buf = '' }
        const span = document.createElement('span')
        span.className = isEnd ? 'ato-punct-end' : 'ato-punct-start'
        span.textContent = ch
        frag.appendChild(span)
      } else {
        buf += ch
      }
    }
    if (buf) frag.appendChild(document.createTextNode(buf))
    parent.replaceChild(frag, textNode)
  }
}

export function Editor({
  settings,
  content,
  className,
  style,
}: {
  settings: Settings
  content: EditorBlock[]
  className?: string
  style?: React.CSSProperties
}) {
  const textRef = useRef<HTMLDivElement>(null)

  const subColor = `color-mix(in srgb, ${settings.textColor} 55%, ${settings.editorBgColor} 45%)`
  const editorStyle: React.CSSProperties & Record<string, string | number> = {
    '--ato-editor-bg-color': settings.editorBgColor,
    '--ato-editor-bg-image': settings.editorBgImage ? `url("${settings.editorBgImage}")` : 'none',
    '--ato-text': settings.textColor,
    '--ato-sub': subColor,
    '--ato-border': settings.panelBorder.color.top,
    '--ato-surface': `color-mix(in srgb, ${settings.textColor} 4%, ${settings.editorBgColor})`,
    '--ato-font-kanji': settings.fontKanji,
    '--ato-font-kana': settings.fontKana,
    '--ato-font-alnum': settings.fontAlnum,
    '--ato-rule-color': settings.editorRuleColor,
    '--ato-ui-bg-color': settings.uiBgColor,
    '--ato-ui-fg-color': settings.panelTextColor ?? settings.textColor,
    '--ato-button-radius': `${settings.buttonBorderRadius}px`,
    '--ato-panel-radius': `${settings.panelBorderRadius}px`,
    '--ato-width': `${settings.editorWidth}%`,
    '--ato-size-normal': `${settings.sectionSize.normal}px`,
    '--ato-size-h1': `${settings.sectionSize.h1}px`,
    '--ato-size-h2': `${settings.sectionSize.h2}px`,
    '--ato-size-h3': `${settings.sectionSize.h3}px`,
    '--ato-size-bold': `${settings.sectionSize.bold}px`,
    '--ato-lh-normal': settings.sectionLineHeight.normal,
    '--ato-lh-h1': settings.sectionLineHeight.h1,
    '--ato-lh-h2': settings.sectionLineHeight.h2,
    '--ato-lh-h3': settings.sectionLineHeight.h3,
    '--ato-lh-bold': settings.sectionLineHeight.bold,
    '--ato-ls-normal': `${settings.sectionLetterSpacing.normal}em`,
    '--ato-ls-h1': `${settings.sectionLetterSpacing.h1}em`,
    '--ato-ls-h2': `${settings.sectionLetterSpacing.h2}em`,
    '--ato-ls-h3': `${settings.sectionLetterSpacing.h3}em`,
    '--ato-ls-bold': `${settings.sectionLetterSpacing.bold}em`,
    '--ui-fg': settings.textColor,
    '--ui-sub': subColor,
    '--ui-bg': settings.editorBgColor,
    '--ui-surface': settings.uiBgColor,
    '--ui-border': settings.panelBorder.color.top,
    ...style,
  }

  useEffect(() => {
    if (textRef.current) wrapPunctuation(textRef.current)
  }, [content])

  return (
    <div
      className={className ? `ato-editor ${className}` : 'ato-editor'}
      data-rule={settings.editorRule}
      style={editorStyle}
    >
      <div className="ato-editor__content" data-direction={settings.direction}>
        <div className="ato-editor__text" ref={textRef}>
          {content.map((block, i) => renderBlock(block, i, settings))}
        </div>
      </div>
    </div>
  )
}
