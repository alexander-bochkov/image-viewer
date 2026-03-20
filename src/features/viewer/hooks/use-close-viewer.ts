import { useEffect } from "react";

import type { RefObject } from "react";
import type { Nullable } from "shared/types";

const ESCAPE_KEY = "Escape";

export const useCloseViewer = ({
  enabled,
  handler,
  modalWindowRef,
}: {
  enabled: boolean;
  handler: () => void;
  modalWindowRef: RefObject<Nullable<HTMLDialogElement>>;
}) => {
  useEffect(() => {
    if (!enabled || !modalWindowRef.current) return;

    const modalWindow = modalWindowRef.current;

    const closeOnClick = (event: MouseEvent) => {
      if (event.target instanceof HTMLDialogElement) {
        handler();
      }
    };

    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === ESCAPE_KEY) {
        event.stopPropagation(); // Prevent other page actions on Escape
        handler();
      }
    };

    modalWindow.addEventListener("click", closeOnClick);
    document.addEventListener("keydown", closeOnEsc, { capture: true });

    return () => {
      modalWindow.removeEventListener("click", closeOnClick);
      document.removeEventListener("keydown", closeOnEsc, { capture: true });
    };
  }, [enabled, handler, modalWindowRef.current]);
};
