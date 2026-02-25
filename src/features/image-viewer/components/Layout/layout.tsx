import type { PropsWithChildren } from "react";

import styles from "./layout.module.css";

export const Layout = ({ children }: PropsWithChildren) => (
  <div className={styles.layout}>{children}</div>
);
