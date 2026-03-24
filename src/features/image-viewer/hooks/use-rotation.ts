import { DEFAULT_OFFSET } from "../constants";
import { getFitScale } from "../utils";

import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { View } from "../types";

const ANGLE = 90;

export const useRotation = ({
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
  const rotate = (direction: "left" | "right") => {
    if (!containerRef.current || !imageRef.current) return;

    const containerEl = containerRef.current;
    const imageEl = imageRef.current;

    const nextRotation =
      view.rotation + (direction === "right" ? ANGLE : -ANGLE);
    const nextFitScale = getFitScale(containerEl, imageEl, nextRotation);

    fitScale.current = nextFitScale;
    setView({
      offset: DEFAULT_OFFSET,
      rotation: nextRotation,
      scale: nextFitScale,
    });
  };

  return { rotate };
};
