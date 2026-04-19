'use client'

import { useState } from 'react'
import { Search, Folder, FolderOpen, FileText, BookOpen, ChevronDown, ChevronRight, MoreHorizontal } from 'lucide-react'
import { type Settings } from './settings'
import { Panel } from './Panel'

type FileNode = { kind: 'file'; name: string }
type FolderNode = { kind: 'folder'; name: string; children: TreeNode[]; initialOpen?: boolean }
type BookNode = { kind: 'book'; name: string }
type TreeNode = FileNode | FolderNode | BookNode

const RECENT: FileNode[] = [
  { kind: 'file', name: '無題のノート' },
  { kind: 'file', name: '雨の日のこと' },
]

const NOTEBOOKS: TreeNode[] = [
  {
    kind: 'folder',
    name: '2026年の記録',
    initialOpen: true,
    children: [
      {
        kind: 'folder',
        name: '04月',
        initialOpen: true,
        children: [
          { kind: 'file', name: '無題のノート' },
          { kind: 'file', name: '雨の日のこと' },
          { kind: 'file', name: '新しい始まり' },
        ],
      },
      { kind: 'folder', name: '03月', children: [] },
    ],
  },
  { kind: 'folder', name: '思考の断片', children: [] },
  { kind: 'book', name: '大切なこと' },
]

export function FilesPanel({ settings }: { settings: Settings }) {
  return (
    <Panel settings={settings} slide={settings.filesSlide}>
      <div className="px-4 pt-3 pb-2 shrink-0">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-[10px]"
          style={{ background: 'var(--ato-ui-bg-color)', border: '1px solid var(--ato-border)' }}
        >
          <Search size={14} style={{ color: 'var(--ato-sub)' }} />
          <input
            type="text"
            placeholder="検索..."
            className="flex-1 bg-transparent outline-none text-[13px]"
            style={{ color: 'var(--ato-text)' }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-6">
        <SectionLabel>RECENT</SectionLabel>
        {RECENT.map((n, i) => (
          <FileRow key={`r-${i}`} name={n.name} depth={0} withActions />
        ))}

        <div className="h-4" />

        <SectionLabel>NOTEBOOKS</SectionLabel>
        {NOTEBOOKS.map((n, i) => (
          <Node key={`n-${i}`} node={n} depth={0} />
        ))}
      </div>
    </Panel>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-3 pt-3 pb-2 text-[10px] font-bold tracking-[0.15em]"
      style={{ color: 'var(--ato-sub)' }}
    >
      {children}
    </div>
  )
}

function Node({ node, depth }: { node: TreeNode; depth: number }) {
  const [open, setOpen] = useState(node.kind === 'folder' ? !!node.initialOpen : false)

  if (node.kind === 'file') return <FileRow name={node.name} depth={depth} />
  if (node.kind === 'book') {
    return (
      <Row depth={depth} onClick={() => {}}>
        <span className="w-4 shrink-0" />
        <BookOpen size={14} style={{ color: 'var(--ato-sub)' }} />
        <span className="text-[13px] flex-1 truncate" style={{ color: 'var(--ato-text)' }}>{node.name}</span>
      </Row>
    )
  }
  const Chevron = open ? ChevronDown : ChevronRight
  const FolderIcon = open ? FolderOpen : Folder
  return (
    <>
      <Row depth={depth} onClick={() => setOpen((s) => !s)}>
        <Chevron size={14} className="shrink-0" style={{ color: 'var(--ato-sub)' }} />
        <FolderIcon size={14} style={{ color: 'var(--ato-sub)' }} />
        <span className="text-[13px] flex-1 truncate" style={{ color: 'var(--ato-text)' }}>{node.name}</span>
      </Row>
      {open && node.children.map((child, i) => (
        <Node key={i} node={child} depth={depth + 1} />
      ))}
    </>
  )
}

function FileRow({ name, depth, withActions = false }: { name: string; depth: number; withActions?: boolean }) {
  return (
    <Row depth={depth} onClick={() => {}}>
      <span className="w-4 shrink-0" />
      <FileText size={14} style={{ color: 'var(--ato-sub)' }} />
      <span className="text-[13px] flex-1 truncate" style={{ color: 'var(--ato-text)' }}>{name}</span>
      {withActions && <MoreHorizontal size={14} style={{ color: 'var(--ato-sub)' }} />}
    </Row>
  )
}

function Row({ depth, onClick, children }: { depth: number; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left cursor-pointer"
      style={{ paddingLeft: 12 + depth * 16 }}
    >
      {children}
    </button>
  )
}
