import { CommandKPlugin } from 'command-k';
import { NOOP } from 'ui';

const installPlugin: CommandKPlugin = {
  id: 'install',
  title: 'Install plugin',
  description: 'Install a new plugin',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/install-plugin',
  version: '0.0.1',
  mount,
  unmount: NOOP,
};

export default installPlugin;

function mount() {
  console.log('Hello install plugin!');
}
