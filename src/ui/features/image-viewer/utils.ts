const isPortrait = (rotation: number) => !(rotation % 180);

export const getViewportSize = (withBuffer = false) => {
  const buffer = withBuffer ? 1 : 0;

  return {
    height: window.innerHeight + buffer,
    width: window.innerWidth + buffer,
  };
};

export const getFitScale = (image: HTMLImageElement, rotation: number) => {
  const { naturalHeight, naturalWidth } = image;

  const imageHeight = isPortrait(rotation) ? naturalHeight : naturalWidth;
  const imageWidth = isPortrait(rotation) ? naturalWidth : naturalHeight;

  const viewport = getViewportSize(true);

  const scaleX = viewport.width / imageWidth;
  const scaleY = viewport.height / imageHeight;

  return Math.min(scaleX, scaleY, 1);
};

export const getMaxOffset = (
  image: HTMLImageElement,
  rotation: number,
  scale: number,
) => {
  const { naturalHeight, naturalWidth } = image;

  const imageHeight = isPortrait(rotation) ? naturalHeight : naturalWidth;
  const imageWidth = isPortrait(rotation) ? naturalWidth : naturalHeight;

  const viewport = getViewportSize(true);

  const offsetX = Math.round((imageWidth * scale - viewport.width) / 2);
  const offsetY = Math.round((imageHeight * scale - viewport.height) / 2);

  return {
    x: Math.max(offsetX, 0),
    y: Math.max(offsetY, 0),
  };
};
