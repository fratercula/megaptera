#!/usr/bin/env node

const minimist = require('minimist')
const readlineSync = require('readline-sync')
const fs = require('fs-extra')
const { resolve, join } = require('path')
const { version } = require('../package.json')

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
  const pkgName = readlineSync.question('Enter componet name [componet-dev]:', {
    defaultInput: 'componet-dev'
  })
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

      fs.outputFileSync(join(cwd, name), content)
    })

  process.exit(0)
}
