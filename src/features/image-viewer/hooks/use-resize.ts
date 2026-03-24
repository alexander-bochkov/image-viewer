import { useEffect } from "react";
import { DEFAULT_OFFSET } from "../constants";
import { getFitScale } from "../utils";

import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { View } from "../types";

export const useResize = ({
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
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !imageRef.current) return;

      const containerEl = containerRef.current;
      const imageEl = imageRef.current;

      const nextFitScale = getFitScale(containerEl, imageEl, view.rotation);

      fitScale.current = nextFitScale;
      setView((prevView) => ({
        ...prevView,
        offset: DEFAULT_OFFSET,
        scale: nextFitScale,
      }));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef, fitScale, imageRef, setView, view.rotation]);
};
