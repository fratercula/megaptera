export default {
  setName: async ({ dispatch }, name) => {
    await new Promise((r) => setTimeout(r, 300))
    dispatch({ name })
  },
  getName({ getStore }) {
    return getStore().name
  },
}
