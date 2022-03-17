import { ArrowUpIcon, CommandIcon, Flex, Grid, Keycap, MoveIcon, NOOP, Text, Toggle } from 'ui';
import { CommandKPlugin, MountContext } from 'command-k';

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
  mount: (context) => {
    ReactDOM.render(<LinesPluginConnected {...context} />, context.mountPoint);
  },
  unmount: NOOP,
};

interface Props {
  useStorage: MountContext['useStorage'];
}

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

export function LinesPlugin({ useStorage }: Props) {
  const {
    clear,
    controls: { isCommandActive },
    isDraggable,
    toggleIsCommandActive,
  } = useLinesControls({ useStorage });
  const { settings, toggleIsActive } = useLinesSettings({ useStorage });

  return (
    <Grid
      sx={{
        variant: 'styles.hiddenScroll',
        padding: 2,
        paddingTop: 4,
        maxHeight: '100%',
        overflow: 'auto',
      }}
    >
      <Text
        variant="headline3"
        sx={{
          backgroundColor: 'background900',
          padding: 2,
          position: 'absolute',
          top: 0,
          left: 0,
          textAlign: 'center',
          width: '100%',
          zIndex: 1,
        }}
      >
        Lines
      </Text>

      <Toggle
        ballPx={16}
        value={settings.isActive}
        onClick={toggleIsActive}
        sx={{ position: 'absolute', top: 9, left: 24, zIndex: 1 }}
      />

      <Grid
        columns="1fr 1fr"
        sx={{
          alignItems: 'center',
          padding: 3,
          '[data-keycap]': {
            marginRight: 1,
          },
        }}
      >
        <Keycap>
          <CommandIcon />
        </Keycap>
        <Text>Drag</Text>

        <Flex>
          <Keycap>
            <CommandIcon />
          </Keycap>
          <Keycap variant="shift">
            <ArrowUpIcon />
          </Keycap>
          <Keycap>
            <MoveIcon />
          </Keycap>
        </Flex>
        <Text>Move</Text>

        <Flex>
          <Keycap>
            <CommandIcon />
          </Keycap>
          <Keycap variant="shift">
            <ArrowUpIcon />
          </Keycap>
        </Flex>
        <Text>Select</Text>

        <Flex>
          <Keycap sx={{ marginLeft: '0px !important' }}>
            <CommandIcon />
          </Keycap>
          <Keycap variant="shift">
            <ArrowUpIcon />
          </Keycap>
          <Keycap>D</Keycap>
        </Flex>
        <Text>Remove all</Text>

        <Flex>
          <Keycap>
            <CommandIcon />
          </Keycap>
          <Keycap variant="shift">
            <ArrowUpIcon />
          </Keycap>
          <Keycap>v</Keycap>
        </Flex>
        <Text>+ Vertical</Text>

        <Flex>
          <Keycap>
            <CommandIcon />
          </Keycap>
          <Keycap variant="shift">
            <ArrowUpIcon />
          </Keycap>
          <Keycap>h</Keycap>
        </Flex>
        <Text>+ Horizontal</Text>
      </Grid>
    </Grid>
  );
}
