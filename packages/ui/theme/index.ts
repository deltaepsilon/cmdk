import { Theme, ThemeUIStyleObject } from '@theme-ui/css';
import { buttons, links } from './buttons';

import base from './base';
import boxes from './boxes';
import colors from './colors';
import forms from './forms';
import images from './images';
import text from './text';
import zIndices from './zIndices';

interface CmdkTheme extends Theme {
  boxes: ThemeUIStyleObject;
}

const theme: CmdkTheme = {
  ...base,
  boxes,
  buttons,
  colors,
  forms,
  images,
  links,
  text,
  zIndices,
};

export default theme;
export type { ButtonVariant } from './buttons';
