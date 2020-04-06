#!/usr/bin/env node

const minimist = require('minimist')
const fs = require('fs-extra')
const { resolve, join } = require('path')
const { tmpdir } = require('os')
const falco = require('@fratercula/falco')
const prompts = require('prompts')
const { version } = require('../package.json')
const falcoConfig = require('../src/falco.config')

const tmpDir = join(tmpdir(), 'FALCO')
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

    const copyFiles = (dir, prefix = '/') => fs
      .readdirSync(dir)
      .filter((name) => !ignores.includes(name))
      .forEach((name) => {
        const currentPath = join(dir, name)

        if (fs.lstatSync(currentPath).isDirectory()) {
          copyFiles(currentPath, name)
          return
        }

        const content = fs
          .readFileSync(currentPath, 'utf8')
          .replace(/pkg-name/g, pkgName)
          .replace(/test-name/g, testName)

        fs.outputFileSync(join(cwd, _[1] || '', prefix, name), content)
      })

    copyFiles(templatePath)

    global.console.log('Success')
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
        registry,
      } = require(join(cwd, 'config.js')) // eslint-disable-line
      const { name: testName } = component

      fs.copySync(join(cwd, 'config.js'), join(tmpDir, 'user-config.js'))
      fs.copySync(resolve(__dirname, '../src/humpback'), join(tmpDir, 'humpback'))

      const preConfig = falcoConfig({
        mode: 'production',
        entry: pkgName
          ? {
            [testName]: join(tmpDir, 'humpback/devtools.js'),
            global: join(tmpDir, 'humpback/index.js'),
          }
          : {
            [testName]: join(tmpDir, 'humpback/component.js'),
          },
        externals,
        registry,
      })

      await falco(preConfig)

      const devConfig = falcoConfig({
        mode: 'development',
        entry: pkgName
          ? {
            [pkgName]: join(cwd, 'index.js'),
          } : {
            global: join(cwd, 'index.js'),
          },
        externals,
        port,
        registry,
      })

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
      pkgName
        ? {
          [pkgName]: join(cwd, 'index.js'),
        }
        : {
          global: join(cwd, 'index.js'),
        },
      externals,
    )
    const { codes } = await falco(buildConfig)
    codes.forEach(({ name, content }) => {
      fs.outputFileSync(join(cwd, _[1] || 'dist', name), content)
    })

    global.console.log('Success')
  })()
}
