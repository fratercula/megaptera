import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classes from './index.module.less'

export default class extends Component {
  static propTypes = {
    Routes: PropTypes.element.isRequired,
    componentCreator: PropTypes.func.isRequired,
    CONFIG: PropTypes.object.isRequired,
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const {
      Routes,
      componentCreator,
      CONFIG,
    } = this.props

    const routesComponent = CONFIG.routes.map(({ path, components }) => {
      const routeComponent = () => components.map((name) => {
        const C = componentCreator(name)
        return (<C />)
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
          Logo
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
            <Routes config={routesComponent} />
          </div>
        </div>
      </>
    )
  }
}
