import { useCallback, useEffect, useState } from 'react';

import localforage from 'localforage';
import produce from 'immer';
import { useValue } from 'ui';

interface PluginData {
  isUnloaded?: boolean;
  [key: string]: any;
}

export type UseStorage = () => PluginStorage;

export interface PluginStorage {
  data: PluginData;
  clear: () => Promise<void>;
  get: () => Promise<PluginData>;
  set: (data: PluginData) => Promise<void>;
  update: (key: string, data: any) => Promise<void>;
}

const INITIAL_DATA = { isUnloaded: true } as PluginData;
const DEFAULT_DATA = { isUnloaded: false } as PluginData;

export default function getUseStorage(pluginId: string) {
  const key = getKey(pluginId);

  return function useStorage(): PluginStorage {
    const [pluginData, setPluginData] = useState<PluginData>(INITIAL_DATA);
    const get = useCallback(async () => {
      const data = ((await localforage.getItem(key)) as PluginData | undefined) || DEFAULT_DATA;

      console.log('get', data);

      setPluginData(data);

      return data;
    }, []);
    const set = useCallback(async (data: PluginData) => {
      await localforage.setItem(key, data);

      setPluginData(data || DEFAULT_DATA);
    }, []);
    const clear = useCallback(async () => {
      await localforage.removeItem(key);

      await get();
    }, [get]);
    const update = useCallback(async (key: string, data: any) => {
      const existing = await get();
      const updated = produce(existing, (draft) => {
        draft[key] = data;
      });

      set(updated);
    }, []);

    useEffect(() => {
      get();
    }, []);

    return useValue({ data: pluginData, clear, get, set, update });
  };
}

function getKey(pluginId: string) {
  return `command-k-${pluginId}`;
}
