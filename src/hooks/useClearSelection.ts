import { useEffect } from "react";

/**
 * Clears the window text selection when the user clicks outside any
 * contentEditable region.
 */
export function useClearSelection() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[contenteditable="true"]')) {
        window.getSelection()?.removeAllRanges();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
}
