import { Box, Flex, Grid } from 'ui';

import { Header } from 'components';
import { ReactNode } from 'react';

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
    </Flex>
  );
}
