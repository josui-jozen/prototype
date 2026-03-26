import { useRef, useEffect, useCallback } from "react";

export function useBlockWheel<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const handler = useCallback((e: WheelEvent) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [handler]);

  return ref;
}
