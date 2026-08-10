import { useEffect } from "react";

/**
 * Binds N (next), P (previous), M (mark for review), C (clear response)
 * keyboard shortcuts while the exam page is mounted. Ignores keystrokes
 * while the user is typing in an input/textarea (none exist on this page,
 * but this keeps the hook safe to reuse elsewhere).
 */
export function useKeyboardShortcuts({ onNext, onPrevious, onMark, onClear, enabled = true }) {
  useEffect(() => {
    if (!enabled) return undefined;

    const handler = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      switch (e.key.toLowerCase()) {
        case "n":
          onNext?.();
          break;
        case "p":
          onPrevious?.();
          break;
        case "m":
          onMark?.();
          break;
        case "c":
          onClear?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, onPrevious, onMark, onClear, enabled]);
}
