const package = require('../package.json')
const config = require('../config')

const { name: pkgName } = package
const {
  css = [],
  packages = [],
  component = {},
} = config()
