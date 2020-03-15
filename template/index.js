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

  static async updateName(name) {
    await new Promise((r) => setTimeout(r, 1000))
    dispatch({ name }, true)
  }

  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    name: '',
  }

  render() {
    const { name } = this.props
    return (
      <div>
        current name:
        {name}
      </div>
    )
  }
}

export default connect(Megaptera)
