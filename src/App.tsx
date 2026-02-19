import { useCallback, useEffect, useRef, useState } from "react";

import { ImageViewer } from "ImageViewer";

type Timer = ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>;

type Nullable<T> = T | null;

const IMAGE_VIEWER_DELAY = 500;

const MAIN_BUTTON = 0;

export const App = () => {
  const [imageUrl, setImageUrl] = useState<Nullable<string>>(null);

  const timerRef = useRef<Timer>(null);
  const overflowRef = useRef<string>(null);

  const handleImageViewerClose = useCallback(() => {
    setImageUrl(null);

    const bodyEl = document.querySelector("body");

    if (!bodyEl || overflowRef.current === null) return;

    bodyEl.style.overflow = overflowRef.current;
  }, []);

  useEffect(() => {
    const handleMouseDown = ({ button, target }: MouseEvent) => {
      if (button !== MAIN_BUTTON || !(target instanceof HTMLImageElement)) {
        return;
      }

      timerRef.current = setTimeout(() => {
        const { src } = target as HTMLImageElement;
        setImageUrl(src);

        const bodyEl = document.querySelector("body");

        if (!bodyEl) return;

        overflowRef.current = bodyEl.style.overflow;
        bodyEl.style.overflow = "hidden";
      }, IMAGE_VIEWER_DELAY);
    };

    const handleMouseUp = ({ button }: MouseEvent) => {
      const timer = timerRef.current;

      if (button !== MAIN_BUTTON || !timer) return;

      clearTimeout(timer);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    imageUrl && (
      <ImageViewer imageUrl={imageUrl} onClose={handleImageViewerClose} />
    )
  );
};
