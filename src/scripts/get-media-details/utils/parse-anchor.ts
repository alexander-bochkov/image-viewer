import { IMAGE_EXTENSIONS, VIDEO_EXTENSIONS } from "shared/constants";

import type { Nullable } from "shared/types";
import type { MediaDetails, MediaType } from "../../types";

const isImage = (url: string) =>
  IMAGE_EXTENSIONS.some(
    (extension) =>
      url.startsWith(`data:image/${extension}`) ||
      url.endsWith(`.${extension}`),
  );

const isVideo = (url: string) =>
  VIDEO_EXTENSIONS.some(
    (extension) =>
      url.startsWith(`data:video/${extension}`) ||
      url.endsWith(`.${extension}`),
  );

export const parseAnchor = ({
  href,
}: HTMLAnchorElement): Nullable<MediaDetails> => {
  let type: Nullable<MediaType> = null;

  if (isImage(href)) type = "image";
  if (isVideo(href)) type = "video";

  return type && { type, url: href };
};
