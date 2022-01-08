import { Box, Grid, Flex, Text, Button, KittyThemeProvider } from 'ui';
import { CommandK } from 'command-k';

export default function Web() {
  return (
    <KittyThemeProvider>
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          backgroundColor: 'gray200',
        }}
      >
        <Grid>
          <Text variant="headline2">Web</Text>
          <Text>Hey</Text>
        </Grid>
      </Flex>
      <CommandK />
    </KittyThemeProvider>
  );
}
