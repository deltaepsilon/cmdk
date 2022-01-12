import { AppProps } from 'next/app';
import { CmdkThemeProvider } from 'ui';
import Head from 'next/head';
import { Layout } from 'components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppHead />
      <CmdkThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CmdkThemeProvider>
    </>
  );
}

function AppHead() {
  return (
    <Head>
      <title>CMD+K</title>

      <link rel="stylesheet" href="https://use.typekit.net/yii7tof.css"></link>
    </Head>
  );
}
