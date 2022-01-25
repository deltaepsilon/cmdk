import { NOOP, useValue } from 'ui';
import { createContext, useCallback, useContext, useState } from 'react';

interface FlagProviderValue {
  flag: boolean;
  setFlag: (flag: boolean) => void;
  toggle: () => void;
}

export const FlagContext = createContext<FlagProviderValue>({
  flag: false,
  setFlag: NOOP,
  toggle: NOOP,
});

export default function FlagProvider({
  children,
  initialValue = false,
}: {
  children: React.ReactNode;
  initialValue?: boolean;
}) {
  const [flag, setFlag] = useState<boolean>(initialValue);
  const toggle = useCallback(() => setFlag((f) => !f), [setFlag]);

  const value = useValue({ flag, setFlag, toggle });

  return <FlagContext.Provider value={value}>{children}</FlagContext.Provider>;
}

export function useContextFlag() {
  return useContext(FlagContext);
}
