import { useCallback, useRef } from 'react';

import { useValue } from 'ui';

export type MountLayer = (pluginId: string) => () => void;
export type UnmountLayer = () => void;

interface Layer {
  pluginId: string;
  mountPoint: HTMLIFrameElement;
  overlayContainer: HTMLDivElement;
}

const MOUNT_POINT_ID = 'cmdk-mount-point';

export default function useLayers({
  mountPointWrapper,
  overlayWrapper,
}: {
  mountPointWrapper: HTMLDivElement | null;
  overlayWrapper: HTMLDivElement | null;
}) {
  const layersMapRef = useRef<{ [key: string]: Layer }>({});
  const getLayer = useCallback((pluginId) => {
    let layer: Layer | undefined = layersMapRef.current[pluginId];

    if (!layer) {
      layer = {
        pluginId,
        mountPoint: document.createElement('iframe'),
        overlayContainer: document.createElement('div'),
      };

      layer.overlayContainer.id = getOverlayId(pluginId);

      layer.mountPoint.onload = () => layer?.mountPoint.contentWindow?.focus();

      layersMapRef.current[pluginId] = layer;
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
  const getOverlayContainer = useCallback((pluginId): HTMLDivElement | null => {
    const layer = getLayer(pluginId);

    return layer.overlayContainer;
  }, []);
  const getUnmountOverlay = useCallback(
    (layer: Layer) => () => {
      layer.overlayContainer.childNodes.forEach((child) => {
        layer.overlayContainer.removeChild(child);
      });
      overlayWrapper?.removeChild(layer.overlayContainer);
    },
    [],
  );
  const mountLayer: MountLayer = useCallback(
    (pluginId: string) => {
      const layer = getLayer(pluginId);

      mountPointWrapper?.appendChild(layer.mountPoint);
      overlayWrapper?.appendChild(layer.overlayContainer);

      return () => {
        mountPointWrapper?.removeChild(layer.mountPoint);
      };
    },
    [mountPointWrapper],
  );

  return useValue({ getLayer, getMountPoint, getOverlayContainer, getUnmountOverlay, mountLayer });
}

function getOverlayId(pluginId: string) {
  return `cmdk-overlay-${pluginId}`;
}
