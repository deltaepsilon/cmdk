import { useCallback, useRef } from 'react';

import { useValue } from 'ui';

export type MountLayer = (pluginId: string) => () => void;
export type UnmountLayer = () => void;

interface Layer {
  pluginId: string;
  mountPoint: HTMLIFrameElement;
  overlayFrame: HTMLIFrameElement;
}

const MOUNT_POINT_ID = 'cmdk-mount-point';

export default function useLayers({
  mountPointWrapper,
  overlayFrameWrapper,
}: {
  mountPointWrapper: HTMLDivElement | null;
  overlayFrameWrapper: HTMLDivElement | null;
}) {
  const iframesMapRef = useRef<{ [key: string]: Layer }>({});
  const getLayer = useCallback((pluginId) => {
    let layer: Layer | undefined = iframesMapRef.current[pluginId];

    if (!layer) {
      layer = {
        pluginId,
        mountPoint: document.createElement('iframe'),
        overlayFrame: document.createElement('iframe'),
      };

      layer.mountPoint.onload = () => layer?.mountPoint.contentWindow?.focus();

      iframesMapRef.current[pluginId] = layer;
    }

    return layer;
  }, []);
  const getMountPoint = useCallback((pluginId): HTMLDivElement | null => {
    const layer = getLayer(pluginId);
    const iframeDocument = layer.mountPoint.contentWindow?.document;

    if (iframeDocument) {
      const mountPoint = iframeDocument.createElement('div');

      mountPoint.setAttribute('id', MOUNT_POINT_ID);

      iframeDocument.body.appendChild(mountPoint);
    } else {
      console.error('iframe must be mounted prior to getting the mount point');
    }

    return (iframeDocument?.getElementById(MOUNT_POINT_ID) as HTMLDivElement) || null;
  }, []);
  const getOverlayFrame = useCallback((pluginId): HTMLDivElement | null => {
    const layer = getLayer(pluginId);
    const iframeDocument = layer.overlayFrame.contentWindow?.document;
    const overlayFrameId = getOverlayFrameId(pluginId);

    if (iframeDocument) {
      const overlayFrame = iframeDocument.createElement('div');

      overlayFrame.setAttribute('id', overlayFrameId);

      iframeDocument.body.appendChild(overlayFrame);
    } else {
      console.error('iframe must be mounted prior to getting the overlay frame');
    }

    return (iframeDocument?.getElementById(overlayFrameId) as HTMLDivElement) || null;
  }, []);
  const mountLayer: MountLayer = useCallback(
    (pluginId: string) => {
      const layer = getLayer(pluginId);

      mountPointWrapper?.appendChild(layer.mountPoint);
      overlayFrameWrapper?.appendChild(layer.overlayFrame);

      return () => {
        mountPointWrapper?.removeChild(layer.mountPoint);
        overlayFrameWrapper?.removeChild(layer.overlayFrame);
      };
    },
    [mountPointWrapper],
  );

  return useValue({ getLayer, getMountPoint, getOverlayFrame, mountLayer });
}

function getOverlayFrameId(pluginId: string) {
  return `cmdk-overlay-frame-${pluginId}`;
}
