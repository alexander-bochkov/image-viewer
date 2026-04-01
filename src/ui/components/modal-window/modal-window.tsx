import { useEffect, useId, useRef } from "react";
import { Button, Icon } from "ui/components";

import type { MouseEvent, PropsWithChildren } from "react";

import styles from "./modal-window.module.css";

const TRANSITION_DURATION = 150;

type ModalWindowProps = {
  onClose?: () => void;
};

export const ModalWindow = ({
  children,
  onClose,
}: PropsWithChildren<ModalWindowProps>) => {
  const selfRef = useRef<HTMLDialogElement>(null);

  const dialogId = useId();

  const handleDialogClick = ({ target }: MouseEvent<HTMLDialogElement>) => {
    if (target === selfRef.current) selfRef.current.close();
  };

  const handleDialogClose = () => {
    setTimeout(() => onClose?.(), TRANSITION_DURATION);
  };

  useEffect(() => {
    selfRef.current?.showModal();
  }, []);

  return (
    <dialog
      className={styles.modalWindow}
      id={dialogId}
      onClick={handleDialogClick}
      onClose={handleDialogClose}
      ref={selfRef}
      style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
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
