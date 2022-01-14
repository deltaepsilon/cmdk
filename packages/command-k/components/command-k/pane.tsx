import { useCallback, useEffect, useState } from 'react';

import { CommandKPlugin } from './command-k';
import { Grid } from 'ui';
import SearchResult from './search-result';
import useKeys from './use-keys';
import useSearch from './use-search';

interface Props {
  plugins: CommandKPlugin[];
  query: string;
}

export default function Pane({ plugins, query }: Props) {
  const [index, setIndex] = useState(0);
  const getOnClick = useCallback((i) => () => setIndex(i), []);
  const searchResults = useSearch({ query, plugins });

  useEffect(() => {
    setIndex(0);
  }, [query]);

  useKeys({ plugins, setIndex });

  return (
    <Grid gap={0}>
      {searchResults.map((result, i) => (
        <SearchResult
          key={result.item.id}
          selected={index === i}
          plugin={result.item}
          onClick={getOnClick(i)}
        />
      ))}
    </Grid>
  );
}
