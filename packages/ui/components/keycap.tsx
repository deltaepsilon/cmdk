import Box from './box';

interface Props {
  children: React.ReactNode;
  variant?: 'default' | 'shift';
}

const WIDTHS = {
  default: '2rem',
  shift: '4rem',
};

export default function Keycap({ children, variant = 'default' }: Props) {
  return (
    <Box data-keycap>
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
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'inputBorder',
            borderRadius: 'lg',
            padding: '6px',
            position: 'relative',
            top: '-1px',
            left: '-1px',
            width: 'calc(100% + 2px)',
            textAlign: 'center',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
