import { Box, Flex, List, ListItem, ThemeSwitcher } from 'ui';

import { Link } from 'components';

export default function Header() {
  return (
    <Flex
      sx={{
        flexDirection: ['row', 'row', 'column'],
        alignItems: 'center',
        justifyContent: ['space-between', 'space-between', null],
        padding: [2, 3, 4],
        paddingRight: '0 !important',
      }}
    >
      <Link
        href="/"
        sx={{
          alignSelf: 'flex-start',
          flex: [1, 3, 0],
          fontFamily: 'feature',
          fontSize: 3,
          marginLeft: [0, 0, 3],
          padding: [0, 2],
          paddingTop: 0,
          paddingLeft: [0, 0, 2],
          whiteSpace: 'nowrap',
          width: [100, 100, 0],
        }}
      >
        CMD+K
      </Link>

      <List
        sx={{
          alignContent: 'flex-start',
          flex: [2, 2, 1],
          gridTemplateColumns: ['4rem 5rem 4rem', '4rem 5rem 4rem', '1fr', '1fr'],
          gridTemplateRows: 'min-content',
          justifyItems: ['flex-start', 'flex-end', 'flex-start'],
          width: [null, null, '100%'],
        }}
      >
        <HeaderListItem>
          <Link href="/colors" variant="pill-tertiary">
            Colors
          </Link>
        </HeaderListItem>
        <HeaderListItem>
          <Link href="/cmdk-input" variant="pill-tertiary">
            CMDK Input
          </Link>
        </HeaderListItem>
        <HeaderListItem>
          <ThemeSwitcher
            sx={{
              alignSelf: ['flex-start', 'flex-start', null],
              paddingLeft: 0,
              position: 'relative',
              top: '2px',
            }}
          />
        </HeaderListItem>
      </List>
    </Flex>
  );
}

function HeaderListItem({ children }) {
  return (
    <ListItem
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        'a, button': { paddingLeft: [0, 0, 3], marginLeft: [0, 0, 2], whiteSpace: 'nowrap' },
      }}
    >
      {children}
    </ListItem>
  );
}
