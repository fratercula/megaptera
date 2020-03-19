const { join } = require('path')
const config = require(join(process.cwd(), 'config.js'))

const {
  name: pkgName,
  css = [],
  packages = [],
  testComponent,
} = config()

let testComponentName

if (testComponent) {
  testComponentName = testComponent.name
}

const links = css.map((href) => `<link rel="stylesheet" href="${href}" />`)
const externals = packages.map(({ url, ...rest }) => rest)
