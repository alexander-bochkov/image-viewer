import { useEffect } from "react";
import { useDrag } from "./use-drag";
import { useZoom } from "./use-zoom";

import type { RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset, Scale } from "../types";

export const useControl = ({
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
  const { isDragging, onDrag, onDragEnd, onDragStart } = useDrag({
    containerRef,
    imageRef,
    setOffset,
  });

  const { onFullSizeZoom, onZoom } = useZoom({
    containerRef,
    imageRef,
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
