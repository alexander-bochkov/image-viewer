import { useEffect } from "react";

const ESCAPE_KEY = "Escape";

export const useLockKeyboard = (enabled: boolean) => {
  useEffect(() => {
    const lockKeyboard = (event: KeyboardEvent) => {
      if (!enabled) return;
      if (event.key !== ESCAPE_KEY) event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener("keydown", lockKeyboard, { capture: true });
    document.addEventListener("keyup", lockKeyboard, { capture: true });

    return () => {
      document.removeEventListener("keydown", lockKeyboard, { capture: true });
      document.removeEventListener("keyup", lockKeyboard, { capture: true });
    };
  }, [enabled]);
};
