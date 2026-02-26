import { MAX_FIT_SCALE } from "../../constants";

import type { Ref } from "react";

import styles from "./image.module.css";

type ImageProps = {
  onDoubleClick?: () => void;
  ref?: Ref<HTMLImageElement>;
  scale?: number;
  src: string;
};

export const Image = ({
  onDoubleClick,
  ref,
  scale = MAX_FIT_SCALE,
  src,
}: ImageProps) => (
  <button
    className={styles.intaractiveWrapper}
    onDoubleClick={onDoubleClick}
    style={{ scale }}
    type="button"
  >
    <img
      alt=""
      className={styles.image}
      draggable={false}
      ref={ref}
      src={src}
    />
  </button>
);
