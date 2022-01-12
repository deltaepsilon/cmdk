import { Grid } from 'ui';
import { ReactNode } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

interface Props {
  children: ReactNode;
  sx?: ThemeUIStyleObject;
  variant?: 'unordered' | 'ordered';
}

export default function ListItem({ children, sx = {}, variant }: Props) {
  const isUnordered = variant === 'unordered';
  const isOrdered = variant === 'ordered';
  const isNeither = !isUnordered && !isOrdered;

  return (
    <Grid
      as={isOrdered ? 'ol' : 'ul'}
      sx={{ listStyle: isNeither ? 'none' : null, paddingLeft: isNeither ? 0 : null, ...sx }}
    >
      {children}
    </Grid>
  );
}
