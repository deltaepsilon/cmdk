import {
  ArrowUpIcon,
  Box,
  CommandIcon,
  Flex,
  Keycap,
  NOOP,
  XIcon,
  stopPropagation,
  useCursorPosition,
  useDrag,
  useKeydown,
} from 'ui';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import useLinesSettings, { Line, LinesSettings } from './use-lines-settings';

import { Button } from 'theme-ui';
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
  }, [overlayContainer]);

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
  const { addLine, lines, removeLine, removeAllLines } = useLinesSettings({ useStorage });
  const { isDraggable, isMoveable } = useLinesControls({ useStorage });
  const cursorPositionRef = useCursorPosition({ isActive: true });
  const { moveSelected, resetInitialPositions } = useLinesSettings({ useStorage });
  const onDrag = useCallback(
    ({ changeX, changeY }) => {
      moveSelected({ x: changeX, y: changeY });
    },
    [moveSelected],
  );
  const { onMouseMove, onMouseUp, onMouseDown } = useDrag({
    isActive: isDraggable && !isMoveable,
    onDrag,
    onDragEnd: resetInitialPositions,
  });

  useEffect(() => unmount, [unmount]);

  useKeydown(
    {
      isActive: isMoveable,
      callback: (e) => {
        e.preventDefault();

        const [clientX, clientY] = cursorPositionRef.current;
        console.log(e.code);

        switch (e.code) {
          case 'Backspace':
          case 'Delete':
          case 'KeyD':
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
      onClick={stopPropagation}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      sx={{
        variant: 'boxes.pinned',
        cursor: isDraggable ? 'grab' : 'default',
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
        <RenderedLine
          key={line.id}
          line={line}
          isDraggable={isDraggable}
          isMoveable={isMoveable}
          useStorage={useStorage}
        />
      ))}
    </Flex>
  );
}

function RenderedLine({
  line,
  isDraggable,
  isMoveable,
  useStorage,
}: {
  line: Line;
  isDraggable: boolean;
  isMoveable: boolean;
  useStorage: MountContext['useStorage'];
}) {
  const isX = typeof line.x !== 'undefined';
  const valuePx = `${line.x ?? line.y}px`;
  const { activateLine, removeLine } = useLinesSettings({ useStorage });
  const onClick = useCallback(() => {
    console.log('line.isSelected', line.isSelected);
    isMoveable && activateLine({ id: line.id, isSelected: !line.isSelected });
  }, [activateLine, isMoveable, line]);
  const onRemoveClick = useCallback(() => removeLine(line.id), [line.id, removeLine]);

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
        background: 'gold',
      }}
    >
      {isDraggable && (
        <Button
          variant="circle-tertiary"
          sx={{ position: 'relative', top: isX ? 0 : '-10px', left: isX ? '-7.25px' : 0, zIndex: 3 }}
          onClick={onRemoveClick}
        >
          <XIcon />
        </Button>
      )}
      <Box
        onClick={onClick}
        sx={{
          position: 'absolute',
          inset: '-5px',
          cursor: isMoveable ? 'crosshair' : isDraggable ? 'grab' : 'default',
          background: line.isSelected ? 'dark500' : isDraggable ? 'light300' : 'transparent',
          zIndex: 2,
        }}
      />
    </Box>
  );
}
