import { NOOP, Box, Input, Flex, Text, useKeydown, useModalState, stopPropagation } from 'ui';
import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useRef } from 'react';

interface Props {
  isActive?: boolean;
  onRender?: (ref: ForwardedRef<HTMLDivElement>) => void;
  startOpen?: boolean;
}

export default function CommandK({ isActive = true, onRender = NOOP, startOpen = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen, toggle } = useModalState({ startOpen });

  useKeydown(
    {
      isActive,
      callback: (e: KeyboardEvent) => {
        switch (true) {
          case e.code === 'Escape':
            setIsOpen(false);
            break;

          case e.ctrlKey && e.code === 'KeyK':
            e.preventDefault();
            setIsOpen(true);
            break;

          default:
            break;
        }
      },
    },
    [setIsOpen],
  );

  useEffect(() => {
    onRender(ref);
  }, []);

  return isOpen ? (
    <Flex
      ref={ref}
      sx={{
        position: 'fixed',
        inset: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'modalScrim',
      }}
      onClick={toggle}
    >
      <Box onClick={stopPropagation}>
        <Text>Test this headline text</Text>
        <Input autoFocus placeholder="type your cmd+k here" />
      </Box>
    </Flex>
  ) : null;
}
