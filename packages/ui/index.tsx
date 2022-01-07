export * from './components';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';

export function KittyThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
