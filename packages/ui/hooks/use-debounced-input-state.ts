import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

import { debounce } from 'ui';

export default function useDebouncedState<T>({
  callback,
  onChange,
  millis = 300,
  value: incomingValue,
}: {
  callback: (value: T) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => T;
  millis?: number;
  value: T;
}): [T, ChangeEventHandler<HTMLInputElement>] {
  const [value, setValue] = useState<T>(incomingValue);
  const debouncedCallback = useMemo(() => debounce(callback, { millis }), []);
  const changeEventHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const v = onChange(e);

      setValue(v);
      debouncedCallback(v);
    },
    [debouncedCallback, onChange, millis],
  );

  useEffect(() => {
    setValue(incomingValue);
  }, [incomingValue]);

  return [value, changeEventHandler];
}
