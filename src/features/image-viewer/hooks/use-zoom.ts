import { useCallback, useEffect } from "react";
import { FULL_SIZE_SCALE } from "../constants";
import { getMaxOffset } from "../utils";

import type { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset, View } from "../types";

const MAX_SCALE = 4;

const getOffset = ({
  clientX,
  clientY,
  containerEl,
  imageEl,
  nextScale,
  offset: { x, y },
  rotation,
  round,
  scale,
}: {
  clientX: number;
  clientY: number;
  containerEl: HTMLElement;
  imageEl: HTMLImageElement;
  nextScale: number;
  offset: Offset;
  rotation: number;
  round: boolean;
  scale: number;
}) => {
  const container = containerEl.getBoundingClientRect();

  const pointerX = clientX - container.width / 2;
  const pointerY = clientY - container.height / 2;

  const ratio = nextScale / scale - 1;

  const offsetX = x - (pointerX - x) * ratio;
  const offsetY = y - (pointerY - y) * ratio;

  const { x: maxX, y: maxY } = getMaxOffset(
    containerEl,
    imageEl,
    nextScale,
    rotation,
  );

  const nextX = Math.min(Math.max(-maxX, offsetX), maxX);
  const nextY = Math.min(Math.max(-maxY, offsetY), maxY);

  return {
    x: round ? Math.round(nextX) : nextX,
    y: round ? Math.round(nextY) : nextY,
  };
};

export const useZoom = ({
  containerRef,
  fitScale,
  imageRef,
  setView,
  view,
}: {
  containerRef: RefObject<Nullable<HTMLDivElement>>;
  fitScale: RefObject<number>;
  imageRef: RefObject<Nullable<HTMLImageElement>>;
  setView: Dispatch<SetStateAction<View>>;
  view: View;
}) => {
  const onFullSizeZoom = ({
    clientX,
    clientY,
  }: MouseEvent<HTMLImageElement>) => {
    if (!containerRef.current || !imageRef.current) return;

    const { offset, rotation, scale } = view;

    const nextScale =
      scale === fitScale.current || scale > FULL_SIZE_SCALE
        ? FULL_SIZE_SCALE
        : fitScale.current;

    const nextOffset = getOffset({
      clientX,
      clientY,
      containerEl: containerRef.current,
      imageEl: imageRef.current,
      nextScale,
      offset,
      rotation,
      round: true,
      scale,
    });

    setView((prevView) => ({
      ...prevView,
      offset: nextOffset,
      scale: nextScale,
    }));
  };

  const onZoom = useCallback(
    (event: WheelEvent) => {
      if (!containerRef.current || !imageRef.current) return;

      const { clientX, clientY, deltaY } = event;
      const { offset, rotation, scale } = view;

      const factor = -deltaY * 0.001 + 1;
      const nextScale = Math.min(
        Math.max(fitScale.current, scale * factor),
        MAX_SCALE,
      );

      const nextOffset = getOffset({
        clientX,
        clientY,
        containerEl: containerRef.current,
        imageEl: imageRef.current,
        nextScale,
        offset,
        rotation,
        round: false,
        scale,
      });

      setView((prevView) => ({
        ...prevView,
        offset: nextOffset,
        scale: nextScale,
      }));
    },
    [containerRef, fitScale, imageRef, setView, view],
  );

  useEffect(() => {
    document.addEventListener("wheel", onZoom);

    return () => {
      document.removeEventListener("wheel", onZoom);
    };
  }, [onZoom]);

  return { onFullSizeZoom };
};
