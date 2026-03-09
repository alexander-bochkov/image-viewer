import { useEffect } from "react";

const NO_SCROLL_CLASS = "no-scroll";

export const useHidePageScrollbar = (hide: boolean) => {
  useEffect(() => {
    hide
      ? document.documentElement.classList.add(NO_SCROLL_CLASS)
      : document.documentElement.classList.remove(NO_SCROLL_CLASS);
  }, [hide]);
};
