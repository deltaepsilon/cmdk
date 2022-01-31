import { useCallback, useEffect, useRef } from 'react';

import useValue from './use-value';

interface Listener {
  event: string;
  callback: any;
}

export default function useEventBus() {
  const listeners = useRef<Listener[]>([]);

  const dispatch = useCallback((event, data = {}) => {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  }, []);
  const remove = useCallback((event, callback) => {
    document.removeEventListener(event, callback);
  }, []);
  const on = useCallback(
    (event, callback) => {
      listeners.current.push({ event, callback });

      document.addEventListener(event, callback);

      return () => remove(event, callback);
    },
    [remove],
  );

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      listeners.current.forEach(({ event, callback }) => remove(event, callback));

      listeners.current = [];
    };
  }, [remove]);

  return useValue({ dispatch, on, remove });
}
