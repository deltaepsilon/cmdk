import { Box, Button, Grid, InputRow, Label, Text } from 'ui';

import { MountContext } from 'command-k';
import { ThemeUIStyleObject } from 'theme-ui';
import { useCallback } from 'react';
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
  const onOpacityChange = useCallback((e) => updateOpacity(e.target.value), [updateOpacity]);
  const onScaleChange = useCallback((e) => updateScale(e.target.value), [updateScale]);
  const onXChange = useCallback((e) => updateX(e.target.value), [updateX]);
  const onYChange = useCallback((e) => updateY(e.target.value), [updateY]);

  return (
    <Grid columns="1fr 1fr" sx={{ '& label': { justifyContent: 'flex-end', paddingRight: 2 }, ...sx }}>
      <InputRow
        label="Opacity"
        onChange={onOpacityChange}
        placeholder="opacity"
        step={0.01}
        type="number"
        value={settings.opacity}
      />
      <InputRow
        label="Scale"
        onChange={onScaleChange}
        placeholder="scale"
        step={0.01}
        type="number"
        value={settings.scale}
      />
      <InputRow
        label="X"
        onChange={onXChange}
        placeholder="x offset"
        step={1}
        type="number"
        value={settings.x}
      />
      <InputRow
        label="Y"
        onChange={onYChange}
        placeholder="y offset"
        step={1}
        type="number"
        value={settings.y}
      />
      <Grid
        data-button-wrapper
        columns="repeat(auto-fit, minMax(50px, 200px))"
        sx={{
          alignItems: 'center',
          gridColumn: '1/-1',
          justifyItems: 'center',
          paddingY: 1,
        }}
      >
        <Button variant="pill-tertiary" onClick={clear}>
          Reset
        </Button>

        {children}
      </Grid>
    </Grid>
  );
}
