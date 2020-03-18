module.exports = (dispatch = () => null, getStore = () => null) => ({
  name: 'component-flow',
  packages: [
    {
      name: 'antd',
      url: ['https://unpkg.com/moment@2.24.0/moment.js', 'https://unpkg.com/antd@3.26.0/dist/antd-with-locales.min.js'],
      amd: 'antd',
      root: 'antd',
    },
  ],
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
  testComponent: {
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
