import { Box, Text } from 'ui';

import { UseStorage } from 'command-k/providers/storage-provider';

export function OverlaySettings({ useStorage }: { useStorage: UseStorage }) {
  return (
    <Box>
      <Text>Overlay Settings</Text>
    </Box>
  );
}
