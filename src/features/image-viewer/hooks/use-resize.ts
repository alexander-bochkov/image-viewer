import { useEffect } from "react";
import { FULL_SIZE_SCALE } from "../constants";
import { getImageNaturalScale } from "../utils";

import type { RefObject, SetStateAction } from "react";
import type { Nullable } from "shared/types";
import type { Scale } from "../types";

export const useResize = ({
  containerRef,
  imageRef,
  setScale,
}: {
  containerRef: RefObject<Nullable<HTMLDivElement>>;
  imageRef: RefObject<Nullable<HTMLImageElement>>;
  setScale: (value: SetStateAction<Scale>) => void;
}) => {
  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const containerEl = containerRef.current;
    const imageEl = imageRef.current;

    const handleResize = () => {
      setScale((prevScale) => {
        if (prevScale === "fit") return prevScale;

        const imageNaturalScale = getImageNaturalScale({
          containerEl,
          imageEl,
        });

        const canBeFitted = prevScale <= FULL_SIZE_SCALE;
        const shouldBeFitted = prevScale < imageNaturalScale;

        return canBeFitted && shouldBeFitted ? "fit" : prevScale;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef.current, imageRef.current, setScale]);
};
