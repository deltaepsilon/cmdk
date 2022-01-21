import { useCallback, useMemo } from 'react';
import { useFlag, useValue } from 'ui';

import { PluginStorage } from 'command-k/utils';

const HANDLES_KEY = '__FILE_HANDLES__';

export default function useFiles({
  storage,
  options = { multiple: false },
}: {
  storage: PluginStorage;
  options?: OpenFilePickerOptions;
}) {
  const { flag: isDropping, setFlag: setIsDropping } = useFlag(false);

  const getFileHandles = useCallback(async () => {
    if (window.isSecureContext) {
      const handles = await window.showOpenFilePicker(options);

      await storage.update(HANDLES_KEY, handles);
    } else {
      throw Error('Insecure context. Must use HTTPS or localhost');
    }
  }, []);
  const handleFileDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDropping(false);

    const items = [...e.dataTransfer.items];
    const handles = await Promise.all(
      items.filter((item) => item.kind === 'file').map((item) => item.getAsFileSystemHandle()),
    );

    if (!options.multiple) {
      handles.splice(1, handles.length - 1);
    }

    await storage.update(HANDLES_KEY, handles);
  }, []);
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
    handles: storage.data[HANDLES_KEY],
    handleFileDragLeave,
    handleFileDragOver,
    handleFileDrop,
    isDropping,
  });
}

async function extractBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}
