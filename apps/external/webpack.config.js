const path = require('path');
// See https://github.com/iykekings/react-swc-loader-template

const config = {
  mode: 'development',
  entry: './index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'swc-loader',
        include: [
          path.resolve(__dirname),
          path.resolve(__dirname, '../../packages/command-k'),
          path.resolve(__dirname, '../../packages/ui'),
        ],
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
