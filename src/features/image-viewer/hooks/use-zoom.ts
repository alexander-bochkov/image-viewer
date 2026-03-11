import { useCallback } from "react";
import { DEFAULT_OFFSET, FULL_SIZE_SCALE } from "../constants";
import { getBoundingClientRectWithReserve } from "../utils";

import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset, Scale } from "../types";

const MAX_SCALE = 4;

const getImageNaturalScale = ({
  containerEl,
  imageEl,
}: {
  containerEl: HTMLElement;
  imageEl: HTMLImageElement;
}) => {
  const { height, width } = containerEl.getBoundingClientRect();
  const { naturalHeight, naturalWidth } = imageEl;

  const naturalScaleToHeight = height / naturalHeight;
  const naturalScaleToWidth = width / naturalWidth;

  return Math.min(naturalScaleToHeight, naturalScaleToWidth);
};

const getOffset = ({
  clientX,
  clientY,
  containerEl,
  imageEl,
  prevScale,
  scale,
}: {
  clientX: number;
  clientY: number;
  containerEl: HTMLElement;
  imageEl: HTMLImageElement;
  prevScale: Exclude<Scale, "fit">;
  scale: Exclude<Scale, "fit">;
}) => {
  let { x, y } = DEFAULT_OFFSET;

  const { height, width } = getBoundingClientRectWithReserve(containerEl);
  const { naturalHeight, naturalWidth } = imageEl;

  const diffX = width - naturalWidth * scale;
  const diffY = height - naturalHeight * scale;

  if (diffX < 0) {
    const { width } = containerEl.getBoundingClientRect();
    const { left } = imageEl.getBoundingClientRect();

    const imageX = (clientX - Math.floor(left)) / prevScale;
    const imageOffsetX = naturalWidth / 2 - imageX;

    const containerOffsetX = width / 2 - clientX;

    const offsetX = Math.round(imageOffsetX * scale - containerOffsetX);

    const maxOffsetX = Math.floor(Math.abs(diffX / 2));

    x = Math.max(Math.min(offsetX, maxOffsetX), -maxOffsetX);
  }

  if (diffY < 0) {
    const { height } = containerEl.getBoundingClientRect();
    const { top } = imageEl.getBoundingClientRect();

    const imageY = (clientY - Math.floor(top)) / prevScale;
    const imageOffsetY = naturalHeight / 2 - imageY;

    const containerOffsetY = height / 2 - clientY;

    const offsetY = Math.round(imageOffsetY * scale - containerOffsetY);

    const maxOffsetY = Math.floor(Math.abs(diffY / 2));

    y = Math.max(Math.min(offsetY, maxOffsetY), -maxOffsetY);
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
  setOffset: Dispatch<SetStateAction<Offset>>;
  setScale: Dispatch<SetStateAction<Scale>>;
}) => {
  const onFullSizeZoom = useCallback(
    ({ clientX, clientY }: PointerEvent) => {
      if (!containerRef.current || !imageRef.current) return;

      const containerEl = containerRef.current;
      const imageEl = imageRef.current;

      const naturalScale = getImageNaturalScale({ containerEl, imageEl });
      const fitScale = Math.min(naturalScale, FULL_SIZE_SCALE);

      setScale((prevScale) => {
        if (prevScale === "fit" && fitScale === FULL_SIZE_SCALE) {
          return prevScale;
        }

        if (prevScale !== "fit" && prevScale <= FULL_SIZE_SCALE) {
          setOffset(DEFAULT_OFFSET);
          return "fit";
        }

        setOffset(
          getOffset({
            clientX,
            clientY,
            containerEl,
            imageEl,
            prevScale: prevScale === "fit" ? fitScale : prevScale,
            scale: FULL_SIZE_SCALE,
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

      const step = deltaY * 0.001;

      const containerEl = containerRef.current;
      const imageEl = imageRef.current;

      const naturalScale = getImageNaturalScale({ containerEl, imageEl });
      const fitScale = Math.min(naturalScale, FULL_SIZE_SCALE);

      setScale((prevScale) => {
        const rawScale = (prevScale === "fit" ? fitScale : prevScale) - step;
        const scale = parseFloat(rawScale.toFixed(1));

        if (
          (prevScale === "fit" && scale <= fitScale) ||
          (prevScale === MAX_SCALE && scale >= MAX_SCALE)
        ) {
          return prevScale;
        }

        if (scale <= fitScale) {
          setOffset(DEFAULT_OFFSET);
          return "fit";
        }

        if (scale >= MAX_SCALE) {
          setOffset(
            getOffset({
              clientX,
              clientY,
              containerEl,
              imageEl,
              prevScale: prevScale === "fit" ? fitScale : prevScale,
              scale: MAX_SCALE,
            }),
          );

          return MAX_SCALE;
        }

        setOffset(
          getOffset({
            clientX,
            clientY,
            containerEl,
            imageEl,
            prevScale: prevScale === "fit" ? fitScale : prevScale,
            scale,
          }),
        );

        return scale;
      });
    },
    [containerRef.current, imageRef.current, setOffset, setScale],
  );

  return { onFullSizeZoom, onZoom };
};
