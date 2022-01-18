import { useCallback, useRef } from 'react';

import { useValue } from 'ui';

export type MountLayer = (pluginId: string) => () => void;
export type UnmountLayer = () => void;

export default function useLayers({ iframeWrapper }: { iframeWrapper: HTMLDivElement | null }) {
  const iframesMapRef = useRef<{ [key: string]: HTMLIFrameElement }>({});
  const getLayer = useCallback((pluginId) => {
    if (!iframesMapRef.current[pluginId]) {
      iframesMapRef.current[pluginId] = document.createElement('iframe');
    }

    return iframesMapRef.current[pluginId];
  }, []);
  const mountLayer: MountLayer = useCallback(
    (pluginId: string) => {
      const layer = getLayer(pluginId);

      iframeWrapper?.appendChild(layer);

      console.log({ iframeWrapper });

      return () => iframeWrapper?.removeChild(layer);
    },
    [iframeWrapper],
  );

  return useValue({ getLayer, mountLayer });
}
