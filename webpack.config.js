const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const os = require('os');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const jsonminify = require('jsonminify');

const getLocalExternalIP = () =>
  []
    .concat(...Object.values(os.networkInterfaces()))
    .filter((details) => details.family === 'IPv4' && !details.internal)
    .pop().address;

const PORT = 1992;

module.exports = (env, { mode, mobile }) => {
  const isProduction = mode === 'production' || process.env.NODE_ENV === 'production';

  if (mobile) {
    devServer.host = getLocalExternalIP();
  }
  return {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'reb-es-[contenthash].js?v=[fullhash]',
      chunkFilename: 'reb-es-[name].js?v=[fullhash]',
      publicPath: '/',
    },
    mode,
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
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
          resolve: {
            extensions: ['.js', '.jsx'],
          },
        },
        {
          test: /\.(png|jpg|svg)$/i,
          loader: 'file-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'src/public/index.html'),
      }),
      new Dotenv({
        systemvars: true,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/public',
            globOptions: { ignore: ['**/*.svg', '**/*.html'] },
            transform: function (fileContent, path) {
              let pattJSON = /\.json$/gi; // filter json file and minimize
              if (pattJSON.test(path)) {
                return jsonminify(fileContent.toString());
              }
              return fileContent;
            },
          },
        ],
      }),
    ],
    devtool: isProduction ? false : 'source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true,
      port: PORT,
      compress: true, // gzip compression
      https: false,
      overlay: true,
    },
  };
};
