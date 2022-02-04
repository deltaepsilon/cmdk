import {
  Button,
  CommandIcon,
  Flex,
  Grid,
  InputRow,
  inputToNumber,
  MoveIcon,
  useDebouncedInputState,
  useKeydown,
} from 'ui';

import { ChangeEvent } from 'react';
import { MountContext } from 'command-k';
import { ThemeUIStyleObject } from 'theme-ui';
import useControls from './use-controls';
import useSettings from './use-settings';

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
    controls: { isCommandActive, isDragActive },
    toggleIsCommandActive,
    toggleIsDragActive,
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
    value: settings.x,
  });
  const [y, onYChange, updateYState] = useDebouncedInputState<number>({
    callback: updateY,
    onChange: inputToNumber,
    value: settings.y,
  });

  useKeydown(
    {
      isActive: isCommandActive || isDragActive,
      callback: (e) => e.code === 'Escape' && clearControls(),
    },
    [clearControls],
  );

  useKeydown(
    {
      isActive: isCommandActive,
      callback: (e) => {
        if (e.ctrlKey) {
          switch (e.code) {
            case 'ArrowUp':
              updateYState((y) => y + 1);
              break;
            case 'ArrowDown':
              updateYState((y) => y - 1);
              break;
            case 'ArrowRight':
              updateXState((x) => x + 1);
              break;
            case 'ArrowLeft':
              updateXState((x) => x - 1);
              break;

            default:
              break;
          }
        }
      },
    },
    [updateXState, updateYState],
  );

  return (
    <Flex
      sx={{
        flexWrap: 'wrap',
        '& > [data-input-row]': { width: '50%', padding: 2 },
        button: { alignSelf: 'center', justifySelf: 'flex-end', marginX: 2 },
        '& label': { justifyContent: 'flex-end', paddingRight: 2 },
        '& button': { marginTop: 3 },
        ...sx,
      }}
    >
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
      <InputRow label="X" onChange={onXChange} placeholder="x offset" step={1} type="number" value={x} />
      <InputRow label="Y" onChange={onYChange} placeholder="y offset" step={1} type="number" value={y} />

      <Grid columns="2rem 2rem" sx={{ paddingX: 3 }}>
        <Button
          variant="circle-tertiary"
          sx={{ color: isCommandActive ? 'secondary' : 'primary' }}
          onClick={toggleIsCommandActive}
        >
          <CommandIcon />
        </Button>

        <Button
          variant="circle-tertiary"
          sx={{ color: isDragActive ? 'secondary' : 'primary' }}
          onClick={toggleIsDragActive}
        >
          <MoveIcon />
        </Button>
      </Grid>

      <Flex data-reset-button sx={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
        <Button variant="pill-tertiary" onClick={clearSettings}>
          Reset
        </Button>
      </Flex>

      {children}
    </Flex>
  );
}
