import React, { Component } from 'react'
import { Resizable } from 're-resizable'
import classes from './index.module.less'

export default class extends Component {
  state = {
    width: 480,
    height: 720,
    hover: false,
  }

  onHover = (hover) => {
    this.setState({ hover })
  }

  render() {
    const { Routes } = this.props
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
          size={{
            width,
            height,
          }}
          enable={{
            right: true,
            bottom: true,
            bottomRight: true,
          }}
          onResizeStop={(e, direction, ref, d) => {
            this.setState({
              width: width + d.width,
              height: height + d.height,
            })
          }}
          handleComponent={{
            right: (<Handle />),
            bottom: (<Handle type="bottom" />),
            bottomRight: (<Corner />),
          }}
        >
          <Routes />
        </Resizable>
        <div className={classes.size}>{width} x {height}</div>
      </div>
    )
  }
}
