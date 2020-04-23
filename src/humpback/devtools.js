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

const { component, name: pkgName } = userConfig
const { name, store: componentStore, dispatcher } = component

if (componentStore) {
  createStore(componentStore)
}

class X extends Component {
  state = {
    current: pkgName ? 'global' : 'devtools',
    active: !pkgName,
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

    if (value !== 'true' && value !== 'false') {
      if (value === 'null') {
        value = null
      } else {
        try {
          // eslint-disable-next-line no-eval
          eval(`value = ${value}`)
          // eslint-disable-next-line no-restricted-globals
          value = isNaN(Number(value)) || Array.isArray(value) ? value : Number(value)
        } catch (e) {
          //
        }
      }
    } else {
      value = value === 'true'
    }

    let result
    try {
      result = await this.props.dispatch(pkgName || 'global', event, value)
    } catch (e) {
      result = `Error: ${e.message || e}`
    }

    this.setState({ result })
  }

  render() {
    const {
      store,
      dispatch: d,
      config,
      mountedComponents,
      history,
      location,
      match,
      ...rest
    } = this.props
    const { current, active, result } = this.state

    return (
      <div
        style={{ position: pkgName ? 'absolute' : 'static' }}
        className={`${classes.view}${active ? ` ${classes.active}` : ''}`}
      >
        <div
          onClick={() => this.setState({ active: true })}
          className={classes.setting}
        />
        <div className={classes.header}>
          {
            pkgName
              ? (
                <div
                  onClick={() => this.setState({ current: 'global' })}
                  className={current === 'global' ? classes.active : ''}
                >
                  global
                </div>
              )
              : null
            }
          {
            name
              ? (
                <div
                  onClick={() => this.setState({ current: 'devtools' })}
                  className={current === 'devtools' ? classes.active : ''}
                >
                  {name}
                </div>
              )
              : null
          }
          {
            pkgName
              ? (
                <div
                  onClick={() => this.setState({ active: false })}
                  className={classes.close}
                />
              )
              : null
          }
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
