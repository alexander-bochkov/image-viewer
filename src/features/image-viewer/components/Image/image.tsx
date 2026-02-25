import styles from "./image.module.css";

type ImageProps = {
  src: string;
};

export const Image = ({ src }: ImageProps) => (
  <img alt="" className={styles.image} draggable={false} src={src} />
);
