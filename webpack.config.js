const fs = require('fs')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')

module.exports = function (config, env) {
  config.module.loaders[0].exclude.push(/\.ejs$/)
  config.module.noParse = /node_modules\/localforage\/dist\/localforage.js/
  if (env === 'production') {
    config.output.filename = '[name].[chunkhash].js'
    config.output.chunkFilename = '[chunkhash].async.js'
    config.plugins[3] = new ExtractTextPlugin('[contenthash:20].css')
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!src/index.ejs',
        inject: true,
        minify: { collapseWhitespace: true },
        production: true,
      }),
      new WebpackChunkHash({ algorithm: 'md5' }),
    )
  } else {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!src/index.ejs',
        inject: true,
      }),
    )
  }
  return config
}