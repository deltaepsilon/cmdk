import { Box, Image, useDebouncedInputState, useDrag, useScroll } from 'ui';
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

export function ImageWrapper({ useStorage }: { useStorage: MountContext['useStorage'] }) {
  const draggableRef = useRef<HTMLImageElement>(null);
  const { image } = useSelectedImage({ useStorage });
  const {
    controls: { isScrollPinned },
    isDraggable,
  } = useControls({ useStorage });
  const { settings, updateXY } = useSettings({ useStorage });
  const [{ x, y }, , updateXYState] = useDebouncedInputState<{ x: number; y: number }>({
    callback: updateXY,
    onChange: () => ({ x: 0, y: 0 }),
    value: settings,
  });
  const onDrag = useCallback(
    ({ changeX, changeY, startX, startY }) => {
      updateXYState(() => ({ x: startX + changeX, y: startY + changeY }));
    },
    [updateXYState],
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
  const { scrollTop, scrollLeft } = useScroll({ isActive: isScrollPinned });
  const adjustedX = x - scrollLeft;
  const adjustedY = y - scrollTop;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        opacity: settings.opacity,
        pointerEvents: 'none',
      }}
    >
      <Image
        ref={draggableRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        data-is-dragging={isDragging}
        draggable={false} // Disables image drag
        src={image?.base64}
        width={`${width}px`}
        height={`${height}px`}
        sx={{
          position: 'absolute',
          cursor: isDragging ? 'grabbing' : isDraggable ? 'grab' : 'default',
          pointerEvents: isDragging || isDraggable ? 'auto' : 'none',
          top: `${adjustedY}px`,
          left: `${adjustedX}px`,
          maxWidth: 'initial',
          userSelect: 'none',
        }}
      />
    </Box>
  );
}
