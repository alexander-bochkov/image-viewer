import { useEffect } from "react";

const ESCAPE_KEY = "Escape";

export const useCloseViewer = ({
  enabled,
  handler,
}: {
  enabled: boolean;
  handler: () => void;
}) => {
  useEffect(() => {
    if (!enabled) return;

    const closeOnClick = ({ target }: MouseEvent) => {
      if (target instanceof HTMLDialogElement) {
        handler();
      }
    };

    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === ESCAPE_KEY) {
        event.stopPropagation(); // Prevent other page actions on Escape
        handler();
      }
    };

    document.addEventListener("click", closeOnClick);
    document.addEventListener("keydown", closeOnEsc, { capture: true });

    return () => {
      document.removeEventListener("click", closeOnClick);
      document.removeEventListener("keydown", closeOnEsc, { capture: true });
    };
  }, [enabled, handler]);
};
