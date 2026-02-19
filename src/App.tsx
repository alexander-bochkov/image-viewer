import { useEffect, useState } from "react";

import { ImageViewer } from "ImageViewer";

export const App = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseUp = ({ target }: MouseEvent) => {
      if (!target) return;

      const { src } = target as HTMLImageElement;
      setImageUrl(src);
    };

    const imagesList = document.querySelectorAll("img");

    imagesList.forEach((imageEl) => {
      imageEl.addEventListener("mouseup", handleMouseUp);
    });

    return () => {
      imagesList.forEach((imageEl) => {
        imageEl.removeEventListener("mouseup", handleMouseUp);
      });
    };
  }, []);

  return (
    imageUrl && (
      <ImageViewer imageUrl={imageUrl} onClose={() => setImageUrl(null)} />
    )
  );
};
