import React, { Component } from 'react'
import JSONTree from 'react-json-tree'
import Nycticorax from 'nycticorax'
import config from '../config'
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
  base0F: '#a3685a'
}

const {
  createStore,
  connect,
  dispatch,
  getStore,
} = new Nycticorax()

const { component } = config(dispatch, getStore)
const { store, dispatcher } = component || {}

if (component) {
  createStore(store)
}

class X extends Component {
  state = {
    current: 'global',
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
      value = eval(`s = ${params}`)
    } catch (e) {}

    let result
    try {
      result = await this.props.dispatch('entry', event, value)
    } catch (e) {
      result = `Error: ${e.message || e}`
    }

    this.setState({ result })
  }

  render() {
    const {
      store,
      dispatch,
      CONFIG,
      MOUNTED_COMPONENTS,
      NAME,
      history,
      location,
      match,
      staticContext,
      ...rest
    } = this.props
    const { current, active, result } = this.state

    return (
      <div className={`${classes.view}${active ? ` ${classes.active}` : ''}`}>
        <div
          onClick={() => this.setState({ active: true })}
          className={classes.setting}
        />
        <div className={classes.header}>
          <div
            onClick={() => this.setState({ current: 'global' })}
            className={current === 'global' ? classes.active : ''}
          >
            global
          </div>
          <div
            onClick={() => this.setState({ current: 'devtools' })}
            className={current === 'devtools' ? classes.active : ''}
          >
            {NAME}
          </div>
          <div
            onClick={() => this.setState({ active: false })}
            className={classes.close}
          />
        </div>
        <div
          style={{ display: current === 'global' ? 'block' : 'none' }}
          className={classes.code}
        >
          <JSONTree data={store} theme={theme} />
        </div>
        <div
          style={{ display: current === 'devtools' ? 'block' : 'none' }}
          className={classes.code}
        >
          <JSONTree data={rest} theme={theme} />
        </div>
        <div className={classes.header}>
          <div>dispatch</div>
        </div>

        <div className={classes.form}>
          <input onInput={e => this.onInput('event', e)} placeholder="Event Name" />
        </div>

        <div className={classes.form}>
          <textarea onInput={e => this.onInput('params', e)} placeholder="Params" />
        </div>

        <div className={classes.form}>
          <textarea value={result || ''} disabled placeholder="Result" />
        </div>

        <div onClick={this.onConfirm} className={classes.button}>Confirm</div>
      </div>
    )
  }
}

if (component) {
  Object.keys(dispatcher).forEach((name) => {
    X[name] = dispatcher[name]
  })
}

export default connect(...Object.keys(store || {}))(X)
