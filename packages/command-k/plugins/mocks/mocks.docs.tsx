import { Box, Button, CommandIcon, Grid, List, ListItem, LockIcon, Text, TrashIcon, UploadIcon } from 'ui';
import { StorageProvider, useStorage } from 'command-k';

import { ImageWrapper } from './mocks-overlay';
import { MocksPlugin } from './mocks-plugin';
import OverlaySettings from './overlay-settings';
import { ThemeUIStyleObject } from 'theme-ui';
import useSelectedImage from './use-selected-image';

export default function MocksDocsConnected() {
  return (
    <StorageProvider storageKey="command-k-plugin-docs">
      <MockDocs />
    </StorageProvider>
  );
}

function MockDocs() {
  return (
    <>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <ImageWrapper useStorage={useStorage} />
      </Box>
      <Grid gap="5">
        <Text as="h1" variant="headline1">
          Mocks
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
              <MocksPlugin useStorage={useStorage} />
            </PaneBox>

            <RowText>
              <List variant="ordered">
                <ListItem>Select files to add to your working library.</ListItem>
                <ListItem>Select library files to add an overlay.</ListItem>
                <ListItem>
                  Click <TrashIcon /> to delete the overlay.
                </ListItem>
                <ListItem>
                  Click <TrashIcon /> again to empty the working library.
                </ListItem>
                <ListItem>
                  Click <UploadIcon /> to upload a new working library.
                </ListItem>
              </List>
            </RowText>
          </Row>

          <Row>
            <PaneBox sx={{ padding: 2, '& > div': { height: 'calc(100% + 4rem)' } }}>
              <OverlaySettings useStorage={useStorage} />
            </PaneBox>

            <RowText
              sx={{
                table: {
                  textAlign: 'left',
                  th: { borderBottom: '1px solid', borderColor: 'inputBorder' },
                  'td:first-child': { minWidth: 100 },
                },
              }}
            >
              <table>
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <CommandIcon />
                    </td>
                    <td>Hold for arrow-key and mouse positioning.</td>
                  </tr>
                  <tr>
                    <td>
                      <LockIcon />
                    </td>
                    <td>Pin mock to scroll position.</td>
                  </tr>
                  <tr>
                    <td>
                      <Button variant="pill-tertiary">reset</Button>
                    </td>
                    <td>Reset to defaults.</td>
                  </tr>
                </tbody>
              </table>
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
