const { resolve } = require('path');

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
  {
    name: 'antd',
    root: 'antd',
    amd: 'antd',
  },
]

module.exports = {
  injectScript: false,
  entry: {
    index: resolve(__dirname, './index.js'),
    global: resolve(__dirname, './global/index.js'),
  },
  output: {
    library: 'entry',
    libraryTarget: 'amd',
    libraryExport: 'default',
  },
  targets: { esmodules: true },
  externals,
}
