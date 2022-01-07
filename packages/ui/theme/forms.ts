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
    boxShadow: (theme) => `0 0 0 3px ${theme.colors?.focus}`,
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
    borderRadius: '6.25rem',
  },
  select: {
    ...commonFormElements,
    borderRadius: '6.25rem',
  },
  textarea: {
    ...commonFormElements,
    borderRadius: '1.5rem',
  },
};

export default forms;
