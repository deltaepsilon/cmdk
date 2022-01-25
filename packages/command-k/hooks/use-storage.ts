import { StorageContext } from 'command-k/providers/storage-provider';
import { useContext } from 'react';

export default function useStorage() {
  return useContext(StorageContext);
}
