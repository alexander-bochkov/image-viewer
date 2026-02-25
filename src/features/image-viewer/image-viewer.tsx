import { Image } from "./components/Image";
import { Layout } from "./components/Layout";

type ImageViewerProps = {
  src: string;
};

const ImageViewer = ({ src }: ImageViewerProps) => (
  <Layout>
    <Image src={src} />
  </Layout>
);

export default ImageViewer;
