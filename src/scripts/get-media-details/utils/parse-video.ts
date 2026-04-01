import type { MediaDetails } from "../../types";

const getFirstSourceElement = (elements: HTMLCollection) =>
  [...elements].find((element) => element instanceof HTMLSourceElement);

export const parseVideo = ({
  children,
  src,
}: HTMLVideoElement): MediaDetails => {
  const source = getFirstSourceElement(children);
  const url = source?.src || src;
  return { type: "video", url };
};
