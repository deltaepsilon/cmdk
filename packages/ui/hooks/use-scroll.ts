import { SyntheticEvent, useCallback, useEffect, useState } from 'react';

interface Scroll {
  scrollTop: number;
  scrollLeft: number;
}

interface UseScrollArgs {
  isActive?: boolean;
}

const DEFAULT_SCROLL: Scroll = { scrollLeft: 0, scrollTop: 0 };

export default function useScroll({ isActive = true }: UseScrollArgs, memoArray = [] as any): Scroll {
  const [scroll, setScroll] = useState<Scroll>(DEFAULT_SCROLL);
  const callback = useCallback(() => {
    const { scrollLeft, scrollTop } = document.scrollingElement || DEFAULT_SCROLL;

    setScroll({ scrollLeft, scrollTop });
  }, []);

  useEffect(() => {
    if (isActive) {
      const target = window.document;

      target.addEventListener('scroll', callback as unknown as EventListenerOrEventListenerObject);

      return () =>
        target.removeEventListener('scroll', callback as unknown as EventListenerOrEventListenerObject);
    }
  }, [isActive, callback, ...memoArray]); // eslint-disable-line react-hooks/exhaustive-deps

  return isActive ? scroll : DEFAULT_SCROLL;
}
