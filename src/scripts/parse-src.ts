const IMAGE_EXTENSIONS = [
  "avif",
  "bmp",
  "gif",
  "jpeg",
  "jpg",
  "png",
  "svg",
  "webp",
];

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

const isAnchorToImage = (anchor: HTMLAnchorElement) =>
  IMAGE_EXTENSIONS.some((extension) => anchor.href.endsWith(`.${extension}`));

export const parseSrc = (element: HTMLElement) => {
  if (element instanceof HTMLImageElement) {
    const { src, srcset } = element;
    return srcset ? getLargestSrcFromSrcset(srcset) : src;
  }

  if (element instanceof HTMLAnchorElement && isAnchorToImage(element)) {
    return element.href;
  }

  return null;
};
