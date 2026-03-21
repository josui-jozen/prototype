"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GatePage() {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/gate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passphrase }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[20px] w-[320px]">
        <p className="text-[20px] text-[rgba(3,10,18,0.87)] tracking-[0.483px] m-0">
          合言葉を入力してください
        </p>
        <input
          type="password"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          placeholder="合言葉"
          autoFocus
          className="w-full h-[44px] px-[14px] rounded-[12px] border border-[#e6e8e9] bg-[#f7fafc] text-[15px] outline-none focus:border-[#a7abb1] transition-colors"
        />
        {error && (
          <p className="text-[13px] text-red-500 m-0">合言葉が違います</p>
        )}
        <button
          type="submit"
          disabled={loading || !passphrase}
          className="w-full h-[44px] rounded-full bg-[rgba(104,115,120,0.6)] text-white text-[15px] border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(104,115,120,0.8)] transition-colors"
        >
          {loading ? "確認中..." : "入る"}
        </button>
      </form>
    </div>
  );
}
