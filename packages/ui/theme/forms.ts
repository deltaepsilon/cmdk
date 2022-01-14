import { ThemeUICSSObject } from 'theme-ui';

const commonFormElements: ThemeUICSSObject = {
  appearance: 'none',
  borderColor: 'inputBorder',
  borderStyle: 'solid',
  borderWidth: '2px',
  fontFamily: 'body',
  fontSize: 1,
  lineHeight: '1.5',
  paddingX: '2rem',
  paddingY: '0.625rem',
  width: '100%',
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  '&:focus': {
    boxShadow: (theme) => `0px 0px 10px ${theme.colors?.boxShadowFocus}`,
    outline: 'none',
  },
};

const forms = {
  label: {
    fontSize: 1,
    fontWeight: '500',
  },
  input: {
    ...commonFormElements,
    borderRadius: 'sm',
  },
  select: {
    ...commonFormElements,
    borderRadius: 'sm',
  },
  textarea: {
    ...commonFormElements,
    borderRadius: 'sm',
  },
};

export default forms;
