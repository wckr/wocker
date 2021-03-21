const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts'],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
