import { parseAnchor, parseImage, parseVideo } from "./utils";

import type { Nullable } from "shared/types";
import type { MediaDetails } from "../types";

export const getMediaDetails = (
  element: HTMLElement,
): Nullable<MediaDetails> => {
  if (element instanceof HTMLAnchorElement) return parseAnchor(element);
  if (element instanceof HTMLImageElement) return parseImage(element);
  if (element instanceof HTMLVideoElement) return parseVideo(element);

  return null;
};
