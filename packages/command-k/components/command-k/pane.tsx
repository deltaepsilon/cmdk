import { Box, Button, CmdkThemeProvider, Fonts, Grid, XIcon, theme } from 'ui';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import createCache, { EmotionCache } from '@emotion/cache';
import { useKeys, useLayers, useSearch } from 'command-k/hooks';

import { CacheProvider } from '@emotion/react';
import { CommandKPlugin } from 'command-k';
import SearchResult from './search-result';
import { useColorMode } from 'theme-ui';

interface Props {
  onIsActiveChanged?: (isActive: boolean) => void;
  plugins: CommandKPlugin[];
  query: string;
}

export default function Pane({ onIsActiveChanged, plugins, query }: Props) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const iframeWrapperRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [activePlugin, setActivePlugin] = useState<CommandKPlugin | null>(null);
  const { mountLayer, getMountPoint } = useLayers({ iframeWrapper: iframeWrapperRef.current });
  const [, setColorMode] = useColorMode();
  const getOnClick = useCallback(
    (i) => () => {
      const plugin = plugins[i];

      setIndex(i);
      setActivePlugin(plugin);
    },
    [],
  );
  const selectActive = useCallback(() => {
    console.log('index', index);
    setActivePlugin(plugins[index]);
  }, [index, plugins]);
  const onClose = useCallback(() => {
    setActivePlugin(null);
  }, [setActivePlugin]);
  const searchResults = useSearch({ query, plugins });
  const layerVisible = !!activePlugin;

  useEffect(() => {
    setIndex(0);
  }, [query]);

  useEffect(() => {
    if (activePlugin) {
      const unmount = mountLayer(activePlugin.id);
      const mountPoint = getMountPoint(activePlugin.id);

      if (mountPoint) {
        console.log(activePlugin.id, mountPoint);
        activePlugin.mount(mountPoint, { setColorMode, theme, ThemeProvider: getThemeProvider(mountPoint) });
      }

      return unmount;
    }
  }, [activePlugin]);

  useEffect(() => {
    onIsActiveChanged && onIsActiveChanged(!!activePlugin);
  }, [activePlugin]);

  useEffect(() => {
    const childNode = resultsRef.current?.childNodes[index] as HTMLDivElement | undefined;

    childNode && childNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [index]);

  useKeys({ isPluginActive: !!activePlugin, plugins, selectActive, setIndex, onClose });

  return (
    <Box
      sx={{
        variant: 'styles.hiddenScroll',
        backgroundColor: 'modalScrim',
        height: 300,
        maxHeight: 'calc(100vh - 10rem)',
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <Box
        ref={iframeWrapperRef}
        sx={{
          variant: 'boxes.pinned',
          backgroundColor: 'background',
          display: layerVisible ? 'block' : 'none',
          iframe: {
            border: 'none',
            height: '100%',
            width: '100%',
          },
        }}
      >
        {layerVisible && (
          <Button
            autoFocus
            variant="circle-tertiary"
            onClick={onClose}
            sx={{ backgroundColor: 'background', position: 'absolute', right: 3, top: 3, marginTop: '-2px' }}
          >
            <XIcon />
          </Button>
        )}
      </Box>
      <Grid gap={0} ref={resultsRef} sx={{ background: 'background' }}>
        {searchResults.map((result, i) => (
          <SearchResult
            key={result.item.id}
            selected={index === i}
            plugin={result.item}
            onClick={getOnClick(i)}
          />
        ))}
      </Grid>
    </Box>
  );
}

function getThemeProvider(mountPoint: HTMLDivElement) {
  return ({ children }: { children: ReactNode }) => {
    const cache = useRef<EmotionCache>(
      createCache({ container: mountPoint.parentElement as HTMLElement, key: 'command-k' }),
    );

    return (
      <>
        <Fonts />
        <CacheProvider value={cache.current}>
          <CmdkThemeProvider theme={theme}>{children}</CmdkThemeProvider>
        </CacheProvider>
      </>
    );
  };
}
