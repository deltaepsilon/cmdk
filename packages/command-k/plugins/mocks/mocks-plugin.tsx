import { Box, Text } from 'ui';
import { Button, ImageIcon, NOOP, TrashIcon, UploadIcon, useFlag } from 'ui';
import { CommandKPlugin, MountContext } from 'command-k';
import { ReactNode, useEffect } from 'react';

import FileSelector from './file-selector';
import FileUpload from './file-upload';
import MocksOverlay from './mocks-overlay';
import OverlaySettings from './overlay-settings';
import ReactDOM from 'react-dom';
import { UseStorage } from 'command-k/providers/storage-provider';
import { useFiles } from 'command-k/hooks';
import useSelectedImage from './use-selected-image';

const mocksPlugin: CommandKPlugin = {
  id: 'mock-overlay',
  title: 'Mocks',
  description: 'CMD-K mocks',
  url: 'https://github.com/deltaepsilon/cmdk/tree/master/packages/command-k/plugins/mocks',
  version: '0.0.1',
  mount: (context) => ReactDOM.render(<MocksPluginConnected {...context} />, context.mountPoint),
  unmount: NOOP,
  // unmount: (context) => ReactDOM.unmountComponentAtNode(context.mountPoint),
};

export default mocksPlugin;

interface MocksPluginProps {
  useStorage: UseStorage;
}

function MocksPluginConnected(context: MountContext) {
  const { StorageProvider, PaneThemeProvider, OverlayThemeProvider } = context;

  return (
    <StorageProvider>
      <>
        <OverlayThemeProvider>
          <OverlayWrapper {...context} />
        </OverlayThemeProvider>
        <PaneThemeProvider>
          <MocksPlugin useStorage={context.useStorage} />
        </PaneThemeProvider>
      </>
    </StorageProvider>
  );
}

function OverlayWrapper(context: MountContext) {
  const { OverlayThemeProvider, useStorage } = context;
  const { image } = useSelectedImage({ useStorage });

  return image?.base64 ? (
    <OverlayThemeProvider>
      <MocksOverlay {...context} />
    </OverlayThemeProvider>
  ) : null;
}

export function MocksPlugin({ useStorage }: MocksPluginProps) {
  const storage = useStorage();
  const { handles } = useFiles({ storage });
  const hasHandles = !!handles.length;
  const isUnloaded = storage.data.isUnloaded;
  const [isUploading, setIsUploading, toggleUploading] = useFlag();
  const { image, clear: clearImage } = useSelectedImage({ useStorage });

  useEffect(() => {
    if (!isUnloaded) {
      setIsUploading(!hasHandles);
    }
  }, [hasHandles, isUnloaded]);

  switch (true) {
    case !!storage.data.isUnloaded:
      return null;

    case !!image:
      return (
        <PaneWrapper>
          <Button
            variant="circle-tertiary"
            sx={{ position: 'absolute', top: 11, left: 3, zIndex: 1 }}
            onClick={clearImage}
          >
            <TrashIcon />
          </Button>

          <PaneHeadline>Settings</PaneHeadline>

          <OverlaySettings useStorage={useStorage} />
        </PaneWrapper>
      );

    case isUploading:
      return (
        <PaneWrapper>
          {hasHandles && <ToggleButton icon={<ImageIcon />} onClick={toggleUploading} />}

          <PaneHeadline>Upload</PaneHeadline>

          <FileUpload useStorage={useStorage} onFileSelect={() => setIsUploading(false)} />
        </PaneWrapper>
      );

    default:
      return (
        <PaneWrapper>
          <ToggleButton icon={<UploadIcon />} onClick={toggleUploading} />

          <Button
            variant="circle-tertiary"
            sx={{ position: 'absolute', top: 11, left: 5, zIndex: 1 }}
            onClick={storage.clear}
          >
            <TrashIcon />
          </Button>

          <PaneHeadline>Select Overlay</PaneHeadline>

          <FileSelector useStorage={useStorage} />
        </PaneWrapper>
      );
  }
}

function PaneWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        variant: 'styles.hiddenScroll',
        marginTop: '3rem',
        maxHeight: 'calc(100% - 3rem)',
        overflowY: 'auto',
        paddingX: 2,
      }}
    >
      {children}
    </Box>
  );
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

function PaneHeadline({ children }: { children: ReactNode }) {
  return (
    <Text
      variant="headline3"
      sx={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 2, textAlign: 'center' }}
    >
      {children}
    </Text>
  );
}
