// See https://github.com/iykekings/react-swc-loader-template

module.exports = {
  mode: 'development',
  entry: './index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'swc-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
