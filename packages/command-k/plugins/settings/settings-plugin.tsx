import { CommandKPlugin } from 'command-k';
import { NOOP } from 'ui';

const settingsPlugin: CommandKPlugin = {
  id: 'settings',
  title: 'Settings',
  description: 'CMD-K settings',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/settings',
  version: '0.0.1',
  mount,
  unmount: NOOP,
};

export default settingsPlugin;

function mount() {
  console.info('Hello settings plugin!');
}
