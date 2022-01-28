import { Thumbnail, useFiles } from 'command-k/hooks';
import { useCallback, useMemo } from 'react';

import { MountContext } from 'command-k';
import { useValue } from 'ui';

export const SELECTED_HANDLE_KEY = 'selected-handle';

export function useSelectedImage({ useStorage }: { useStorage: MountContext['useStorage'] }): {
  clear: () => void;
  image: Thumbnail | undefined;
} {
  const storage = useStorage();
  const { thumbnails } = useFiles({ storage });
  const selectedHandleKey = storage.data[SELECTED_HANDLE_KEY];
  const image = useMemo(() => thumbnails[selectedHandleKey], [selectedHandleKey, storage]);
  const clear = useCallback(() => storage.update(SELECTED_HANDLE_KEY, null), []);

  return useValue({ clear, image });
}
