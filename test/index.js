import React, { Component } from 'react'
import Nycticorax from 'nycticorax'

const {
  createStore,
  connect,
  dispatch,
  getStore,
} = new Nycticorax()

createStore({ name: 'megaptera' })

class X extends Component {
  static getName() {
    return getStore().name
  }

  static async setName(name) {
    await new Promise((r) => setTimeout(r, 1000))
    dispatch({ name }, true)
  }

  onClick = () => {
    // const s = this.props.dispatch('global', 'getName')
    this.props.dispatch('global', 'setName', `${Math.random()}`)
    this.props.dispatch('devtools', 'setMessage', `${Math.random()}`)
  }

  render() {
    const { store } = this.props
    return (
      <div>
        <p>{name}</p>
        <button onClick={this.onClick}>{store.name}</button>
        <input />
      </div>
    )
  }
}

export default connect('name')(X)
