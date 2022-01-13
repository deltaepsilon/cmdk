import { CommandKInput, CommandKPlugin } from 'command-k';

import { Grid } from 'ui';

const PLUGINS = [] as CommandKPlugin[];

export default function IndexPage() {
  return (
    <Grid>
      <CommandKInput plugins={PLUGINS} />
    </Grid>
  );
}
