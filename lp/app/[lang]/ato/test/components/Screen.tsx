'use client'

import React, { useRef, useState } from 'react'
import { FolderOpen } from 'lucide-react'
import './Screen.css'
import { type Settings } from './settings'
import { Editor, type EditorBlock } from './Editor'
import { MenuPanel } from './MenuPanel'
import { FilesPanel } from './FilesPanel'
import { IconButton } from './Button'
import { MenuButtonIcon } from './MenuButtonIcon'

export function Screen({
  settings: initialSettings,
  content,
  interactive = false,
}: {
  settings: Settings
  content: EditorBlock[]
  interactive?: boolean
}) {
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const [open, setOpen] = useState(false)
  const [filesOpen, setFilesOpen] = useState(false)
  const [editingPositions, setEditingPositions] = useState(false)
  const safeRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef<'menu' | 'files' | null>(null)

  return (
    <div className="ato-screen">
      <div ref={safeRef} className="ato-screen__safe">
        <Editor settings={settings} content={content} />

        {interactive && editingPositions && (
          <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: 'rgba(0,0,0,0.35)' }}>
            <div className="absolute top-4 left-0 right-0 text-center text-white text-[11px] px-4">
              ボタンをドラッグして位置を調整
            </div>
          </div>
        )}

        <IconButton
          settings={settings}
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
          style={{
            position: 'absolute',
            zIndex: editingPositions ? 50 : 30,
            left: `${settings.menuPosition.x}%`,
            top: `${settings.menuPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            cursor: editingPositions ? 'grab' : 'pointer',
            touchAction: editingPositions ? 'none' : undefined,
          }}
          disabled={!interactive}
        >
          <MenuButtonIcon design={settings.menuButtonDesign} image={settings.menuButtonImage} />
        </IconButton>

        {settings.files && (
          <IconButton
            settings={settings}
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
            style={{
              position: 'absolute',
              zIndex: editingPositions ? 50 : 30,
              left: `${settings.filesPosition.x}%`,
              top: `${settings.filesPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: editingPositions ? 'grab' : 'pointer',
              touchAction: editingPositions ? 'none' : undefined,
            }}
            disabled={!interactive}
          >
            <FolderOpen size={20} strokeWidth={1.4} />
          </IconButton>
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
