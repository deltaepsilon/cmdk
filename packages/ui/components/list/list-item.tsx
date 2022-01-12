import { ReactNode } from 'react';
import { Text } from 'ui';
import { ThemeUIStyleObject } from 'theme-ui';

interface Props {
  children: ReactNode;
  sx?: ThemeUIStyleObject;
}

export default function ListItem({ children, sx = {} }: Props) {
  return (
    <Text as="li" sx={sx}>
      {children}
    </Text>
  );
}
