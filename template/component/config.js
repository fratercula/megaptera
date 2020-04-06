module.exports = {
  // component name
  name: 'pkg-name',

  // route path
  path: '/',

  // webpack amd externals
  externals: [
    // {
    //   name: 'antd',
    //   amd: 'antd',
    //   root: 'antd',
    // },
  ],
  // npm registry
  // registry: 'https://registry.npm.taobao.org',

  // global container
  container: {
    // global store
    store: {
      name: 'humpback',
    },

    // global dispatcher
    dispatcher: {
      setName: async ({ dispatch }, name) => {
        await new Promise((r) => setTimeout(r, 300))
        dispatch({ name })
      },
      getName({ getStore }) {
        return getStore().name
      },
    },
  },

  // test component
  component: {
    // test component name
    name: 'test-name',

    // test component store
    store: {
      message: 'test',
    },

    // test component dispatcher
    dispatcher(dispatch, getStore) {
      return {
        setMessage(message) {
          dispatch({ message })
        },
        getMessage() {
          return getStore().message
        },
      }
    },
  },
}
