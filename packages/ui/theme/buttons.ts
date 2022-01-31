import { ThemeUICSSObject, ThemeUIStyleObject } from 'theme-ui';
import { focus, shadowStates, transition } from './states';

const pillStyles: ThemeUICSSObject = {
  appearance: 'none',
  borderRadius: 'lg',
  cursor: 'pointer',
  display: 'inline-flex',
  fontFamily: 'body',
  fontSize: '0.875rem',
  justifyContent: 'center',
  lineHeight: '1.5rem',
  margin: 0,
  minWidth: 0,
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition,
};

const circleStyles: ThemeUICSSObject = {
  appearance: 'none',
  backgroundColor: 'background',
  borderColor: 'inputBorder',
  borderRadius: '50%',
  borderStyle: 'solid',
  borderWidth: '2px',
  cursor: 'pointer',
  display: 'inline-block',
  fontSize: '1rem',
  lineHeight: '0.5rem',
  margin: 0,
  minWidth: 0,
  padding: '0.625rem',
  transition,
};

const primaryVariant = {
  borderStyle: 'solid',
  borderWidth: '2px',
  backgroundColor: 'primary',
  borderColor: 'primary',
  color: 'background',
  '&:disabled, &.disabled': {
    cursor: 'not-allowed',
    opacity: 0.25,
  },
};

const secondaryVariant = {
  backgroundColor: 'background',
  borderColor: 'inputBorder',
  borderStyle: 'solid',
  borderWidth: '2px',
  color: 'gray600',
  '&:disabled, &.disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
};

const tertiaryVariant = {
  backgroundColor: 'background',
  borderRadius: 'sm',
  color: 'primary',
  height: 'fit-content',
  width: 'fit-content',
  fontWeight: 'medium',
  padding: 0,
  '&:disabled, &.disabled, &[data-state="inactive"]': {
    cursor: 'not-allowed',
    opacity: 0.5,
    textDecoration: 'none !important',
  },
  '&:focus': {
    outline: 'none',
  },
  '&:focus:not(.disabled)': {
    boxShadow: focus,
  },
  '&:focus:not(:focus-visible):not(.disabled)': {
    boxShadow: 'none',
    outline: 'none',
  },
  '&:focus-visible:not(.disabled), &[data-state="focus"]': {
    boxShadow: focus,
    outline: 'none',
    textDecoration: 'underline',
  },
  '&:hover:not([disabled]):not(.disabled), &[data-state="hover"]': {
    textDecoration: 'underline',
  },
  '&:active:not([disabled]):not(.disabled), &[data-state="active"]': {
    textDecoration: 'underline',
  },
};

const specialVariant = {
  background: 'linear-gradient(90deg, #e8c0aa 0%, #E2E2E2 100%)',
  border: 'none',
  color: 'gray600',
  '&:disabled, &.disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
};

const reverseSpecialVariant = {
  background:
    'linear-gradient(270deg, #CC8058 -1.71%, rgba(204, 128, 88, 0.32) -1.7%, rgba(204, 128, 88, 0) 100%);',
  border: 'none',
  color: 'gray600',
  '&:disabled, &.disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
};

const tertiaryColorfulVariant = {
  backgroundColor: 'tertiary50',
  border: '2px solid',
  borderColor: 'tertiary200',
  '&:disabled, &.disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
};

const mediumVariant = {
  borderRadius: 'full',
  fontSize: '1rem',
  fontWeight: 500,
  padding: '0.5rem',
};

const xlVariant = {
  borderRadius: 'full',
  fontSize: '0.75rem',
  paddingY: '1.125rem',
  paddingX: '4.75rem',
};

const inlineVariant: ThemeUICSSObject = {
  appearance: 'none',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: 'sm',
  color: 'inherit',
  cursor: 'pointer',
  display: 'inline-flex',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  padding: 0,
  textDecoration: 'none',
  transition,
  '&:disabled, &.disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  '&:focus': {
    outline: 'none',
  },
  '&:focus:not(.disabled)': {
    boxShadow: focus,
  },
  '&:focus:not(:focus-visible):not(.disabled)': {
    boxShadow: 'none',
    outline: 'none',
  },
  '&:focus-visible:not(.disabled)': {
    boxShadow: focus,
    outline: 'none',
  },
  '&:active:not([disabled]):not(.disabled)': {
    color: 'gray500',
  },
};

