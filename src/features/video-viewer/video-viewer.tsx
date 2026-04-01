import { Activity, useCallback, useRef, useState } from "react";
import { Loader, ModalWindow } from "shared/components";
import { useHideScrollbar, useKeyboard, useLockScrolling } from "shared/hooks";

import styles from "./video-viewer.module.css";

const ENTER_KEY = "Enter";
const SPACE_KEY = " ";

type VideoViewerProps = {
  onClose?: () => void;
  src: string;
};

const VideoViewer = ({ onClose, src }: VideoViewerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleKeyboard = useCallback(({ key, type }: KeyboardEvent) => {
    if (!videoRef.current || type !== "keydown") return;

    const video = videoRef.current;

    if (key === ENTER_KEY || key === SPACE_KEY) {
      video.paused ? video.play() : video.pause();
    }
  }, []);

  useHideScrollbar();
  useKeyboard(handleKeyboard);
  useLockScrolling();

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <ModalWindow onClose={onClose}>
      {isLoading && <Loader />}
      <Activity mode={isLoading ? "hidden" : "visible"}>
        <video
          autoPlay
          className={styles.video}
          controls
          loop
          onCanPlay={handleCanPlay}
          ref={videoRef}
          src={src}
        />
      </Activity>
    </ModalWindow>
  );
};

export default VideoViewer;
