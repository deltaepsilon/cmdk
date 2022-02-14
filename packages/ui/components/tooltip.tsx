import Box from './box';

interface Props {
  children?: React.ReactNode;
  text: string;
}

export default function Tooltip({ children, text }: Props) {
  return (
    <Box sx={{ position: 'relative', '&:hover': { '[data-tooltip]': { display: 'block' } } }}>
      {children}
      <Box
        data-tooltip
        sx={{
          backgroundColor: 'background',
          bottom: '100%',
          display: 'none',
          fontSize: 0,
          padding: 2,
          position: 'absolute',
          width: '10rem',
        }}
      >
        {text}
      </Box>
    </Box>
  );
}
