import { Activity, useState } from "react";
import { Loader, ModalWindow } from "shared/components";
import {
  useHideScrollbar,
  useLockKeyboard,
  useLockScrolling,
} from "shared/hooks";

import styles from "./video-viewer.module.css";

type VideoViewerProps = {
  onClose?: () => void;
  src: string;
};

const VideoViewer = ({ onClose, src }: VideoViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useHideScrollbar();
  useLockKeyboard();
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
          src={src}
        />
      </Activity>
    </ModalWindow>
  );
};

export default VideoViewer;
