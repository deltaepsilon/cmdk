import { Box, Image, Text } from 'ui';

import { MountContext } from 'command-k';
import ReactDOM from 'react-dom';
import { useSelectedImage } from './use-selected-image';

export default function MocksOverlayPortal({
  overlayContainer,
  useStorage,
}: {
  overlayContainer: MountContext['overlayContainer'];
  useStorage: MountContext['useStorage'];
}) {
  const hasChildren = !!overlayContainer.childElementCount;

  return hasChildren
    ? null
    : ReactDOM.createPortal(<MocksOverlay useStorage={useStorage} />, overlayContainer);
}

function MocksOverlay({ useStorage }: { useStorage: MountContext['useStorage'] }) {
  const { image } = useSelectedImage({ useStorage });

  return (
    <Box id={new Date().toString()} sx={{ background: 'blue', pointerEvents: 'none', opacity: 0.5 }}>
      <Image src={image?.base64} sx={{ pointerEvents: 'auto' }} />
    </Box>
  );
}
