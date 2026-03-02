import { useEffect } from "react";
import { DEFAULT_OFFSET, FULL_SIZE_SCALE } from "../constants";
import { calculateImageScaleInContainer } from "../utils";

import type { RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset, Scale } from "../types";

const MAX_SCALE = 4;
const SCALE_STEP = 0.3;

export const useZoom = ({
  containerRef,
  imageRef,
  setOffset,
  setScale,
}: {
  containerRef: RefObject<Nullable<HTMLDivElement>>;
  imageRef: RefObject<Nullable<HTMLImageElement>>;
  setOffset: (value: SetStateAction<Offset>) => void;
  setScale: (value: SetStateAction<Scale>) => void;
}) => {
  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const containerEl = containerRef.current;
    const imageEl = imageRef.current;

    const handleDoubleClick = () => {
      setScale((prevScale) => {
        if (prevScale !== "fit") {
          setOffset(DEFAULT_OFFSET);
          return "fit";
        }

        const imageScale = calculateImageScaleInContainer(imageEl, containerEl);
        return imageScale < FULL_SIZE_SCALE ? FULL_SIZE_SCALE : prevScale;
      });
    };

    const handleWheel = ({ deltaY }: WheelEvent) => {
      const zoom = deltaY < 0 ? "in" : "out";

      setScale((prevScale) => {
        const imageScale = calculateImageScaleInContainer(imageEl, containerEl);
        const viewScale = Math.min(imageScale, FULL_SIZE_SCALE);

        if (prevScale === "fit") {
          return zoom === "in" ? viewScale + SCALE_STEP : prevScale;
        }

        if (zoom === "in") {
          const nextScale = prevScale + SCALE_STEP;
          return nextScale < MAX_SCALE ? nextScale : MAX_SCALE;
        }

        const nextScale = prevScale - SCALE_STEP;
        return nextScale > viewScale ? nextScale : "fit";
      });
    };

    imageEl.addEventListener("dblclick", handleDoubleClick);
    document.addEventListener("wheel", handleWheel);

    return () => {
      imageEl.removeEventListener("dblclick", handleDoubleClick);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [containerRef.current, imageRef.current, setOffset, setScale]);
};
