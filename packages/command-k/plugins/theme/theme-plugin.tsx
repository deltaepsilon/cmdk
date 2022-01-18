import { CommandKPlugin } from 'command-k';
import { NOOP } from 'ui';

const themePlugin: CommandKPlugin = {
  id: 'theme',
  title: 'Theme',
  description: 'Switch between themes',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/theme-plugin',
  version: '0.0.1',
  mount,
  unmount: NOOP,
};

export default themePlugin;

function mount(document: Document) {
  console.log({ document });
  console.log('Hello theme plugin!', document);
}
