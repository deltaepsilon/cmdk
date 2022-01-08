const withTM = require('next-transpile-modules')(['command-k', 'ui']);

module.exports = withTM({
  reactStrictMode: true,
});
