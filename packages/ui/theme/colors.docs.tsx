import { Box, Flex, Grid, Text } from 'ui';
import { dark, light, porshe, shared } from './colors';

import tinycolor from 'tinycolor2';
import { useCallback } from 'react';
import { useColorMode } from 'theme-ui';

const DARK_FLAT = getFlatColors(dark);
const LIGHT_FLAT = getFlatColors(light);
const SHARED_FLAT = getFlatColors(shared);
const PORSHE_FLAT = getFlatColors(porshe);

export default function ColorsDocs() {
  const [mode, setMode] = useColorMode();
  const isDefault = mode === 'default';
  const onClick = useCallback(() => setMode(isDefault ? 'dark' : 'default'), [mode, setMode]);

  return (
    <Grid
      gap={6}
      sx={{ background: 'background', minHeight: '100vh', position: 'relative' }}
      onClick={onClick}
    >
      {isDefault ? (
        <ColorsBlock colors={LIGHT_FLAT} title="Light" />
      ) : (
        <ColorsBlock colors={DARK_FLAT} title="Dark" />
      )}
      <ColorsBlock colors={SHARED_FLAT} title="Shared" />
      <ColorsBlock colors={PORSHE_FLAT} title="Porshe" />
    </Grid>
  );
}

function ColorsBlock({ colors, title }: { colors: string[][]; title: string }) {
  return (
    <Box>
      <Text as="h2" variant="headline1" sx={{ marginBottom: 3 }}>
        {title}
      </Text>
      <Flex
        sx={{
          flexWrap: 'wrap',
          textAlign: 'center',
          fontSize: 0,
          wordBreak: 'break-all',
          justifyContent: ['center', 'center', 'flex-start'],
          div: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '200px',
            height: '150px',
            margin: 1,
          },
          span: {
            display: 'inline-block',
            padding: 2,
            backgroundColor: 'background',
            color: 'primary',
            width: 'calc(100% - 3.5rem)',
          },
        }}
      >
        {colors.map(([name, hex]) => (
          <Flex key={title + name} sx={{ backgroundColor: name }}>
            <span>{name}</span>
            <span>{hex}</span>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}

function getFlatColors(colors: { [key: string]: string }) {
  const colorsText = [...new Set(Object.values(colors))].map((hex) => {
    const isShort = hex.length === 4;

    return isShort ? `${hex}${hex.slice(1)}` : hex;
  });
  const sorted = colorsText.sort((a, b) => (tinycolor(a).toHsv().h > tinycolor(b).toHsv().h ? 1 : -1));

  return Object.keys(colors)
    .map((name) => [name, colors[name]])
    .sort(([aName, aHex], [bName, bHex]) => {
      const aIndex = sorted.findIndex((hex) => hex === aHex);
      const bIndex = sorted.findIndex((hex) => hex === bHex);
      const isSame = aIndex === bIndex;
      const comparison = isSame ? aName > bName : aIndex > bIndex;

      return comparison ? 1 : -1;
    });
}
