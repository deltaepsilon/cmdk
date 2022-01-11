import { useEffect } from 'react';

interface UseKeydownArgs {
  isActive: boolean;
  el?: HTMLElement | HTMLInputElement | null;
  callback: EventListenerOrEventListenerObject;
}

export default function useKeydown({ isActive = true, el, callback }: UseKeydownArgs, memoArray = [] as any) {
  useEffect(() => {
    if (isActive) {
      const target = el || window.document;

      target.addEventListener('keydown', callback);

      return () => target.removeEventListener('keydown', callback);
    }
  }, [isActive, callback, el, ...memoArray]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
