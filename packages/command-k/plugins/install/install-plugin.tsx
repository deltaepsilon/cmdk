import { CommandKPlugin } from 'command-k';

const installPlugin: CommandKPlugin = {
  id: 'install',
  title: 'Install plugin',
  description: 'Install a new plugin',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/install-plugin',
  version: '0.0.1',
  main: installPluginMain,
};

export default installPlugin;

function installPluginMain() {
  console.log('Hello install plugin!');
}
