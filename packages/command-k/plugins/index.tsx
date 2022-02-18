import { CommandKPlugin } from 'command-k';
import { installPlugin } from './install';
import { linesPlugin } from './lines';
import { mocksPlugin } from './mocks';
import { settingsPlugin } from './settings';
import { themePlugin } from './theme';
import { uninstallPlugin } from './uninstall';

const defaultPlugins: CommandKPlugin[] = [linesPlugin, mocksPlugin, themePlugin];

export {
  defaultPlugins,
  installPlugin,
  linesPlugin,
  mocksPlugin,
  settingsPlugin,
  themePlugin,
  uninstallPlugin,
};
