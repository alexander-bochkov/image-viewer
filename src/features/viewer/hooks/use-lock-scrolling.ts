import { useEffect } from "react";

export const useLockScrolling = (enabled: boolean) => {
  useEffect(() => {
    const lockScrolling = (event: WheelEvent) => {
      enabled && event.preventDefault();
    };

    document.addEventListener("wheel", lockScrolling, { passive: false });

    return () => {
      document.removeEventListener("wheel", lockScrolling);
    };
  }, [enabled]);
};