const ctaVariant = {
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',
};

export const variants: { [key: string]: ThemeUIStyleObject } = {
  'pill-primary': {
    ...pillStyles,
    ...primaryVariant,
    ...shadowStates,
    paddingY: '0.625rem',
    paddingX: '2rem',
  },
  'pill-primary-medium': {
    ...pillStyles,
    ...primaryVariant,
    ...mediumVariant,
    ...shadowStates,
  },
  'pill-primary-xl': {
    ...pillStyles,
    ...primaryVariant,
    ...xlVariant,
    ...shadowStates,
  },
  'pill-secondary': {
    ...pillStyles,
    ...secondaryVariant,
    ...shadowStates,
    paddingY: '0.625rem',
    paddingX: '2rem',
  },
  'pill-secondary-xl': {
    ...pillStyles,
    ...secondaryVariant,
    ...xlVariant,
    ...shadowStates,
  },
  // @ts-ignore
  'pill-tertiary': {
    ...pillStyles,
    ...tertiaryVariant,
  },
  'pill-tertiary-xl': {
    ...pillStyles,
    ...secondaryVariant,
    ...xlVariant,
    ...shadowStates,
  },
  'pill-special': {
    ...pillStyles,
    ...specialVariant,
    ...shadowStates,
    paddingY: '0.75rem',
    paddingX: '2.125rem',
  },
  'pill-reverse-special': {
    ...pillStyles,
    ...reverseSpecialVariant,
    ...shadowStates,
    paddingY: '0.75rem',
    paddingX: '2.125rem',
  },
  'pill-tertiary-colorful': {
    ...pillStyles,
    ...tertiaryColorfulVariant,
    ...shadowStates,
    paddingY: '0.75rem',
    paddingX: '2.125rem',
  },
  'pill-special-xl': {
    ...pillStyles,
    ...secondaryVariant,
    ...xlVariant,
    ...shadowStates,
  },
  'pill-cta': {
    ...pillStyles,
    ...primaryVariant,
    ...shadowStates,
    ...ctaVariant,
    alignItems: 'center',
    backgroundColor: 'pillCTA',
    border: 'none',
    color: 'primary',
    fontWeight: 'medium',
    paddingX: '2rem',
    paddingY: '0.625rem',
  },
  'pill-borderless': {
    ...pillStyles,
    ...secondaryVariant,
    ...shadowStates,
    paddingY: '0.625rem',
    paddingX: '2rem',
    border: 'none',
    fontWeight: 'medium',
  },
  'circle-primary': {
    ...circleStyles,
    ...primaryVariant,
    ...shadowStates,
  },
  'circle-secondary': {
    ...circleStyles,
    ...secondaryVariant,
    ...shadowStates,
  },
  // @ts-ignore
  'circle-tertiary': {
    ...circleStyles,
    ...tertiaryVariant,
    border: 'none',
    background: 'none',
  },
  'circle-cta': {
    ...circleStyles,
    ...primaryVariant,
    ...shadowStates,
    ...ctaVariant,
    backgroundColor: 'pillCTA',
    border: 'none',
    color: 'primary',
  },
  'circle-secondary-small': {
    ...circleStyles,
    ...secondaryVariant,
    ...shadowStates,
    padding: '9px',
    svg: {
      width: '18px',
      height: '18px',
    },
  },
  inline: {
    ...inlineVariant,
  },
};

export { variants as buttons };
export { variants as links };

export type ButtonVariant =
  | 'pill-primary'
  | 'pill-primary-medium'
  | 'pill-primary-xl'
  | 'pill-secondary'
  | 'pill-secondary-xl'
  | 'pill-tertiary'
  | 'pill-tertiary-colorful'
  | 'pill-tertiary-xl'
  | 'pill-reverse-special'
  | 'pill-special'
  | 'pill-special-xl'
  | 'pill-cta'
  | 'pill-borderless'
  | 'circle-primary'
  | 'circle-secondary'
  | 'circle-secondary-small'
  | 'circle-tertiary'
  | 'circle-cta'
  | 'inline';
