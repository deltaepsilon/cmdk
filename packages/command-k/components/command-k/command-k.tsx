import { CmdkThemeProvider, Modal, NOOP } from 'ui';
import { ForwardedRef, KeyboardEvent, useCallback, useState } from 'react';

import CommandKInput from './command-k-input';
import { ThemeProviderProps } from '@emotion/react';
import { UseStorage } from 'utils';

export type Mount = (
  mountPoint: HTMLDivElement,
  context: {
    setColorMode: React.Dispatch<React.SetStateAction<string>>;
    theme: ThemeProviderProps['theme'];
    ThemeProvider: typeof CmdkThemeProvider;
    useStorage: UseStorage;
  },
) => void;

export interface CommandKPlugin {
  id: string;
  title: string;
  description: string;
  url: string;
  version: string;
  mount: Mount;
  unmount: () => void;
}

interface Props {
  id: string;
  onRender?: (ref: ForwardedRef<HTMLDivElement>) => void;
  plugins: CommandKPlugin[];
  startOpen?: boolean;
}

export default function CommandK({
  id,
  onRender: parentOnRender = NOOP,
  plugins = [],
  startOpen = false,
}: Props) {
  const [isActive, setIsActive] = useState(false);
  const [isInputActive, setIsInputActive] = useState(true);
  const onRender = useCallback(
    (ref) => {
      const modals = document.querySelectorAll('[data-modal-id^="cmdk"]');
      const isRedundant = modals[0] !== ref.current;

      if (!isRedundant) {
        console.info(`Active modal: ${id}`);
        setIsActive(true);
      } else {
        console.info(`Failed to activate CMD+K: ${id}. Duplicate found:`, modals[0]);
      }

      parentOnRender(ref);
    },
    [id, parentOnRender],
  );

  return (
    <Modal
      dismissOnEscape={!isInputActive}
      isActive={isActive}
      keyboardTrigger={keyboardTrigger}
      modalId={`cmdk-${id}`}
      onRender={onRender}
      startOpen={startOpen}
    >
      <CommandKInput id={id} isActive={isActive} onIsActiveChanged={setIsInputActive} plugins={plugins} />
    </Modal>
  );
}

function keyboardTrigger(e: KeyboardEvent) {
  return e.ctrlKey && e.code === 'KeyK';
}
