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
        <Box
          as="textarea"
          defaultValue={`(() => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://local.chrisesplin.com/dist/index.js';
  script.onload = () => __kitty.mount();
  document.head.appendChild(script);
})();
          `}
          sx={{ height: 300, width: 500 }}
        />
      </Flex>

      <CommandK />
    </KittyThemeProvider>
  );
}
