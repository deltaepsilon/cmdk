import { CommandKPlugin } from 'command-k';
import { useKeydown } from 'ui';

export default function useKeys({
  plugins,
  setIndex,
  onClose,
}: {
  plugins: CommandKPlugin[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
}) {
  useKeydown(
    {
      isActive: true,
      callback: (e) => {
        switch (e.code) {
          case 'Escape':
            onClose();
            break;
          case 'ArrowUp':
            setIndex((i) => Math.max(0, i - 1));
            break;
          case 'ArrowDown':
            setIndex((i) => Math.min(plugins.length - 1, i + 1));
            break;
        }
      },
    },
    [setIndex],
  );
}
