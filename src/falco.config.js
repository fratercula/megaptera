const { join, resolve } = require('path')

const defaultExternals = [
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
    name: 'react-json-tree',
    root: 'ReactJsonTree',
    amd: 'react-json-tree',
  },
  {
    name: 're-resizable',
    root: 'reResizable',
    amd: 're-resizable',
  },
]

module.exports = (mode, entry, externals, port) => ({
  template: join(process.cwd(), 'index.html'),
  context: resolve(__dirname, '../'),
  mode,
  port,
  injectScript: false,
  entry,
  output: {
    library: '[name]',
    libraryTarget: 'amd',
    libraryExport: 'default',
  },
  targets: { esmodules: true },
  externals: defaultExternals.concat(externals),
})
