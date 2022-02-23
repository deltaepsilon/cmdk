import { CONTROLS_KEY } from './use-lines-controls';
import { MountContext } from 'command-k';
import { useCallback } from 'react';
import { useValue } from 'ui';
import { v4 as uuid } from 'uuid';
import produce from 'immer';

const SETTINGS_KEY = 'settings';
const LINES_KEY = 'lines';

export interface LinesSettings {
  isActive: boolean;
  topControls?: boolean;
  leftControls?: boolean;
}

export interface Line {
  id: string;
  x?: number;
  y?: number;
  isSelected?: boolean;
  color: string;
}
type Lines = { [id: string]: Line };
type AddLineArgs = { type: 'x' | 'y'; value: number };

interface UseLineSettings {
  addLine: (args: AddLineArgs) => void;
  clear: () => void;
  settings: LinesSettings;
  lines: Lines;
  removeAllLines: () => void;
  removeLine: (id: string) => void;
  toggleIsActive: () => void;
  updateIsActive: (isActive: boolean) => void;
}

const DEFAULT_SETTINGS: LinesSettings = {
  isActive: false,
  topControls: true,
  leftControls: true,
};

const DEFAULT_LINES: Lines = {};

export default function useLinesSettings({
  useStorage,
}: {
  useStorage: MountContext['useStorage'];
}): UseLineSettings {
  const storage = useStorage();
  const lines: Lines = storage.data[LINES_KEY] || DEFAULT_LINES;
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
  const addLine = useCallback(
    ({ type, value }: AddLineArgs) => {
      const line: Line = {
        id: uuid(),
        color: 'secondary',
      };

      if (type === 'x') {
        line.x = value;
      } else if (type === 'y') {
        line.y = value;
      }

      storage.update(
        LINES_KEY,
        produce(lines, (draft: Lines) => {
          draft[line.id] = line;
        }),
      );
    },
    [lines, storage],
  );
  const removeLine = useCallback(
    (id: string) => {
      storage.update(
        LINES_KEY,
        produce(lines, (draft: Lines) => {
          delete draft[id];
        }),
      );
    },
    [lines, storage],
  );
  const removeAllLines = useCallback(() => storage.update(LINES_KEY, null), [storage]);
  const toggleIsActive = useCallback(() => updateIsActive(!settings.isActive), [settings]);

  return useValue({
    addLine,
    clear,
    lines,
    removeAllLines,
    removeLine,
    settings,
    toggleIsActive,
    updateIsActive,
  });
}
