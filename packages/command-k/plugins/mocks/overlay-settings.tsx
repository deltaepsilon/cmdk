import { Box, Text } from 'ui';

import OverlayControls from './overlay-controls';
import { UseStorage } from 'command-k/providers/storage-provider';

export default function OverlaySettings({ useStorage }: { useStorage: UseStorage }) {
  return (
    <Box data-overlay-settings>
      <OverlayControls
        useStorage={useStorage}
        sx={{ '[data-reset-button-wrapper]': { gridColumn: '1/-1' } }}
      />
    </Box>
  );
}
