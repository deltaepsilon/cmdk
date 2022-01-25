import { Box } from 'ui';
import { MountContext } from 'command-k';
import ReactDOM from 'react-dom';

export default function MocksOverlayPortal({ overlayFrame }: { overlayFrame: MountContext['overlayFrame'] }) {
  ReactDOM.render(<MocksOverlay />, overlayFrame);

  return null;
}

function MocksOverlay() {
  return <Box sx={{ background: 'gold' }}>MocksOver</Box>;
}
