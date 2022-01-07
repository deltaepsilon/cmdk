import React from 'react';
import { Flex } from 'components/Flex';
import colors from './colors';
import tinycolor from 'tinycolor2';

const COLORS = [...new Set(Object.values(colors))].map((hex) => {
  const isShort = hex.length === 4;

  return isShort ? `${hex}${hex.slice(1)}` : hex;
});
const SORTED_COLORS = COLORS.sort((a, b) =>
  tinycolor(a).toHsv().h > tinycolor(b).toHsv().h ? 1 : -1
);
const COLORS_FLAT = Object.keys(colors)
  .map((name) => [name, colors[name]])
  .sort(([aName, aHex], [bName, bHex]) => {
    const aIndex = SORTED_COLORS.findIndex((hex) => hex === aHex);
    const bIndex = SORTED_COLORS.findIndex((hex) => hex === bHex);
    const isSame = aIndex === bIndex;
    const comparison = isSame ? aName > bName : aIndex > bIndex;

    return comparison ? 1 : -1;
  });

export default function ColorsDocs() {
  return (
    <Flex
      sx={{
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 0,
        wordBreak: 'break-all',
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
      {COLORS_FLAT.map(([name, hex]) => (
        <Flex key='name' sx={{ backgroundColor: name }}>
          <span>{name}</span>
          <span>{hex}</span>
        </Flex>
      ))}
    </Flex>
  );
}
