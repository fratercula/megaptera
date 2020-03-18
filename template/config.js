export default (dispatch = () => null, getStore = () => null) => ({
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
