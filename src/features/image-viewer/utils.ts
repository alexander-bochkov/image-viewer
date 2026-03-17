import { FULL_SIZE_SCALE } from "./constants";

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

export const getImageFitScale = (
  containerEl: HTMLElement,
  imageEl: HTMLImageElement,
) => {
  const { height, width } = getBoundingClientRectWithReserve(containerEl);
  const { naturalHeight, naturalWidth } = imageEl;

  const heightFitScale = height / naturalHeight;
  const widthFitScale = width / naturalWidth;

  return Math.min(FULL_SIZE_SCALE, heightFitScale, widthFitScale);
};

export const getMaxOffset = ({
  containerEl,
  imageEl,
  scale,
}: {
  containerEl: HTMLElement;
  imageEl: HTMLImageElement;
  scale: number;
}) => {
  const container = getBoundingClientRectWithReserve(containerEl);
  const { naturalHeight, naturalWidth } = imageEl;

  const offsetX = Math.round((naturalWidth * scale - container.width) / 2);
  const offsetY = Math.round((naturalHeight * scale - container.height) / 2);

  return {
    x: Math.max(offsetX, 0),
    y: Math.max(offsetY, 0),
  };
};
