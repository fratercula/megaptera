import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Resizable } from 're-resizable'
import classes from './index.module.less'

class Resize extends Component {
  state = {
    width: 460,
    height: 640,
    hover: false,
  }

  onSize = (e, direction, ref, d) => {
    const { width, height } = this.state
    this.setState({
      width: width + d.width,
      height: height + d.height,
    })
  }

  onHover = (hover) => {
    this.setState({ hover })
  }

  render() {
    const { children } = this.props
    const { width, height, hover } = this.state

    const Handle = ({ type }) => (
      <div
        style={{ background: hover ? '#dadce0' : '' }}
        className={`${classes.handle}${type === 'bottom' ? ` ${classes.bottom}` : ''}`}
      />
    )
    const Corner = () => (
      <div
        className={classes.corner}
        onMouseEnter={() => this.onHover(true)}
        onMouseLeave={() => this.onHover(false)}
      >
        <div />
      </div>
    )

    return (
      <div className={classes.main}>
        <Resizable
          className={classes.resize}
          size={{ width, height }}
          enable={{ right: true, bottom: true, bottomRight: true }}
          onResizeStop={this.onSize}
          handleComponent={{ right: (<Handle />), bottom: (<Handle type="bottom" />), bottomRight: (<Corner />) }}
        >
          {children}
        </Resizable>
        <div className={classes.size}>{width} x {height}</div>
      </div>
    )
  }
}

export default class extends Component {
  shouldComponentUpdate(props) {
    return false
  }

  render() {
    const { Routes, CONFIG, componentCreator } = this.props
    const { entry, devtools, path } = CONFIG.page
    const EntryComponent = componentCreator(entry)
    const DevComponent = componentCreator(devtools)

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