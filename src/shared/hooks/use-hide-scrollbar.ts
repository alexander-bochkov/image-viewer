import { useEffect } from "react";

export const useHideScrollbar = () => {
  useEffect(() => {
    const { clientWidth } = document.documentElement;
    const { innerWidth } = window;

    const scrollbarWidth = innerWidth - clientWidth;

    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.scrollbarWidth = "none";

    return () => {
      document.documentElement.style.paddingRight = "";
      document.documentElement.style.scrollbarWidth = "";
    };
  }, []);
};
