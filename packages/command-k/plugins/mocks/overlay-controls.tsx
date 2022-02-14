import {
  Box,
  Button,
  CommandIcon,
  Flex,
  Grid,
  InputRow,
  LockIcon,
  inputToNumber,
  useDebouncedInputState,
  useKeydown,
} from 'ui';
import { useCallback, useState } from 'react';

import { MountContext } from 'command-k';
import { ThemeUIStyleObject } from 'theme-ui';
import useControls from './use-controls';
import useSettings from './use-settings';

const INPUT_MILLIS = 250;

export default function OverlayControls({
  children = null,
  useStorage,
  sx = {},
}: {
  children?: React.ReactNode;
  useStorage: MountContext['useStorage'];
  sx?: ThemeUIStyleObject;
}) {
  const {
    clear: clearSettings,
    settings,
    updateOpacity,
    updateScale,
    updateX,
    updateY,
  } = useSettings({ useStorage });
  const {
    clear: clearControls,
    controls: { isCommandActive, isScrollPinned },
    isDraggable,
    toggleIsCommandActive,
    toggleIsScrollPinned,
  } = useControls({ useStorage });
  const [opacity, onOpacityChange] = useDebouncedInputState<number>({
    callback: updateOpacity,
    onChange: inputToNumber,
    value: settings.opacity,
  });
  const [scale, onScaleChange] = useDebouncedInputState<number>({
    callback: updateScale,
    onChange: inputToNumber,
    value: settings.scale,
  });
  const [x, onXChange, updateXState] = useDebouncedInputState<number>({
    callback: updateX,
    onChange: inputToNumber,
    millis: INPUT_MILLIS,
    value: settings.x,
  });
  const [y, onYChange, updateYState] = useDebouncedInputState<number>({
    callback: updateY,
    onChange: inputToNumber,
    millis: INPUT_MILLIS,
    value: settings.y,
  });
  const handleArrowKeys = useCallback(
    (e) => {
      if (e.ctrlKey) {
        switch (e.code) {
          case 'ControlLeft':
          case 'ControlRight':
            return;
          case 'Escape':
            return clearControls();

          case 'ArrowUp':
            return updateYState((y) => y + 1);

          case 'ArrowDown':
            return updateYState((y) => y - 1);

          case 'ArrowRight':
            return updateXState((x) => x + 1);

          case 'ArrowLeft':
            return updateXState((x) => x - 1);
        }
      }
    },
    [clearControls, updateXState, updateYState],
  );

  useKeydown({
    enableRepeat: true,
    isActive: isCommandActive,
    callback: handleArrowKeys,
  });

  return (
    <Flex
      sx={{
        flexWrap: 'wrap',
        flexDirection: 'column',
        height: 'calc(100% - 4rem)',
        '& > [data-input-row]': { width: '50%', padding: 2 },
        button: { alignSelf: 'center', justifySelf: 'flex-end', marginX: 2 },
        '& label': { justifyContent: 'flex-end', paddingRight: 2 },
        '& button': { marginY: 2 },
        ...sx,
      }}
    >
      <Grid columns="1fr 1fr">
        <InputRow
          label="Opacity"
          onChange={onOpacityChange}
          placeholder="opacity"
          step={0.01}
          type="number"
          value={opacity}
        />
        <InputRow
          label="Scale"
          onChange={onScaleChange}
          placeholder="scale"
          step={0.01}
          type="number"
          value={scale}
        />
      </Grid>
      <Grid columns="1fr 1fr">
        <InputRow label="X" onChange={onXChange} placeholder="x offset" step={1} type="number" value={x} />
        <InputRow label="Y" onChange={onYChange} placeholder="y offset" step={1} type="number" value={y} />
      </Grid>

      <Grid data-overlay-buttons columns="2rem 2rem 1fr" sx={{ flex: 1, alignItems: 'flex-end' }}>
        <Box>
          <Button
            variant="circle-tertiary"
            sx={{ color: isDraggable ? 'focus' : isCommandActive ? 'secondary' : 'primary' }}
            onClick={toggleIsCommandActive}
          >
            <CommandIcon />
          </Button>
        </Box>

        <Box>
          <Button
            variant="circle-tertiary"
            sx={{ color: isScrollPinned ? 'secondary' : 'primary' }}
            onClick={toggleIsScrollPinned}
          >
            <LockIcon />
          </Button>
        </Box>

        <Flex data-reset-button sx={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
          <Button variant="pill-tertiary" onClick={clearSettings}>
            Reset
          </Button>
        </Flex>
      </Grid>

      {children}
    </Flex>
  );
}
