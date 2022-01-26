import { Box, Text } from 'ui';
import { Button, ImageIcon, NOOP, TrashIcon, UploadIcon, useFlag } from 'ui';
import { CommandKPlugin, MountContext } from 'command-k';
import { ReactNode, useEffect } from 'react';

import FileSelector from './file-selector';
import FileUpload from './file-upload';
import MocksOverlay from './mocks-overlay';
import ReactDOM from 'react-dom';
import { UseStorage } from 'command-k/providers/storage-provider';
import { useFiles } from 'command-k/hooks';

const mocksPlugin: CommandKPlugin = {
  id: 'mock-overlay',
  title: 'Mocks',
  description: 'CMD-K mocks',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/mocks',
  version: '0.0.1',
  mount: (context) => ReactDOM.render(<MocksPluginConnected {...context} />, context.mountPoint),
  unmount: NOOP,
};

export default mocksPlugin;

interface MocksPluginProps {
  useStorage: UseStorage;
}

function MocksPluginConnected({
  ThemeProvider,
  StorageProvider,
  useStorage,
  overlayContainer,
}: MountContext) {
  return (
    <StorageProvider>
      <>
        <MocksOverlay overlayContainer={overlayContainer} useStorage={useStorage} />
        <ThemeProvider>
          <MocksPlugin useStorage={useStorage} />
        </ThemeProvider>
      </>
    </StorageProvider>
  );
}

function MocksPlugin({ useStorage }: MocksPluginProps) {
  const storage = useStorage();
  const { handles } = useFiles({ storage });
  const hasHandles = !!handles.length;
  const isUnloaded = storage.data.isUnloaded;
  const { flag: isUploading, setFlag: setIsUploading, toggle: toggleUploading } = useFlag();

  useEffect(() => {
    if (!isUnloaded) {
      setIsUploading(!hasHandles);
    }
  }, [hasHandles, isUnloaded]);

  switch (true) {
    case !!storage.data.isUnloaded:
      return null;

    case isUploading:
      return (
        <Box>
          {hasHandles && <ToggleButton icon={<ImageIcon />} onClick={toggleUploading} />}

          <Text
            variant="headline3"
            sx={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 2, textAlign: 'center' }}
          >
            Upload Mocks
          </Text>

          <FileUpload useStorage={useStorage} onFileSelect={() => setIsUploading(false)} />
        </Box>
      );

    default:
      return (
        <Box sx={{ paddingX: 2, marginTop: '3rem' }}>
          <ToggleButton icon={<UploadIcon />} onClick={toggleUploading} />

          <Button
            variant="circle-tertiary"
            sx={{ position: 'absolute', top: 11, left: 5, zIndex: 1 }}
            onClick={storage.clear}
          >
            <TrashIcon />
          </Button>

          <Text
            variant="headline3"
            sx={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 2, textAlign: 'center' }}
          >
            Select Overlay
          </Text>

          <FileSelector useStorage={useStorage} />
        </Box>
      );
  }
}

function ToggleButton({ icon, onClick }: { icon: ReactNode; onClick: () => void }) {
  return (
    <Button
      variant="circle-tertiary"
      onClick={onClick}
      sx={{ position: 'absolute', top: 11, left: 3, zIndex: 1 }}
    >
      {icon}
    </Button>
  );
}
