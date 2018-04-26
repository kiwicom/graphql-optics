import React from 'react'

const style = {
  height: '100vh',
  overflowY: 'auto',
  paddingRight: '40px',
  width: '30%',
}

export default ({ children }) => <div style={style}>{children}</div>
