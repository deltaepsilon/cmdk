import { Box, Input, NOOP, useKeydown } from 'ui';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { CommandKPlugin } from './command-k';
import Pane from './pane';

interface Props {
  id: string;
  isActive: boolean;
  onIsActiveChanged?: (isActive: boolean) => void;
  overlayWrapperRef: React.RefObject<HTMLDivElement>;
  plugins: CommandKPlugin[];
}

export default function CommandKInput({
  isActive,
  onIsActiveChanged = NOOP,
  overlayWrapperRef,
  plugins,
}: Props) {
  const [query, setQuery] = useState('');
  const [activePlugin, setActivePlugin] = useState<CommandKPlugin | null>(null);
  const [isPaneActive, setIsPaneActive] = useState(false);
  const onChange = useCallback((e) => setQuery(e.target.value), []);
  const onClose = useCallback(() => setActivePlugin(null), []);

  useKeydown({
    isActive: !isPaneActive,
    callback: (e) => {
      if (e.code === 'Escape') {
        setQuery('');
      }
    },
  });

  useEffect(() => {
    onIsActiveChanged(!!query || !!isPaneActive);
  }, [isPaneActive, query]);

  return isActive ? (
    <Box sx={{ borderRadius: 'sm', position: 'relative', width: 360 }}>
      <Box sx={{ position: 'absolute', top: 3, left: 2, zIndex: 1 }}>&gt;</Box>
      <Input
        autoFocus
        value={query}
        onChange={onChange}
        onFocus={onClose}
        sx={{
          background: 'background',
          borderWidth: '0px 0px 3px 0px',
          borderColor: 'modalScrim',
          borderRadius: 'none',

          paddingY: 3,
          paddingX: 2,
          paddingLeft: '1.5rem',
          position: 'relative',
          '&:focus': { boxShadow: 'none' },
        }}
      />
      <Pane
        activePlugin={activePlugin}
        setActivePlugin={setActivePlugin}
        onIsActiveChanged={setIsPaneActive}
        overlayWrapperRef={overlayWrapperRef}
        plugins={plugins}
        query={query}
      />
    </Box>
  ) : null;
}
