import { useCallback, useRef, useState } from "react";
import { Image } from "./components/Image";
import { Layout } from "./components/Layout";
import { MAX_FIT_SCALE, MAX_SCALE, SCALE_FACTOR } from "./constants";
import { useUpdateFitScale, useZoom } from "./hooks";

import type { Zoom } from "./types";

type ImageViewerProps = {
  src: string;
};

const ImageViewer = ({ src }: ImageViewerProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const [fitScale, setFitScale] = useState<number>(MAX_FIT_SCALE);
  const [currentScale, setCurrentScale] = useState<number>(fitScale);

  const handleFitScaleUpdate = useCallback(
    (nextFitScale: number) => {
      if (fitScale >= currentScale) {
        setCurrentScale(nextFitScale);
      }

      setFitScale(nextFitScale);
    },
    [fitScale, currentScale],
  );

  const handleZoom = useCallback(
    (zoom: Zoom) => {
      setCurrentScale((prevCurrentScale) => {
        if (zoom === "in") {
          const nextScale = prevCurrentScale + SCALE_FACTOR;
          return nextScale <= MAX_SCALE ? nextScale : MAX_SCALE;
        }

        const nextScale = prevCurrentScale - SCALE_FACTOR;
        return nextScale >= fitScale ? nextScale : fitScale;
      });
    },
    [fitScale],
  );

  useUpdateFitScale({ handler: handleFitScaleUpdate, imageRef });
  useZoom(handleZoom);

  const handleDoubleClick = () => {
    const isFitted = fitScale === currentScale;
    setCurrentScale(isFitted ? MAX_FIT_SCALE : fitScale);
  };

  return (
    <Layout>
      <Image
        onDoubleClick={handleDoubleClick}
        ref={imageRef}
        scale={currentScale}
        src={src}
      />
    </Layout>
  );
};

export default ImageViewer;
