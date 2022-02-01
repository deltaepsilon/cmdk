import { NOOP, useFlag, useValue } from 'ui';
import { useCallback, useMemo } from 'react';

import { FileSystemHandleKind } from 'command-k';
import { PluginStorage } from 'command-k/providers/storage-provider';
import { requestFileHandlePermission } from 'command-k/utils';

const HANDLES_KEY = '__FILE_HANDLES__';
const THUMBNAILS_KEY = '__THUMBNAILS__';

export interface Thumbnail {
  base64: string;
  permission: PermissionState;
  width: number;
  height: number;
}

interface Thumbnails {
  [key: string]: Thumbnail;
}

export interface FilesValue {
  getFileHandles: () => Promise<void>;
  handles: FileSystemFileHandle[];
  handleFileDragLeave: (e: any) => void;
  handleFileDragOver: (e: any) => void;
  handleFileDrop: (e: any) => Promise<void>;
  isDropping: boolean;
  refreshThumbnails: () => Promise<void>;
  thumbnails: Thumbnails;
}

export default function useFiles({
  onFileSelect = NOOP,
  options = { multiple: false },
  storage,
}: {
  onFileSelect?: (handles: FileSystemFileHandle[]) => void;
  options?: OpenFilePickerOptions;
  storage: PluginStorage;
}) {
  const handles = useMemo(() => (storage.data[HANDLES_KEY] || []) as FileSystemFileHandle[], [storage.data]);
  const thumbnails = useMemo(() => (storage.data[THUMBNAILS_KEY] || {}) as Thumbnails, [storage.data]);
  const { flag: isDropping, setFlag: setIsDropping } = useFlag(false);

  const refreshThumbnails = useCallback(
    async (overrideHandles?: FileSystemFileHandle[]) => {
      const localHandles = overrideHandles || handles;
      const thumbnails = {} as Thumbnails;
      let i = localHandles.length;

      while (i--) {
        const handle = localHandles[i];
        const permission = await requestFileHandlePermission(handle);

        if (permission === 'granted') {
          const file = await handle.getFile();
          const fileDetails = await getFileDetails(file);

          thumbnails[handle.name] = { ...fileDetails, permission };
        }
      }

      await storage.update(THUMBNAILS_KEY, thumbnails);
    },
    [handles],
  );

  const getFileHandles = useCallback(async () => {
    if (window.isSecureContext) {
      const items = await window.showOpenFilePicker(options);
      const handles = items.filter((item) => item.kind === FileSystemHandleKind.file);

      await storage.update(HANDLES_KEY, handles);
      await refreshThumbnails(handles);

      onFileSelect(handles);
    } else {
      throw Error('Insecure context. Must use HTTPS or localhost');
    }
  }, [refreshThumbnails]);

  const handleFileDrop = useCallback(
    async (e) => {
      e.preventDefault();
      setIsDropping(false);

      const items = [...e.dataTransfer.items];
      const handles = await Promise.all(
        items
          .filter((item) => item.kind === FileSystemHandleKind.file)
          .map((item) => item.getAsFileSystemHandle()),
      );

      if (!options.multiple) {
        handles.splice(1, handles.length - 1);
      }

      await storage.update(HANDLES_KEY, handles);
      await refreshThumbnails(handles);

      onFileSelect(handles);
    },
    [refreshThumbnails],
  );
  const handleFileDragOver = useCallback(
    (e) => {
      e.preventDefault();

      setIsDropping(true);
    },
    [setIsDropping],
  );
  const handleFileDragLeave = useCallback(
    (e) => {
      e.preventDefault();

      setIsDropping(false);
    },
    [setIsDropping],
  );

  return useValue({
    getFileHandles,
    handles,
    handleFileDragLeave,
    handleFileDragOver,
    handleFileDrop,
    isDropping,
    refreshThumbnails,
    thumbnails,
  });
}

async function getFileDetails(file: File): Promise<{ base64: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      const img = document.createElement('img');

      img.onload = () => resolve({ base64, width: img.width, height: img.height });
      img.onerror = reject;

      img.src = base64;
    };
    reader.onerror = reject;
  });
}
