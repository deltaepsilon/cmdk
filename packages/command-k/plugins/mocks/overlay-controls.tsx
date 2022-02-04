import { Button, Flex, InputRow, useDebouncedInputState } from 'ui';

import { ChangeEvent } from 'react';
import { MountContext } from 'command-k';
import { ThemeUIStyleObject } from 'theme-ui';
import { useSettings } from './use-settings';

export default function OverlayControls({
  children = null,
  useStorage,
  sx = {},
}: {
  children?: React.ReactNode;
  useStorage: MountContext['useStorage'];
  sx?: ThemeUIStyleObject;
}) {
  const { clear, settings, updateOpacity, updateScale, updateX, updateY } = useSettings({ useStorage });
  const [opacity, onOpacityChange] = useDebouncedInputState<number>({
    callback: updateOpacity,
    onChange: toNumber,
    value: settings.opacity,
  });
  const [scale, onScaleChange] = useDebouncedInputState<number>({
    callback: updateScale,
    onChange: toNumber,
    value: settings.scale,
  });
  const [x, onXChange] = useDebouncedInputState<number>({
    callback: updateX,
    onChange: toNumber,
    value: settings.x,
  });
  const [y, onYChange] = useDebouncedInputState<number>({
    callback: updateY,
    onChange: toNumber,
    value: settings.y,
  });

  return (
    <Flex
      sx={{
        flexWrap: 'wrap',
        '& > div': { width: '50%', padding: 2 },
        button: { alignSelf: 'center', justifySelf: 'flex-end', marginX: 2 },
        '& label': { justifyContent: 'flex-end', paddingRight: 2 },
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

      <Flex data-reset-button sx={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
        <Button variant="pill-tertiary" onClick={clear}>
          Reset
        </Button>
      </Flex>

      {children}
    </Flex>
  );
}

function toNumber(e: ChangeEvent<HTMLInputElement>) {
  return +e.target.value;
}
