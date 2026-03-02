import { useCallback, useState } from "react";
import { LEFT_MOUSE_BUTTON } from "shared/constants";

import type { RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset } from "../types";

type Direction = "down" | "left" | "right" | "up";

const addReserveToRectCoords = (rect: DOMRect): DOMRect => ({
  ...rect,
  bottom: rect.bottom + 1,
  left: rect.left - 1,
  right: rect.right + 1,
  top: rect.top - 1,
});

const getDirections = ({
  containerEl,
  imageEl,
  movementX,
  movementY,
}: {
  containerEl: HTMLElement;
  imageEl: HTMLImageElement;
  movementX: number;
  movementY: number;
}) => {
  const directions: Direction[] = [];

  const container = addReserveToRectCoords(containerEl.getBoundingClientRect());
  const image = imageEl.getBoundingClientRect();

  if (movementX < 0 && image.right > container.right) directions.push("left");
  if (movementX > 0 && image.left < container.left) directions.push("right");
  if (movementY < 0 && image.bottom > container.bottom) directions.push("up");
  if (movementY > 0 && image.top < container.top) directions.push("down");

  return directions;
};

const getMaxOffset = ({
  containerEl,
  imageEl,
  offsetX,
  offsetY,
}: {
  containerEl: HTMLElement;
  imageEl: HTMLImageElement;
  offsetX: number;
  offsetY: number;
}) => {
  const container = addReserveToRectCoords(containerEl.getBoundingClientRect());
  const image = imageEl.getBoundingClientRect();

  return {
    bottom: container.top - image.top + offsetY,
    left: container.right - image.right + offsetX,
    right: container.left - image.left + offsetX,
    top: container.bottom - image.bottom + offsetY,
  };
};

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

  const onDragStart = ({ button }: MouseEvent) => {
    if (button === LEFT_MOUSE_BUTTON) {
      setIsDraggable(true);
    }
  };

  const onDragEnd = () => {
    setIsDraggable(false);
    setIsDragging(false);
  };

  const onDrag = useCallback(
    ({ movementX, movementY }: MouseEvent) => {
      if (!containerRef.current || !imageRef.current || !isDraggable) return;

      if (!isDragging) setIsDragging(true);

      const containerEl = containerRef.current;
      const imageEl = imageRef.current;

      const directions = getDirections({
        containerEl,
        imageEl,
        movementX,
        movementY,
      });

      if (!directions.length) return;

      setOffset((prevOffset) => {
        const { x: offsetX, y: offsetY } = prevOffset;

        const maxOffset = getMaxOffset({
          containerEl,
          imageEl,
          offsetX,
          offsetY,
        });

        let nextOffsetX = offsetX;
        let nextOffsetY = offsetY;

        if (directions.includes("left")) {
          nextOffsetX = Math.max(offsetX + movementX, maxOffset.left);
        }

        if (directions.includes("right")) {
          nextOffsetX = Math.min(offsetX + movementX, maxOffset.right);
        }

        if (directions.includes("up")) {
          nextOffsetY = Math.max(offsetY + movementY, maxOffset.top);
        }

        if (directions.includes("down")) {
          nextOffsetY = Math.min(offsetY + movementY, maxOffset.bottom);
        }

        return { x: nextOffsetX, y: nextOffsetY };
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
