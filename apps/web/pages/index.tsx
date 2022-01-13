import { Box, Flex, Grid, Text } from 'ui';

import { CommandK } from 'command-k';

export default function IndexPage() {
  return (
    <Grid>
      <Text variant="title">Copy/paste into Dev Tools to install</Text>

      <Box
        as="textarea"
        defaultValue={`(() => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://local.chrisesplin.com/dist/index.js';
  script.onload = () => __cmdk.mount();
  document.head.appendChild(script);
})();
          `}
        sx={{ height: 300, width: 500, maxWidth: 'calc(100vw - 1rem)' }}
      />
    </Grid>
  );
}
