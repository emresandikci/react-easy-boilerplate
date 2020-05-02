const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const htmlPackPlugin = new HtmlWebPackPlugin({
  template: path.resolve(__dirname, 'src/public/index.html'),
  filename: 'index.html',
  hash: true,
});

module.exports = {
  target: 'web',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src/public'),
    compress: false,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  plugins: [htmlPackPlugin],
};
