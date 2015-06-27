/* jshint node: true */
var path = require('path');
var webpack = require('webpack');


module.exports = {
  context: path.join(__dirname),
  entry: './lib/index.js',

  output: {
    path: 'build',
    publicPath: 'build/',
    filename: 'phonegap-upload.js'
  },

  externals: {
   'react': 'var React'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery": "jquery"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'FILE_SERVICE_URL': JSON.stringify(process.env.FILE_SERVICE_URL || 'http://192.168.0.8:8084/')
      }
    }),
    new webpack.IgnorePlugin(/vertx/),
  ],

  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&'
        + 'includePaths[]=' + (path.resolve(__dirname, './bower_components'))
        + '&'
        + 'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'imports?_=lodash&$=jquery!jsx?harmony!babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: "file-loader"
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
};
