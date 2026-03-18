import { FULL_SIZE_SCALE } from "./constants";

const getBoundingClientRectWithReserve = (el: HTMLElement): DOMRect => {
  const rect = el.getBoundingClientRect();

  const height = rect.height + 2;
  const width = rect.width + 2;

  const bottom = rect.bottom + 1;
  const left = rect.left - 1;
  const right = rect.right + 1;
  const top = rect.top - 1;

  return { ...rect, bottom, height, left, right, top, width };
};

export const getFitScale = (
  containerEl: HTMLElement,
  imageEl: HTMLImageElement,
) => {
  const container = getBoundingClientRectWithReserve(containerEl);
  const { naturalHeight, naturalWidth } = imageEl;

  const heightFitScale = container.height / naturalHeight;
  const widthFitScale = container.width / naturalWidth;

  return Math.min(heightFitScale, widthFitScale, FULL_SIZE_SCALE);
};

export const getMaxOffset = (
  containerEl: HTMLElement,
  imageEl: HTMLImageElement,
  scale: number,
) => {
  const container = getBoundingClientRectWithReserve(containerEl);
  const { naturalHeight, naturalWidth } = imageEl;

  const maxX = Math.round((naturalWidth * scale - container.width) / 2);
  const maxY = Math.round((naturalHeight * scale - container.height) / 2);

  return {
    x: Math.max(maxX, 0),
    y: Math.max(maxY, 0),
  };
};
