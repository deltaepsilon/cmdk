export const transition = // eslint-disable-next-line no-multi-str
  'color .15s ease-in-out, \
background-color .15s ease-in-out, \
border-color .15s ease-in-out, \
box-shadow .15s ease-in-out';

export const focus = (theme) => `0 0 0 0.25rem ${theme.colors.focus}`;

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
      boxShadow: (theme) => `${focus(theme)}, ${theme.shadows.hover}`,
    },
    '&:hover:focus:not(:focus-visible)': {
      boxShadow: 'none',
    },
    '&:hover:focus-visible': {
      boxShadow: (theme) => `${focus(theme)}, ${theme.shadows.hover}`,
    },
    // ACTIVE
    '&:active': {
      boxShadow: 'active',
    },
    '&:active:focus': {
      boxShadow: (theme) => `${focus(theme)}, ${theme.shadows.active}`,
    },
    '&:active:focus:not(:focus-visible)': {
      boxShadow: 'none',
    },
    '&:active:focus-visible': {
      boxShadow: (theme) => `${focus(theme)}, ${theme.shadows.active}`,
    },
  },
};
