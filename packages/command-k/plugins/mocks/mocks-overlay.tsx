import { Box, Text } from 'ui';

import { MountContext } from 'command-k';
import ReactDOM from 'react-dom';
import { useFiles } from 'command-k/hooks';

export default function MocksOverlayPortal({
  overlayContainer,
  useStorage,
}: {
  overlayContainer: MountContext['overlayContainer'];
  useStorage: MountContext['useStorage'];
}) {
  const hasChildren = !!overlayContainer.childElementCount;

  return hasChildren
    ? null
    : ReactDOM.createPortal(<MocksOverlay useStorage={useStorage} />, overlayContainer);
}

function MocksOverlay({ useStorage }: { useStorage: MountContext['useStorage'] }) {
  const storage = useStorage();
  const { handles } = useFiles({ storage });
  console.log('handles', handles);

  return (
    <Box id={new Date().toString()} sx={{ background: 'gold', pointerEvents: 'auto', opacity: 0.5 }}>
      <Text>Mock overlay test</Text>
    </Box>
  );
}
