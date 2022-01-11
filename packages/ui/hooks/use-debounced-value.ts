/* eslint-disable react-hooks/rules-of-hooks */
import { RefObject, useRef, useState } from 'react';

import useSafeEffect from './use-safe-effect';

export interface Options {
  millis?: number;
  leading?: boolean;
  initializeValue?: boolean;
}

export default function useDebouncedValue(
  value: any,
  { initializeValue = true, leading = false, millis = 300 }: Options = {},
) {
  return leading
    ? useLeadingDebounce(value, { millis })
    : useTrailingDebounce(value, { initializeValue, millis });
}

function useLeadingDebounce(value: any, { millis }: { millis: number }) {
  const blockedRef = useRef<boolean>();
  const [debouncedValue, setDebouncedValue] = useState(value);

  useSafeEffect(
    (isMountedRef: RefObject<boolean>) => {
      if (isMountedRef.current && !blockedRef.current) {
        blockedRef.current = true;

        setDebouncedValue(value);

        setTimeout(() => {
          blockedRef.current = false;
        }, millis);
      }
    },
    [millis, value],
  );

  return debouncedValue;
}

function useTrailingDebounce(value: any, { initializeValue, millis }: Omit<Options, 'leading'>) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  const [debouncedValue, setDebouncedValue] = useState(initializeValue ? value : undefined);

  useSafeEffect(
    (isMountedRef: RefObject<boolean>) => {
      timerRef.current && clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => isMountedRef.current && setDebouncedValue(value), millis);
    },
    [millis, value],
  );

  return debouncedValue;
}
