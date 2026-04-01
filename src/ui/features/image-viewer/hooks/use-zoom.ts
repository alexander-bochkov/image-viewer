import { useEffect } from "react";
import { getMaxOffset, getViewportSize } from "../utils";

import type { MouseEvent, RefObject } from "react";
import type { Nullable } from "shared/types";
import type { Viewer } from "../types";

const MAX_SCALE = 4;

const getOffset = ({
  clientX,
  clientY,
  image,
  round = false,
  scale,
  viewer,
}: {
  clientX: number;
  clientY: number;
  image: HTMLImageElement;
  round?: boolean;
  scale: number;
  viewer: Viewer;
}) => {
  const viewport = getViewportSize();

  const mouseX = clientX - viewport.width / 2;
  const mouseY = clientY - viewport.height / 2;

  const { state } = viewer;

  const ratio = scale / state.scale - 1;

  const offsetX = state.offsetX - (mouseX - state.offsetX) * ratio;
  const offsetY = state.offsetY - (mouseY - state.offsetY) * ratio;

  const { x: maxX, y: maxY } = getMaxOffset(image, state.rotation, scale);

  const x = Math.min(Math.max(-maxX, offsetX), maxX);
  const y = Math.min(Math.max(-maxY, offsetY), maxY);

  return {
    x: round ? Math.round(x) : x,
    y: round ? Math.round(y) : y,
  };
};

export const useZoom = (
  viewer: Viewer,
  imageRef: RefObject<Nullable<HTMLImageElement>>,
) => {
  const onFullSizeZoom = ({
    clientX,
    clientY,
  }: MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;

    const { dispatch, state } = viewer;

    const scale =
      state.scale === state.fitScale || state.scale > 1 ? 1 : state.fitScale;

    const offset = getOffset({
      clientX,
      clientY,
      image: imageRef.current,
      round: true,
      scale,
      viewer,
    });

    dispatch({ payload: scale, type: "SET_SCALE" });
    dispatch({ payload: offset, type: "SET_OFFSET" });
  };

  useEffect(() => {
    const zoom = ({ clientX, clientY, deltaY }: WheelEvent) => {
      if (!imageRef.current) return;

      const { dispatch, state } = viewer;

      const factor = -deltaY * 0.001 + 1;

      const scale = Math.min(
        Math.max(state.fitScale, state.scale * factor),
        MAX_SCALE,
      );

      const offset = getOffset({
        clientX,
        clientY,
        image: imageRef.current,
        scale,
        viewer,
      });

      dispatch({ payload: scale, type: "SET_SCALE" });
      dispatch({ payload: offset, type: "SET_OFFSET" });
    };

    document.addEventListener("wheel", zoom);

    return () => {
      document.removeEventListener("wheel", zoom);
    };
  }, [imageRef.current, viewer]);

  return { onFullSizeZoom };
};
