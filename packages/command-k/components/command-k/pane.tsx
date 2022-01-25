import { Box, Button, CmdkThemeProvider, Fonts, Grid, XIcon, theme } from 'ui';
import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import createCache, { EmotionCache } from '@emotion/cache';
import { useKeys, useLayers, useSearch } from 'command-k/hooks';

import { CacheProvider } from '@emotion/react';
import { CommandKPlugin } from 'command-k';
import SearchResult from './search-result';
import StorageProvider from 'command-k/providers/storage-provider';
import { useColorMode } from 'theme-ui';
import { useStorage } from 'command-k/hooks';

interface Props {
  activePlugin: CommandKPlugin | null;
  setActivePlugin: React.Dispatch<React.SetStateAction<CommandKPlugin | null>>;
  onIsActiveChanged?: (isActive: boolean) => void;
  plugins: CommandKPlugin[];
  query: string;
}

export default function Pane({ activePlugin, setActivePlugin, onIsActiveChanged, plugins, query }: Props) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const mountPointWrapperRef = useRef<HTMLDivElement>(null);
  const overlayFrameWrapperRef = useRef<HTMLDivElement>(null);

  const [refIndex, setRefIndex] = useState(0);
  const getOnClick = useCallback(
    (i) => () => {
      const plugin = plugins[i];

      setRefIndex(i);
      setActivePlugin(plugin);
    },
    [],
  );
  const selectActive = useCallback(() => {
    /**
     * Note, plugins[refIndex] works because refIndex corresponds to
     * the index of the plugin in the plugins array.
     */
    setActivePlugin(plugins[refIndex]);
  }, [refIndex, plugins]);
  const onClose = useCallback(() => {
    setActivePlugin(null);
  }, [setActivePlugin]);
  const searchResults = useSearch({ query, plugins });
  const layerVisible = !!activePlugin;

  useMountActivePlugin({ activePlugin, mountPointWrapperRef, onClose, overlayFrameWrapperRef });

  useScrollToActivePlugin({ refIndex, resultsRef });

  useKeys({
    refIndex,
    isPluginActive: !!activePlugin,
    onClose,
    selectActive,
    setRefIndex,
    searchResults,
  });

  useEffect(() => {
    const firstPlugin = searchResults[0];

    firstPlugin && setRefIndex(firstPlugin.refIndex);
  }, [query]);

  useEffect(() => {
    onIsActiveChanged && onIsActiveChanged(!!activePlugin);
  }, [activePlugin]);

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
        data-overlay-frame
        ref={overlayFrameWrapperRef}
        sx={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          iframe: {
            border: 'none',
            height: '100%',
            width: '100%',
          },
        }}
      />
      <Box
        ref={mountPointWrapperRef}
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
            variant="circle-tertiary"
            onClick={onClose}
            sx={{ backgroundColor: 'background', position: 'absolute', right: 3, top: 11 }}
          >
            <XIcon />
          </Button>
        )}
      </Box>
      <Grid gap={0} ref={resultsRef} sx={{ background: 'background' }}>
        {searchResults.map((result, i) => (
          <SearchResult
            key={result.item.id}
            selected={refIndex === result.refIndex}
            plugin={result.item}
            onClick={getOnClick(result.refIndex)}
          />
        ))}
      </Grid>
    </Box>
  );
}

function useMountActivePlugin({
  activePlugin,
  mountPointWrapperRef,
  onClose,
  overlayFrameWrapperRef,
}: {
  activePlugin: CommandKPlugin | null;
  mountPointWrapperRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  overlayFrameWrapperRef: React.RefObject<HTMLDivElement>;
}) {
  const { getMountPoint, getLayer, getOverlayFrame, mountLayer } = useLayers({
    mountPointWrapper: mountPointWrapperRef.current,
    overlayFrameWrapper: overlayFrameWrapperRef.current,
  });
  const [, setColorMode] = useColorMode();

  useEffect(() => {
    if (activePlugin) {
      const layer = getLayer(activePlugin.id);
      const unmount = mountLayer(activePlugin.id);
      const mountPoint = getMountPoint(activePlugin.id);
      const overlayFrame = getOverlayFrame(activePlugin.id);

      if (mountPoint && overlayFrame) {
        activePlugin.mount({
          mountPoint,
          overlayFrame,
          setColorMode,
          StorageProvider: getStorageProvider({ pluginId: activePlugin.id }),
          theme,
          ThemeProvider: getThemeProvider(mountPoint),
          useStorage,
        });

        layer.mountPoint.contentDocument?.body.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        });
      }

      return unmount;
    }
  }, [activePlugin]);
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

function getStorageProvider({ pluginId }: { pluginId: string }) {
  const storageKey = `command-k-${pluginId}`;

  return ({ children }: { children: ReactNode }) => (
    <StorageProvider storageKey={storageKey}>{children}</StorageProvider>
  );
}

function useScrollToActivePlugin({
  refIndex,
  resultsRef,
}: {
  refIndex: number;
  resultsRef: React.RefObject<HTMLDivElement>;
}) {
  const childNode = resultsRef.current?.childNodes[refIndex] as HTMLDivElement | undefined;

  childNode && childNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
