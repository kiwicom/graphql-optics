import React from 'react'
import Button from '../Button/Button'
import { withRouter } from 'react-router'

import vars from '../../styles/vars'

const buttonStyle = {
  fontFamily: vars.fontFamily,
}

const Metrics = ({ trace, isActive, history }) => (
  <Button
    style={buttonStyle}
    isActive={isActive}
    onClick={() =>
      history.push(`/aggregations/${trace._source.rootQuery}/${trace._id}`)
    }
  >
    <span style={{ flexGrow: 1 }}>{trace._source.rootQuery}</span>
    <span>{parseInt(trace._source.metrics.duration / 10 ** 6)} ms</span>
  </Button>
)

export default withRouter(Metrics)
