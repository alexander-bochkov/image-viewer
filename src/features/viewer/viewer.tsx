import { useCallback, useState } from "react";
import ImageViewer from "features/image-viewer";
import { useDisablePageInteraction, useOpenViewer } from "./hooks";

import type { Nullable } from "shared/types";

const Viewer = () => {
  const [imageSrc, setImageSrc] = useState<Nullable<string>>(null);

  const handleViewerOpen = useCallback(({ src }: HTMLImageElement) => {
    setImageSrc(src);
  }, []);

  const handleViewerClose = useCallback(() => {
    setImageSrc(null);
  }, []);

  useOpenViewer({ enabled: !imageSrc, handler: handleViewerOpen });
  useDisablePageInteraction(!!imageSrc);

  return imageSrc && <ImageViewer onClose={handleViewerClose} src={imageSrc} />;
};

export default Viewer;
