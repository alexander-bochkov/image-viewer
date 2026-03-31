import { isImage, isVideo } from "shared/utils";

const getLargestSrcFromSrcset = (srcset: string) => {
  const mappedSrcset = srcset.split(",").map((set) => {
    set.trim();
    return set.split(/\s+/);
  });

  let largestSrc = null;
  let largestDescriptor = 0;

  for (const [src, descriptor] of mappedSrcset) {
    const value = parseFloat(descriptor);

    if (value > largestDescriptor) {
      largestSrc = src;
      largestDescriptor = value;
    }
  }

  return largestSrc;
};

const getFirstSourceElement = (elements: HTMLCollection) =>
  [...elements].find((element) => element instanceof HTMLSourceElement);

export const parseSrc = (element: HTMLElement) => {
  if (element instanceof HTMLAnchorElement) {
    const { href } = element;
    if (isImage(href) || isVideo(href)) return href;
  }

  if (element instanceof HTMLImageElement) {
    const { src, srcset } = element;
    return (srcset && getLargestSrcFromSrcset(srcset)) || src;
  }

  if (element instanceof HTMLVideoElement) {
    const { children, src } = element;
    const source = getFirstSourceElement(children);
    return source?.src || src;
  }

  return null;
};
