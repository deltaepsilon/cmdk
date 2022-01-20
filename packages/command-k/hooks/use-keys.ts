import { CommandKPlugin } from 'command-k';
import Fuse from 'fuse.js';
import { useKeydown } from 'ui';

export default function useKeys({
  index,
  isPluginActive,
  onClose,
  plugins,
  searchResults,
  selectActive,
  setIndex,
}: {
  index: number;
  isPluginActive: boolean;
  onClose: () => void;
  plugins: CommandKPlugin[];
  searchResults: Fuse.FuseResult<CommandKPlugin>[];
  selectActive: () => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  useKeydown(
    {
      isActive: true,
      callback: (e) => {
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
              const activeIndex = getActiveIndex({ index, searchResults });
              const nextRefIndex =
                searchResults[activeIndex - 1]?.refIndex ?? searchResults[searchResults.length - 1]?.refIndex;

              setIndex(nextRefIndex);
            }
            break;
          case 'ArrowDown':
            if (!isPluginActive) {
              const activeIndex = getActiveIndex({ index, searchResults });
              const nextRefIndex = searchResults[activeIndex + 1]?.refIndex ?? searchResults[0]?.refIndex;

              setIndex(nextRefIndex);

              // setIndex((i) => Math.min(plugins.length - 1, i + 1));
            }
            break;
        }
      },
    },
    [isPluginActive, onClose, searchResults, selectActive, setIndex],
  );
}

function getActiveIndex({
  index,
  searchResults,
}: {
  index: number;
  searchResults: Fuse.FuseResult<CommandKPlugin>[];
}) {
  return searchResults.findIndex(({ refIndex }) => refIndex === index);
}
