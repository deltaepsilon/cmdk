import { useRef, useCallback, useEffect } from 'react';

interface Args {
  isActive: boolean;
}

type CursorPosition = [number, number];

export default function useCursorPosition({ isActive }: Args) {
  const positionRef = useRef<CursorPosition>([0, 0]);
  const onMouseMove = useCallback((e) => {
    positionRef.current = [e.clientX, e.clientY];
  }, []);

  useEffect(() => {
    if (isActive) {
      window.addEventListener('mousemove', onMouseMove);

      return () => window.removeEventListener('mousemove', onMouseMove);
    }
  }, [isActive]);

  return positionRef;
}
