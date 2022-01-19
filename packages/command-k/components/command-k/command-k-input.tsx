import { Box, Input, NOOP, useKeydown } from 'ui';
import { useCallback, useEffect, useState } from 'react';

import { CommandKPlugin } from './command-k';
import Pane from './pane';

interface Props {
  id: string;
  isActive: boolean;
  onIsActiveChanged?: (isActive: boolean) => void;
  plugins: CommandKPlugin[];
}

export default function CommandKInput({ id, isActive, onIsActiveChanged = NOOP, plugins }: Props) {
  const [query, setQuery] = useState('');
  const [isPaneActive, setIsPaneActive] = useState(false);
  const onChange = useCallback((e) => setQuery(e.target.value), []);

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
    <Box sx={{ background: 'background', borderRadius: 'sm', position: 'relative', width: 360 }}>
      <Box sx={{ position: 'absolute', top: 3, left: 2 }}>&gt;</Box>
      <Input
        autoFocus
        value={query}
        onChange={onChange}
        sx={{
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
      <Pane onIsActiveChanged={setIsPaneActive} plugins={plugins} query={query} />
    </Box>
  ) : null;
}
