import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class extends Component {
  static propTypes = {
    Routes: PropTypes.element.isRequired,
    componentCreator: PropTypes.func.isRequired,
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { Routes, componentCreator } = this.props
    const { name: entry, component: devtools, path } = userConfig
    const EntryComponent = componentCreator(entry)
    const DevComponent = componentCreator(devtools.name)

    const C = () => (
      <Resize>
        <EntryComponent />
      </Resize>
    )

    const routeComponent = (
      <Route
        exact
        path={path}
        component={C}
      />
    )

    return (
      <>
        <Routes config={routeComponent} />
        <DevComponent />
      </>
    )
  }
}
