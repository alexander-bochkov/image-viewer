import { useState } from "react";
import { PRIMARY_MOUSE_BUTTON } from "shared/constants";
import { getMaxOffset } from "../utils";

import type { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { View } from "../types";

export const useDrag = ({
  containerRef,
  imageRef,
  setView,
  view,
}: {
  containerRef: RefObject<Nullable<HTMLDivElement>>;
  imageRef: RefObject<Nullable<HTMLImageElement>>;
  setView: Dispatch<SetStateAction<View>>;
  view: View;
}) => {
  const [isDraggable, setIsDraggable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = ({ button }: MouseEvent<HTMLImageElement>) => {
    if (button === PRIMARY_MOUSE_BUTTON) setIsDraggable(true);
  };

  const onDragEnd = () => {
    setIsDraggable(false);
    setIsDragging(false);
  };

  const onDrag = ({ movementX, movementY }: MouseEvent<HTMLImageElement>) => {
    if (!containerRef.current || !imageRef.current || !isDraggable) return;

    !isDragging && setIsDragging(true);

    const containerEl = containerRef.current;
    const imageEl = imageRef.current;

    const {
      offset: { x, y },
      rotation,
      scale,
    } = view;

    const { x: maxX, y: maxY } = getMaxOffset(
      containerEl,
      imageEl,
      scale,
      rotation,
    );

    const offsetX = x + movementX;
    const offsetY = y + movementY;

    setView((prevView) => ({
      ...prevView,
      offset: {
        x: Math.min(Math.max(-maxX, offsetX), maxX),
        y: Math.min(Math.max(-maxY, offsetY), maxY),
      },
    }));
  };

  return { isDragging, onDrag, onDragEnd, onDragStart };
};
