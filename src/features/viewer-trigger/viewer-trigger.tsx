import { useCallback, useState } from "react";
import { useTriggerViewer } from "./hooks";

import type { ReactNode } from "react";
import type { Nullable } from "types/utility-types";

type RenderProps = {
  imageSrc: string;
  onViewerClose: () => void;
};

type ViewerTriggerProps = {
  children: (props: RenderProps) => ReactNode;
};

const ViewerTrigger = ({ children }: ViewerTriggerProps) => {
  const [imageSrc, setImageSrc] = useState<Nullable<string>>(null);

  const handleTrigger = useCallback(({ src }: HTMLImageElement) => {
    setImageSrc(src);
  }, []);

  const handleViewerClose = () => {
    setImageSrc(null);
  };

  useTriggerViewer(handleTrigger);

  return imageSrc && children({ imageSrc, onViewerClose: handleViewerClose });
};

export default ViewerTrigger;
