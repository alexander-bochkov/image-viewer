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
