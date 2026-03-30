export const parseSrc = (target: EventTarget) => {
  return target instanceof HTMLImageElement ? target.src : null;
};
