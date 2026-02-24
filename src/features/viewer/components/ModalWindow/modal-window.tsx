import { CloseButton } from "../CloseButton";
import { CloseIcon } from "../CloseIcon";

import type { PropsWithChildren, Ref } from "react";

import styles from "./modal-window.module.css";

type ModalWindowProps = {
  ref: Ref<HTMLDialogElement>;
  onClose: () => void;
};

export const ModalWindow = ({
  children,
  onClose,
  ref,
}: PropsWithChildren<ModalWindowProps>) => (
  <dialog className={styles.modalWindow} ref={ref}>
    <CloseButton className={styles.closeBtn} onClick={onClose}>
      <CloseIcon size={30} />
    </CloseButton>
    {children}
  </dialog>
);
