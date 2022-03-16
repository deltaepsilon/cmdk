import { debounce, useValue } from 'ui';

import { CONTROLS_KEY } from './use-lines-controls';
import { MountContext } from 'command-k';
import produce from 'immer';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

const SETTINGS_KEY = 'settings';
const LINES_KEY = 'lines';

export interface LinesSettings {
  isActive: boolean;
  topControls?: boolean;
  leftControls?: boolean;
}

export interface Line {
  id: string;
  initialX?: number;
  initialY?: number;
  isX: boolean;
  x?: number;
  y?: number;
  isSelected?: boolean;
  color: string;
}
type Lines = { [id: string]: Line };
type AddLineArgs = { type: 'x' | 'y'; value: number };

interface UseLineSettings {
  addLine: (args: AddLineArgs) => void;
  activateLine: (args: { id: string; isSelected?: boolean }) => void;
  clear: () => void;
  settings: LinesSettings;
  lines: Lines;
  moveSelected: (args: { x: number; y: number }) => void;
  removeAllLines: () => void;
  removeLine: (id: string) => void;
  resetInitialPositions: () => void;
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
        isX: type === 'x',
        color: 'secondary',
      };

      if (type === 'x') {
        line.x = value;
        line.initialX = value;
      } else if (type === 'y') {
        line.y = value;
        line.initialY = value;
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
  const activateLine = useCallback(
    ({ id, isSelected = true }: { id: string; isSelected?: boolean }) => {
      storage.update(
        LINES_KEY,
        produce(lines, (draft: Lines) => {
          draft[id].isSelected = isSelected;

          if (isSelected) {
            Object.keys(draft).forEach((key) => {
              if (draft[id].isX !== draft[key].isX) {
                draft[key].isSelected = false;
              }
            });
          }
        }),
      );
    },
    [lines, settings, storage],
  );
  const moveSelected = useCallback(
    debounce(
      ({ x = 0, y = 0 }: { x: number; y: number }) => {
        storage.update(
          LINES_KEY,
          produce(lines, (draft: Lines) => {
            Object.keys(draft).forEach((key) => {
              const { isSelected, isX, initialX = 0, initialY = 0 } = draft[key];

              if (isSelected) {
                console.log({ x, y });
                if (isX) {
                  console.log({ x });
                  draft[key].x = Math.max(0, initialX + x);
                } else {
                  console.log({ y });
                  draft[key].y = Math.max(0, initialY + y);
                }
              }
            });
          }),
        );
      },
      { millis: 3 },
    ),
    [lines, storage],
  );
  const resetInitialPositions = useCallback(() => {
    console.log('resetting...');
    storage.update(
      LINES_KEY,
      produce(lines, (draft: Lines) => {
        Object.keys(draft).forEach((key) => {
          draft[key].initialX = draft[key].x;
          draft[key].initialY = draft[key].y;
        });
      }),
    );

    console.log('reset');
  }, [lines, storage]);

  return useValue({
    activateLine,
    addLine,
    clear,
    lines,
    moveSelected,
    removeAllLines,
    removeLine,
    resetInitialPositions,
    settings,
    toggleIsActive,
    updateIsActive,
  });
}
