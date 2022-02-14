import { Box, Button, ChevronsDownIcon, ChevronsUpIcon, XIcon, useValue } from 'ui';
import { useCallback, useState } from 'react';

import { MountContext } from 'command-k';
import OverlayControls from './overlay-controls';
import useSelectedImage from './use-selected-image';

enum Position {
  top = 'top',
  bottom = 'bottom',
}

const CONTROLS_POSITION_KEY = 'controls-position';

export default function FloatingControls({
  useStorage,
  unmount,
}: {
  useStorage: MountContext['useStorage'];
  unmount: () => void;
}) {
  const { isTop, togglePosition } = useControlsPosition({ useStorage });
  const { clear: clearImage } = useSelectedImage({ useStorage });

  return (
    <Box
      sx={{
        position: 'fixed',
        top: isTop ? 0 : null,
        bottom: isTop ? null : 0,
        right: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'auto',

        backgroundColor: 'background',
        padding: 2,
      }}
    >
      <OverlayControls
        useStorage={useStorage}
        sx={{
          flexDirection: 'row',
          gridTemplateColumns: '3rem 1fr 1fr 1fr',
          '& [data-input-row]': { width: '9rem' },
          '[data-overlay-buttons]': { alignItems: 'center', marginLeft: 3 },
          '[data-reset-button]': { justifyContent: 'flex-start', paddingLeft: 0 },
        }}
      >
        <Button variant="pill-tertiary" onClick={togglePosition}>
          {isTop ? <ChevronsDownIcon /> : <ChevronsUpIcon />}
        </Button>
        <Button
          variant="pill-tertiary"
          onClick={() => {
            clearImage();
            unmount();
          }}
        >
          <XIcon />
        </Button>
      </OverlayControls>
    </Box>
  );
}

function useControlsPosition({ useStorage }: { useStorage: MountContext['useStorage'] }) {
  const { data, update } = useStorage();
  const position = data[CONTROLS_POSITION_KEY] || Position.bottom;
  const isTop = position === Position.top;
  const togglePosition = useCallback(
    () => update(CONTROLS_POSITION_KEY, isTop ? Position.bottom : Position.top),
    [update, isTop],
  );

  return useValue({ isTop, togglePosition });
}
