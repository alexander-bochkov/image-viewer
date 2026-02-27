import { useEffect, useState } from "react";

import type { RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Position } from "../types";

type Direction = "down" | "left" | "right" | "up";

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

  const container = containerEl.getBoundingClientRect();
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
}): Record<Direction, number> => {
  const container = containerEl.getBoundingClientRect();
  const image = imageEl.getBoundingClientRect();

  return {
    down: container.top - image.top + offsetY,
    left: container.right - image.right + offsetX,
    right: container.left - image.left + offsetX,
    up: container.bottom - image.bottom + offsetY,
  };
};

export const useDrag = ({
  containerRef,
  imageRef,
  setPosition,
}: {
  containerRef: RefObject<Nullable<HTMLDivElement>>;
  imageRef: RefObject<Nullable<HTMLImageElement>>;
  setPosition: (value: SetStateAction<Position>) => void;
}) => {
  const [draggable, setDraggable] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const containerEl = containerRef.current;
    const imageEl = imageRef.current;

    const enableDrag = () => {
      setDraggable(true);
    };

    const disableDrag = () => {
      setDraggable(false);
    };

    const handleDrag = ({ movementX, movementY }: MouseEvent) => {
      if (!draggable) return;

      const directions = getDirections({
        containerEl,
        imageEl,
        movementX,
        movementY,
      });

      if (!directions.length) return;

      setPosition((prevPosition) => {
        const { x: offsetX, y: offsetY } = prevPosition;

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
          nextOffsetY = Math.max(offsetY + movementY, maxOffset.up);
        }

        if (directions.includes("down")) {
          nextOffsetY = Math.min(offsetY + movementY, maxOffset.down);
        }

        return { x: nextOffsetX, y: nextOffsetY };
      });
    };

    imageEl.addEventListener("mousedown", enableDrag);
    imageEl.addEventListener("mouseleave", disableDrag);
    imageEl.addEventListener("mousemove", handleDrag);
    imageEl.addEventListener("mouseup", disableDrag);

    return () => {
      imageEl.removeEventListener("mousedown", enableDrag);
      imageEl.removeEventListener("mouseleave", disableDrag);
      imageEl.removeEventListener("mousemove", handleDrag);
      imageEl.removeEventListener("mouseup", disableDrag);
    };
  }, [containerRef.current, draggable, imageRef.current, setPosition]);
};
