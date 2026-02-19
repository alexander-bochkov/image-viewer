import styles from "./ImageViewer.module.css";

type ImageViewerProps = {
  imageUrl: string;
  onClose: () => void;
};

export const ImageViewer = ({ imageUrl, onClose }: ImageViewerProps) => {
  return (
    <div className={styles.imageViewer}>
      <button className={styles.closeBtn} onClick={onClose}>
        X
      </button>
      <img className={styles.image} src={imageUrl} />
    </div>
  );
};
