import { Box, Flex, Grid } from 'ui';
import { CommandK, CommandKPlugin } from 'command-k';

import { Header } from 'components';
import { ReactNode } from 'react';

const PLUGINS = [] as CommandKPlugin[];

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
          maxWidth: (theme) => theme.breakpoints[3],
          width: '100%',
        }}
      >
        <Header />
        <Box sx={{ justifySelf: 'center', padding: [2, 3, 4] }}>{children}</Box>
      </Grid>

      <CommandK id="web-layout" plugins={PLUGINS} />
    </Flex>
  );
}
