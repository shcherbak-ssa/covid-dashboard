const {join: joinPaths, resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_DIRNAME = joinPaths(__dirname, 'src');

const currentMode = (isDev) => isDev ? 'development' : 'production';
const currentDevtool = (isDev) => isDev ? 'eval-source-map' : false;
const outputPath = (isDev) => isDev ? resolve(__dirname, 'dev') : resolve(__dirname, 'dist');

module.exports = (env = {}) => {
  const isDev = env.isDev || false;

  return {
    mode: currentMode(isDev),
    entry: joinPaths(SRC_DIRNAME, 'index.jsx'),
    output: {
      path: outputPath(isDev),
      filename: '[name].js'
    },
    devtool: currentDevtool(isDev),
    module: {
      rules: [
        {
          test: /\.js|\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 1,
                sourceMap: isDev
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('postcss-short')({ prefix: 'x', skip: 'x' }),
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 1,
                sourceMap: isDev
              }
            },
          ]
        },
        {
          test: /\.(ico|svg)$/,
          loader: 'file-loader',
          options: {
            name: joinPaths('assets', '[name].[ext]'),
          }
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': SRC_DIRNAME,
        '@style-assets': joinPaths(SRC_DIRNAME, 'styles', 'assets.scss'),
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: joinPaths(SRC_DIRNAME, 'index.html'),
        filename: 'index.html',
        inject: false,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ],
  };
};
