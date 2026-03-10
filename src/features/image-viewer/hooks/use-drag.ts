import { useCallback, useState } from "react";
import { LEFT_MOUSE_BUTTON } from "shared/constants";

import type { RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset } from "../types";

const getDirections = ({
  container,
  image,
  movementX,
  movementY,
}: {
  container: DOMRect;
  image: DOMRect;
  movementX: number;
  movementY: number;
}) => {
  const directions = [];

  if (movementX < 0 && image.right > container.right) directions.push("left");
  if (movementX > 0 && image.left < container.left) directions.push("right");
  if (movementY < 0 && image.bottom > container.bottom) directions.push("up");
  if (movementY > 0 && image.top < container.top) directions.push("down");

  return directions;
};

const getMaxOffset = ({
  container,
  image,
  offsetX,
  offsetY,
}: {
  container: DOMRect;
  image: DOMRect;
  offsetX: number;
  offsetY: number;
}) => ({
  bottom: Math.floor(container.top - image.top + offsetY),
  left: Math.floor(container.right - image.right + offsetX),
  right: Math.floor(container.left - image.left + offsetX),
  top: Math.floor(container.bottom - image.bottom + offsetY),
});

export const useDrag = ({
  containerRef,
  imageRef,
  setOffset,
}: {
  containerRef: RefObject<Nullable<HTMLDivElement>>;
  imageRef: RefObject<Nullable<HTMLImageElement>>;
  setOffset: (value: SetStateAction<Offset>) => void;
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

      const container = containerRef.current.getBoundingClientRect();
      const image = imageRef.current.getBoundingClientRect();

      const directions = getDirections({
        container,
        image,
        movementX,
        movementY,
      });

      if (!directions.length) return;

      setOffset(({ x, y }) => {
        const maxOffset = getMaxOffset({
          container,
          image,
          offsetX: x,
          offsetY: y,
        });

        if (directions.includes("left")) {
          x = Math.max(x + movementX, maxOffset.left);
        }

        if (directions.includes("right")) {
          x = Math.min(x + movementX, maxOffset.right);
        }

        if (directions.includes("up")) {
          y = Math.max(y + movementY, maxOffset.top);
        }

        if (directions.includes("down")) {
          y = Math.min(y + movementY, maxOffset.bottom);
        }

        return { x, y };
      });
    },
    [
      containerRef.current,
      imageRef.current,
      isDraggable,
      isDragging,
      setOffset,
    ],
  );

  return { isDragging, onDrag, onDragEnd, onDragStart };
};
