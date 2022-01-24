import { Flex, Text, focusOnActiveButton } from 'ui';
import { useEffect, useRef } from 'react';

import { Button } from 'ui';
import { UseStorage } from 'utils';
import { useFiles } from 'command-k/hooks';

export default function FileUpload({
  onFileSelect,
  useStorage,
}: {
  onFileSelect: () => void;
  useStorage: UseStorage;
}) {
  const storage = useStorage();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { getFileHandles, handleFileDragLeave, handleFileDragOver, handleFileDrop, isDropping } = useFiles({
    onFileSelect,
    options: { multiple: true },
    storage,
  });

  useEffect(() => {
    focusOnActiveButton(wrapperRef);
  }, []);

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
