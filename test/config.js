module.exports.externals = [
  // {
  //   name: 'antd',
  //   amd: 'antd',
  //   root: 'antd',
  // },
]

module.exports.container = {
  name: 'componet-dev',
  store: {
    name: 'humpback',
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
}

module.exports.testComponent = (dispatch, getStore) => ({
  name: 'componet-test',
  store: {
    message: 'test',
  },
  dispatcher: {
    setMessage(message) {
      dispatch({ message })
    },
    getMessage() {
      return getStore().message
    }
  },
})
