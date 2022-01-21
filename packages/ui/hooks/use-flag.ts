import { useState } from 'react';
export default function useFlag(initialValue: boolean = false) {
  const [flag, setFlag] = useState<boolean>(initialValue);

  return { flag, setFlag };
}
