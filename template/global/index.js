import container from './container'
import loading from './loading'
import error from './error'
import config from '../config'

const { store, dispatcher } = config()

export default {
  error,
  loading,
  store,
  dispatcher,
  container,
}
