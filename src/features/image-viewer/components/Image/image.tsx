import type { ImgHTMLAttributes, Ref } from "react";

import styles from "./image.module.css";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  ref?: Ref<HTMLImageElement>;
};

export const Image = (props: ImageProps) => (
  <img {...props} className={styles.image} draggable={false} />
);
