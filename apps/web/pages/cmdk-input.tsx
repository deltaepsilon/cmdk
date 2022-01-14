import { Box, Flex } from 'ui';
import { CommandKInput, defaultPlugins } from 'command-k';

const PLUGINS = defaultPlugins;

export default function IndexPage() {
  return (
    <Flex
      sx={{
        backgroundColor: 'modalScrim',
        justifyContent: 'center',
        padding: 5,
        width: '100%',
      }}
    >
      <Box>
        <CommandKInput id="cmdk-input-page" isActive plugins={PLUGINS} />
      </Box>
    </Flex>
  );
}
