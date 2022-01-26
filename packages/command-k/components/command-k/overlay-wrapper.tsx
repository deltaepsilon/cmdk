import { Box } from 'ui';
import { forwardRef } from 'react';

export default forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
  <Box
    data-overlays-wrapper
    ref={ref}
    sx={{
      variant: 'boxes.pinned',
      pointerEvents: 'none',
    }}
    {...props}
  />
));
