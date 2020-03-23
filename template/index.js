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
  static getValue() {
    return getStore().value
  }

  static async setValue(name) {
    await new Promise((r) => setTimeout(r, 1000))
    dispatch({ value: name }, true)
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
  }

  state = {
    message: '',
  }

  setGlobalName = () => {
    this.props.dispatch('global', 'setName', `${Math.random()}`)
  }

  getMessage = async () => {
    const message = await this.props.dispatch('test-name', 'getMessage')
    this.setState({ message })
  }

  render() {
    const { store, value } = this.props
    const { message } = this.state

    return (
      <div className={classes.main}>
        <div className={classes.text}>
          <div>value:</div>
          <div>{value}</div>
        </div>
        <div className={classes.text}>
          <div>global:</div>
          <div>{store.name}</div>
        </div>
        <div className={classes.text}>
          <button type="button" onClick={this.setGlobalName}>
            set global name
          </button>
        </div>
        <div className={classes.text}>
          <input value={message} placeholder="test componet message" />
          <button type="button" onClick={this.getMessage}>
            Get
          </button>
        </div>
      </div>
    )
  }
}

export default connect('value')(X)
