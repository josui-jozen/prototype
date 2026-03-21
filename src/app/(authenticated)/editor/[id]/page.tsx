"use client";

import { useState, useCallback, useRef, use, useEffect } from "react";
import { ArticleVisibility } from "@/usecase/article/article.types";
import { articleMockRepo } from "@/infrastructure/repository/article/article.mock";
import { CodeMirrorEditor } from "@/app/_components/editor/CodeMirrorEditor";
import { EditorHeader } from "@/app/_components/editor/EditorHeader";
import { EditorToolbar } from "@/app/_components/editor/EditorToolbar";
import { GuideModal } from "@/app/_components/editor/GuideModal";

type SaveStatus = "saved" | "saving" | "unsaved";

export default function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [article] = useState(() => {
    // モックデータを同期的に初期化
    const articles = articleMockRepo as { findById: (id: string) => Promise<import("@/usecase/article/article.types").Article | null> };
    // モック実装は実際には同期的なので直接データにアクセス
    return null as import("@/usecase/article/article.types").Article | null;
  });

  // モックデータから記事を取得
  const [loadedArticle, setLoadedArticle] = useState<import("@/usecase/article/article.types").Article | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      articleMockRepo.findById(id).then((a) => {
        setLoadedArticle(a);
        setLoaded(true);
      });
    }
  }, [id, loaded]);

  const currentArticle = loadedArticle;

  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<ArticleVisibility>("private");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [charCount, setCharCount] = useState(0);
  const [guideOpen, setGuideOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // 記事データが読み込まれたら初期値を設定
  if (currentArticle && !initialized) {
    setTitle(currentArticle.title);
    setVisibility(currentArticle.visibility);
    setInitialized(true);
  }

  const insertAtCursorRef = useRef<((text: string) => void) | null>(null);

  const handleContentChange = useCallback(() => {
    setSaveStatus("unsaved");
  }, []);

  const handleImageInsert = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    insertAtCursorRef.current?.(`![${file.name}](${url})`);
  }, []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-screen text-[var(--color-text-muted)]">
        読み込み中...
      </div>
    );
  }

  if (!currentArticle) {
    return (
      <div className="flex items-center justify-center h-screen text-[var(--color-text-muted)]">
        記事が見つかりません
      </div>
    );
  }

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
              initialContent={currentArticle.body}
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
