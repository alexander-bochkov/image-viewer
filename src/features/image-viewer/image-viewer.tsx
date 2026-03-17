import { useRef, useState } from "react";
import { Container } from "./components/Container";
import { Image } from "./components/Image";
import { Loader } from "./components/Loader";
import { DEFAULT_OFFSET } from "./constants";
import { useControls, useInit, useResize } from "./hooks";

import type { Offset } from "./types";

const INITIAL_SCALE = 0;

type ImageViewerProps = {
  src: string;
};

const ImageViewer = ({ src }: ImageViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [fitScale, setFitScale] = useState(INITIAL_SCALE);
  const [scale, setScale] = useState(INITIAL_SCALE);

  const [offset, setOffset] = useState<Offset>(DEFAULT_OFFSET);

  useInit({ containerRef, setFitScale, setScale, src });
  useResize({ containerRef, imageRef, setFitScale, setOffset, setScale });
  useControls({
    containerRef,
    fitScale,
    imageRef,
    offset,
    scale,
    setOffset,
    setScale,
  });

  return (
    <Container ref={containerRef}>
      {fitScale && scale ? (
        <Image
          fitScale={fitScale}
          offset={offset}
          ref={imageRef}
          scale={scale}
          src={src}
        />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default ImageViewer;
