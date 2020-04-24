# Megaptera

RequireJS(AMD) + React

## Usage

```bash
$ mp init <folder> # create
$ mp start <port> # dev
$ mp build <folder> # build
```

## Config

default

```js
// webpack externals
externals: [
  {
    name: 'antd',
    amd: 'antd',
    root: 'antd',
  }
]

// npm registry
registry: 'https://registry.npm.taobao.org'

// webpack build path
output: '[version]/[name].js',

// test component
component: {
  // name
  name: 'test-component',

  // component store
  store: {
    key: 'value',
  },

  dispatcher(dispatch, getStore) {
    return {
      setKey: () => ...
    }
  },
}
```

component

```js
// component name
name: 'dev-component'

// route path
path: '/posts/:id'

// dev default path
defaultPath: '/posts/5'

// global component
// same as component
global: {
  store: ...
  dispatcher: ...
}
```
