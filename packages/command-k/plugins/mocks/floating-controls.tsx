import { Box, Button } from 'ui';

import { MountContext } from 'index';
import OverlayControls from './overlay-controls';
import { useSelectedImage } from './use-selected-image';

export default function FloatingControls({
  useStorage,
  unmount,
}: {
  useStorage: MountContext['useStorage'];
  unmount: () => void;
}) {
  const { clear: clearImage } = useSelectedImage({ useStorage });

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'auto',

        backgroundColor: 'background',
        padding: 2,
      }}
    >
      <OverlayControls useStorage={useStorage} sx={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
        <Box>
          <Button
            variant="pill-tertiary"
            onClick={() => {
              clearImage();
              unmount();
            }}
          >
            Close
          </Button>
        </Box>
      </OverlayControls>
    </Box>
  );
}
