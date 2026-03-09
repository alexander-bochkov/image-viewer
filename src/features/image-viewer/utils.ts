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

export const getBoundingClientRectWithReserve = (el: HTMLElement): DOMRect => {
  const rect = el.getBoundingClientRect();

  const height = rect.height + 2;
  const width = rect.width + 2;

  const bottom = rect.bottom + 1;
  const left = rect.left - 1;
  const right = rect.right + 1;
  const top = rect.top - 1;

  return { ...rect, bottom, height, left, right, top, width };
};
