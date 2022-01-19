import { Box, Button, Grid, NOOP, XIcon } from 'ui';
import { MountLayer, UnmountLayer, useKeys, useLayers, useSearch } from 'command-k/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CommandKPlugin } from 'command-k';
import SearchResult from './search-result';

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
  const { mountLayer, getLayer } = useLayers({ iframeWrapper: iframeWrapperRef.current });
  const getOnClick = useCallback(
    (i) => () => {
      const plugin = plugins[i];

      setIndex(i);
      setActivePlugin(plugin);
    },
    [],
  );
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
      const layer = getLayer(activePlugin.id);
      const unmount = mountLayer(activePlugin.id);

      layer?.contentWindow && activePlugin.mount(layer.contentWindow.document);

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

  useKeys({ plugins, setIndex, onClose });

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
            variant="circle-tertiary"
            onClick={onClose}
            sx={{ backgroundColor: 'background', position: 'absolute', right: 3, top: 3 }}
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
