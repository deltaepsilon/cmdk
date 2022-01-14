import { Box, Input, NOOP, useKeydown } from 'ui';
import { useCallback, useEffect, useState } from 'react';

import { CommandKPlugin } from './command-k';
import Pane from './pane';

interface Props {
  id: string;
  isActive: boolean;
  onInputChanged?: (input: string) => void;
  plugins: CommandKPlugin[];
}

export default function CommandKInput({ id, isActive, onInputChanged = NOOP, plugins }: Props) {
  const [query, setQuery] = useState('');
  const onChange = useCallback((e) => setQuery(e.target.value), []);

  useKeydown({
    callback: (e) => {
      if (e.code === 'Escape') {
        setQuery('');
      }
    },
  });

  useEffect(() => {
    onInputChanged(query);
  }, [query]);

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
      <Pane plugins={plugins} query={query} />
    </Box>
  ) : null;
}
