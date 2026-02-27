import { useRef, useState } from "react";
import { Container } from "./components/Container";
import { Image } from "./components/Image";
import { DEFAULT_POSITION } from "./constants";
import { useDrag, useResize, useZoom } from "./hooks";

import type { Position, Scale } from "./types";

type ImageViewerProps = {
  src: string;
};

const ImageViewer = ({ src }: ImageViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const [scale, setScale] = useState<Scale>("fit");

  useDrag({ containerRef, imageRef, setPosition });
  useResize({ containerRef, imageRef, setScale });
  useZoom({ containerRef, imageRef, setPosition, setScale });

  return (
    <Container ref={containerRef}>
      <Image position={position} ref={imageRef} scale={scale} src={src} />
    </Container>
  );
};

export default ImageViewer;
