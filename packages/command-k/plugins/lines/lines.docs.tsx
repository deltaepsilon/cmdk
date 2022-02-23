import {
  Box,
  Flex,
  ArrowUpIcon,
  Keycap,
  CommandIcon,
  Grid,
  List,
  ListItem,
  Text,
  TrashIcon,
  UploadIcon,
} from 'ui';
import { StorageProvider, useStorage } from 'command-k';
import { LinesOverlay } from './lines-overlay';

import { LinesPlugin } from './lines-plugin';
import { ThemeUIStyleObject } from 'theme-ui';
import useLinesSettings from './use-lines-settings';

export default function LinesDocsConnected() {
  return (
    <StorageProvider storageKey="command-k-plugin-docs">
      <MockDocs />
    </StorageProvider>
  );
}

function MockDocs() {
  const { settings } = useLinesSettings({ useStorage });
  return (
    <>
      {settings.isActive && (
        <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 'Overlay' }}>
          <LinesOverlay useStorage={useStorage} />
        </Box>
      )}
      <Grid gap="5">
        <Text as="h1" variant="headline1">
          Lines
        </Text>

        <Grid
          gap="5"
          sx={{
            '[data-overlay-settings], [data-overlay-controls]': { height: '100%' },
            '[data-overlay-controls] > div:first-of-type': { marginBottom: 3 },
          }}
        >
          <Row>
            <PaneBox
              sx={{
                '& > div': {
                  height: 'calc(100% + 4rem)',
                },
              }}
            >
              <LinesPlugin useStorage={useStorage} />
            </PaneBox>

            <RowText>
              <List
                variant="ordered"
                sx={{
                  '[data-keycap]': {
                    marginX: 1,
                    svg: {
                      position: 'relative',
                      top: '1px',
                    },
                  },
                }}
              >
                <ListItem>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text>Hold</Text>
                    <Keycap>
                      <CommandIcon />
                    </Keycap>
                    <Text>and</Text>
                    <Keycap>
                      <ArrowUpIcon />
                    </Keycap>
                    <Text>to generate gridlines.</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text>Deselect all with &nbsp;</Text>
                    <Keycap variant="action" sx={{ marginLeft: '0px !important' }}>
                      <CommandIcon />
                    </Keycap>
                    <Keycap>
                      <ArrowUpIcon />
                    </Keycap>
                    <Keycap variant="action">Esc</Keycap>
                  </Flex>
                </ListItem>
              </List>
            </RowText>
          </Row>
        </Grid>
      </Grid>
    </>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <Grid gap="5" columns={['1fr', '1fr', '1fr', '400px 1fr']}>
      {children}
    </Grid>
  );
}

function PaneBox({ children, sx = {} }: { children: React.ReactNode; sx?: ThemeUIStyleObject }) {
  return (
    <Box
      sx={{
        width: 400,
        height: 300,
        position: 'relative',
        backgroundColor: 'light300',
        border: '1px solid',
        borderColor: 'light700',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function RowText({ children, sx = {} }: { children: React.ReactNode; sx?: ThemeUIStyleObject }) {
  return (
    <Box variant="padded" sx={{ svg: { marginX: 2, position: 'relative', top: '3px' }, ...sx }}>
      {children}
    </Box>
  );
}
