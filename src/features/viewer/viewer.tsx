import { useCallback, useRef, useState } from "react";
import ImageViewer from "features/image-viewer";
import { ModalWindow } from "./components/ModalWindow";
import { useCloseViewer, useHidePageScrollbar, useOpenViewer } from "./hooks";

import type { Nullable } from "shared/types";

const Viewer = () => {
  const modalWindowRef = useRef<HTMLDialogElement>(null);

  const [imageSrc, setImageSrc] = useState<Nullable<string>>(null);

  const handleViewerOpen = useCallback(({ src }: HTMLImageElement) => {
    setImageSrc(src);
    modalWindowRef.current?.showModal();
  }, []);

  const handleViewerClose = useCallback(() => {
    setImageSrc(null);
    modalWindowRef.current?.close();
  }, []);

  useOpenViewer({ enabled: !imageSrc, handler: handleViewerOpen });
  useCloseViewer({
    enabled: !!imageSrc,
    handler: handleViewerClose,
    modalWindowRef,
  });

  useHidePageScrollbar(!!imageSrc);

  return (
    <ModalWindow onClose={handleViewerClose} ref={modalWindowRef}>
      {imageSrc && <ImageViewer src={imageSrc} />}
    </ModalWindow>
  );
};

export default Viewer;
