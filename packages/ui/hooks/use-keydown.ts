import { KeyboardEvent, useCallback, useEffect } from 'react';

interface UseKeydownArgs {
  enableRepeat?: boolean;
  isActive?: boolean;
  el?: HTMLElement | HTMLInputElement | null;
  callback: (e: KeyboardEvent) => void;
}

export default function useKeydown(
  { enableRepeat = false, isActive = true, el, callback }: UseKeydownArgs,
  memoArray = [] as any,
) {
  const localCallback = useCallback((e) => (enableRepeat || !e.repeat) && callback(e), [callback]);

  useEffect(() => {
    if (isActive) {
      const target = el || window.document;

      target.addEventListener('keydown', localCallback as unknown as EventListenerOrEventListenerObject);

      return () =>
        target.removeEventListener('keydown', localCallback as unknown as EventListenerOrEventListenerObject);
    }
  }, [isActive, localCallback, el, ...memoArray]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
