import { MountContext } from 'command-k';
import produce from 'immer';
import { useCallback } from 'react';
import { useValue } from 'ui';

export const SETTINGS_KEY = 'settings';

export interface Settings {
  opacity: number;
  scale: number;
  x: number;
  y: number;
}

interface UseSettings {
  clear: () => void;
  settings: Settings;
  updateOpacity: (opacity: number) => void;
  updateScale: (scale: number) => void;
  updateX: (x: number) => void;
  updateY: (x: number) => void;
}

const DEFAULT_SETTINGS: Settings = {
  opacity: 0.5,
  scale: 1,
  x: 0,
  y: 0,
};

export function useSettings({ useStorage }: { useStorage: MountContext['useStorage'] }): UseSettings {
  const storage = useStorage();
  const settings = storage.data[SETTINGS_KEY] || DEFAULT_SETTINGS;
  const clear = useCallback(() => storage.update(SETTINGS_KEY, null), []);
  const updateOpacity = useCallback(
    (opacity: Settings['opacity']) => {
      const standardizedOpacity = opacity > 1 ? opacity / 10 : opacity;

      storage.update(
        SETTINGS_KEY,
        produce(settings, (draft: Settings) => {
          draft.opacity = Math.min(Math.max(standardizedOpacity, 0), 1);
        }),
      );
    },
    [settings, storage],
  );
  const updateScale = useCallback(
    (scale: Settings['scale']) => {
      const standardizedScale = scale > 10 ? scale / 10 : scale;

      storage.update(
        SETTINGS_KEY,
        produce(settings, (draft: Settings) => {
          draft.scale = Math.min(Math.max(standardizedScale, 0), 10);
        }),
      );
    },
    [settings, storage],
  );
  const updateX = useCallback(
    (x: number) => {
      storage.update(
        SETTINGS_KEY,
        produce(settings, (draft: Settings) => {
          draft.x = x;
        }),
      );
    },
    [settings, storage],
  );
  const updateY = useCallback(
    (y: number) => {
      storage.update(
        SETTINGS_KEY,
        produce(settings, (draft: Settings) => {
          draft.y = y;
        }),
      );
    },
    [settings, storage],
  );

  return useValue({ clear, settings, updateOpacity, updateScale, updateX, updateY });
}
