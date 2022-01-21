import { CommandKPlugin } from 'command-k';
import { installPlugin } from './install';
import { mocksPlugin } from './mocks';
import { settingsPlugin } from './settings';
import { themePlugin } from './theme';
import { uninstallPlugin } from './uninstall';

const defaultPlugins: CommandKPlugin[] = [
  installPlugin,
  mocksPlugin,
  settingsPlugin,
  themePlugin,
  uninstallPlugin,
];

export { defaultPlugins, installPlugin, mocksPlugin, settingsPlugin, themePlugin, uninstallPlugin };
