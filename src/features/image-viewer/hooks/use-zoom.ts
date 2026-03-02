import { useCallback } from "react";
import { DEFAULT_OFFSET, FULL_SIZE_SCALE } from "../constants";
import { getImageNaturalScale } from "../utils";

import type { RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset, Scale } from "../types";

const MAX_SCALE = 4;
const SCALE_STEP = 0.2;

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
  const onFullSizeZoom = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return;

    const containerEl = containerRef.current;
    const imageEl = imageRef.current;

    const imageNaturalScale = getImageNaturalScale({ containerEl, imageEl });
    const minScale = Math.min(imageNaturalScale, FULL_SIZE_SCALE);

    setScale((prevScale) => {
      if (
        prevScale !== "fit" &&
        (prevScale <= FULL_SIZE_SCALE || minScale === FULL_SIZE_SCALE)
      ) {
        setOffset(DEFAULT_OFFSET);
        return "fit";
      }

      return FULL_SIZE_SCALE;
    });
  }, [containerRef.current, imageRef.current, setOffset, setScale]);

  const onZoom = useCallback(
    ({ deltaY }: WheelEvent) => {
      if (!containerRef.current || !imageRef.current) return;

      const containerEl = containerRef.current;
      const imageEl = imageRef.current;

      const zoom = deltaY < 0 ? "in" : "out";

      setScale((prevScale) => {
        const imageNaturalScale = getImageNaturalScale({
          containerEl,
          imageEl,
        });
        const minScale = Math.min(imageNaturalScale, FULL_SIZE_SCALE);

        if (prevScale === "fit") {
          return zoom === "in" ? minScale + SCALE_STEP : prevScale;
        }

        if (zoom === "in") {
          const nextScale = prevScale + SCALE_STEP;
          return Math.min(nextScale, MAX_SCALE);
        }

        const nextScale = prevScale - SCALE_STEP;
        return nextScale > minScale ? nextScale : "fit";
      });
    },
    [containerRef.current, imageRef.current, setScale],
  );

  return { onFullSizeZoom, onZoom };
};
