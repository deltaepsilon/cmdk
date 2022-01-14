import { CommandKPlugin } from 'command-k';
import { installPlugin } from './install';
import { settingsPlugin } from './settings';
import { themePlugin } from './theme';
import { uninstallPlugin } from './uninstall';

const defaultPlugins: CommandKPlugin[] = [installPlugin, settingsPlugin, themePlugin, uninstallPlugin];

export { defaultPlugins, installPlugin, settingsPlugin, themePlugin, uninstallPlugin };
