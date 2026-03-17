import { useCallback } from "react";
import { FULL_SIZE_SCALE } from "../constants";
import { getMaxOffset } from "../utils";

import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset } from "../types";

const MAX_SCALE = 4;

const getOffset = ({
  clientX,
  clientY,
  containerEl,
  imageEl,
  prevOffset,
  prevScale,
  round,
  scale,
}: {
  clientX: number;
  clientY: number;
  containerEl: HTMLElement;
  imageEl: HTMLImageElement;
  prevOffset: Offset;
  prevScale: number;
  round: boolean;
  scale: number;
}) => {
  const container = containerEl.getBoundingClientRect();

  const pointerX = clientX - container.width / 2;
  const pointerY = clientY - container.height / 2;

  const ratio = scale / prevScale - 1;

  const offsetX = prevOffset.x - (pointerX - prevOffset.x) * ratio;
  const offsetY = prevOffset.y - (pointerY - prevOffset.y) * ratio;

  const maxOffset = getMaxOffset({ containerEl, imageEl, scale });

  const nextX = Math.min(Math.max(-maxOffset.x, offsetX), maxOffset.x);
  const nextY = Math.min(Math.max(-maxOffset.y, offsetY), maxOffset.y);

  return {
    x: round ? Math.round(nextX) : nextX,
    y: round ? Math.round(nextY) : nextY,
  };
};

export const useZoom = ({
  containerRef,
  fitScale,
  imageRef,
  offset,
  scale,
  setOffset,
  setScale,
}: {
  containerRef: RefObject<Nullable<HTMLDivElement>>;
  fitScale: number;
  imageRef: RefObject<Nullable<HTMLImageElement>>;
  offset: Offset;
  scale: number;
  setOffset: Dispatch<SetStateAction<Offset>>;
  setScale: Dispatch<SetStateAction<number>>;
}) => {
  const onFullSizeZoom = useCallback(
    ({ clientX, clientY }: PointerEvent) => {
      if (!containerRef.current || !imageRef.current) return;

      const nextScale =
        scale !== fitScale && scale <= FULL_SIZE_SCALE
          ? fitScale
          : FULL_SIZE_SCALE;

      const nextOffset = getOffset({
        clientX,
        clientY,
        containerEl: containerRef.current,
        imageEl: imageRef.current,
        prevOffset: offset,
        prevScale: scale,
        round: true,
        scale: nextScale,
      });

      setOffset(nextOffset);
      setScale(nextScale);
    },
    [
      containerRef.current,
      fitScale,
      imageRef.current,
      offset,
      scale,
      setOffset,
      setScale,
    ],
  );

  const onZoom = useCallback(
    ({ clientX, clientY, deltaY }: WheelEvent) => {
      if (!containerRef.current || !imageRef.current) return;

      const factor = -deltaY * 0.001 + 1;
      const nextScale = Math.min(Math.max(fitScale, scale * factor), MAX_SCALE);

      const nextOffset = getOffset({
        clientX,
        clientY,
        containerEl: containerRef.current,
        imageEl: imageRef.current,
        prevOffset: offset,
        prevScale: scale,
        round: false,
        scale: nextScale,
      });

      setOffset(nextOffset);
      setScale(nextScale);
    },
    [
      containerRef.current,
      fitScale,
      imageRef.current,
      offset,
      scale,
      setOffset,
      setScale,
    ],
  );

  return { onFullSizeZoom, onZoom };
};
