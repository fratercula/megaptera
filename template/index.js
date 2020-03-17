import React, { Component } from 'react'
import Nycticorax from 'nycticorax'
import PropTypes from 'prop-types'

const {
  createStore,
  connect,
  dispatch,
  getStore,
} = new Nycticorax()

createStore({ name: 'humpback' })

class Megaptera extends Component {
  static getName() {
    return getStore().name
  }

  static async setName(name) {
    await new Promise((r) => setTimeout(r, 1000))
    dispatch({ name }, true)
  }

  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    name: '',
  }

  // shouldComponentUpdate() {
  //   return false
  // }

  onClick = () => {
    // const s = this.props.dispatch('global', 'getName')
    this.props.dispatch('global', 'setName', `${Math.random()}`)
  }

  render() {
    const { name, store } = this.props
    return (
      <div>
        <input value={name} />
        <button onClick={this.onClick}>{store.name}</button>
        <input />
      </div>
    )
  }
}

export default connect('name')(Megaptera)
