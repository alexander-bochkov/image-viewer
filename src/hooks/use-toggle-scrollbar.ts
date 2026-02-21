import { useEffect } from "react";

const NO_SCROLL_CLASS = "no-scroll";

export const useToggleScrollbar = (shouldHideScrollbar: boolean) => {
  useEffect(() => {
    const bodyEl = document.body;

    if (bodyEl) {
      shouldHideScrollbar
        ? bodyEl.classList.add(NO_SCROLL_CLASS)
        : bodyEl.classList.remove(NO_SCROLL_CLASS);
    }
  }, [shouldHideScrollbar]);
};
