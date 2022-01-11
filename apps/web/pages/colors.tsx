import { Box, Grid, Flex, Text, Button, KittyThemeProvider } from 'ui';
import ColorsDocs from 'ui/theme/colors.docs';
import { CommandK } from 'command-k';

export default function ColorsPage() {
  return (
    <>
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          backgroundColor: 'gray200',
        }}
      >
        <ColorsDocs />
      </Flex>

      <CommandK />
    </>
  );
}