import { useEffect, useRef } from 'react';

export default function useSafeEffect(callback: any, memoArray: any[]) {
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    const unmount = callback(isMountedRef);

    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;

      typeof unmount === 'function' && unmount();
    };
  }, memoArray); // eslint-disable-line react-hooks/exhaustive-deps
}
