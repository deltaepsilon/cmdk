import { CommandKPlugin } from './command-k.d';
import { Input } from 'ui';

interface Props {
  plugins: CommandKPlugin[];
}

export default function CommandKInput({ plugins }: Props) {
  console.log({ plugins });
  return <Input autoFocus placeholder="type your cmd+k here" />;
}
