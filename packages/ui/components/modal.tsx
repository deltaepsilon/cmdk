import { Box, Flex, Input, NOOP, Text, stopPropagation, useKeydown, useModalState } from 'ui';
import { ForwardedRef, KeyboardEvent, forwardRef, useCallback, useEffect, useRef } from 'react';

import { ThemeUIStyleObject } from 'theme-ui';

interface Props {
  children: React.ReactNode;
  isActive?: boolean;
  keyboardTrigger?: (e: KeyboardEvent) => boolean;
  modalId?: string;
  onRender?: (ref: ForwardedRef<HTMLDivElement>) => void;
  startOpen?: boolean;
  sx?: ThemeUIStyleObject;
}

export default function Modal({
  children,
  isActive = true,
  keyboardTrigger = () => false,
  modalId = '',
  onRender = NOOP,
  startOpen = false,
  sx = {},
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen, toggle } = useModalState({ startOpen });
  const keydownCallback: EventListener = useCallback(
    (e) => {
      const keyboardEvent = e as unknown as KeyboardEvent;
      switch (true) {
        case keyboardEvent.code === 'Escape':
          setIsOpen(false);
          break;

        case keyboardTrigger(keyboardEvent):
          keyboardEvent.preventDefault();
          setIsOpen(true);
          break;
      }
    },
    [keyboardTrigger, setIsOpen],
  );

  useKeydown({ isActive: isActive, callback: keydownCallback }, [setIsOpen]);

  useEffect(() => {
    onRender(ref);
  }, []);

  return (
    <Flex
      data-is-active={isActive}
      data-modal-id={modalId}
      ref={ref}
      sx={{
        display: isOpen ? null : 'none !important',
        position: 'fixed',
        inset: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'modalScrim',
        ...sx,
      }}
      onClick={toggle}
    >
      <Box onClick={stopPropagation}>{children}</Box>
    </Flex>
  );
}
