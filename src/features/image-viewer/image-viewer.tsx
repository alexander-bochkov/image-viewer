import { Activity, useRef } from "react";
import { Button, Icon, Loader, ModalWindow } from "shared/components";
import {
  useDrag,
  useHideScrollbar,
  useLockKeyboard,
  useLockScrolling,
  useResize,
  useViewer,
  useZoom,
} from "./hooks";
import { getFitScale } from "./utils";

import type { CSSProperties, MouseEvent, SyntheticEvent } from "react";
import type { Viewer } from "./types";

import styles from "./image-viewer.module.css";

const ROTATION_ANGLE = 90;
const TRANSITION_DURATION = 150;

const getImageStyle = ({
  state: { offsetX, offsetY, rotation, scale },
}: Viewer): CSSProperties => ({
  rotate: `${rotation}deg`,
  scale,
  transitionDuration: `${TRANSITION_DURATION}ms`,
  translate: `${offsetX}px ${offsetY}px`,
});

type ImageViewerProps = {
  onClose?: () => void;
  src: string;
};

const ImageViewer = ({ onClose, src }: ImageViewerProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const viewer = useViewer();

  useHideScrollbar();
  useLockKeyboard();
  useLockScrolling();

  useResize(viewer, imageRef);

  const { isDragging, onDrag, onDragEnd, onDragStart } = useDrag(
    viewer,
    imageRef,
  );

  const { onFullSizeZoom } = useZoom(viewer, imageRef);

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    !isDragging && onFullSizeZoom(event);
    onDragEnd();
  };

  const handleLoad = ({ currentTarget }: SyntheticEvent<HTMLImageElement>) => {
    const { dispatch, state } = viewer;

    const fitScale = getFitScale(currentTarget, state.rotation);

    dispatch({ payload: fitScale, type: "SET_FIT_SCALE" });
    dispatch({ payload: fitScale, type: "SET_SCALE" });
  };

  const handleRotation = (angle: number) => {
    if (!imageRef.current) return;

    const { dispatch, state } = viewer;

    const rotation = state.rotation + angle;
    const fitScale = getFitScale(imageRef.current, rotation);

    if (state.scale === state.fitScale) {
      dispatch({ payload: rotation, type: "SET_ROTATION" });
      dispatch({ payload: fitScale, type: "SET_FIT_SCALE" });
      dispatch({ payload: fitScale, type: "SET_SCALE" });
      dispatch({ type: "RESET_OFFSET" });
    } else {
      dispatch({ payload: state.fitScale, type: "SET_SCALE" });
      dispatch({ type: "RESET_OFFSET" });

      setTimeout(() => {
        dispatch({ payload: rotation, type: "SET_ROTATION" });
        dispatch({ payload: fitScale, type: "SET_FIT_SCALE" });
        dispatch({ payload: fitScale, type: "SET_SCALE" });
      }, TRANSITION_DURATION);
    }
  };

  const isLoading = !viewer.state.scale;

  return (
    <ModalWindow onClose={onClose}>
      <div className={styles.imageViewer}>
        {isLoading && <Loader />}
        <Activity mode={isLoading ? "hidden" : "visible"}>
          <img
            className={styles.image}
            draggable={false}
            onClick={handleClick}
            onLoad={handleLoad}
            onMouseDown={onDragStart}
            onMouseLeave={onDragEnd}
            onMouseMove={onDrag}
            ref={imageRef}
            src={src}
            style={getImageStyle(viewer)}
          />
          <div className={styles.tools}>
            <Button
              onClick={() => handleRotation(-ROTATION_ANGLE)}
              shape="square"
              size="medium"
              variant="default"
            >
              <Icon name="rotate-left" />
            </Button>
            <Button
              onClick={() => handleRotation(ROTATION_ANGLE)}
              shape="square"
              size="medium"
              variant="default"
            >
              <Icon name="rotate-right" />
            </Button>
          </div>
        </Activity>
      </div>
    </ModalWindow>
  );
};

export default ImageViewer;
