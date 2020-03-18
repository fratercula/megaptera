import React from 'react'
import classes from './index.module.less'

export default function ({ error, reload }) {
  return (
    <div className={classes.error}>
      <p>{error}</p>
      <button onClick={reload}>Reload</button>
    </div>
  )
}
