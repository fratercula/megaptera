module.exports = {
  // webpack amd externals
  externals: [
    // {
    //   name: 'antd',
    //   amd: 'antd',
    //   root: 'antd',
    // },
  ],

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
