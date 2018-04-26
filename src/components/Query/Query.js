import React from 'react'
import { withRouter } from 'react-router'
import Button from '../Button/Button'

const codeStyle = {
  fontFamily: 'monospace',
  whiteSpace: 'pre',
  backgroundColor: 'rgba(248, 248, 255, 1)',
  overflowX: 'auto',
  width: '100%',
}

const buttonStyle = {
  marginBottom: '20px',
}

const Query = ({ query, history, location, isActive }) => (
  <Button
    style={buttonStyle}
    isActive={isActive}
    onClick={() => history.push(`${location.pathname}/${query._id}`)}
  >
    <div style={codeStyle}>{query._source.graphql}</div>
  </Button>
)

export default withRouter(Query)
