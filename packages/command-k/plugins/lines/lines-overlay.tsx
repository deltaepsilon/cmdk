import {
  ArrowUpIcon,
  Box,
  CommandIcon,
  Flex,
  Image,
  Keycap,
  NOOP,
  Text,
  useCursorPosition,
  useDebouncedInputState,
  useDrag,
  useKeydown,
  useScroll,
} from 'ui';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import useLinesSettings, { Line, LinesSettings } from './use-lines-settings';

import { MountContext } from 'command-k';
import ReactDOM from 'react-dom';
import useLinesControls from './use-lines-controls';

export default function LinesOverlayPortal(context: MountContext) {
  const { overlayContainer, useStorage, unmountOverlay } = context;
  const { settings } = useLinesSettings({ useStorage });
  const unmount = useCallback(async () => {
    // setTimeout(unmountOverlay, 1000);
  }, []);

  useEffect(() => {
    overlayContainer.innerHTML = '';
  }, []);

  return settings.isActive
    ? ReactDOM.createPortal(<LinesOverlay unmount={unmount} useStorage={useStorage} />, overlayContainer)
    : null;
}

export function LinesOverlay({
  unmount = NOOP,
  useStorage,
}: {
  unmount?: () => void;
  useStorage: MountContext['useStorage'];
}) {
  const { addLine, lines, removeLine, removeAllLines, settings } = useLinesSettings({ useStorage });
  const { controls, isDraggable, isMoveable } = useLinesControls({ useStorage });
  const cursorPositionRef = useCursorPosition({ isActive: true });

  useEffect(() => unmount, [unmount]);

  useKeydown(
    {
      isActive: isMoveable,
      callback: (e) => {
        e.preventDefault();

        const [clientX, clientY] = cursorPositionRef.current;

        switch (e.code) {
          case 'Backspace':
          case 'Delete':
            return removeAllLines();
          case 'ArrowUp':
            console.log('up');
            break;
          case 'ArrowDown':
            console.log('down');
            break;
          case 'ArrowLeft':
            console.log('left');
            break;
          case 'ArrowRight':
            console.log('right');
            break;
          case 'KeyV':
            return addLine({ type: 'x', value: clientX });
          case 'KeyH':
            return addLine({ type: 'y', value: clientY });
        }
      },
    },
    [addLine, removeAllLines],
  );

  return (
    <Flex
      sx={{
        variant: 'boxes.pinned',
        pointerEvents: isDraggable ? 'auto' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Flex sx={{ position: 'absolute', bottom: 1, right: 1, '[data-keycap]': { marginLeft: 1 } }}>
        {isDraggable && (
          <Keycap>
            <CommandIcon />
          </Keycap>
        )}
        {isMoveable && (
          <Keycap>
            <ArrowUpIcon />
          </Keycap>
        )}
      </Flex>
      {Object.values(lines).map((line) => (
        <RenderedLine line={line} isDraggable={isDraggable} isMoveable={isMoveable} />
      ))}
    </Flex>
  );
}

function RenderedLine({
  line,
  isDraggable,
  isMoveable,
}: {
  line: Line;
  isDraggable: boolean;
  isMoveable: boolean;
}) {
  const ref = useRef(null);
  const isX = typeof line.x !== 'undefined';
  const valuePx = `${line.x ?? line.y}px`;
  const onDrag = useCallback(
    ({ startX, startY, changeX, changeY }) => {
      console.log({ isX, startX, startY, changeX, changeY });
    },
    [isX],
  );
  const { isDragging, onMouseMove, onMouseUp, onMouseDown, onMouseOut } = useDrag({
    onDrag,
    ref,
    x: line.x ?? 0,
    y: line.y ?? 0,
  });

  // TODO: Update X or Y value to make draggable

  return (
    <Box
      sx={{
        border: '1px dashed',
        borderColor: line.color,
        borderWidth: isX ? '0 1px 0 0' : '1px 0 0 0',
        position: 'absolute',
        top: isX ? 0 : valuePx,
        right: isX ? null : 0,
        bottom: isX ? 0 : valuePx,
        left: isX ? valuePx : 0,
        width: isX ? '1px' : null,
        height: isX ? null : '1px',
      }}
    >
      <Box
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseOut={onMouseOut}
        sx={{
          position: 'absolute',
          inset: '-5px',
          cursor: isMoveable ? 'crosshair' : isDraggable ? 'grab' : 'default',
          background: isDragging ? 'dark500' : isDraggable ? 'light300' : 'transparent',
        }}
      />
    </Box>
  );
}
