import { useIsKeyActive, useValue } from 'ui';

import { MountContext } from 'command-k';
import produce from 'immer';
import { useCallback } from 'react';

export const CONTROLS_KEY = 'controls';

export interface Controls {
  isCommandActive: boolean;
  isScrollPinned: boolean;
}

interface UseControls {
  clear: () => void;
  controls: Controls;
  isDraggable: boolean;
  toggleIsCommandActive: () => void;
  toggleIsScrollPinned: () => void;
  updateIsCommandActive: (isCommandActive: boolean) => void;
  updateIsScrollPinned: (isScrollPinned: boolean) => void;
}

const DEFAULT_CONTROLS: Controls = {
  isCommandActive: false,
  isScrollPinned: false,
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
  const updateIsScrollPinned = useCallback(
    (isScrollPinned: Controls['isScrollPinned']) => {
      storage.update(
        CONTROLS_KEY,
        produce(controls, (draft: Controls) => {
          draft.isScrollPinned = isScrollPinned;
        }),
      );
    },
    [controls, storage],
  );
  const toggleIsCommandActive = useCallback(
    () => updateIsCommandActive(!controls.isCommandActive),
    [controls.isCommandActive, updateIsCommandActive],
  );
  const toggleIsScrollPinned = useCallback(
    () => updateIsScrollPinned(!controls.isScrollPinned),
    [controls.isScrollPinned, updateIsScrollPinned],
  );
  const isControlPressed = useIsKeyActive({
    isActive: controls.isCommandActive,
    keys: new Set(['ControlLeft', 'ControlRight']),
  });
  const isDraggable = controls.isCommandActive && isControlPressed;

  return useValue({
    clear,
    controls,
    isDraggable,
    toggleIsCommandActive,
    toggleIsScrollPinned,
    updateIsCommandActive,
    updateIsScrollPinned,
  });
}
