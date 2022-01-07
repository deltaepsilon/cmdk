import { Flex, Text } from 'ui';

export default function CommandK() {
  return (
    <Flex
      sx={{
        position: 'fixed',
        inset: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black500',
      }}
    >
      <Text>Test this headline text</Text>
      <input placeholder="type your cmd+k here" />
    </Flex>
  );
}
