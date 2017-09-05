const webpack = require('webpack');
const path = require('path');
const configPort = require('../src/config').port;

const publicPath = path.join(__dirname, '../public');
const sourcePath = path.join(__dirname, '../src');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: '../src/index.html',
    path: publicPath,
    filename: 'index.html'
  })
];

module.exports = {
  devtool: 'inline-source-map',
  context: sourcePath,
  entry: {
    app: '../src/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'redux-form',
      'react-redux',
    ]
  },
  output: {
    path: publicPath,
    publicPath: '/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      sourcePath
    ]
  },
  stats: {
    colors: {
      green: '\u001b[32m'
    }
  },
  devServer: {
    contentBase: '../src',
    publicPath: '/',
    historyApiFallback: true,
    port: configPort,
    compress: false,
    inline: true,
    hot: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: true,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  },
  plugins
};
