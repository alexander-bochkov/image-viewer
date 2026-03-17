import { useEffect } from "react";
import { getImageFitScale } from "../utils";

import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";

export const useInit = ({
  containerRef,
  setFitScale,
  setScale,
  src,
}: {
  containerRef: RefObject<Nullable<HTMLDivElement>>;
  setFitScale: Dispatch<SetStateAction<number>>;
  setScale: Dispatch<SetStateAction<number>>;
  src: string;
}) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const containerEl = containerRef.current;
    const imageEl = new Image();

    imageEl.onload = () => {
      const fitScale = getImageFitScale(containerEl, imageEl);

      setFitScale(fitScale);
      setScale(fitScale);
    };

    imageEl.src = src;
  }, [src, containerRef.current, setFitScale, setScale]);
};
