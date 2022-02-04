import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

import { debounce } from 'ui';

type UpdateState<S> = (setState: (state: S) => S) => void;
type InputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;
type InputChangeEvent = ChangeEvent<HTMLInputElement>;

export default function useDebouncedInputState<T>({
  callback,
  onChange,
  millis = 300,
  value: incomingValue,
}: {
  callback: (value: T) => void;
  onChange: (e: InputChangeEvent) => T;
  millis?: number;
  value: T;
}): [T, InputChangeEventHandler, UpdateState<T>] {
  const [value, setValue] = useState<T>(incomingValue);
  const debouncedCallback = useMemo(() => debounce(callback, { millis }), []);
  const changeEventHandler: InputChangeEventHandler = useCallback(
    (e: InputChangeEvent) => {
      const v = onChange(e);

      setValue(v);
      debouncedCallback(v);
    },
    [debouncedCallback, onChange, value],
  );
  const updateState: UpdateState<T> = useCallback(
    (getState) => {
      const v = getState(value);

      setValue(v);
      debouncedCallback(v);
    },
    [value],
  );

  useEffect(() => {
    setValue(incomingValue);
  }, [incomingValue]);

  return [value, changeEventHandler, updateState];
}

export function inputToNumber(e: ChangeEvent<HTMLInputElement>) {
  return +e.target.value;
}
