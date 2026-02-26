import { useCallback, useEffect } from "react";
import { MAX_FIT_SCALE } from "../constants";

import type { RefObject } from "react";
import type { Nullable } from "shared/types";

export const useUpdateFitScale = ({
  handler,
  imageRef,
}: {
  handler: (nextFitScale: number) => void;
  imageRef: RefObject<Nullable<HTMLImageElement>>;
}) => {
  const updateFitScale = useCallback(() => {
    if (!imageRef.current) return MAX_FIT_SCALE;

    const { naturalHeight: imageHeight, naturalWidth: imageWidth } =
      imageRef.current;
    const { innerHeight: viewportHeight, innerWidth: viewportWidth } = window;

    const fitScaleHeight = viewportHeight / imageHeight;
    const fitScaleWidth = viewportWidth / imageWidth;

    const nextFitScale = Math.min(fitScaleHeight, fitScaleWidth, MAX_FIT_SCALE);
    handler(nextFitScale);
  }, [handler, imageRef.current]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on mount
  useEffect(() => {
    updateFitScale();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateFitScale);

    return () => {
      window.removeEventListener("resize", updateFitScale);
    };
  }, [updateFitScale]);
};
