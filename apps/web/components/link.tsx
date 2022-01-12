import { AnchorHTMLAttributes, Ref, forwardRef } from 'react';
import { ButtonVariant, Link as ThemeUILink } from 'ui';

import NextLink from 'next/link';
import { ThemeUIStyleObject } from 'theme-ui';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: Boolean;
  sx?: ThemeUIStyleObject;
  variant?: ButtonVariant;
}

const Link = forwardRef(
  ({ disabled = false, href = '', sx, variant, ...rest }: LinkProps, ref: Ref<HTMLAnchorElement>) => {
    return (
      <NextLink href={href}>
        <ThemeUILink
          sx={{
            variant: `buttons.${variant}`,
            pointerEvents: disabled ? 'none' : 'auto',
            ...sx,
          }}
          {...rest}
        />
      </NextLink>
    );
  },
);

Link.displayName = 'Link';

export default Link;
