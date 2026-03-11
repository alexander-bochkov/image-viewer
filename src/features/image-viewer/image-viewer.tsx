import { useRef, useState } from "react";
import { Container } from "./components/Container";
import { Image } from "./components/Image";
import { DEFAULT_OFFSET } from "./constants";
import { useControls, useResize } from "./hooks";

import type { Offset, Scale } from "./types";

type ImageViewerProps = {
  src: string;
};

const ImageViewer = ({ src }: ImageViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [offset, setOffset] = useState<Offset>(DEFAULT_OFFSET);
  const [scale, setScale] = useState<Scale>("fit");

  useControls({ containerRef, imageRef, setOffset, setScale });
  useResize({ setOffset, setScale });

  return (
    <Container ref={containerRef}>
      <Image offset={offset} ref={imageRef} scale={scale} src={src} />
    </Container>
  );
};

export default ImageViewer;
