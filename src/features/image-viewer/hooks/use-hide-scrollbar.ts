import { useEffect } from "react";

import styles from "../image-viewer.module.css";

export const useHideScrollbar = () => {
  useEffect(() => {
    document.documentElement.classList.add(styles.hideScrollbar);

    return () => {
      document.documentElement.classList.remove(styles.hideScrollbar);
    };
  }, []);
};
