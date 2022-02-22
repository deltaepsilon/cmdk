import { ThemeUIStyleObject } from 'theme-ui';
import Box from './box';
import Flex from './flex';

interface Props {
  children: React.ReactNode;
  sx?: ThemeUIStyleObject;
  variant?: 'default' | 'action' | 'shift';
}

const WIDTHS = {
  default: '2rem',
  action: '3rem',
  shift: '4rem',
};

export default function Keycap({ children, sx = {}, variant = 'default' }: Props) {
  return (
    <Flex data-keycap sx={{ ...sx }}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'inputBorder',
          borderRadius: 'lg',
          display: 'inline-block',
          paddingBottom: 1,
          lineHeight: 1,
          width: WIDTHS[variant],
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'inputBorder',
            borderRadius: 'lg',
            padding: '6px',
            justifyContent: 'center',
            position: 'relative',
            top: '-1px',
            left: '-1px',
            width: 'calc(100% + 2px)',
            height: 29,
            svg: {
              position: 'absolute',
              top: '6px',
              margin: '0 !important',
            },
          }}
        >
          {children}
        </Flex>
      </Box>
    </Flex>
  );
}
