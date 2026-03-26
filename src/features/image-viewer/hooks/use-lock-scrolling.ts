import { useEffect } from "react";

export const useLockScrolling = () => {
  useEffect(() => {
    const lockScrolling = (event: WheelEvent) => {
      event.preventDefault();
    };

    document.addEventListener("wheel", lockScrolling, { passive: false });

    return () => {
      document.removeEventListener("wheel", lockScrolling);
    };
  }, []);
};
