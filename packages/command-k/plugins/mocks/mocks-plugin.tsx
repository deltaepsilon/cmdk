import { Box, Text } from 'ui';
import { Button, ImageIcon, NOOP, TrashIcon, UploadIcon, useFlag } from 'ui';
import { ReactNode, useEffect } from 'react';

import { CommandKPlugin } from 'command-k';
import FileSelector from './file-selector';
import FileUpload from './file-upload';
import ReactDOM from 'react-dom';
import { UseStorage } from 'utils';
import { useFiles } from 'command-k/hooks';

const mocksPlugin: CommandKPlugin = {
  id: 'mock-overlay',
  title: 'Mocks',
  description: 'CMD-K mocks',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/mocks',
  version: '0.0.1',
  mount: (mountPoint, { ThemeProvider, useStorage }) => {
    ReactDOM.render(
      <ThemeProvider>
        <MocksPlugin useStorage={useStorage} />
      </ThemeProvider>,
      mountPoint,
    );
  },
  unmount: NOOP,
};

export default mocksPlugin;

function MocksPlugin({ useStorage }: { useStorage: UseStorage }) {
  const storage = useStorage();
  const { handles } = useFiles({ storage });
  const { flag: isUploading, setFlag: setIsUploading, toggle: toggleUploading } = useFlag(true);
  const hasHandles = !!handles.length;

  useEffect(() => {
    if (!storage.data.isUnloaded) {
      setIsUploading(!handles.length);
    }

    console.log(storage);
  }, [storage.data.isUnloaded]);

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

          <FileUpload useStorage={useStorage} onFileSelect={toggleUploading} />
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
