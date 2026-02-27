import type { PropsWithChildren, Ref } from "react";

import styles from "./container.module.css";

type ContainerProps = {
  ref?: Ref<HTMLDivElement>;
};

export const Container = ({
  children,
  ref,
}: PropsWithChildren<ContainerProps>) => (
  <div className={styles.container} ref={ref}>
    {children}
  </div>
);
