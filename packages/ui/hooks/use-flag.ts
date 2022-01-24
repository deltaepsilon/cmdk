import { useCallback, useState } from 'react';
export default function useFlag(initialValue: boolean = false) {
  const [flag, setFlag] = useState<boolean>(initialValue);
  const toggle = useCallback(() => setFlag((f) => !f), []);

  return { flag, setFlag, toggle };
}
