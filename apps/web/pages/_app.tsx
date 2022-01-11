import { Box, KittyThemeProvider } from 'ui';

import { AppProps } from 'next/app';
import { Header } from 'components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <KittyThemeProvider>
      <Header />
      <Component {...pageProps} />
    </KittyThemeProvider>
  );
}
