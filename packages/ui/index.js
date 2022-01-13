import { jsx as _jsx } from "react/jsx-runtime";
export * from './components';
export * from './utils';
export * from './hooks';
export * as constants from './constants';
export * from './icons';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
export function CmdkThemeProvider({ children, theme: themeOverrides = {}, }) {
    return _jsx(ThemeProvider, Object.assign({ theme: Object.assign(Object.assign({}, theme), themeOverrides) }, { children: children }), void 0);
}
