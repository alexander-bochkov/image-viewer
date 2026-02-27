export const calculateImageScaleInContainer = (
  image: HTMLImageElement,
  container: HTMLElement,
) => {
  const { naturalHeight, naturalWidth } = image;
  const { height, width } = container.getBoundingClientRect();

  const scaleToHeight = height / naturalHeight;
  const scaleToWidth = width / naturalWidth;

  return Math.min(scaleToHeight, scaleToWidth);
};
