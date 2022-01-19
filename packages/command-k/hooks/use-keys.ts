import { CommandKPlugin } from 'command-k';
import { useKeydown } from 'ui';

export default function useKeys({
  isPluginActive,
  plugins,
  selectActive,
  setIndex,
  onClose,
}: {
  isPluginActive: boolean;
  plugins: CommandKPlugin[];
  selectActive: () => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
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
            !isPluginActive && setIndex((i) => Math.max(0, i - 1));
            break;
          case 'ArrowDown':
            !isPluginActive && setIndex((i) => Math.min(plugins.length - 1, i + 1));
            break;
        }
      },
    },
    [isPluginActive, onClose, selectActive, setIndex],
  );
}
