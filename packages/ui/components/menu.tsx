import Box from './box';
import { ThemeUIStyleObject } from 'theme-ui';
import { stopPropagation } from '../utils';
import { useMemo } from 'react';
import { useModalState } from '../hooks';

export enum MenuPosition {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
}

interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode;
  position?: MenuPosition;
  sx?: ThemeUIStyleObject;
}

export default function Menu({ children, trigger, position, sx = {} }: Props) {
  const { isOpen, toggle } = useModalState({ dismissOnEscape: true, startOpen: false });
  const positionSx = useMemo(() => {
    const isTop = position === MenuPosition.TopLeft || position === MenuPosition.TopRight;
    const isLeft = position === MenuPosition.TopLeft || position === MenuPosition.BottomLeft;
    const result: ThemeUIStyleObject = {};

    if (isTop) {
      result.bottom = 0;
    } else {
      result.top = 0;
    }

    if (isLeft) {
      result.right = 0;
    } else {
      result.left = 0;
    }

    return result;
  }, [position]);

  return (
    <Box onClick={toggle} sx={{ position: 'relative', zIndex: 'menu', ...sx }}>
      <Box sx={{ display: isOpen ? 'block' : 'none', position: 'fixed', inset: 0 }} />
      <Box sx={{ position: 'relative' }}>
        <Box>{trigger}</Box>
        <Box
          onClick={stopPropagation}
          sx={{
            backgroundColor: 'background',
            display: isOpen ? 'block' : 'none',
            variant: 'boxes.border',
            position: 'absolute',
            zIndex: 1,
            ...positionSx,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
