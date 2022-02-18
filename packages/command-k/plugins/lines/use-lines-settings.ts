import { CONTROLS_KEY } from './use-lines-controls';
import { MountContext } from 'command-k';
import produce from 'immer';
import { useCallback } from 'react';
import { useValue } from 'ui';

export const SETTINGS_KEY = 'settings';

export interface LinesSettings {
  isActive: boolean;
}

interface UseSettings {
  clear: () => void;
  settings: LinesSettings;
  toggleIsActive: () => void;
  updateIsActive: (isActive: boolean) => void;
}

const DEFAULT_SETTINGS: LinesSettings = {
  isActive: false,
};

export default function useLinesSettings({
  useStorage,
}: {
  useStorage: MountContext['useStorage'];
}): UseSettings {
  const storage = useStorage();
  const settings = storage.data[SETTINGS_KEY] || DEFAULT_SETTINGS;
  const clear = useCallback(() => {
    storage.update(SETTINGS_KEY, null);
    storage.update(CONTROLS_KEY, null);
  }, []);
  const updateIsActive = useCallback(
    (isActive: LinesSettings['isActive']) => {
      storage.update(
        SETTINGS_KEY,
        produce(settings, (draft: LinesSettings) => {
          draft.isActive = isActive;
        }),
      );
    },
    [settings, storage],
  );
  const toggleIsActive = useCallback(() => updateIsActive(!settings.isActive), [settings]);

  return useValue({ clear, settings, toggleIsActive, updateIsActive });
}
