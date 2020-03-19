#!/usr/bin/env node

const minimist = require('minimist')
const readlineSync = require('readline-sync')
const fs = require('fs-extra')
const { resolve, join } = require('path')
const falco = require('@fratercula/falco')
const { version } = require('../package.json')
const { tmpDir } = require('../src/config')
const falcoConfig = require('../src/falco.config')

const clis = ['init', 'start', 'build']
const ignores = ['Thumbs.db', '.DS_Store']
const cwd = process.cwd()
const { _, ...options } = minimist(process.argv.slice(2))

if (
  !_.length ||
  (!_.length && options.v !== undefined) ||
  !clis.includes(_[0])
) {
  global.console.log(version)
  process.exit(0)
}

readlineSync.setDefaultOptions({
  limit: [/[a-z][-a-z0-9]/],
  limitMessage: 'Componet name error (lowercase, number or `-`)',
})

if (_[0] === 'init') {
  const pkgName = readlineSync.question(
    'Enter componet name [componet-dev]:',
    { defaultInput: 'componet-dev' },
  )
  const testName = readlineSync.question('Enter test componet name [componet-test]:', {
    defaultInput: 'componet-test'
  })
  const templatePath = resolve(__dirname, '../template')

  fs
    .readdirSync(templatePath)
    .filter((name) => !ignores.includes(name))
    .forEach((name) => {
      const content = fs
        .readFileSync(join(templatePath, name), 'utf8')
        .replace(/pkg-name/g, pkgName)
        .replace(/test-name/g, testName)

      fs.outputFileSync(join(cwd, _[1] || '', name), content)
    })

  global.console.log('Success')
  process.exit(0)
}

if (_[0] === 'start') {
  let port = Number(options.p)

  if (port < 1000) {
    port = 6666
  }

  (async () => {
    try {
      const html = fs.readFileSync(join(cwd, 'index.html'), 'utf8')
      const userConfig = fs.readFileSync(join(cwd, 'config.js'), 'utf8')
      const {
        externals = [],
        container = {},
        testComponent = () => null,
      } = require(join(cwd, 'config.js')) // eslint-disable-line
      const pkgName = container.name
      const testName = testComponent().name

      const config = falcoConfig(
        'production',
        {
          [testName]: resolve(__dirname, '../src/humpback/devtools.js'),
          global: resolve(__dirname, '../src/humpback/index.js'),
        },
        externals,
      )

      console.log(config)

    } catch (e) {
      console.log(e)
    }
  })()

  process.exit(0)
}

if (_[0] === 'build') {
  process.exit(0)
}
