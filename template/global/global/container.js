import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
    const { Routes, componentCreator, CONFIG } = this.props

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
        {
          CONFIG.routes.map(({ name, path }) => (
            <div key={path}>
              <Link to={path}>{name}</Link>
            </div>
          ))
        }
        <Routes config={routesComponent} />
      </>
    )
  }
}
