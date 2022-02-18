import { Button, ColorMode, Flex, Grid, MoonIcon, NOOP, SunIcon, Text, focusOnActiveButton } from 'ui';
import { useCallback, useLayoutEffect, useRef } from 'react';

import { CommandKPlugin } from 'command-k';
import ReactDOM from 'react-dom';
import { useColorMode } from 'theme-ui';

const themePlugin: CommandKPlugin = {
  id: 'theme',
  title: 'Theme',
  description: 'Switch between themes',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/theme',
  version: '0.0.1',
  mount: ({ mountPoint, setColorMode, PaneThemeProvider }) => {
    ReactDOM.render(
      <PaneThemeProvider>
        <ThemePlugin setColorMode={setColorMode} />
      </PaneThemeProvider>,
      mountPoint,
    );
  },
  unmount: NOOP,
};

export default themePlugin;

function ThemePlugin({
  setColorMode: setParentColorMode,
}: {
  setColorMode: React.Dispatch<React.SetStateAction<string>>;
}) {
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const [colorMode, setLocalColorMode] = useColorMode();
  const isLight = colorMode === ColorMode.light;
  const toggleColorMode = useCallback(() => {
    const updatedColorMode = isLight ? ColorMode.dark : ColorMode.light;

    focusOnActiveButton(buttonWrapperRef);

    setLocalColorMode(updatedColorMode);
    setParentColorMode(updatedColorMode);
  }, [isLight, setLocalColorMode, setParentColorMode]);

  useLayoutEffect(() => {
    focusOnActiveButton(buttonWrapperRef);
  }, []);

  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 3,
        height: '100%',
      }}
    >
      <Text variant="headline1" sx={{ marginBottom: 3 }}>
        Switch theme
      </Text>
      <Grid columns="1fr 1fr" ref={buttonWrapperRef}>
        <Button autoFocus onClick={toggleColorMode} disabled={!isLight}>
          <MoonIcon />
        </Button>
        <Button autoFocus onClick={toggleColorMode} disabled={isLight}>
          <SunIcon />
        </Button>
      </Grid>
    </Flex>
  );
}
