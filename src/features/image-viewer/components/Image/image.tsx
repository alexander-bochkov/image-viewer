import { motion } from "motion/react";

import type { Ref } from "react";
import type { Offset } from "../../types";

import styles from "./image.module.css";

type ImageProps = {
  fitScale: number;
  offset: Offset;
  ref?: Ref<HTMLImageElement>;
  scale: number;
  src: string;
};

export const Image = ({
  fitScale,
  offset: { x, y },
  ref,
  scale,
  src,
}: ImageProps) => (
  <motion.img
    alt=""
    animate={{ scale, x, y }}
    className={styles.image}
    draggable={false}
    initial={{ scale: fitScale }}
    ref={ref}
    src={src}
    transition={{ duration: 0.15, ease: "easeOut" }}
  />
);
