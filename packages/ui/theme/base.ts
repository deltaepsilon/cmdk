import { ThemeUIStyleObject } from 'theme-ui';

const breakpoints = ['40rem', '49rem', '64rem', '80rem'];

const fonts = {
  body: '"Modern Era", sans-serif',
  heading: '"GT Flexa", sans-serif',
  feature: '"GT Flexa", sans-serif',
};

const fontSizes = [
  '0.875rem',
  '1rem',
  '1.25rem',
  '1.5rem',
  '1.875rem',
  '2.25rem',
  '3rem',
  '4rem',
  '4.5rem',
];

const fontWeights = {
  body: 400,
  heading: 500,
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

const lineHeights = {
  compressed: 1.25,
  body: 1.625,
  compactHeading: 1.04,
  heading: 1.25,
};

const radii = {
  none: '0',
  sm: '0.125rem',
  default: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '1rem',
  xxl: '1.25rem',
  full: '9999px',
};

const shadows = {
  active: '0px 0.25rem 0.5rem rgba(0, 0, 0, 0.25)',
  hover: '0px 0.5rem 1rem rgba(0, 0, 0, 0.25)',
};

const sizes = {
  16: '1rem',
  30: '1.875rem',
  32: '2rem',
  48: '3rem',
  60: '3.75rem',
  120: '7.5rem',
  240: '15rem',
  modal: '40rem',
  drawer: '46rem',
  container: '80rem',
  gridContainer: '86rem',
};

const space = [0, '0.25rem', '0.5rem', '1rem', '2rem', '4rem', '8rem', '16rem', '32rem'];

const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  marginBottom: 1,
  marginTop: 0,
};

const hiddenScroll: ThemeUIStyleObject = {
  msOverflowStyle: 'none' as any,
  scrollbarWidth: 'none' as any,
  '::-webkit-scrollbar': {
    display: 'none',
  },
};

const styles = {
  root: {
    color: 'primary',
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body',
    '*:focus': {
      outlineColor: 'focus',
    },
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  h1: {
    ...heading,
    fontSize: 6,
    mt: 2,
  },
  h2: {
    ...heading,
    fontSize: 5,
    mt: 2,
  },
  h3: {
    ...heading,
    fontSize: 4,
    mt: 3,
  },
  h4: {
    ...heading,
    fontSize: 3,
  },
  h5: {
    ...heading,
    fontSize: 2,
  },
  h6: {
    ...heading,
    fontSize: 1,
    mb: 2,
  },
  feature: {
    fontFamily: 'feature',
    fontWeight: 'medium',
  },
  code: {},
  pre: {},
  hr: {
    bg: 'gray100',
    border: 0,
    height: '1px',
    marginY: 3,
  },
  hiddenScroll,
  sideScroll: {
    ...hiddenScroll,
    columnGap: 3,
    justifyContent: 'space-between',
    overflowX: 'scroll',
  } as ThemeUIStyleObject,
};

const base = {
  breakpoints,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  shadows,
  sizes,
  space,
  styles,
};

export default base;
