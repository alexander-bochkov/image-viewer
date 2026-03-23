import { useEffect } from "react";

import styles from "../styles/hide-scrollbar.module.css";

export const useHideScrollbar = (enabled: boolean) => {
  useEffect(() => {
    enabled
      ? document.documentElement.classList.add(styles.hideScrollbar)
      : document.documentElement.classList.remove(styles.hideScrollbar);
  }, [enabled]);
};
