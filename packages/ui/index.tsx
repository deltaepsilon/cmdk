export * from './components';
export * from './utils';
export * from './hooks';
export * as constants from './constants';
export * from './icons';

import { ThemeProvider } from 'theme-ui';
import { ThemeProviderProps } from '@emotion/react';
import theme from './theme';

export type { ButtonVariant } from './theme';

export function CmdkThemeProvider({
  children,
  theme: themeOverrides = {},
}: {
  children: React.ReactNode;
  theme?: ThemeProviderProps['theme'];
}) {
  return <ThemeProvider theme={{ ...theme, ...themeOverrides }}>{children}</ThemeProvider>;
}
