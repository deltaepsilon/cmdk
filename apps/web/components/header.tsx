import { Flex, List, ListItem, ThemeSwitcher } from 'ui';

import { Link } from 'components';

export default function Header() {
  return (
    <Flex
      sx={{
        flexDirection: ['row', 'row', 'column'],
        alignItems: 'center',
        padding: [2, 3, 4],
      }}
    >
      <Link
        href="/"
        sx={{
          alignSelf: 'flex-start',
          fontFamily: 'feature',
          fontSize: 3,
          marginLeft: [0, 0, 3],
          padding: 2,
          paddingTop: 0,
          paddingLeft: [0, 0, 2],
          whiteSpace: 'nowrap',
        }}
      >
        CMD+K
      </Link>
      <List
        sx={{
          gridTemplateColumns: ['repeat(auto-fit, 150px)', 'repeat(auto-fit, 150px)', '1fr', '1fr'],
          width: '100%',
        }}
      >
        <HeaderListItem>
          <Link href="/colors" variant="pill-tertiary">
            Colors
          </Link>
        </HeaderListItem>
      </List>
      <ThemeSwitcher sx={{ alignSelf: ['flex-start', 'flex-start', null] }} />
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
        'a, button': { paddingLeft: 0 },
      }}
    >
      {children}
    </ListItem>
  );
}
