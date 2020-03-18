const { resolve } = require('path')
const config = require('../config')

const { name, packages = [] } = config()

const externals = [
  {
    name: 'react',
    root: 'React',
    amd: 'react',
  },
  {
    name: 'react-dom',
    root: 'ReactDOM',
    amd: 'react-dom',
  },
  {
    name: 'react-router-dom',
    root: 'ReactRouterDOM',
    amd: 'react-router-dom',
  },
  {
    name: 'nycticorax',
    root: 'nycticorax',
    amd: 'nycticorax',
  },
]
const env = process.env.NODE_ENV

let entry = {}
let mode = 'development'

if (env === 'PRE') {
  mode = 'production'
  entry = {
    devtools: resolve(__dirname, './devtools.js'),
    global: resolve(__dirname, './global.js'),
  }
}

if (env === 'DEV' || env === 'BUILD') {
  entry = {
    entry: resolve(__dirname, '../index.js'),
  }
}

if (env === 'BUILD') {
  mode = 'production'
}

module.exports = {
  mode,
  injectScript: false,
  contentBase: resolve(__dirname, '../'),
  entry,
  output: {
    library: '[name]',
    libraryTarget: 'amd',
    libraryExport: 'default',
  },
  targets: { esmodules: true },
  externals,
}
