// https://www.exoticcarcolors.com/car-companies/porsche
export const porshe = {
  acidGreen: '#cbe800',
  gentianBlueMetallic: '#09203f',
  jadeGreen: '#00bc96',
  lavaOrange: '#ff2600',
  miamiBlue: '#00b5c8',
  pastelBlue: '#a0d8fb',
  rubystoneRed: '#f3037e',
};

export const shared = {
  danger: porshe.lavaOrange,
  divider: '#e0e0e0',
  focus: porshe.miamiBlue,

  success: porshe.jadeGreen,
};

export const light = {
  primary: '#000',
  secondary: porshe.rubystoneRed,
  background: '#fff',
  inputBorder: porshe.gentianBlueMetallic,
  modalScrim: 'rgba(0, 0, 0, 0.4)',
  boxShadowFocus: porshe.rubystoneRed,
  selected: porshe.pastelBlue,
  hover: 'rgba(0, 0, 0, 0.05)',
  dark000: 'rgba(0, 0, 0, 0)',
  dark100: 'rgba(0, 0, 0, 0.1)',
  dark200: 'rgba(0, 0, 0, 0.2)',
  dark300: 'rgba(0, 0, 0, 0.3)',
  dark400: 'rgba(0, 0, 0, 0.4)',
  dark500: 'rgba(0, 0, 0, 0.5)',
  dark600: 'rgba(0, 0, 0, 0.6)',
  dark700: 'rgba(0, 0, 0, 0.7)',
  light000: 'rgba(255, 255, 255, 0)',
  light100: 'rgba(255, 255, 255, 0.1)',
  light200: 'rgba(255, 255, 255, 0.2)',
  light300: 'rgba(255, 255, 255, 0.3)',
  light400: 'rgba(255, 255, 255, 0.4)',
  light500: 'rgba(255, 255, 255, 0.5)',
  light600: 'rgba(255, 255, 255, 0.6)',
  light700: 'rgba(255, 255, 255, 0.7)',
};

export const dark = {
  primary: '#eee',
  secondary: porshe.acidGreen,
  background: '#222',
  inputBorder: '#fff',
  modalScrim: 'rgba(255, 255, 255, 0.4)',
  boxShadowFocus: porshe.acidGreen,
  selected: porshe.gentianBlueMetallic,
  hover: 'rgba(255, 255, 255, 0.3)',
  dark000: 'rgba(255, 255, 255, 0)',
  dark100: 'rgba(255, 255, 255, 0.1)',
  dark200: 'rgba(255, 255, 255, 0.2)',
  dark300: 'rgba(255, 255, 255, 0.3)',
  dark400: 'rgba(255, 255, 255, 0.4)',
  dark500: 'rgba(255, 255, 255, 0.5)',
  dark600: 'rgba(255, 255, 255, 0.6)',
  dark700: 'rgba(255, 255, 255, 0.7)',
  light000: 'rgba(0, 0, 0, 0)',
  light100: 'rgba(0, 0, 0, 0.1)',
  light200: 'rgba(0, 0, 0, 0.2)',
  light300: 'rgba(0, 0, 0, 0.3)',
  light400: 'rgba(0, 0, 0, 0.4)',
  light500: 'rgba(0, 0, 0, 0.5)',
  light600: 'rgba(0, 0, 0, 0.6)',
  light700: 'rgba(0, 0, 0, 0.7)',
};

const colors = {
  ...shared,
  ...light,
  ...porshe,
  modes: {
    dark,
  },
};

export default colors;
