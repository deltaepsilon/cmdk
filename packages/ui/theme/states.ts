import { Theme } from 'theme-ui';

export const transition = // eslint-disable-next-line no-multi-str
  'color .15s ease-in-out, \
background-color .15s ease-in-out, \
border-color .15s ease-in-out, \
box-shadow .15s ease-in-out';

const shadows = {
  active: '0px 0.25rem 0.5rem rgba(0, 0, 0, 0.25)',
  hover: '0px 0.5rem 1rem rgba(0, 0, 0, 0.25)',
};

export const focus = (theme: Theme) => `0 0 0 0.25rem ${theme.colors?.focus}`;

export const shadowStates = {
  '&:focus': {
    outline: 'none',
  },
  '&:not([disabled]):not(.disabled)': {
    // FOCUS
    '&:focus': {
      boxShadow: focus,
    },
    '&:focus:not(:focus-visible)': {
      boxShadow: 'none',
      outline: 'none',
    },
    '&:focus-visible': {
      boxShadow: focus,
      outline: 'none',
    },
    // HOVER
    '&:hover': {
      boxShadow: 'hover',
      "&[data-hover='imageZoom'] img": {
        transform: 'scale(1.1)',
      },
    },
    '&:hover:focus': {
      boxShadow: (theme: Theme) => `${focus(theme)}, ${shadows.hover}`,
    },
    '&:hover:focus:not(:focus-visible)': {
      boxShadow: 'none',
    },
    '&:hover:focus-visible': {
      boxShadow: (theme: Theme) => `${focus(theme)}, ${shadows.hover}`,
    },
    // ACTIVE
    '&:active': {
      boxShadow: (theme: Theme) => `${focus(theme)}, ${shadows.active}`,
    },
    '&:active:focus': {
      boxShadow: (theme: Theme) => `${focus(theme)}, ${shadows.active}`,
    },
    '&:active:focus:not(:focus-visible)': {
      boxShadow: 'none',
    },
    '&:active:focus-visible': {
      boxShadow: (theme: Theme) => `${focus(theme)}, ${shadows.active}`,
    },
  },
};
