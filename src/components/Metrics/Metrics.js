import React from 'react'

import vars from '../../styles/vars'

const style = {
  fontFamily: vars.fontFamily,
}

export default ({ trace }) => (
  <dl style={style}>
    <dt>Duration</dt>
    <dd>{parseInt(trace._source.metrics.duration / 10 ** 6)} ms</dd>
  </dl>
)
