import { useCallback, useState } from "react";
import { useToggleScrollbar } from "hooks/use-toggle-scrollbar";
import { useTriggerViewer } from "hooks/use-trigger-viewer";

import type { Nullable } from "types/utility-types";

export const ImageViewer = () => {
  const [imageSrc, setImageSrc] = useState<Nullable<string>>(null);

  const onTrigger = useCallback(({ src }: HTMLImageElement) => {
    setImageSrc(src);
  }, []);

  useTriggerViewer(onTrigger);
  useToggleScrollbar(!!imageSrc);

  return imageSrc;
};
