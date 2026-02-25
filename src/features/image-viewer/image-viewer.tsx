import { ImageViewer as ImageViewerUI } from "./components/ImageViewer";

type ImageViewerProps = {
  src: string;
};

const ImageViewer = ({ src }: ImageViewerProps) => <ImageViewerUI src={src} />;

export default ImageViewer;
