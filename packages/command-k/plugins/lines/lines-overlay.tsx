import { Box, Image, Text, useDebouncedInputState, useDrag, useScroll } from 'ui';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { MountContext } from 'command-k';
import ReactDOM from 'react-dom';
import useLinesSettings from './use-lines-settings';

export default function LinesOverlayPortal(context: MountContext) {
  const { overlayContainer, useStorage, unmountOverlay } = context;
  const { settings } = useLinesSettings({ useStorage });
  const unmount = useCallback(async () => {
    // setTimeout(unmountOverlay, 1000);
  }, []);

  useEffect(() => {
    overlayContainer.innerHTML = '';
  }, []);

  return settings.isActive
    ? ReactDOM.createPortal(<LinesOverlay unmount={unmount} useStorage={useStorage} />, overlayContainer)
    : null;
}

function LinesOverlay({
  unmount,
  useStorage,
}: {
  unmount: () => void;
  useStorage: MountContext['useStorage'];
}) {
  useEffect(() => unmount, [unmount]);

  return <Text>Lines Overlay</Text>;
}
