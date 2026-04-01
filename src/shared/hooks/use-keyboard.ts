import { useEffect } from "react";

const ESCAPE_KEY = "Escape";

type KeyboardHandler = (event: KeyboardEvent) => void;

export const useKeyboard = (handler?: KeyboardHandler) => {
  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      if (event.key !== ESCAPE_KEY) event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();

      handler?.(event);
    };

    window.addEventListener("keydown", handleKeyboardEvent, true);
    window.addEventListener("keyup", handleKeyboardEvent, true);

    return () => {
      window.removeEventListener("keydown", handleKeyboardEvent, true);
      window.removeEventListener("keyup", handleKeyboardEvent, true);
    };
  }, [handler]);
};
