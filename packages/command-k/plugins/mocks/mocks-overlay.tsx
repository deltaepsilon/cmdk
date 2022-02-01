import { Box, Image, useHasSwitched } from 'ui';
import { useCallback, useMemo } from 'react';

import FloatingControls from './floating-controls';
import { MountContext } from 'command-k';
import ReactDOM from 'react-dom';
import { useSelectedImage } from './use-selected-image';
import { useSettings } from './use-settings';

export default function MocksOverlayPortal(context: MountContext) {
  const { overlayContainer, unmountOverlay, useStorage } = context;
  const { clear } = useSelectedImage({ useStorage });
  const unmount = useCallback(async () => {
    await clear();

    setTimeout(unmountOverlay, 1000);
  }, [clear]);

  return ReactDOM.createPortal(<MocksOverlay useStorage={useStorage} unmount={unmount} />, overlayContainer);
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
      <ImageWrapper useStorage={useStorage} />
      <FloatingControls useStorage={useStorage} unmount={unmount} />
    </Box>
  ) : null;
}

function ImageWrapper({ useStorage }: { useStorage: MountContext['useStorage'] }) {
  const { image } = useSelectedImage({ useStorage });
  const { settings } = useSettings({ useStorage });
  const { width, height } = useMemo(
    () => ({ width: (image?.width || 0) * settings.scale, height: (image?.height || 0) * settings.scale }),
    [image, settings],
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',

        opacity: settings.opacity,
      }}
    >
      <Image
        src={image?.base64}
        width={`${width}px`}
        height={`${height}px`}
        sx={{
          position: 'absolute',
          top: `${settings.y}px`,
          left: `${settings.x}px`,
        }}
      />
    </Box>
  );
}
