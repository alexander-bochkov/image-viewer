import { useEffect } from "react";
import { getFitScale } from "../utils";

import type { RefObject } from "react";
import type { Nullable } from "shared/types";
import type { Viewer } from "../types";

export const useResize = (
  viewer: Viewer,
  imageRef: RefObject<Nullable<HTMLImageElement>>,
) => {
  useEffect(() => {
    const resize = () => {
      if (!imageRef.current) return;

      const { dispatch, state } = viewer;

      const fitScale = getFitScale(imageRef.current, state.rotation);

      dispatch({ payload: fitScale, type: "SET_FIT_SCALE" });
      dispatch({ payload: fitScale, type: "SET_SCALE" });
      dispatch({ type: "RESET_OFFSET" });
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [imageRef.current, viewer]);
};
