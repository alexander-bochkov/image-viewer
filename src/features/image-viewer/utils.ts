export const getImageNaturalScale = ({
  containerEl,
  imageEl,
}: {
  containerEl: HTMLElement;
  imageEl: HTMLImageElement;
}) => {
  const { height, width } = containerEl.getBoundingClientRect();
  const { naturalHeight, naturalWidth } = imageEl;

  const naturalScaleToHeight = height / naturalHeight;
  const naturalScaleToWidth = width / naturalWidth;

  return Math.min(naturalScaleToHeight, naturalScaleToWidth);
};
