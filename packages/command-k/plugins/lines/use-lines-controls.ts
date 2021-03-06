import { useIsKeyActive, useValue } from 'ui';

import { MountContext } from 'command-k';
import produce from 'immer';
import { useCallback } from 'react';

export const CONTROLS_KEY = 'controls';

export interface Controls {
  isCommandActive: boolean;
}

interface UseControls {
  clear: () => void;
  controls: Controls;
  isDraggable: boolean;
  isMoveable: boolean;
  toggleIsCommandActive: () => void;
  updateIsCommandActive: (isCommandActive: boolean) => void;
}

export const DEFAULT_CONTROLS: Controls = {
  isCommandActive: true,
};

export default function useLinesControls({
  useStorage,
}: {
  useStorage: MountContext['useStorage'];
}): UseControls {
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
  const toggleIsCommandActive = useCallback(
    () => updateIsCommandActive(!controls.isCommandActive),
    [controls.isCommandActive, updateIsCommandActive],
  );
  const isControlPressed = useIsKeyActive({
    isActive: controls.isCommandActive,
    keys: new Set(['ControlLeft', 'ControlRight']),
  });
  const isShiftPressed = useIsKeyActive({
    isActive: controls.isCommandActive,
    keys: new Set(['ShiftLeft', 'ShiftRight']),
  });
  const isDraggable = controls.isCommandActive && isControlPressed;
  const isMoveable = isDraggable && isShiftPressed;

  return useValue({
    clear,
    controls,
    isDraggable,
    isMoveable,
    toggleIsCommandActive,
    updateIsCommandActive,
  });
}
