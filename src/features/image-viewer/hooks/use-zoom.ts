import { useEffect } from "react";

import type { Zoom } from "../types";

export const useZoom = (handler: (zoom: Zoom) => void) => {
  useEffect(() => {
    const handleZoom = ({ deltaY }: WheelEvent) => {
      handler(deltaY < 0 ? "in" : "out");
    };

    document.addEventListener("wheel", handleZoom);

    return () => {
      document.removeEventListener("wheel", handleZoom);
    };
  }, [handler]);
};
