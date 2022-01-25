import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';

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

export const StorageContext = createContext<PluginStorage>({
  data: INITIAL_DATA,
  clear: async () => {},
  get: async () => INITIAL_DATA,
  set: async () => {},
  update: async () => {},
});

export default function StorageProvider({
  children,
  storageKey,
}: {
  children: ReactNode;
  storageKey: string;
}) {
  const [pluginData, setPluginData] = useState<PluginData>(INITIAL_DATA);
  const get = useCallback(async () => {
    const data = ((await localforage.getItem(storageKey)) as PluginData | undefined) || DEFAULT_DATA;

    setPluginData(data);

    return data;
  }, []);
  const set = useCallback(async (data: PluginData) => {
    await localforage.setItem(storageKey, data);

    setPluginData(data || DEFAULT_DATA);
  }, []);
  const clear = useCallback(async () => {
    await localforage.removeItem(storageKey);

    await get();
  }, [get]);
  const update = useCallback(async (key: string, data: any) => {
    const existing = await get();
    const updated = produce(existing, (draft) => {
      draft[key] = data;
    });

    set(updated);
  }, []);
  const value = useValue({ data: pluginData, clear, get, set, update });

  useEffect(() => {
    get();
  }, []);

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}
