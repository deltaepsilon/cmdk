import { Button, Grid, Text } from 'ui';

import { CommandKPlugin } from './command-k';

interface Props {
  onClick: () => void;
  plugin: CommandKPlugin;
  selected: boolean;
}

export default function SearchResult({ plugin, onClick, selected }: Props) {
  return (
    <Button
      variant="inline"
      onClick={onClick}
      sx={{
        '&:hover': { background: selected ? null : 'hover' },

        background: selected ? 'selected' : null,
        borderRadius: 'none',
        paddingY: 1,
        paddingX: 2,
      }}
    >
      <Grid sx={{}}>
        <Text>{plugin.title}</Text>
      </Grid>
    </Button>
  );
}
