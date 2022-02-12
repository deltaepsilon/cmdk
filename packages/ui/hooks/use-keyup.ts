import { KeyboardEvent, useEffect } from 'react';

interface UseKeyupArgs {
  isActive?: boolean;
  el?: HTMLElement | HTMLInputElement | null;
  callback: (e: KeyboardEvent) => void;
}

export default function useKeyup({ isActive = true, el, callback }: UseKeyupArgs, memoArray = [] as any) {
  useEffect(() => {
    if (isActive) {
      const target = el || window.document;

      target.addEventListener('keyup', callback as unknown as EventListenerOrEventListenerObject);

      return () =>
        target.removeEventListener('keyup', callback as unknown as EventListenerOrEventListenerObject);
    }
  }, [isActive, callback, el, ...memoArray]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
