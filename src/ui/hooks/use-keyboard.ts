import { useEffect } from "react";
import { KEY_CODES } from "shared/constants";

type KeyboardEventHandler = (event: KeyboardEvent) => void;

export const useKeyboard = (handler?: KeyboardEventHandler) => {
  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      if (event.code !== KEY_CODES.ESCAPE) event.preventDefault();
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
