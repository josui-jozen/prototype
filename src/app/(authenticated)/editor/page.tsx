"use client";

import { useState, useCallback, useRef } from "react";
import { ArticleVisibility } from "@/usecase/article/article.types";
import { CodeMirrorEditor } from "@/app/_components/editor/CodeMirrorEditor";
import { EditorHeader } from "@/app/_components/editor/EditorHeader";
import { EditorToolbar } from "@/app/_components/editor/EditorToolbar";
import { GuideModal } from "@/app/_components/editor/GuideModal";

type SaveStatus = "saved" | "saving" | "unsaved";

export default function NewEditorPage() {
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<ArticleVisibility>("private");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [charCount, setCharCount] = useState(0);
  const [guideOpen, setGuideOpen] = useState(false);

  const insertAtCursorRef = useRef<((text: string) => void) | null>(null);

  const handleContentChange = useCallback(() => {
    setSaveStatus("unsaved");
  }, []);

  const handleImageInsert = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    insertAtCursorRef.current?.(`![${file.name}](${url})`);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <EditorHeader
        saveStatus={saveStatus}
        visibility={visibility}
        onVisibilityChange={setVisibility}
        onTagClick={() => {}}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[684px] mx-auto px-[40.25px] pt-[96.6px]">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
            className="w-full text-[20.3px] leading-[37.53px] tracking-[0.483px] text-[var(--color-text-primary)] bg-transparent border-none outline-none placeholder:text-[var(--color-text-muted)]"
          />
          <div className="mt-[24px]">
            <CodeMirrorEditor
              initialContent=""
              onContentChange={handleContentChange}
              onCharCountChange={setCharCount}
              onInsertAtCursor={(fn) => {
                insertAtCursorRef.current = fn;
              }}
            />
          </div>
        </div>
      </main>

      <EditorToolbar
        charCount={charCount}
        onGuideClick={() => setGuideOpen(true)}
        onImageInsert={handleImageInsert}
        onVersionHistoryClick={() => {}}
        onMoodClick={() => {}}
      />

      <GuideModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}
