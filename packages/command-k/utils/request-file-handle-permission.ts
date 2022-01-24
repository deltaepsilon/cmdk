import { FileSystemHandlePermissionDescriptor } from 'command-k';

export default async function requestFileHandlePermission(
  handle: FileSystemHandle,
  mode: FileSystemHandlePermissionDescriptor = FileSystemHandlePermissionDescriptor.read,
) {
  return handle.requestPermission({ mode });
}
