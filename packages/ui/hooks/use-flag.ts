import { useCallback, useState } from 'react';
export default function useFlag(
  initialValue: boolean = false,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>, () => void] {
  const [flag, setFlag] = useState<boolean>(initialValue);
  const toggle = useCallback(() => setFlag((f) => !f), []);

  return [flag, setFlag, toggle];
}
