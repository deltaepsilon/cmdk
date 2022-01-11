export * from './components';
export * from './utils';
export * from './hooks';
export * as constants from './constants';

import { ThemeProvider } from 'theme-ui';
import { ThemeProviderProps } from '@emotion/react';
import theme from './theme';

export function KittyThemeProvider({
  children,
  theme: themeOverrides = {},
}: {
  children: React.ReactNode;
  theme?: ThemeProviderProps['theme'];
}) {
  const localTheme = console.log({ theme, themeOverrides });
  return <ThemeProvider theme={{ ...theme, ...themeOverrides }}>{children}</ThemeProvider>;
}
