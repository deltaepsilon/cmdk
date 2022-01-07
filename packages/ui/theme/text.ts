import { ThemeUIStyleObject } from 'theme-ui';

const headlineBase: ThemeUIStyleObject = {
  fontFamily: 'feature',
  fontWeight: 'normal',
  letterSpacing: ['-1%', '-1%', '-2%'],
};

const headline1: ThemeUIStyleObject = {
  ...headlineBase,
  fontSize: ['1.5rem', '1.5rem', '3rem'],
  lineHeight: [1.08333, 1.08333, 1.04167],
};

const headline2: ThemeUIStyleObject = {
  ...headlineBase,
  fontSize: ['1.5rem', '1.5rem', '2rem'],
  lineHeight: [1.08333, 1.08333, 1.0625],
};

const headline3: ThemeUIStyleObject = {
  ...headlineBase,
  fontSize: ['1.25rem', '1.25rem', '1.5rem'],
  lineHeight: [1.1, 1.1, 1.08333],
  letterSpacing: '0%',
};

const title: ThemeUIStyleObject = {
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: ['1.125rem', '1.125rem', '1.25rem'],
  lineHeight: [1.111, 1.111, 1.2],
};

const paragraph1: ThemeUIStyleObject = {
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: ['1rem', '1rem', '1.125rem'],
  lineHeight: [1.25, 1.25, 1.3333],
};

const paragraph2: ThemeUIStyleObject = {
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: ['0.875rem', '0.875rem', '1rem'],
  lineHeight: [1.2857, 1.2857, 1.375],
};

const name: ThemeUIStyleObject = {
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: ['0.8125rem', '0.8125rem', '0.875rem'],
  lineHeight: [1.1538, 1.1538, 1.1429],
};

const compact: ThemeUIStyleObject = {
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '0.875rem',
  lineHeight: 'body',
};

const cta: ThemeUIStyleObject = {
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '0.875rem',
  lineHeight: '1rem',
};


export default {
  headline1,
  headline2,
  headline3,
  title,
  paragraph1,
  paragraph2,
  name,
  compact,
  cta,
};
