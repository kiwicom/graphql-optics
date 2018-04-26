import React from 'react'
import { withRouter } from 'react-router-dom'
import Button from '../Button/Button'
import vars from '../../styles/vars'

const style = {
  fontFamily: vars.fontFamily,
}

const Aggregation = ({ aggregation, history, isActive }) => (
  <Button
    style={style}
    isActive={isActive}
    onClick={() => history.push(`/aggregations/${aggregation.key}`)}
  >
    <span style={{ flexGrow: 1 }}>{aggregation.key}</span>
    <span>{aggregation.doc_count}</span>
  </Button>
)

export default withRouter(Aggregation)
