const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const htmlPackPlugin = new HtmlWebPackPlugin({
  template: path.resolve(__dirname, 'src/public/index.html'),
  filename: 'index.html',
  hash: true,
});

const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: 'src/public',
      globOptions: {
        dot: true,
        ignore: ['svg/*', '*.html'],
      },
    },
  ],
});

module.exports = (environments, { mobile, mode }) => {
  const isProduction = mode === 'production' || process.env.NODE_ENV === 'production';

  const PORT = 3000;

  let devServer = {
    contentBase: path.resolve(__dirname, 'src/public'),
    compress: false,
    port: PORT,
    historyApiFallback: true,
    overlay: true,
    // https: true,
    hot: true,
  };

  return {
    target: 'web',
    mode: isProduction ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      filename: 'adc-[name].js?v=[hash]',
      chunkFilename: 'adc-[name].js?v=[hash]',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: true,
          extractComments: false,
          exclude: /\/node_modules/,
          terserOptions: {
            ecma: 5,
            compress: isProduction,
            mangle: true,
            output: {
              comments: false,
            },
            safari10: true,
          },
        }),
      ],
    },
    devServer,
    devtool: !isProduction && 'source-map',
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
    plugins: [htmlPackPlugin, copyWebpackPlugin],
    cache: isProduction,
  };
};
