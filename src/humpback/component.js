/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react'
import JSONTree from 'react-json-tree'
import Nycticorax from 'nycticorax'
import userConfig from '../user-config'
import classes from './index.module.less'

const theme = {
  scheme: 'tomorrow',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#cc6666',
  base09: '#de935f',
  base0A: '#f0c674',
  base0B: '#b5bd68',
  base0C: '#8abeb7',
  base0D: '#81a2be',
  base0E: '#b294bb',
  base0F: '#a3685a',
}

const {
  createStore,
  connect,
  dispatch,
  getStore,
} = new Nycticorax()

const { name, store: componentStore, dispatcher } = userConfig.component

if (componentStore) {
  createStore(componentStore)
}

class X extends Component {
  state = {
    active: false,
    event: undefined,
    params: undefined,
    result: undefined,
  }

  onInput = (type, e) => {
    this.setState({ [type]: e.target.value })
  }

  onConfirm = async () => {
    const { event, params } = this.state

    if (!event) {
      return
    }

    let value = params
    try {
      // eslint-disable-next-line no-eval
      value = eval(`s = ${params}`)
    } catch (e) {
      //
    }

    let result
    try {
      result = await this.props.dispatch('global', event, value)
    } catch (e) {
      result = `Error: ${e.message || e}`
    }

    this.setState({ result })
  }

  render() {
    const {
      store,
      dispatch: d,
      CONFIG,
      MOUNTED_COMPONENTS,
      NAME,
      history,
      location,
      match,
      staticContext,
      ...rest
    } = this.props
    const { active, result } = this.state

    return (
      <div className={`${classes.view}${active ? ` ${classes.active}` : ''}`}>
        <div
          onClick={() => this.setState({ active: true })}
          className={classes.setting}
        />
        <div className={classes.header}>
          <div>{name}</div>
          <div
            onClick={() => this.setState({ active: false })}
            className={classes.close}
          />
        </div>
        <div
          className={classes.code}
        >
          <JSONTree data={rest} theme={theme} />
        </div>
        <div className={classes.header}>
          <div>dispatch</div>
        </div>

        <div className={classes.form}>
          <input onInput={(e) => this.onInput('event', e)} placeholder="Event Name" />
        </div>

        <div className={classes.form}>
          <textarea onInput={(e) => this.onInput('params', e)} placeholder="Params" />
        </div>

        <div className={classes.form}>
          <textarea value={result || ''} disabled placeholder="Result" />
        </div>

        <div onClick={this.onConfirm} className={classes.button}>Confirm</div>
      </div>
    )
  }
}

if (dispatcher) {
  const methods = dispatcher(dispatch, getStore)
  Object.keys(methods).forEach((e) => {
    X[e] = methods[e]
  })
}

export default connect(...Object.keys(componentStore || {}))(X)
