import { CommandKPlugin } from 'command-k';
import Fuse from 'fuse.js';
import { useKeydown } from 'ui';

export default function useKeys({
  refIndex,
  isPluginActive,
  onClose,
  searchResults,
  selectActive,
  setRefIndex,
}: {
  refIndex: number;
  isPluginActive: boolean;
  onClose: () => void;
  searchResults: Fuse.FuseResult<CommandKPlugin>[];
  selectActive: () => void;
  setRefIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  useKeydown(
    {
      isActive: true,
      callback: (e) => {
        console.log(e.code);
        switch (e.code) {
          case 'NumpadEnter':
          case 'Enter':
            !isPluginActive && selectActive();
            break;
          case 'Escape':
            onClose();
            break;
          case 'ArrowUp':
            if (!isPluginActive) {
              const activeIndex = getActiveIndex({ refIndex, searchResults });
              const nextRefIndex =
                searchResults[activeIndex - 1]?.refIndex ?? searchResults[searchResults.length - 1]?.refIndex;

              setRefIndex(nextRefIndex);
            }
            break;
          case 'ArrowDown':
            if (!isPluginActive) {
              const activeIndex = getActiveIndex({ refIndex, searchResults });
              const nextRefIndex = searchResults[activeIndex + 1]?.refIndex ?? searchResults[0]?.refIndex;

              setRefIndex(nextRefIndex);
            }
            break;
        }
      },
    },
    [isPluginActive, onClose, searchResults, selectActive, setRefIndex],
  );
}

function getActiveIndex({
  refIndex,
  searchResults,
}: {
  refIndex: number;
  searchResults: Fuse.FuseResult<CommandKPlugin>[];
}) {
  return searchResults.findIndex((r) => r.refIndex === refIndex);
}
