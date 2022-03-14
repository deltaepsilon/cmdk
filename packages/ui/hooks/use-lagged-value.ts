import { useEffect, useState } from 'react';

export default function useLaggedValue<T>(startValue: T, value: T) {
  const [values, setValues] = useState<T[]>([startValue]);

  useEffect(() => {
    setValues((values) => [values[values.length - 1], value]);
  }, [value]);

  return values[0];
}
