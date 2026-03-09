import { useCallback } from "react";
import { DEFAULT_OFFSET, FULL_SIZE_SCALE } from "../constants";
import {
  getBoundingClientRectWithReserve,
  getImageNaturalScale,
} from "../utils";

import type { RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset, Scale } from "../types";

const MAX_SCALE = 4;
const SCALE_STEP = 0.2;

const getNextOffset = ({
  clientX,
  clientY,
  containerEl,
  imageEl,
  nextScale,
  scale,
}: {
  clientX: number;
  clientY: number;
  containerEl: HTMLElement;
  imageEl: HTMLImageElement;
  nextScale: number;
  scale: number;
}): Offset => {
  let x = DEFAULT_OFFSET.x;
  let y = DEFAULT_OFFSET.y;

  const container = getBoundingClientRectWithReserve(containerEl);
  const image = imageEl.getBoundingClientRect();

  const { naturalHeight, naturalWidth } = imageEl;

  const sizeDiffX = container.width - naturalWidth * nextScale;
  const sizeDiffY = container.height - naturalHeight * nextScale;

  const willHeightFit = sizeDiffY >= 0;
  const willWidthFit = sizeDiffX >= 0;

  if (!willHeightFit) {
    const containerPointerOffsetY = container.height / 2 - clientY;

    const imagePointerY = (clientY - image.top) / scale;
    const imagePointerOffsetY = naturalHeight / 2 - imagePointerY;

    const nextOffsetY =
      imagePointerOffsetY * nextScale - containerPointerOffsetY;

    const maxOffsetY = Math.abs(sizeDiffY / 2);

    if (Math.abs(nextOffsetY) < maxOffsetY) {
      y = nextOffsetY;
    } else {
      y = Math.sign(nextOffsetY) === 1 ? maxOffsetY : -maxOffsetY;
    }
  }

  if (!willWidthFit) {
    const containerPointerOffsetX = container.width / 2 - clientX;

    const imagePointerX = (clientX - image.left) / scale;
    const imagePointerOffsetX = naturalWidth / 2 - imagePointerX;

    const nextOffsetX =
      imagePointerOffsetX * nextScale - containerPointerOffsetX;

    const maxOffsetX = Math.abs(sizeDiffX / 2);

    if (Math.abs(nextOffsetX) < maxOffsetX) {
      x = nextOffsetX;
    } else {
      x = Math.sign(nextOffsetX) === 1 ? maxOffsetX : -maxOffsetX;
    }
  }

  return { x, y };
};

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
  const onFullSizeZoom = useCallback(
    ({ clientX, clientY }: PointerEvent) => {
      if (!containerRef.current || !imageRef.current) return;

      const containerEl = containerRef.current;
      const imageEl = imageRef.current;

      const naturalScale = getImageNaturalScale({ containerEl, imageEl });
      const fitScale = Math.min(naturalScale, FULL_SIZE_SCALE);

      setScale((prevScale) => {
        if (
          prevScale !== "fit" &&
          (prevScale <= FULL_SIZE_SCALE || fitScale === FULL_SIZE_SCALE)
        ) {
          setOffset(DEFAULT_OFFSET);
          return "fit";
        }

        const scale = prevScale === "fit" ? fitScale : prevScale;

        setOffset(
          getNextOffset({
            clientX,
            clientY,
            containerEl,
            imageEl,
            nextScale: FULL_SIZE_SCALE,
            scale,
          }),
        );
        return FULL_SIZE_SCALE;
      });
    },
    [containerRef.current, imageRef.current, setOffset, setScale],
  );

  const onZoom = useCallback(
    ({ clientX, clientY, deltaY }: WheelEvent) => {
      if (!containerRef.current || !imageRef.current) return;

      const containerEl = containerRef.current;
      const imageEl = imageRef.current;

      const zoom = deltaY < 0 ? "in" : "out";

      setScale((prevScale) => {
        const naturalScale = getImageNaturalScale({
          containerEl,
          imageEl,
        });
        const fitScale = Math.min(naturalScale, FULL_SIZE_SCALE);

        if (prevScale === "fit") {
          if (zoom === "in") {
            const nextScale = fitScale + SCALE_STEP;

            setOffset(
              getNextOffset({
                clientX,
                clientY,
                containerEl,
                imageEl,
                nextScale,
                scale: fitScale,
              }),
            );

            return nextScale;
          } else {
            return prevScale;
          }
        }

        if (zoom === "in") {
          const nextScale = Math.min(prevScale + SCALE_STEP, MAX_SCALE);

          setOffset(
            getNextOffset({
              clientX,
              clientY,
              containerEl,
              imageEl,
              nextScale,
              scale: prevScale,
            }),
          );

          return nextScale;
        }

        const nextScale = prevScale - SCALE_STEP;

        if (nextScale > fitScale) {
          setOffset(
            getNextOffset({
              clientX,
              clientY,
              containerEl,
              imageEl,
              nextScale,
              scale: prevScale,
            }),
          );

          return nextScale;
        } else {
          setOffset(DEFAULT_OFFSET);
          return "fit";
        }
      });
    },
    [containerRef.current, imageRef.current, setOffset, setScale],
  );

  return { onFullSizeZoom, onZoom };
};
