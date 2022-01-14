import { ButtonHTMLAttributes, FormEvent, MouseEvent, Ref, SyntheticEvent, forwardRef } from 'react';
import { Button as ThemeUIButton, ThemeUIStyleObject } from 'theme-ui';

import { ButtonVariant } from 'ui';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e?: FormEvent<HTMLFormElement> | MouseEvent | SyntheticEvent | undefined) => void;
  variant?: ButtonVariant;
  sx?: ThemeUIStyleObject;
}

const Button = forwardRef(
  ({ sx, type = 'button', variant = 'pill-primary', ...rest }: ButtonProps, ref: Ref<HTMLButtonElement>) => (
    <ThemeUIButton
      ref={ref}
      type={type}
      sx={{
        variant: `buttons.${variant}`,
        ...sx,
      }}
      {...rest}
    />
  ),
);

export default Button;
