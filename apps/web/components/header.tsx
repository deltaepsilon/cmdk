import { Box, Button, Flex, List, ListItem, Menu, MenuIcon, MenuPosition, Text, ThemeSwitcher } from 'ui';

import { Link } from 'components';
import { useResponsiveValue } from '@theme-ui/match-media';

export default function Header() {
  const isHorizontal = useResponsiveValue([true, true, false]);
  const isMobile = useResponsiveValue([true, false]);

  return (
    <Flex
      sx={{
        flexDirection: isHorizontal ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: isHorizontal ? 'space-between' : null,
        padding: [2, 3, 4],
        paddingRight: '0 !important',
      }}
    >
      <Link
        href="/"
        sx={{
          alignSelf: 'flex-start',
          flex: [1, 2, 0],
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
          flex: isHorizontal ? null : 1,
          gridTemplateColumns: isHorizontal ? '2rem 2rem' : '1fr',
          gridTemplateRows: 'min-content',
          justifyItems: ['center', 'center', 'flex-start'],
          width: isHorizontal ? null : '100%',
          paddingRight: 3,
        }}
      >
        {!isHorizontal && (
          <>
            <HeaderListItem>
              <Link href="/cmdk-input" variant="pill-tertiary">
                CMDK Input
              </Link>
            </HeaderListItem>

            <HeaderListItem>
              <Link href="/colors" variant="pill-tertiary">
                Colors
              </Link>
            </HeaderListItem>
          </>
        )}

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
        <HeaderListItem>
          {isHorizontal ? (
            <Menu
              position={MenuPosition.BottomLeft}
              trigger={
                <Button variant="circle-tertiary">
                  <MenuIcon />
                </Button>
              }
            >
              <List sx={{ width: 100 }}>
                <ListItem>
                  <Link href="/cmdk-input" variant="pill-tertiary">
                    CMDK Input
                  </Link>
                </ListItem>

                <ListItem>
                  <Link href="/colors" variant="pill-tertiary">
                    Colors
                  </Link>
                </ListItem>

                <ListItem>
                  <Link href="/mocks" variant="pill-tertiary">
                    Mocks
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/lines" variant="pill-tertiary">
                    Lines
                  </Link>
                </ListItem>
              </List>
            </Menu>
          ) : (
            <Box sx={{ paddingLeft: 2, paddingTop: 5 }}>
              <Text as="div" variant="title" sx={{ paddingLeft: 3, marginBottom: 3 }}>
                PLUGINS
              </Text>
              <List>
                <HeaderListItem>
                  <Link href="/mocks" variant="pill-tertiary">
                    Mocks
                  </Link>
                </HeaderListItem>
                <HeaderListItem>
                  <Link href="/lines" variant="pill-tertiary">
                    Lines
                  </Link>
                </HeaderListItem>
              </List>
            </Box>
          )}
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
