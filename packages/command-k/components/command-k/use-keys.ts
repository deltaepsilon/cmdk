import { CommandKPlugin } from './command-k';
import { useKeydown } from 'ui';

export default function useKeys({
  plugins,
  setIndex,
}: {
  plugins: CommandKPlugin[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  useKeydown(
    {
      isActive: true,
      callback: (e) => {
        switch (e.code) {
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
