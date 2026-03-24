import { Activity, useRef, useState } from "react";
import { Container } from "./components/Container";
import { Image } from "./components/Image";
import { Loader } from "./components/Loader";
import { Tools } from "./components/Tools";
import { DEFAULT_OFFSET } from "./constants";
import { useDrag, useResize, useRotation, useZoom } from "./hooks";
import { getFitScale } from "./utils";

import type { MouseEvent, SyntheticEvent } from "react";
import type { View } from "./types";

const INITIAL_FIT_SCALE = 0;
const INITIAL_ROTATION = 0;

type ImageViewerProps = {
  src: string;
};

const ImageViewer = ({ src }: ImageViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const fitScale = useRef(INITIAL_FIT_SCALE);

  const [view, setView] = useState<View>({
    offset: DEFAULT_OFFSET,
    rotation: INITIAL_ROTATION,
    scale: fitScale.current,
  });

  useResize({ containerRef, fitScale, imageRef, setView, view });

  const { isDragging, onDrag, onDragEnd, onDragStart } = useDrag({
    containerRef,
    imageRef,
    setView,
    view,
  });

  const { rotate } = useRotation({
    containerRef,
    fitScale,
    imageRef,
    setView,
    view,
  });

  const { onFullSizeZoom } = useZoom({
    containerRef,
    fitScale,
    imageRef,
    setView,
    view,
  });

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    !isDragging && onFullSizeZoom(event);
    onDragEnd();
  };

  const handleLoad = ({ currentTarget }: SyntheticEvent<HTMLImageElement>) => {
    if (!containerRef.current) return;

    const nextFitScale = getFitScale(
      containerRef.current,
      currentTarget,
      view.rotation,
    );

    fitScale.current = nextFitScale;
    setView((prevView) => ({ ...prevView, scale: nextFitScale }));
  };

  return (
    <Container ref={containerRef}>
      {!view.scale && <Loader />}
      <Activity mode={view.scale ? "visible" : "hidden"}>
        <Image
          onClick={handleClick}
          onLoad={handleLoad}
          onMouseDown={onDragStart}
          onMouseLeave={onDragEnd}
          onMouseMove={onDrag}
          ref={imageRef}
          src={src}
          style={{
            rotate: `${view.rotation}deg`,
            scale: view.scale,
            translate: `${view.offset.x}px ${view.offset.y}px`,
          }}
        />
        <Tools rotate={rotate} />
      </Activity>
    </Container>
  );
};

export default ImageViewer;
