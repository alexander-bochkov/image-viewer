import { Activity, useCallback, useRef, useState } from "react";
import { KEY_CODES } from "shared/constants";
import { Loader, ModalWindow } from "ui/components";
import { useHideScrollbar, useKeyboard, useLockScrolling } from "ui/hooks";

import type { ViewerProps } from "ui/types";

import styles from "./video-viewer.module.css";

export const VideoViewer = ({ onClose, url }: ViewerProps) => {
  useHideScrollbar();
  useLockScrolling();

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleKeyboardEvent = useCallback(({ code, type }: KeyboardEvent) => {
    if (!videoRef.current || type !== "keydown") return;

    const video = videoRef.current;

    if (code === KEY_CODES.ENTER || code === KEY_CODES.SPACE) {
      video.paused ? video.play() : video.pause();
    }
  }, []);

  useKeyboard(handleKeyboardEvent);

  return (
    <ModalWindow onClose={onClose}>
      {isLoading && <Loader />}
      <Activity mode={isLoading ? "hidden" : "visible"}>
        <video
          autoPlay
          className={styles.video}
          controls
          loop
          muted
          onCanPlay={handleCanPlay}
          ref={videoRef}
          src={url}
        />
      </Activity>
    </ModalWindow>
  );
};
