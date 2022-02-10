import { Box, Image, inputToNumber, useDebouncedInputState, useDrag } from 'ui';
import { useCallback, useMemo, useRef } from 'react';

import FloatingControls from './floating-controls';
import { MountContext } from 'command-k';
import ReactDOM from 'react-dom';
import useControls from './use-controls';
import useSelectedImage from './use-selected-image';
import useSettings from './use-settings';

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
  const draggableRef = useRef<HTMLImageElement>(null);
  const { image } = useSelectedImage({ useStorage });
  const { controls } = useControls({ useStorage });
  const { settings, updateX, updateY } = useSettings({ useStorage });
  const [x, , updateXState] = useDebouncedInputState<number>({
    callback: updateX,
    onChange: inputToNumber,
    value: settings.x,
  });
  const [y, , updateYState] = useDebouncedInputState<number>({
    callback: updateY,
    onChange: inputToNumber,
    value: settings.y,
  });
  const onDrag = useCallback(
    ({ changeX, changeY, x, y }) => {
      updateXState(x - changeX);
      updateXState(y - changeY);
      console.log({ changeX, changeY, x, y });
    },
    [updateXState, updateYState],
  );
  const { width, height } = useMemo(
    () => ({ width: (image?.width || 0) * settings.scale, height: (image?.height || 0) * settings.scale }),
    [image, settings],
  );

  const { isDragging, onMouseDown, onMouseUp, onMouseMove, onMouseOut } = useDrag({
    ref: draggableRef,
    onDrag,
    x,
    y,
  });

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        opacity: settings.opacity,
      }}
    >
      <Image
        ref={draggableRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        draggable={false}
        src={image?.base64}
        width={`${width}px`}
        height={`${height}px`}
        sx={{
          position: 'absolute',
          cursor: isDragging ? 'grabbing' : controls.isDragActive ? 'grab' : 'default',
          pointerEvents: controls.isDragActive ? 'auto' : 'none',
          top: `${y}px`,
          left: `${x}px`,
          maxWidth: 'initial',
        }}
      />
    </Box>
  );
}
