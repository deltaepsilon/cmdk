import React, { SyntheticEvent, useCallback, useState } from 'react';
import { constants, stopClick, useDebouncedValue, useKeydown, useValue } from 'ui';

import { Options as DebounceOptions } from './use-debounced-value';

export interface ModalState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpen: () => void;
  onDismiss: (event?: SyntheticEvent) => void;
  toggle: (event?: SyntheticEvent) => void;
}

export interface Args {
  debounceOptions?: DebounceOptions;
  startOpen?: boolean;
  dismissOnEscape?: boolean;
}

export default function useModalState(
  { debounceOptions = { millis: 0 }, dismissOnEscape = false, startOpen = false }: Args = {
    startOpen: false,
    dismissOnEscape: false,
  },
): ModalState {
  const [rawIsOpen, setIsOpen] = useState(startOpen);
  const [scrollPosition, setScrollPosition] = useState<number | null>(null);
  const isOpen = useDebouncedValue(rawIsOpen, debounceOptions);
  const onOpen = useCallback(() => {
    if (!constants.IS_SERVER) {
      setScrollPosition(window.pageYOffset);
    }

    setIsOpen(true);
  }, [setIsOpen]);
  const onDismiss = useCallback(
    (e?: SyntheticEvent) => {
      stopClick(e);
      setIsOpen(false);

      if (!constants.IS_SERVER && scrollPosition !== null) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);

          setScrollPosition(null);
        }, 200);
      }
    },
    [scrollPosition, setIsOpen],
  );
  const toggle = useCallback(
    (e) => {
      stopClick(e);

      rawIsOpen ? onDismiss() : onOpen();
    },
    [onDismiss, onOpen, rawIsOpen],
  );
  const onKeydown = useCallback(
    (e) => {
      switch (e.key) {
        case 'Escape':
          return onDismiss();
      }
    },
    [onDismiss],
  );

  useKeydown({ isActive: isOpen && dismissOnEscape, callback: onKeydown });

  return useValue({ isOpen, setIsOpen, onDismiss, onOpen, toggle });
}
