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
  rotation: number,
) => {
  const isLandscape = Boolean(rotation % 180);

  const container = getBoundingClientRectWithReserve(containerEl);
  const { naturalHeight, naturalWidth } = imageEl;

  const imageHeight = isLandscape ? naturalWidth : naturalHeight;
  const imageWidth = isLandscape ? naturalHeight : naturalWidth;

  const heightFitScale = container.height / imageHeight;
  const widthFitScale = container.width / imageWidth;

  return Math.min(heightFitScale, widthFitScale, FULL_SIZE_SCALE);
};

export const getMaxOffset = (
  containerEl: HTMLElement,
  imageEl: HTMLImageElement,
  scale: number,
  rotation: number,
) => {
  const isLandscape = Boolean(rotation % 180);

  const container = getBoundingClientRectWithReserve(containerEl);
  const { naturalHeight, naturalWidth } = imageEl;

  const imageHeight = isLandscape ? naturalWidth : naturalHeight;
  const imageWidth = isLandscape ? naturalHeight : naturalWidth;

  const maxX = Math.round((imageWidth * scale - container.width) / 2);
  const maxY = Math.round((imageHeight * scale - container.height) / 2);

  return {
    x: Math.max(maxX, 0),
    y: Math.max(maxY, 0),
  };
};
