import React, { Component } from 'react'
import Nycticorax from 'nycticorax'

const {
  createStore,
  connect,
  dispatch,
  getStore,
} = new Nycticorax()

createStore({ data: '666' })

class X extends Component {
  static getValue = () => getStore().data

  static setValue = (value) => {
    dispatch({ data: value })
  }

  render() {
    const { data } = this.props

    return (
      <div>{data}</div>
    )
  }
}

export default connect('data')(X)
