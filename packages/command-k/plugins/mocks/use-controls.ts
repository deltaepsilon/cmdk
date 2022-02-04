import { MountContext } from 'command-k';
import produce from 'immer';
import { useCallback } from 'react';
import { useValue } from 'ui';

export const CONTROLS_KEY = 'controls';

export interface Controls {
  isCommandActive: boolean;
  isDragActive: boolean;
}

interface UseControls {
  clear: () => void;
  controls: Controls;
  toggleIsCommandActive: () => void;
  toggleIsDragActive: () => void;
  updateIsCommandActive: (isCommandActive: boolean) => void;
  updateIsDragActive: (isDragActive: boolean) => void;
}

const DEFAULT_CONTROLS: Controls = {
  isCommandActive: false,
  isDragActive: false,
};

export default function useControls({ useStorage }: { useStorage: MountContext['useStorage'] }): UseControls {
  const storage = useStorage();
  const controls = storage.data[CONTROLS_KEY] || DEFAULT_CONTROLS;
  const clear = useCallback(() => storage.update(CONTROLS_KEY, null), []);
  const updateIsCommandActive = useCallback(
    (isCommandActive: Controls['isCommandActive']) => {
      storage.update(
        CONTROLS_KEY,
        produce(controls, (draft: Controls) => {
          draft.isCommandActive = isCommandActive;
        }),
      );
    },
    [controls, storage],
  );
  const updateIsDragActive = useCallback(
    (isDragActive: Controls['isDragActive']) => {
      storage.update(
        CONTROLS_KEY,
        produce(controls, (draft: Controls) => {
          draft.isDragActive = isDragActive;
        }),
      );
    },
    [controls, storage],
  );
  const toggleIsCommandActive = useCallback(
    () => updateIsCommandActive(!controls.isCommandActive),
    [controls.isCommandActive],
  );
  const toggleIsDragActive = useCallback(
    () => updateIsDragActive(!controls.isDragActive),
    [controls.isDragActive],
  );

  return useValue({
    clear,
    controls,
    toggleIsCommandActive,
    toggleIsDragActive,
    updateIsCommandActive,
    updateIsDragActive,
  });
}
