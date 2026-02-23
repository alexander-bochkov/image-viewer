import { useEffect } from "react";

const NO_SCROLL_CLASS = "no-scroll";

export const useHidePageScrollbar = (hide: boolean) => {
  useEffect(() => {
    hide
      ? document.body.classList.add(NO_SCROLL_CLASS)
      : document.body.classList.remove(NO_SCROLL_CLASS);
  }, [hide]);
};
