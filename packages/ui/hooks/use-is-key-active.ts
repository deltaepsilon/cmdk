import { useCallback, useState } from 'react';

import useKeydown from './use-keydown';
import useKeyup from './use-keyup';

interface Args {
  isActive?: boolean;
  keys: Set<string>;
}

export default function useIsKeyActive({ isActive = true, keys }: Args) {
  const [isKeyActive, setIsKeyActive] = useState(false);
  const onKeydown = useCallback((e) => {
    if (keys.has(e.code)) {
      setIsKeyActive(true);
    }
  }, []);
  const onKeyup = useCallback((e) => {
    if (keys.has(e.code)) {
      setIsKeyActive(false);
    }
  }, []);

  useKeydown({ isActive, callback: onKeydown });
  useKeyup({ isActive, callback: onKeyup });

  return isKeyActive;
}
