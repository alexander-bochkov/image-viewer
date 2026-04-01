import { useEffect } from "react";

export const useLockScrolling = () => {
  useEffect(() => {
    const handleScrollingLock = (event: WheelEvent) => {
      event.preventDefault();
    };

    document.addEventListener("wheel", handleScrollingLock, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleScrollingLock);
    };
  }, []);
};
