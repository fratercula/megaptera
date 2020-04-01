import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classes from './index.module.less'

export default class extends Component {
  static propTypes = {
    Routes: PropTypes.element.isRequired,
    componentCreator: PropTypes.func.isRequired,
    CONFIG: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    store: PropTypes.func.isRequired,
  }

  onSet = () => {
    this.props.dispatch('test-name', 'setMessage', `${Math.random()}`)
  }

  render() {
    const {
      Routes,
      componentCreator,
      CONFIG,
      store,
    } = this.props

    const routesComponent = CONFIG.routes.map(({ path, components }) => {
      const routeComponent = () => components.map((name) => {
        const C = componentCreator(name)
        return (
          <div className={classes.component}>
            <C />
          </div>
        )
      })

      return (
        <Route
          key={path}
          exact
          path={path}
          component={routeComponent}
        />
      )
    })

    return (
      <>
        <div className={classes.header}>
          <div>Logo</div>
          <button type="button" onClick={this.onSet}>set component message</button>
          <div>name: {store.name}</div>
        </div>
        <div className={classes.main}>
          <div className={classes.nav}>
            {
              CONFIG.routes.map(({ name, path }) => (
                <Link key={path} to={path}>{name}</Link>
              ))
            }
          </div>
          <div className={classes.components}>
            <Routes components={routesComponent} />
          </div>
        </div>
      </>
    )
  }
}
