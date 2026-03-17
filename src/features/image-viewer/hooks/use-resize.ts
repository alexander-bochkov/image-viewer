import { useEffect } from "react";
import { DEFAULT_OFFSET } from "../constants";
import { getImageFitScale } from "../utils";

import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Offset } from "../types";

export const useResize = ({
  containerRef,
  imageRef,
  setFitScale,
  setOffset,
  setScale,
}: {
  containerRef: RefObject<Nullable<HTMLDivElement>>;
  imageRef: RefObject<Nullable<HTMLImageElement>>;
  setFitScale: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<Offset>>;
  setScale: Dispatch<SetStateAction<number>>;
}) => {
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !imageRef.current) return;

      const containerEl = containerRef.current;
      const imageEl = imageRef.current;

      const fitScale = getImageFitScale(containerEl, imageEl);

      setFitScale(fitScale);
      setScale(fitScale);

      setOffset(DEFAULT_OFFSET);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    containerRef.current,
    imageRef.current,
    setFitScale,
    setOffset,
    setScale,
  ]);
};
