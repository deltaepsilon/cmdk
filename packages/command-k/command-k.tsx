import { NOOP, Box, Flex, Text } from 'ui';
import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';

interface Props {
  onRender?: (ref: ForwardedRef<HTMLDivElement>) => void;
}

export default function CommandK({ onRender = NOOP }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onRender(ref);
  }, []);

  return (
    <Flex
      ref={ref}
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
