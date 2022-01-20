import { useCallback, useRef } from 'react';

import { useValue } from 'ui';

export type MountLayer = (pluginId: string) => () => void;
export type UnmountLayer = () => void;

const MOUNT_POINT_ID = 'cmdk-mount-point';

export default function useLayers({ iframeWrapper }: { iframeWrapper: HTMLDivElement | null }) {
  const iframesMapRef = useRef<{ [key: string]: HTMLIFrameElement }>({});
  const getLayer = useCallback((pluginId) => {
    let iframe = iframesMapRef.current[pluginId];

    if (!iframe) {
      iframe = document.createElement('iframe');

      iframe.onload = () => iframe.contentWindow?.focus();

      iframesMapRef.current[pluginId] = iframe;
    }

    return iframe;
  }, []);
  const getMountPoint = useCallback((pluginId): HTMLDivElement | null => {
    const iframe = getLayer(pluginId);
    const iframeDocument = iframe.contentWindow?.document;

    if (iframeDocument) {
      const mountPoint = iframeDocument.createElement('div');

      mountPoint.setAttribute('id', MOUNT_POINT_ID);

      iframeDocument.body.appendChild(mountPoint);
    } else {
      console.error('iframe must be mounted prior to getting the mount point');
    }

    return (iframeDocument?.getElementById(MOUNT_POINT_ID) as HTMLDivElement) || null;
  }, []);
  const mountLayer: MountLayer = useCallback(
    (pluginId: string) => {
      const layer = getLayer(pluginId);

      iframeWrapper?.appendChild(layer);

      return () => iframeWrapper?.removeChild(layer);
    },
    [iframeWrapper],
  );

  return useValue({ getLayer, getMountPoint, mountLayer });
}
