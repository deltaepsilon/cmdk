const IS_SERVER = typeof window === 'undefined';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export { IS_SERVER, IS_DEVELOPMENT, IS_PRODUCTION };
