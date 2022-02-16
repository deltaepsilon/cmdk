import {
  Box,
  Button,
  CommandIcon,
  Flex,
  Grid,
  InputRow,
  LockIcon,
  Menu,
  MenuPosition,
  SettingsIcon,
  Tooltip,
  inputToNumber,
  useDebouncedInputState,
  useKeydown,
} from 'ui';

import { MountContext } from 'command-k';
import { ThemeUIStyleObject } from 'theme-ui';
import { useCallback } from 'react';
import useControls from './use-controls';
import { useResponsiveValue } from '@theme-ui/match-media';
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
  const { settings, updateOpacity, updateScale, updateX, updateY } = useSettings({ useStorage });
  const {
    clear: clearControls,
    controls: { isCommandActive },
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
  const isCompact = useResponsiveValue([true, true, true, false]);

  useKeydown({
    enableRepeat: true,
    isActive: isCommandActive,
    callback: handleArrowKeys,
  });

  return (
    <Flex
      data-overlay-controls
      sx={{
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: 'calc(100% - 4rem)',
        '& > [data-input-row]': { width: '50%', padding: 2 },
        button: { alignSelf: 'center', justifySelf: 'flex-end', marginX: 2 },
        '& label': { justifyContent: 'flex-end', paddingRight: 2 },
        '& button': { marginY: 2 },
        ...sx,
      }}
    >
      <Flex sx={{ flex: 1, flexWrap: 'wrap' }}>
        <Flex
          data-input-wrapper
          sx={{
            flexDirection: 'column',
            width: '100%',
            '& > div': { gridTemplateColumns: ['1fr 1fr', '150px 150px'], paddingY: 2 },
          }}
        >
          <Grid>
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
          <Grid>
            <InputRow
              label="X"
              onChange={onXChange}
              placeholder="x offset"
              step={1}
              type="number"
              value={x}
            />
            <InputRow
              label="Y"
              onChange={onYChange}
              placeholder="y offset"
              step={1}
              type="number"
              value={y}
            />
          </Grid>
          <Box sx={{ flex: 1 }} />
        </Flex>
      </Flex>

      <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Flex sx={{ justifyContent: 'flex-end' }}>
          <Box>
            {isCompact ? (
              <Menu
                position={MenuPosition.TopLeft}
                sx={{ display: 'inline-block' }}
                trigger={
                  <Button variant="circle-tertiary">
                    <SettingsIcon />
                  </Button>
                }
              >
                <Settings sx={{ width: 175 }} useStorage={useStorage} />
              </Menu>
            ) : (
              <Settings useStorage={useStorage} />
            )}
          </Box>
        </Flex>

        {children}
      </Flex>
    </Flex>
  );
}

function Settings({
  sx = {},
  useStorage,
}: {
  sx?: ThemeUIStyleObject;
  useStorage: MountContext['useStorage'];
}) {
  const { clear: clearSettings } = useSettings({ useStorage });
  const {
    controls: { isCommandActive, isScrollPinned },
    isDraggable,
    toggleIsCommandActive,
    toggleIsScrollPinned,
  } = useControls({ useStorage });

  return (
    <Grid data-overlay-buttons columns="2rem 2rem 1fr" sx={{ flex: 1, alignItems: 'center', ...sx }}>
      <Tooltip text="Hold CMD to move overlay with arrow keys and mouse">
        <Button
          variant="circle-tertiary"
          sx={{ color: isDraggable ? 'focus' : isCommandActive ? 'secondary' : 'primary' }}
          onClick={toggleIsCommandActive}
        >
          <CommandIcon />
        </Button>
      </Tooltip>

      <Tooltip text="Lock the overlay to scroll">
        <Button
          variant="circle-tertiary"
          sx={{ color: isScrollPinned ? 'secondary' : 'primary' }}
          onClick={toggleIsScrollPinned}
        >
          <LockIcon />
        </Button>
      </Tooltip>

      <Flex data-reset-button sx={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
        <Button variant="pill-tertiary" onClick={clearSettings} sx={{ backgroundColor: 'transparent' }}>
          Reset
        </Button>
      </Flex>
    </Grid>
  );
}
