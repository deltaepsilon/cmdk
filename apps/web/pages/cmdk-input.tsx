import { Box, Flex } from 'ui';
import { CommandKInput, OverlayWrapper, defaultPlugins } from 'command-k';

import { useRef } from 'react';

const PLUGINS = defaultPlugins;

export default function IndexPage() {
  const overlayWrapperRef = useRef<HTMLDivElement>(null);
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
        <OverlayWrapper ref={overlayWrapperRef} />
        <CommandKInput
          id="cmdk-input-page"
          isActive
          plugins={PLUGINS}
          overlayWrapperRef={overlayWrapperRef}
        />
      </Box>
    </Flex>
  );
}
