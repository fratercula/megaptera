import container from './container'
import loading from './loading'
import error from './error'
import useConfig from '../usr-config'

const { store, dispatcher } = useConfig

export default {
  error,
  loading,
  store,
  dispatcher,
  container,
}
