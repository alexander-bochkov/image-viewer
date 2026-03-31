import { IMAGE_EXTENSIONS } from "shared/constants";

export const isImage = (src: string) =>
  IMAGE_EXTENSIONS.some(
    (extension) =>
      src.startsWith(`data:image/${extension}`) ||
      src.endsWith(`.${extension}`),
  );
