export interface CommandKPlugin {
  id: string;
  name: string;
  description: string;
  version: string;
  main: () => void;
}