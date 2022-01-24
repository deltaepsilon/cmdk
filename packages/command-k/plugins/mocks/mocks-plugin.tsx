import { Box, Flex, Grid, Input, Label, Text, focusOnActiveButton } from 'ui';
import { Button, ImageIcon, NOOP, UploadIcon, useFlag } from 'ui';
import { ReactElement, ReactNode, useEffect, useRef } from 'react';

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

  useEffect(() => {
    if (!storage.data.isUnloaded) {
      setIsUploading(!handles.length);
    }
  }, [storage.data.isUnloaded]);

  switch (true) {
    case !!storage.data.isUnloaded:
      return null;

    case isUploading:
      return (
        <Box>
          <ToggleButton icon={<ImageIcon />} onClick={toggleUploading} />

          <FileUpload useStorage={useStorage} onFileSelect={toggleUploading} />
        </Box>
      );

    default:
      return (
        <Box sx={{ padding: 2, paddingTop: 5 }}>
          <ToggleButton icon={<UploadIcon />} onClick={toggleUploading} />

          <Text
            variant="headline3"
            sx={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 3, textAlign: 'center' }}
          >
            Upload Mocks
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
      sx={{ position: 'absolute', top: 2, left: 2, zIndex: 1 }}
    >
      {icon}
    </Button>
  );
}
