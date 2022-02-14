import ColorsDocs from 'ui/theme/colors.docs';
import { Flex } from 'ui';

export default function ColorsPage() {
  return (
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
  );
}
