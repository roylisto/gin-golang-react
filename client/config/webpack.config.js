require('dotenv').config({path: `${__dirname}/../.env`});

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const root = path.resolve(__dirname);
const mode = process.env.APP_ENV === 'development' ? 'development' : 'production';
const webpack = require('webpack');

const plugins = [
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: [
      `${root}/../../dist`,
    ],
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
  }),
  new HtmlWebpackPlugin({
    inject: true,
    template: `${root}/../../client/public/index.html`,
    minify: {
      html5: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: false,
      removeComments: true,
    },
  }),
  new LiveReloadPlugin({
    appendScriptTag: mode === 'development' ? true : false,
    port: 0,
  }),
  new webpack.DefinePlugin({
    'process.env.APPLICATION_SERVER': JSON.stringify(process.env.APPLICATION_SERVER),
    'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
  }),
];

module.exports = {
  mode,
  entry: ['@babel/polyfill', `${root}/../../client/src/index.js`],
  output: {
    path: `${root}/../../dist`,
    publicPath: '/',
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          }
        }
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true
            }
          }],
        }
      })
    ]
  },
  plugins,
};
