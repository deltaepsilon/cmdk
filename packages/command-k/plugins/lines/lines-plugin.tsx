import { ArrowUpIcon, Box, Button, CommandIcon, Flex, Grid, Keycap, NOOP, Text } from 'ui';
import { CommandKPlugin, MountContext } from 'command-k';
import { useCallback, useLayoutEffect, useRef } from 'react';

import LinesOverlay from './lines-overlay';
import ReactDOM from 'react-dom';
import useLinesControls from './use-lines-controls';
import useLinesSettings from './use-lines-settings';

const linesPlugin: CommandKPlugin = {
  id: 'lines',
  title: 'Lines',
  description: 'Guidelines for your layout',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/lines',
  version: '0.0.1',
  mount: (context) => ReactDOM.render(<LinesPluginConnected {...context} />, context.mountPoint),
  unmount: NOOP,
};

export default linesPlugin;

function LinesPluginConnected(context: MountContext) {
  const { StorageProvider, PaneThemeProvider, OverlayThemeProvider } = context;

  return (
    <StorageProvider>
      <>
        <OverlayThemeProvider>
          <OverlayWrapper {...context} />
        </OverlayThemeProvider>
        <PaneThemeProvider>
          <LinesPlugin {...context} />
        </PaneThemeProvider>
      </>
    </StorageProvider>
  );
}

function OverlayWrapper(context: MountContext) {
  const { OverlayThemeProvider } = context;

  return (
    <OverlayThemeProvider>
      <LinesOverlay {...context} />
    </OverlayThemeProvider>
  );
}

function LinesPlugin({ useStorage }: MountContext) {
  const {
    clear,
    controls: { isCommandActive },
    isDraggable,
    toggleIsCommandActive,
  } = useLinesControls({ useStorage });
  const { settings, toggleIsActive } = useLinesSettings({ useStorage });

  return (
    <Grid sx={{ padding: 2 }}>
      <Text variant="headline3" sx={{ textAlign: 'center' }}>
        Lines
      </Text>
      <Grid
        columns="1fr 1fr"
        sx={{
          alignItems: 'center',
          padding: 3,
          '[data-keycap]': {
            marginRight: 1,
          },
          '& > svg': {
            color: 'secondary',
          },
          '& > span': {
            paddingTop: '2px',
            '& > svg': {
              position: 'relative',
              top: '2px',
              marginX: 1,
            },
          },
        }}
      >
        <Keycap>
          <CommandIcon />
        </Keycap>
        <Text>hold to drag</Text>

        <Flex>
          <Keycap>
            <CommandIcon />
          </Keycap>
          <Keycap variant="shift">
            <ArrowUpIcon />
          </Keycap>
          <Keycap>v</Keycap>
        </Flex>
        <Text>vertical line</Text>
        
        <Flex>
          <Keycap>
            <CommandIcon />
          </Keycap>
          <Keycap variant="shift">
            <ArrowUpIcon />
          </Keycap>
          <Keycap>h</Keycap>
        </Flex>
        <Text>horizontal line</Text>
      </Grid>
      <Flex>
        <Button onClick={toggleIsActive} sx={{ width: '100%' }}>
          {settings.isActive ? 'Deactivate' : 'Activate'}
        </Button>
      </Flex>
    </Grid>
  );
}
