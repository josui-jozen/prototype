import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { LOCALES, LOCALE_LABELS, useLocale, type Locale } from "../../i18n";

export function LocaleSwitcher() {
  const locale = useLocale();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    navigate(next === "ja" ? "/" : `/${next}`);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="ato-body text-xs sm:text-sm px-2.5 py-0.5 rounded-full border border-current/20 hover:border-current/50 transition-colors duration-300"
      >
        Language
      </button>
      {open && (
        <div className="absolute right-0 mt-2 min-w-[120px] rounded-xl bg-ato-surface border border-ato-border shadow-lg overflow-hidden z-50">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => handleSelect(l)}
              className="w-full text-left px-4 py-2 ato-body text-ato-text hover:bg-ato-base transition-colors duration-200"
              style={{ fontWeight: l === locale ? 700 : 400 }}
            >
              {LOCALE_LABELS[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
