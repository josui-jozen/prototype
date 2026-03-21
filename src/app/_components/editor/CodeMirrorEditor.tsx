'use client'

import { useEffect } from 'react'
import { useCodeMirror } from './useCodeMirror'

type CodeMirrorEditorProps = {
  initialContent: string
  disabled?: boolean
  onContentChange?: (content: string) => void
  onCharCountChange?: (count: number) => void
  onInsertAtCursor?: (fn: (text: string) => void) => void
}

export function CodeMirrorEditor({
  initialContent,
  disabled,
  onContentChange,
  onCharCountChange,
  onInsertAtCursor,
}: CodeMirrorEditorProps) {
  const { editorRef, charCount, insertAtCursor } = useCodeMirror({
    initialContent,
    disabled,
    onContentChange,
  })

  useEffect(() => {
    onCharCountChange?.(charCount)
  }, [charCount, onCharCountChange])

  useEffect(() => {
    onInsertAtCursor?.(insertAtCursor)
  }, [insertAtCursor, onInsertAtCursor])

  return (
    <div
      ref={editorRef}
      className="min-h-[300px] flex-1"
    />
  )
}
