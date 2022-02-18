import { CommandKPlugin } from 'command-k';
import { NOOP } from 'ui';

const uninstallPlugin: CommandKPlugin = {
  id: 'uninstall',
  title: 'Uninstall plugin',
  description: 'Uninstall a plugin',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/uninstall',
  version: '0.0.1',
  mount,
  unmount: NOOP,
};

export default uninstallPlugin;

function mount() {
  console.info('Hello uninstall plugin!');
}
