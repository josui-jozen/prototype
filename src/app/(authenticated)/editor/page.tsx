"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { ArticleVisibility } from "@/usecase/article/article.types";
import { CodeMirrorEditor } from "@/app/_components/editor/CodeMirrorEditor";
import { EditorHeader } from "@/app/_components/editor/EditorHeader";
import { EditorToolbar } from "@/app/_components/editor/EditorToolbar";
import { GuideModal } from "@/app/_components/editor/GuideModal";

import { TagModal } from "@/app/_components/editor/TagModal";
import { MoodModal } from "@/app/_components/editor/MoodModal";
import { VersionHistoryModal } from "@/app/_components/editor/VersionHistoryModal";


type SaveStatus = "saved" | "saving" | "unsaved";

export default function NewEditorPage() {
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<ArticleVisibility>("private");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [charCount, setCharCount] = useState(0);
  const [guideOpen, setGuideOpen] = useState(false);

  const [tagOpen, setTagOpen] = useState(false);
  const [moodOpen, setMoodOpen] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showTitleHint, setShowTitleHint] = useState(true);
  const [showGuideHint, setShowGuideHint] = useState(true);

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
        onTagClick={() => setTagOpen(true)}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[684px] mx-auto px-[40.25px] pt-[96.6px]">
          {/* タイトルヒント */}
          <div className="relative">
            {showTitleHint && (
              <div className="absolute bottom-full left-[-8px] mb-[8px]">
                <div className="bg-[#f1f6f9] rounded-[16.1px] flex items-center gap-[8px] px-[14px] py-[8px]">
                  <span className="text-[13.5px] text-[#8d9298] tracking-[0.483px] leading-[23px] whitespace-nowrap">
                    デフォルトのタイトルを
                    <Link
                      href="/settings"
                      className="text-[#8d9298] underline decoration-dotted decoration-[#a7abb1] no-underline-offset"
                    >
                      設定できます
                    </Link>
                  </span>
                  <button
                    onClick={() => setShowTitleHint(false)}
                    className="shrink-0 size-[18px] flex items-center justify-center bg-transparent border-none cursor-pointer p-0 text-[#8d9298]"
                  >
                    <X size={14} />
                  </button>
                </div>
                {/* 吹き出し三角 */}
                <div
                  className="ml-[15px] w-0 h-0"
                  style={{
                    borderLeft: '9px solid transparent',
                    borderRight: '9px solid transparent',
                    borderTop: '9px solid #f1f6f9',
                  }}
                />
              </div>
            )}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトル"
              className="w-full text-[20.3px] leading-[37.53px] tracking-[0.483px] text-[var(--color-text-primary)] bg-transparent border-none outline-none placeholder:text-[var(--color-text-muted)]"
            />
          </div>
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
        onGuideClick={() => { setGuideOpen(true); setShowGuideHint(false); }}
        onImageInsert={handleImageInsert}
        onVersionHistoryClick={() => setVersionHistoryOpen(true)}
        onMoodClick={() => setMoodOpen(true)}
        showGuideHint={showGuideHint}
      />

      <GuideModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
      <TagModal
        isOpen={tagOpen}
        onClose={() => setTagOpen(false)}
        tags={tags}
        onTagsChange={setTags}
      />
      <MoodModal
        isOpen={moodOpen}
        onClose={() => setMoodOpen(false)}
        selectedMood={selectedMood}
        onMoodChange={setSelectedMood}
      />
      <VersionHistoryModal
        isOpen={versionHistoryOpen}
        onClose={() => setVersionHistoryOpen(false)}
      />
    </div>
  );
}
