import { useCallback, ReactNode } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';
import { Box, Flex, Text } from 'ui';

interface Props {
  ballPx?: number;
  children?: ReactNode;
  onClick: (value: boolean) => void;
  sx?: ThemeUIStyleObject;
  value: boolean;
}

export default function Toggle({ ballPx = 16, children, value, onClick: parentOnClick, sx = {} }: Props) {
  const onClick = useCallback(() => parentOnClick(!value), [parentOnClick, value]);

  return (
    <Flex sx={{ cursor: 'pointer', ...sx }} onClick={onClick}>
      {children && <Text sx={{ paddingRight: 3 }}>{children}</Text>}
      <Flex
        sx={{
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'inputBorder',
          borderRadius: 'full',
          justifyContent: value ? 'flex-end' : 'flex-start',
          padding: '2px',
          width: `calc(2.5 * ${ballPx}px)`,
        }}
      >
        <Box
          sx={{
            backgroundColor: value ? 'secondary' : 'inputBorder',
            borderRadius: 'full',
            width: ballPx,
            height: ballPx,
          }}
        />
      </Flex>
    </Flex>
  );
}
