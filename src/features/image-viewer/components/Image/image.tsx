import clsx from "clsx";

import type { Ref } from "react";
import type { Offset, Scale } from "../../types";

import styles from "./image.module.css";

type ImageProps = {
  offset?: Offset;
  ref?: Ref<HTMLImageElement>;
  scale?: Scale;
  src: string;
};

export const Image = ({ offset, ref, scale = "fit", src }: ImageProps) => (
  <img
    alt=""
    className={clsx(styles.image, { [styles.fit]: scale === "fit" })}
    draggable={false}
    ref={ref}
    src={src}
    style={{
      scale: scale !== "fit" ? scale : undefined,
      translate: offset ? `${offset.x}px ${offset.y}px` : undefined,
    }}
  />
);
