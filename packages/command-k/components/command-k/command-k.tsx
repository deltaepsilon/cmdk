import { Box, CmdkThemeProvider, Modal, NOOP } from 'ui';
import { ForwardedRef, KeyboardEvent, ReactNode, useCallback, useRef, useState } from 'react';

import CommandKInput from './command-k-input';
import OverlayWrapper from './overlay-wrapper';
import { UseStorage } from 'command-k/providers/storage-provider';

export type WrappedStorageProvider = ({ children }: { children: ReactNode }) => JSX.Element;

export type MountContext = {
  mountPoint: HTMLDivElement;
  overlayContainer: HTMLDivElement;
  setColorMode: React.Dispatch<React.SetStateAction<string>>;
  StorageProvider: WrappedStorageProvider;
  PaneThemeProvider: typeof CmdkThemeProvider;
  OverlayThemeProvider: typeof CmdkThemeProvider;
  unmountOverlay: () => void;
  useStorage: UseStorage;
};

export type Mount = (context: MountContext) => void;
export type Unmount = (context: MountContext) => void;

export interface CommandKPlugin {
  id: string;
  title: string;
  description: string;
  url: string;
  version: string;
  mount: Mount;
  unmount: Unmount;
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
  const overlayWrapperRef = useRef<HTMLDivElement>(null);
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
      <OverlayWrapper ref={overlayWrapperRef} />
      <Modal
        dismissOnEscape={!isInputActive}
        isActive={isActive}
        keyboardTrigger={keyboardTrigger}
        modalId={`cmdk-${id}`}
        onRender={onRender}
        startOpen={startOpen}
      >
        <CommandKInput
          id={id}
          isActive={isActive}
          onIsActiveChanged={setIsInputActive}
          overlayWrapperRef={overlayWrapperRef}
          plugins={plugins}
        />
      </Modal>
    </>
  );
}

function keyboardTrigger(e: KeyboardEvent) {
  return e.ctrlKey && e.code === 'KeyK';
}
