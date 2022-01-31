import { Box, Image } from 'ui';

import FloatingControls from './floating-controls';
import { MountContext } from 'command-k';
import ReactDOM from 'react-dom';
import { useSelectedImage } from './use-selected-image';

export default function MocksOverlayPortal({
  overlayContainer,
  unmountOverlay,
  useStorage,
}: {
  overlayContainer: MountContext['overlayContainer'];
  unmountOverlay: MountContext['unmountOverlay'];
  useStorage: MountContext['useStorage'];
}) {
  const hasChildren = !!overlayContainer.childElementCount;

  return hasChildren
    ? null
    : ReactDOM.createPortal(
        <MocksOverlay useStorage={useStorage} unmount={unmountOverlay} />,
        overlayContainer,
      );
}

function MocksOverlay({
  useStorage,
  unmount,
}: {
  useStorage: MountContext['useStorage'];
  unmount: () => void;
}) {
  const { image } = useSelectedImage({ useStorage });

  return image?.base64 ? (
    <Box>
      <Image src={image?.base64} sx={{ pointerEvents: 'none', opacity: 0.5 }} />
      <FloatingControls useStorage={useStorage} unmount={unmount} />
    </Box>
  ) : null;
}
