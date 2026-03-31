import { VIDEO_EXTENSIONS } from "shared/constants";

export const isVideo = (src: string) =>
  VIDEO_EXTENSIONS.some(
    (extension) =>
      src.startsWith(`data:video/${extension}`) ||
      src.endsWith(`.${extension}`),
  );
