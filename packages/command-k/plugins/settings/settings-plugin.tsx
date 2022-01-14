import { CommandKPlugin } from 'command-k';

const settingsPlugin: CommandKPlugin = {
  id: 'settings',
  title: 'Settings',
  description: 'CMD-K settings',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/settings',
  version: '0.0.1',
  main: settingsPluginMain,
};

export default settingsPlugin;

function settingsPluginMain() {
  console.log('Hello settings plugin!');
}
