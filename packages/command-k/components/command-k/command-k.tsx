import { ForwardedRef, KeyboardEvent, useCallback, useState } from 'react';
import { Modal, NOOP } from 'ui';

import CommandKInput from './command-k-input';
import { CommandKPlugin } from './command-k.d';

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
      modalId={`cmdk-${id}`}
      isActive={isActive}
      keyboardTrigger={keyboardTrigger}
      onRender={onRender}
      startOpen={startOpen}
    >
      <CommandKInput plugins={plugins} />
    </Modal>
  );
}

function keyboardTrigger(e: KeyboardEvent) {
  return e.ctrlKey && e.code === 'KeyK';
}
