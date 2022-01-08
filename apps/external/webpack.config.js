const path = require('path');
const withTM = require('next-transpile-modules')(['command-k', 'ui']);
// See https://github.com/iykekings/react-swc-loader-template
const config = {
  mode: 'development',
  entry: './index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'swc-loader',
        // include: [
        //   path.resolve(__dirname, './index.tsx'),
        //   path.resolve(__dirname, '../../packages/command-k'),
        // ],
        // exclude: /node_modules/,
      },
    ],
  },
};
// const { webpack } = withTM();
// const webpackResult = webpack();

// console.log({ webpack, webpackResult });

console.log(JSON.stringify(config, null, 2));

module.exports = config;
