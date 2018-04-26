import React from 'react'
import cx from 'classnames'

import styles from './styles.css'

export default ({ style, children, onClick, isActive }) => (
  <div
    style={style}
    className={cx(styles.button, {
      [styles.active]: isActive,
    })}
    onClick={onClick}
  >
    {children}
  </div>
)
