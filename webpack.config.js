'use strict';

var path = require('path');
var webpack = require('webpack');
var nodeEnv = process.env.NODE_ENV || 'development';
var isProduction = nodeEnv === 'production';
var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = function(env) {
  /*
    Set up Babel transpiling
  */
  var rules = [
    {
      test: /\.js?$/,
      include: [path.resolve('src')],
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-react'),
            ],
          },
        },
      ],
    },
  ];

  return {
    performance: {
      hints: isProduction ? 'warning' : false,
    },
    entry: {
      /*
        The client is our main entrypoint
      */
      main: path.resolve('src', 'client', 'index.js'),
      /*
        We include common libraries in its own file to avoid
        downloading again
      */
      common: ['preact', 'firebase'],
    },
    output: {
      path: path.resolve('public'),
      filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
      chunkFilename: isProduction ? '[chunkhash].js' : '[id].js',
      publicPath: '/',
    },
    module: {
      rules: rules,
    },
    /*
      The dev server needs to proxy all other requests not hitting
      the client javascript files to your express server
    */
    devServer: {
      port: 3000,
      proxy: {
        '/': 'http://localhost:3001',
      },
      hot: false,
      inline: false,
    },
    /*
      The service worker plugin creates a service worker automatically for you
    */
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: path.resolve('src', 'serviceworker', 'index.js'),
      }),
    ].concat(
      isProduction
        ? [
            /*
              In production we use the hashed filename strategy to bust caches of javascript
              file and also the serviceworker (as its contents will change)
            */
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
              names: ['common', 'manifest'],
            }),
            new webpack.optimize.UglifyJsPlugin({
              beautify: false,
              comments: false,
              compress: {
                warnings: false,
                drop_console: true,
              },
              mangle: {
                except: ['webpackJsonp'],
                screw_ie8: true,
              },
            }),
          ]
        : [
            new webpack.optimize.CommonsChunkPlugin({
              names: ['common'],
            }),
          ]
    ),
  };
};
