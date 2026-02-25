import styles from "./image-viewer.module.css";

type ImageViewerProps = {
  src: string;
};

export const ImageViewer = ({ src }: ImageViewerProps) => (
  <div className={styles.imageViewer}>
    <img alt="" className={styles.image} draggable={false} src={src} />
  </div>
);
