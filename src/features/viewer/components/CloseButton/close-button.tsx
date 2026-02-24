import clsx from "clsx";

import type { PropsWithChildren } from "react";

import styles from "./close-button.module.css";

type CloseButtonProps = {
  className?: string;
  onClick: () => void;
};

export const CloseButton = ({
  children,
  className,
  onClick,
}: PropsWithChildren<CloseButtonProps>) => (
  <button
    className={clsx(styles.closeButton, className)}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);
