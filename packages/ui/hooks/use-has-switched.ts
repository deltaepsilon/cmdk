import { useEffect, useRef, useState } from 'react';

export default function useHasSwitched(flag: boolean, targetValue: boolean = true): boolean {
  const laggedValueRef = useRef<boolean | null>(null);
  const [hasSwitched, setHasSwitched] = useState(false);

  useEffect(() => {
    const hasChanged = laggedValueRef.current !== null;
    const hasChangedToTarget = hasChanged && flag === targetValue;

    if (hasChangedToTarget) {
      setHasSwitched(true);
    }

    laggedValueRef.current = flag;
  }, [flag]);

  return hasSwitched;
}
