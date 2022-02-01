import { Box, Flex, Grid } from 'ui';
import { CommandK, defaultPlugins } from 'command-k';

import { Header } from 'components';
import { ReactNode } from 'react';

const PLUGINS = defaultPlugins;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex
      sx={{
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Grid
        columns={['1fr', '1fr', '200px 1fr']}
        sx={{
          gridTemplateRows: 'min-content',
          maxWidth: (theme) => theme.breakpoints[3],
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <Header />
        <Box sx={{ justifySelf: 'center', padding: [2, 3, 4], width: '100%' }}>{children}</Box>
      </Grid>

      <CommandK id="web-layout" plugins={PLUGINS} />
    </Flex>
  );
}
