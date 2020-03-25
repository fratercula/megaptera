#!/usr/bin/env node

const minimist = require('minimist')
const fs = require('fs-extra')
const { resolve, join } = require('path')
const falco = require('@fratercula/falco')
const prompts = require('prompts')
const { version } = require('../package.json')
const falcoConfig = require('../src/falco.config')

const clis = ['init', 'start', 'build']
const ignores = ['Thumbs.db', '.DS_Store']
const cwd = process.cwd()
const { _, ...options } = minimist(process.argv.slice(2))

if (
  !_.length
  || (!_.length && options.v !== undefined)
  || !clis.includes(_[0])
) {
  global.console.log(version)
  process.exit(0)
}

const validator = (value) => {
  if (/[a-z][-a-z0-9]/.test(value)) {
    return true
  }
  return 'Componet name error (lowercase, number or `-`)'
}

if (_[0] === 'init') {
  (async () => {
    let { initType } = await prompts({
      type: 'toggle',
      name: 'initType',
      message: 'Select development type',
      initial: false,
      inactive: 'component',
      active: 'global',
    })

    if (initType === undefined) {
      process.exit(0)
    }

    initType = !initType ? 'component' : 'global'

    let pkgName = 'component-dev'

    if (initType === 'component') {
      const data = await prompts({
        type: 'text',
        initial: 'component-dev',
        message: 'Enter componet name [componet-dev]:',
        name: 'pkgName',
        validate: validator,
      })

      if (data.pkgName === undefined) {
        process.exit(0)
      }

      pkgName = data.pkgName
    }

    const { testName } = await prompts({
      type: 'text',
      initial: 'component-test',
      message: 'Enter test componet name [componet-test]:',
      name: 'testName',
      validate: validator,
    })

    if (testName === undefined) {
      process.exit(0)
    }

    const templatePath = resolve(__dirname, `../template/${initType}`)

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
  })()
}

if (_[0] === 'start') {
  let port = Number(options.p) || 0

  if (port < 1000) {
    port = 2333
  }

  (async () => {
    try {
      const {
        name: pkgName,
        externals,
        component,
      } = require(join(cwd, 'config.js')) // eslint-disable-line
      const { name: testName } = component

      fs.copySync(join(cwd, 'config.js'), resolve(__dirname, '../src/user-config.js'))

      const preConfig = falcoConfig(
        'production',
        {
          [testName]: resolve(__dirname, '../src/humpback/devtools.js'),
          global: resolve(__dirname, '../src/humpback/index.js'),
        },
        externals,
      )

      await falco(preConfig)

      const devConfig = falcoConfig(
        'development',
        {
          [pkgName]: join(cwd, 'index.js'),
        },
        externals,
        port,
      )

      falco(devConfig)
    } catch (e) {
      global.console.log(e)
    }
  })()
}

if (_[0] === 'build') {
  (async () => {
    const { externals, name: pkgName } = require(join(cwd, 'config.js')) // eslint-disable-line
    const buildConfig = falcoConfig(
      'production',
      {
        [pkgName]: join(cwd, 'index.js'),
      },
      externals,
    )
    const { codes } = await falco(buildConfig)
    codes.forEach(({ name, content }) => {
      fs.outputFileSync(join(cwd, 'dist', name), content)
    })
  })()
}
