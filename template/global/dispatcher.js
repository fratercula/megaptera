export default {
  async setName({ dispatch }, name) {
    await new Promise((r) => setTimeout(r, 300))
    dispatch({ name })
  },
  getUserName({ getStore }) {
    const { name } = getStore()
    return name
  },
}
