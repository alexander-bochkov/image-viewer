import clsx from "clsx";

import type { Ref } from "react";
import type { Position, Scale } from "../../types";

import styles from "./image.module.css";

type ImageProps = {
  position?: Position;
  ref?: Ref<HTMLImageElement>;
  scale?: Scale;
  src: string;
};

export const Image = ({ position, ref, scale = "fit", src }: ImageProps) => (
  <img
    alt=""
    className={clsx(styles.image, { [styles.fit]: scale === "fit" })}
    draggable={false}
    ref={ref}
    src={src}
    style={{
      scale: scale !== "fit" ? scale : undefined,
      translate: position ? `${position.x}px ${position.y}px` : undefined,
    }}
  />
);
