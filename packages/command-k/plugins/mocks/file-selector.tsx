import { Box, Flex, Grid, Image, RefreshCwIcon, Text } from 'ui';
import { FilesValue, Thumbnail, useFiles } from 'command-k/hooks';

import { SELECTED_HANDLE_KEY } from './use-selected-image';
import { UseStorage } from 'command-k/providers/storage-provider';
import { useCallback } from 'react';

export default function FileSelector({ useStorage }: { useStorage: UseStorage }) {
  const storage = useStorage();
  const { handles, refreshThumbnails, thumbnails } = useFiles({ storage });

  return (
    <Grid columns="1fr 1fr" sx={{ paddingBottom: 2 }}>
      {handles.map((handle) => {
        const thumbnail = thumbnails[handle.name];

        return (
          <GridItem
            key={handle.name}
            handle={handle}
            refreshThumbnails={refreshThumbnails}
            thumbnail={thumbnail}
            useStorage={useStorage}
          />
        );
      })}
    </Grid>
  );
}

function GridItem({
  handle,
  refreshThumbnails,
  thumbnail,
  useStorage,
}: {
  handle: FileSystemFileHandle;
  refreshThumbnails: FilesValue['refreshThumbnails'];
  thumbnail: Thumbnail;
  useStorage: UseStorage;
}) {
  const storage = useStorage();
  const onClick = useCallback(() => storage.update(SELECTED_HANDLE_KEY, handle.name), [handle, useStorage]);

  return (
    <Box sx={{ variant: 'boxes.square', position: 'relative' }}>
      <Flex
        key={handle.name}
        sx={{
          variant: 'boxes.pinned',
        }}
      >
        {!thumbnail ? (
          <Flex
            onClick={refreshThumbnails}
            sx={{
              variant: 'buttons.pill-secondary',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingX: 2,
              width: '100%',
            }}
          >
            <RefreshCwIcon />
            <Text sx={{ marginTop: 3 }}>{handle.name}</Text>
          </Flex>
        ) : (
          <Flex
            onClick={onClick}
            sx={{
              variant: 'buttons.pill-secondary',
              overflow: 'hidden',
              padding: 0,
              width: '100%',
            }}
          >
            <Image src={thumbnail.base64} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
