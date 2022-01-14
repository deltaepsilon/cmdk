import { CommandKPlugin } from 'command-k';

const themePlugin: CommandKPlugin = {
  id: 'theme',
  title: 'Theme',
  description: 'Switch between themes',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/theme-plugin',
  version: '0.0.1',
  main: themePluginMain,
};

export default themePlugin;

function themePluginMain() {
  console.log('Hello theme plugin!');
}
