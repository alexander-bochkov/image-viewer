import { useEffect, useId, useRef } from "react";
import { Button, Icon } from "shared/components";

import type { MouseEvent, PropsWithChildren } from "react";

import styles from "./modal-window.module.css";

type ModalWindowProps = {
  onClose?: () => void;
  show: boolean;
};

export const ModalWindow = ({
  children,
  onClose,
  show,
}: PropsWithChildren<ModalWindowProps>) => {
  const dialogId = useId();
  const selfRef = useRef<HTMLDialogElement>(null);

  const handleClick = ({ target }: MouseEvent<HTMLDialogElement>) => {
    if (target === selfRef.current) selfRef.current.close();
  };

  useEffect(() => {
    show && selfRef.current?.showModal();
  }, [show]);

  useEffect(() => {
    const blockKeyboard = (event: KeyboardEvent) => {
      show && event.stopPropagation();
    };

    document.addEventListener("keydown", blockKeyboard, { capture: true });
    document.addEventListener("keyup", blockKeyboard, { capture: true });

    return () => {
      document.removeEventListener("keydown", blockKeyboard, { capture: true });
      document.removeEventListener("keyup", blockKeyboard, { capture: true });
    };
  }, [show]);

  return (
    <dialog
      className={styles.modalWindow}
      id={dialogId}
      onClick={handleClick}
      onClose={onClose}
      ref={selfRef}
    >
      <Button
        className={styles.closeButton}
        command="close"
        commandFor={dialogId}
        shape="round"
        size="small"
        variant="accent"
      >
        <Icon name="xmark" />
      </Button>
      {children}
    </dialog>
  );
};
