import { useEffect } from "react";
import { useDrag } from "./use-drag";
import { useZoom } from "./use-zoom";

import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset } from "../types";

export const useControls = ({
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
  const { isDragging, onDrag, onDragEnd, onDragStart } = useDrag({
    containerRef,
    imageRef,
    offset,
    scale,
    setOffset,
  });

  const { onFullSizeZoom, onZoom } = useZoom({
    containerRef,
    fitScale,
    imageRef,
    offset,
    scale,
    setOffset,
    setScale,
  });

  useEffect(() => {
    if (!imageRef.current) return;

    const imageEl = imageRef.current;

    const handleClick = (event: PointerEvent) => {
      !isDragging && onFullSizeZoom(event);
      onDragEnd();
    };

    imageEl.addEventListener("click", handleClick);
    imageEl.addEventListener("mousedown", onDragStart);
    imageEl.addEventListener("mouseleave", onDragEnd);
    imageEl.addEventListener("mousemove", onDrag);

    document.addEventListener("wheel", onZoom);

    return () => {
      imageEl.removeEventListener("click", handleClick);
      imageEl.removeEventListener("mousedown", onDragStart);
      imageEl.removeEventListener("mouseleave", onDragEnd);
      imageEl.removeEventListener("mousemove", onDrag);

      document.removeEventListener("wheel", onZoom);
    };
  }, [
    imageRef.current,
    isDragging,
    onDrag,
    onDragEnd,
    onDragStart,
    onFullSizeZoom,
    onZoom,
  ]);
};
