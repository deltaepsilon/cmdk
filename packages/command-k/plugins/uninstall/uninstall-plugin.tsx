import { CommandKPlugin } from 'command-k';

const uninstallPlugin: CommandKPlugin = {
  id: 'uninstall',
  title: 'Uninstall plugin',
  description: 'Uninstall a plugin',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/uninstall-plugin',
  version: '0.0.1',
  main: uninstallPluginMain,
};

export default uninstallPlugin;

function uninstallPluginMain() {
  console.log('Hello uninstall plugin!');
}
