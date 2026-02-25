import clsx from "clsx";
import { XMark } from "shared/icons";

import styles from "./close-button.module.css";

type CloseButtonProps = {
  className?: string;
  onClick: () => void;
};

export const CloseButton = ({ className, onClick }: CloseButtonProps) => (
  <button
    className={clsx(styles.closeButton, className)}
    onClick={onClick}
    type="button"
  >
    <XMark className={styles.icon} />
  </button>
);
