import { Box, Image, useDebouncedInputState, useDrag, inputToNumber } from 'ui';
import { useCallback, useMemo } from 'react';

import FloatingControls from './floating-controls';
import { MountContext } from 'command-k';
import ReactDOM from 'react-dom';
import useSelectedImage from './use-selected-image';
import useSettings from './use-settings';
import useControls from './use-controls';

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
  const { controls } = useControls({ useStorage });
  const { settings, updateX, updateY } = useSettings({ useStorage });
  const [x, , updateXState] = useDebouncedInputState<number>({
    callback: updateX,
    onChange: inputToNumber,
    value: settings.x,
  });
  const [y, , updateYState] = useDebouncedInputState<number>({
    callback: updateX,
    onChange: inputToNumber,
    value: settings.y,
  });
  const { width, height } = useMemo(
    () => ({ width: (image?.width || 0) * settings.scale, height: (image?.height || 0) * settings.scale }),
    [image, settings],
  );

  useDrag();

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: controls.isDragActive ? 'auto' : 'none',
        cursor: controls.isDragActive ? 'move' : 'default',
        opacity: settings.opacity,
      }}
    >
      <Image
        draggable={false}
        src={image?.base64}
        width={`${width}px`}
        height={`${height}px`}
        sx={{
          position: 'absolute',
          top: `${y}px`,
          left: `${x}px`,
          maxWidth: 'initial',
        }}
      />
    </Box>
  );
}
