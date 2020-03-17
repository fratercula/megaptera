export default {
  async setName({ dispatch }, name) {
    console.log(name)
    // await new Promise((r) => setTimeout(r, 300))
    dispatch({ name })
  },
  getName({ getStore }) {
    const { name } = getStore()
    return name
  },
}
