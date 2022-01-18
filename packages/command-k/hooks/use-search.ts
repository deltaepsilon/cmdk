import { CommandKPlugin } from 'command-k';
import Fuse from 'fuse.js';
import { useMemo } from 'react';

interface Args {
  query: string;
  plugins: CommandKPlugin[];
}
export default function useSearch({ query, plugins }: Args) {
  const fuse = useMemo(
    () => new Fuse(plugins, { keys: ['id', 'title', 'description'], shouldSort: true }),
    [plugins],
  );

  return useMemo(() => {
    return query
      ? fuse.search(query)
      : (plugins.map((item, index) => ({
          item,
          refIndex: index,
          matches: [],
          score: 1,
        })) as Fuse.FuseResult<CommandKPlugin>[]);
  }, [query, fuse]);
}
