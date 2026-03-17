import { useCallback, useState } from "react";
import { LEFT_MOUSE_BUTTON } from "shared/constants";
import { getMaxOffset } from "../utils";

import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset } from "../types";

export const useDrag = ({
  containerRef,
  imageRef,
  offset,
  scale,
  setOffset,
}: {
  containerRef: RefObject<Nullable<HTMLDivElement>>;
  imageRef: RefObject<Nullable<HTMLImageElement>>;
  offset: Offset;
  scale: number;
  setOffset: Dispatch<SetStateAction<Offset>>;
}) => {
  const [isDraggable, setIsDraggable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = useCallback(({ button }: MouseEvent) => {
    if (button === LEFT_MOUSE_BUTTON) setIsDraggable(true);
  }, []);

  const onDragEnd = useCallback(() => {
    setIsDraggable(false);
    setIsDragging(false);
  }, []);

  const onDrag = useCallback(
    ({ movementX, movementY }: MouseEvent) => {
      if (!containerRef.current || !imageRef.current || !isDraggable) return;

      !isDragging && setIsDragging(true);

      const offsetX = offset.x + movementX;
      const offsetY = offset.y + movementY;

      const maxOffset = getMaxOffset({
        containerEl: containerRef.current,
        imageEl: imageRef.current,
        scale,
      });

      const nextX = Math.min(Math.max(-maxOffset.x, offsetX), maxOffset.x);
      const nextY = Math.min(Math.max(-maxOffset.y, offsetY), maxOffset.y);

      setOffset({ x: nextX, y: nextY });
    },
    [
      containerRef.current,
      imageRef.current,
      isDraggable,
      isDragging,
      offset,
      scale,
      setOffset,
    ],
  );

  return { isDragging, onDrag, onDragEnd, onDragStart };
};
