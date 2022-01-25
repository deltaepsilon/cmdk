import { CmdkThemeProvider, Modal, NOOP } from 'ui';
import { ForwardedRef, KeyboardEvent, ReactNode, useCallback, useState } from 'react';
import StorageProvider, { UseStorage } from 'command-k/providers/storage-provider';

import CommandKInput from './command-k-input';
import { ThemeProviderProps } from '@emotion/react';

export type WrappedStorageProvider = ({ children }: { children: ReactNode }) => JSX.Element;

export type MountContext = {
  mountPoint: HTMLDivElement;
  overlayFrame: HTMLDivElement;
  setColorMode: React.Dispatch<React.SetStateAction<string>>;
  StorageProvider: WrappedStorageProvider;
  theme: ThemeProviderProps['theme'];
  ThemeProvider: typeof CmdkThemeProvider;
  useStorage: UseStorage;
};

export type Mount = (context: MountContext) => void;

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
    <>
      <div data-cmdk />
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
    </>
  );
}

function keyboardTrigger(e: KeyboardEvent) {
  return e.ctrlKey && e.code === 'KeyK';
}
