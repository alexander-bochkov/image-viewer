import { useState } from "react";
import { PRIMARY_MOUSE_BUTTON } from "shared/constants";
import { getMaxOffset } from "../utils";

import type { MouseEvent, RefObject } from "react";
import type { Nullable } from "shared/types";
import type { Viewer } from "../types";

export const useDrag = (
  viewer: Viewer,
  imageRef: RefObject<Nullable<HTMLImageElement>>,
) => {
  const [canDrag, setCanDrag] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = ({ button }: MouseEvent<HTMLImageElement>) => {
    if (button === PRIMARY_MOUSE_BUTTON) setCanDrag(true);
  };

  const onDragEnd = () => {
    setCanDrag(false);
    setIsDragging(false);
  };

  const onDrag = ({ movementX, movementY }: MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current || !canDrag) return;

    !isDragging && setIsDragging(true);

    const { dispatch, state } = viewer;

    const { x: maxX, y: maxY } = getMaxOffset(
      imageRef.current,
      state.rotation,
      state.scale,
    );

    const offsetX = state.offsetX + movementX;
    const offsetY = state.offsetY + movementY;

    const x = Math.min(Math.max(-maxX, offsetX), maxX);
    const y = Math.min(Math.max(-maxY, offsetY), maxY);

    dispatch({ payload: { x, y }, type: "SET_OFFSET" });
  };

  return { isDragging, onDrag, onDragEnd, onDragStart };
};
