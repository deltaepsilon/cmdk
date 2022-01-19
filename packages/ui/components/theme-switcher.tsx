import { Button, MoonIcon, SunIcon } from 'ui';
import { ThemeUIStyleObject, useColorMode } from 'theme-ui';

import { useCallback } from 'react';

interface Props {
  sx?: ThemeUIStyleObject;
}

export enum ColorMode {
  light = 'default',
  dark = 'dark',
}

export default function ThemeSwitcher({ sx }: Props) {
  const [mode, setMode] = useColorMode();
  const isLight = mode === ColorMode.light;
  const onClick = useCallback(() => setMode(isLight ? ColorMode.dark : ColorMode.light), [isLight, setMode]);

  return (
    <Button variant="circle-tertiary" onClick={onClick} sx={{ fontSize: 2, width: '4rem', ...sx }}>
      {isLight ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
