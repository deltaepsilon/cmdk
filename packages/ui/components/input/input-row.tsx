import { Flex, Input, InputProps, Label } from 'theme-ui';

interface Props extends InputProps {
  label: string;
}

export default function InputRow({ label, sx = {}, ...props }: Props) {
  return (
    <Flex sx={{ alignItems: 'center', ...sx }}>
      <Label>{label}</Label>
      <Input {...props} />
    </Flex>
  );
}
