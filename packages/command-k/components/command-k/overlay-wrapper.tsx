import { Box } from 'ui';
import { forwardRef } from 'react';

export default forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
  <Box
    data-overlays-wrapper
    ref={ref}
    sx={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      transform: 'scale(1)',
    }}
    {...props}
  />
));
