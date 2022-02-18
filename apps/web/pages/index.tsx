import { Box, Grid, Text, constants } from 'ui';

export default function IndexPage() {
  return (
    <Grid>
      <Text variant="title">Copy/paste into Dev Tools to install</Text>

      <Box
        as="textarea"
        defaultValue={`(() => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '${
    constants.IS_DEVELOPMENT
      ? 'https://local.chrisesplin.com/external/index.js'
      : 'https://www.cmdk.dev/external/index.js'
  }';
  script.onload = () => __cmdk.mount();
  document.head.appendChild(script);
})();
          `}
        sx={{ height: 300, width: 500, maxWidth: 'calc(100vw - 1rem)' }}
      />
    </Grid>
  );
}
