module.exports = (dispatch = () => null, getStore = () => null) => ({
  packages: {
    moment: {
      url: 'https://unpkg.com/moment@2.24.0/moment.js',
      amd: 'moment',
      root: 'moment',
    },
  },
  store: {
    name: 'aksdj4',
  },
  dispatcher: {
    setName: async ({ dispatch }, name) => {
      await new Promise((r) => setTimeout(r, 300))
      dispatch({ name })
    },
    getName({ getStore }) {
      return getStore().name
    },
  },
  component: {
    name: 'dev-component',
    store: {
      message: '666',
    },
    dispatcher: {
      setMessage(message) {
        dispatch({ message })
      },
      getMessage() {
        return getStore().message
      }
    },
  },
})
