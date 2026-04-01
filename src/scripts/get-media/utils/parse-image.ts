import type { Media } from "../../types";

const getUrlFromSrcset = (srcset: string) => {
  const formattedSrcset = srcset.split(",").map((set) => {
    set.trim();
    return set.split(/\s+/);
  });

  let largestSrc = null;
  let largestDescriptor = 0;

  for (const [src, descriptor] of formattedSrcset) {
    const parsedDescriptor = parseFloat(descriptor);

    if (parsedDescriptor > largestDescriptor) {
      largestSrc = src;
      largestDescriptor = parsedDescriptor;
    }
  }

  return largestSrc;
};

export const parseImage = ({ src, srcset }: HTMLImageElement): Media => {
  const url = (srcset && getUrlFromSrcset(srcset)) || src;
  return { type: "image", url };
};
