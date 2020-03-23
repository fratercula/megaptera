/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import Nycticorax from 'nycticorax'
import PropTypes from 'prop-types'
import classes from './index.module.less'

const {
  createStore,
  connect,
  dispatch,
  getStore,
} = new Nycticorax()

createStore({ value: 'megaptera' })

class X extends Component {
  static getName() {
    return getStore().name
  }

  static async setName(name) {
    await new Promise((r) => setTimeout(r, 1000))
    dispatch({ name }, true)
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
  }

  setGlobalName = () => {
    this.props.dispatch('global', 'setName', `${Math.random()}`)
  }

  getMessage = () => {
    this.props.dispatch('test-name', 'getMessage')
  }

  render() {
    const { store, value } = this.props
    return (
      <div className={classes.main}>
        <div>
          Current:
          {value}
        </div>
        <div>
          Global:
          {store.name}
        </div>
        <button type="button" onClick={this.setGlobalName}>
          Set Global
        </button>
        <button type="button" onClick={this.getMessage}>
          Get Test Component
        </button>
        <input />
      </div>
    )
  }
}

export default connect('value')(X)
