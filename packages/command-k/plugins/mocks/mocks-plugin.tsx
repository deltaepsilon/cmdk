import { Box, Flex, Grid, Input, Label, Text, focusOnActiveButton } from 'ui';
import { Button, NOOP } from 'ui';
import { useEffect, useRef } from 'react';

import { CommandKPlugin } from 'command-k';
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { getFileHandles, handles, handleFileDragLeave, handleFileDragOver, handleFileDrop, isDropping } =
    useFiles({
      storage,
    });

  useEffect(() => {
    focusOnActiveButton(wrapperRef);
  }, []);

  console.log('handles', handles);

  return (
    <Flex ref={wrapperRef} sx={{ variant: 'boxes.pinned', flexDirection: 'column' }}>
      <Text variant="headline3" sx={{ padding: 3, textAlign: 'center' }}>
        Upload Mocks
      </Text>
      <Flex
        sx={{
          alignItems: 'space-around',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Flex sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Button onClick={getFileHandles}>Select File</Button>
        </Flex>
        <Flex
          onDragOver={handleFileDragOver}
          onDrop={handleFileDrop}
          onDragLeave={handleFileDragLeave}
          sx={{
            variant: isDropping ? 'boxes.dropping' : 'boxes.dropTarget',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            margin: 4,
          }}
        >
          <Text>Drag & Drop</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
