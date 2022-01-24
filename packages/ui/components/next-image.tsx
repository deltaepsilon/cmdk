/** @jsxImportSource theme-ui */

import NextImage, { ImageProps } from 'next/image';

import { ThemeUIStyleObject } from 'theme-ui';

interface Props extends ImageProps {
  sx?: ThemeUIStyleObject;
}

export default function NextImageWrapper(props: Props) {
  return props.src ? <NextImage {...props} /> : null;
}
