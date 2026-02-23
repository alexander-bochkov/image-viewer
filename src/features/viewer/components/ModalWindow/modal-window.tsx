import type { PropsWithChildren, Ref } from "react";

import styles from "./modal-window.module.css";

type ModalWindowProps = {
  ref: Ref<HTMLDialogElement>;
};

export const ModalWindow = ({
  children,
  ref,
}: PropsWithChildren<ModalWindowProps>) => (
  <dialog className={styles.modalWindow} ref={ref}>
    {children}
  </dialog>
);
